const joinbtn = document.getElementById("joinbtn")
const sendbtn = document.getElementById("sendbtn")
const roominput = document.getElementById("roominput")
const msginput = document.getElementById("msginput")
const nameinput = document.getElementById("nameinput") // Added name input
const form = document.getElementById("form")
const msgcontainer = document.getElementById("msgcontainer")

const socket = io()
socket.on("connect", ()=> {
    displaymsg("You connected with id: " + socket.id)
})

socket.on('receivemsg', (msg, name) => { // Receive name with message
    displaymsg(`${name}: ${msg}`)
})

form.addEventListener("submit", e => {
    e.preventDefault()
    const msg = msginput.value
    const room = roominput.value
    const name = nameinput.value // Get name from input
    if (msg === "") return
    displaymsg(`You: ${msg}`)
    socket.emit("sendmsg", msg, room, name) // Send name with message
    msginput.value = ""
})
joinbtn.addEventListener("click", ()=> {
    const room = roominput.value
    socket.emit("joinroom", room, msg => {
        displaymsg(msg)
    })
})
function displaymsg(msg) {
    const div = document.createElement("div")
    div.classList.add("msgs")
    div.textContent = msg
    msgcontainer.appendChild(div)

}