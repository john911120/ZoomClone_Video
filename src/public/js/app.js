 const socket = io()

 const welcome = document.getElementById("welcome")
 const room = document.getElementById("room")
 const form = welcome.querySelector("form")

room.hidden = true

let roomName 

function addMessage(message) {
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = message
    ul.appendChild(li)
}

function showRoom(){
    welcome.hidden = true
    room.hidden = false
    const h3 = room.querySelector("h3")
    h3.innerText = `Room ${roomName}`
    const form = room.querySelector("form")
    form.addEventListener("submit", handleMessageSubmit)
}

function handleRoomSubmit(event) {
    event.preventDefault()
    const input = form.querySelector("input")
    socket.emit("enter_room", input.value, showRoom)
    roomName = input.value
    input.value = ""
}

function handleMessageSubmit(event) {
    event.preventDefault()
    const input = room.querySelector("input")
    const value = input.value
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`you: ${value}`)
    })
    input.value=""
}


 form.addEventListener("submit", handleRoomSubmit)

 socket.on("welcome", () => {
    addMessage("someone Joined!!")
 })

 socket.on("bye", () =>{
    addMessage("someone left the room")
})

socket.on("new_message", addMessage)