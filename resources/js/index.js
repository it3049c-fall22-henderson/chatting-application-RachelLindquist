const MILLISECONDS_IN_TEN_SECONDS = 10000;

const nameInput = document.getElementById("my-name-input");
const nameSave = document.getElementById("save-name");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

const serverURL = "https://it3049c-chat-application.herokuapp.com"
const messagesURL = "https://it3049c-chat-application.herokuapp.com/messages"

//Disable the message input until a name is provided and saved to the localStorage.
if (!localStorage.getItem('username')){
    chatBox.classList.add('d-none');
    myMessage.classList.add('d-none');
    sendButton.classList.add('d-none');   
} else {
    nameInput.placeholder = JSON.parse(localStorage.getItem('username'))
    chatBox.classList.remove('d-none');
    myMessage.classList.remove('d-none');
    sendButton.classList.remove('d-none');
}

//Allow users to modify their saved name.
nameSave.addEventListener("click", function(e){
    e.preventDefault();
    const username = nameInput.value;
    localStorage.setItem('username', JSON.stringify(username));
    chatBox.classList.remove('d-none');
    myMessage.classList.remove('d-none');
    sendButton.classList.remove('d-none');
});

function fetchMessages() {
  return fetch(messagesURL).then( response => response.json())
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  // Loop over the messages. Inside the loop we will
      // get each message
      // format it
      // add it to the chatbox
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (messagesURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});
