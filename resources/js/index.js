const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

const serverURL = "https://it3049c-chat-application.herokuapp.com"
const messagesURL = "https://it3049c-chat-application.herokuapp.com/messages"

function fetchMessages() {
  return fetch(messagesURL).then( response => response.json())
}

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  console.log(messages)

  // Loop over the messages. Inside the loop we will
      // get each message
      // format it
      // add it to the chatbox
}



function updateMessagesInChatBox(){
  fetchMessages()
  formatMessages()
  updateChatBox()
}

