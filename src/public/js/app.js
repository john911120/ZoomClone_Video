 const socket = io()
 const myFace = document.getElementById("myFace")
 const muteBtn = document.getElementById("mute")
 const cameraBtn = document.getElementById("camera")
 const cameraSelect = document.getElementById("cameras")
 const call  = document.getElementById("call")

// Welcome Form(Join a room)
const welcome = document.getElementById("welcome")
const welcomeForm = document.querySelector("form")

// SocketCode
socket.on("welcome", async () => {
    const offer = await myPeerConnection.createOffer()
    myPeerConnection.setLocalDescription(offer)
    console.log("Sent the offer")
    socket.emit("offer", offer, roomName)
})
socket.on("offer", async(offer) => {
    myPeerConnection.setRemoteDescription(offer)
    const answer = await myPeerConnection.createAnswer()
    myPeerConnection.setLocalDescription(answer)
    socket.emit("answer", answer, roomName)
})
socket.on("answer", answer => {
    myPeerConnection.setLocalDescription(answer)
})

call.hidden = true

let myStream;
let muted = false
let cameraOff = false
let roomName
let myPeerConnection

 async function getCameras(){
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((device) => device.kind === "videoinput")
        const currentCamera = myStream.getVideoTracks()[0]
        cameras.forEach((camera) => {
            const option = document.createElement("option")
            option.value = camera.deviceId
            option.innerText = camera.label
            if(currentCamera.label == camera.label){
                option.selected = true
            }
            cameraSelect.appendChild(option)
        })
    } catch(e){
        console.log(e)
    }
 }

 async function getMedia(deviceId){
    const initialConstraints = {
        audio : true,
        video : {facingMode : "user"}
    }
    const cameraConstraints = {
        audio : true,
        video : {deviceId: {exact: deviceId}}
    }
     try{
         myStream = await navigator.mediaDevices.getUserMedia(
         deviceId ? cameraConstraints: initialConstraints
            )
         myFace.srcObject = myStream
         if(!deviceId){
         await getCameras()
         }
    }catch(e){
         console.log(e)
     }
 }


function handleMuteClick() {
    myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled))
    if(!muted) {
        muteBtn.innerText = "unMute"
        muted = true
    } else {
        muteBtn.innerText = "Mute"
        muted = false
    }
}

function handleCameraClick() {
    myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled))
    if(!cameraOff){
        cameraBtn.innerText = "Turn Camera On"
        cameraOff = true
    } else {
        cameraBtn.innerText = "Turn Camera Off"
        cameraOff = false
    }
}

async function handleCameraChange(){
    await getMedia(cameraSelect.value)
}

async function handleWelcomeSubmit(event) {
    event.preventDefault()
    const input = welcome.querySelector("input")
    await initCall()
    socket.emit("join_room", input.value)
    roomName = input.value
    input.value=""
}

//async function startMedia(){
async function initCall(){
    welcome.hidden = true
    call.hidden = false
    await getMedia()
    makeConnection()
}

// WEBRTC Code here
function makeConnection() {
    myPeerConnection = new RTCPeerConnection()
 //   console.log(myStream.getTracks())
    myStream.getTracks().forEach(track => myPeerConnection.addTrack(track, myStream))
}

muteBtn.addEventListener("click", handleMuteClick)
cameraBtn.addEventListener("click", handleCameraClick)
cameraSelect.addEventListener("input", handleCameraChange)
welcomeForm.addEventListener("submit", handleWelcomeSubmit)