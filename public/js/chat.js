// obtenemos todos los elementos de la UI que vamos a manipular

const inputNameEl = document.getElementById("input-name")
const inputEmailEl = document.getElementById("input-email")
const chatContainerEl = document.getElementById("chat-container")
const messageInput = document.getElementById("message-input")
const sendBtn = document.getElementById("send-btn")
const msgPool = document.getElementById("message-pool")
const usrList = document.getElementById("user-list")
const groupList = document.getElementById("group-list")

const user = JSON.parse(localStorage.getItem("user"))
const username = `${user.firstname} ${user.lastname}`

console.log(user)
const users = []

// Utilizamos el modal de UI para iniciar 
// el usuario debe de ingresar su nombre para poder utilizarlo

// escuchar el evento cuando el modal se cierra y ejecutar la logica inicial
function init () {

  // mostamos el contenedor del chat que estaba escondido
  document.getElementById("username").innerText = username
  msgPool.innerHTML = null

  // conectar con socket io
  user.socket = io()

  // escuchar diferentes eventos

  // enviamos nuestro nombre de usuario al server para que los demas nos conozcan
  user.socket.emit("iam", username)

  // escuchar la lista de usuarios conectados actualmente
  user.socket.on("users", renderUser)

  // escuchar cuando un usuario se ha desconectado
  user.socket.on("offline", deleteUser)

  // escuchar cuando un nuevo mensaje ha sido recibido
  user.socket.on("message", render)

  user.socket.on("messages", (data) => {
    console.log(data)


    data.forEach(m => render(m))
  })

  // resetar la lista de usuarios, poniendo siempre al inicio al usuario de la app
  resetUserList()
}

// callback para enviar mensaje cuando damos click  en el boton
sendBtn.addEventListener("click", (e) => {
  e.preventDefault()
  if (!messageInput.value) {
    return
  }

  const message = {
    author: {
      email: user.email,
      name: username
    },
    text: messageInput.value,
    date: Date.now()
  }

  // enviamos el mensaje y renderizamos el mismo en la lista de mensajes
  user.socket.emit("message", message)

  render(message)
  messageInput.value = null
})

// // rendizar un mensaje
// // distinguiendo entre mensaje enviado o mensaje recibido
// function render(data) {
//   const msgElement = document.createElement("div")
//   const userEl = `<span class="user">${data.user}</span>`
//   const timeEl = `<span class="date-time">${new Date(data.date).toLocaleString()}</span> &nbsp;`
//   const cssClass = data.user == user.name ? "local" : "remote"
//   msgElement.classList.add(cssClass)
//   msgElement.innerHTML = `
//     <div class="message-data uk-text-small ${cssClass === "local" ? "align-right" : ""}">
//       ${cssClass === "local" ? userEl + timeEl : timeEl + userEl}
//     </div>
//     <div class="message-body">${data.message}</div>
//   `
//   msgPool.appendChild(msgElement)
//   msgPool.scrollTop = msgPool.scrollHeight
// }

function render(data) {
  const msgElement = document.createElement("div")
  const userEl = `<span class="user">${data.author.name}</span>`
  const timeEl = `<span class="date-time">${new Date(data.date).toLocaleString()}</span> &nbsp;`
  const cssClass = data.author.name == username ? "local" : "remote"
  msgElement.classList.add(cssClass)
  msgElement.innerHTML = `
    <div class="message-data uk-text-small ${cssClass === "local" ? "align-right" : ""}">
      ${cssClass === "local" ? userEl + timeEl : timeEl + userEl}
    </div>
    <div class="message-body">${data.text}</div>
  `
  msgPool.appendChild(msgElement)
  msgPool.scrollTop = msgPool.scrollHeight
}

// renderizar un usuario en la lista
function renderUser(u) {
  if (u.name == username) {
    return
  }
  users.push(u)
  const liEl = document.createElement("li")
  liEl.innerHTML = u.name
  liEl.dataset.id = u.id
  usrList.appendChild(liEl)
}

// borrar un usuario de la lista
function deleteUser(id) {
  resetUserList()
  users.filter(u => u.id !== id).forEach(renderUser)
}


// inicializar la lista de usuarios
function resetUserList() {
  usrList.innerHTML = null

  const meEl = document.createElement("li")
  meEl.innerHTML = "🙋🏻‍♂️"
  usrList.appendChild(meEl)
}

init()