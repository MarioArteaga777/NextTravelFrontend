 const chats = [
      {
        name: "Mario Arteaga",
        avatar: "img/mario arteaga.jpg",
        messages: [
          { text: "Hola Zelaya, ¿cómo vas?", from: "received" },
          { text: "Todo bien, trabajando en el proyecto", from: "sent" },
          { text: "¿Ya terminaste el proyecto?", from: "received" }
        ]
      },
      {
        name: "Carlos Mario",
        avatar: "img/Captura de pantalla 2025-07-19 132311.png",
        messages: [
          { text: "¡Hola Carlos!", from: "sent" },
          { text: "Nos vemos el sábado", from: "received" }
        ]
      },
      {
        name: "Paul Melquisedec",
        avatar: "img/Captura de pantalla 2025-07-19 162251.png",
        messages: [
          { text: "Gracias por tu ayuda 🙏", from: "received" },
          { text: "¡Con gusto, Paul!", from: "sent" }
        ]
      }
    ];

    const chatList = document.getElementById("chatList");
    const chatBox = document.getElementById("chatBox");
    const chatName = document.getElementById("chatName");
    const chatAvatar = document.getElementById("chatAvatar");
    const messageInput = document.getElementById("messageInput");

    let currentChatIndex = 0;

    // Renderizar lista
    function renderChatList() {
      chatList.innerHTML = "";
      chats.forEach((chat, index) => {
        const div = document.createElement("div");
        div.className = "chat-item" + (index === 0 ? " active" : "");
        div.onclick = () => openChat(index);
        div.innerHTML = `
          <img src="${chat.avatar}" />
          <div class="chat-info">
            <div class="name">${chat.name}</div>
            <div class="last-message">${chat.messages[chat.messages.length - 1].text}</div>
          </div>
          <div class="chat-time">Ahora</div>
        `;
        chatList.appendChild(div);
      });
    }

    // Abrir chat
    function openChat(index) {
      currentChatIndex = index;
      document.querySelectorAll(".chat-item").forEach((el, i) => {
        el.classList.toggle("active", i === index);
      });

      chatName.textContent = chats[index].name;
      chatAvatar.src = chats[index].avatar;
      renderMessages();
    }

    function renderMessages() {
      chatBox.innerHTML = "";
      chats[currentChatIndex].messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = `message ${msg.from}`;
        div.textContent = msg.text;
        chatBox.appendChild(div);
      });
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
      const text = messageInput.value.trim();
      if (text) {
        chats[currentChatIndex].messages.push({ text, from: "sent" });
        messageInput.value = "";
        renderMessages();
      }
    }

    messageInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") sendMessage();
    });

    renderChatList();
    openChat(0);