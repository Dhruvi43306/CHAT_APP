# CHAT_APP
<h1 align="center">💬 Real-Time Chat App</h1>

<p align="center">
  <b>⚡ A simple and beginner-friendly real-time chat application</b><br/>
  Built using <b>Node.js, Express, Socket.IO, and React</b> 🚀
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Socket.IO-Realtime-black?style=for-the-badge&logo=socket.io" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
</p>

---

## ✨ Features

> 🚀 Experience real-time communication with modern web technologies

* ⚡ Real-time messaging using Socket.IO
* 👥 Multiple users support (open multiple tabs)
* 📨 Instant message broadcast
* 🕒 Timestamp for each message
* 📜 Load previous messages (in-memory storage)
* 🎨 Simple and clean UI

---

## 🧠 Concepts Covered

> 📚 Learn core real-time communication concepts

* ✔ Difference between `emit()` and `on()`
* ✔ Client ↔ Server communication
* ✔ `io.emit()` vs `socket.emit()` vs `broadcast.emit()`
* ✔ Persistent connection (WebSocket)
* ✔ Real-time data flow
* ✔ Basic message storage

---

## 🏗️ Tech Stack

<div align="center">

| 🎨 Frontend      | ⚙️ Backend |
| ---------------- | ---------- |
| React JS         | Node.js    |
| Socket.IO Client | Express.js |
|                  | Socket.IO  |

</div>

---

## 📂 Project Structure

```id="nrz9ce"
chat-app/
│
├── backend/
│   └── server.js
│
├── frontend/
│   └── App.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔽 Clone the repository

```id="kbbqxs"
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### ⚙️ Backend Setup

```id="m7g2s4"
cd backend
npm install
node server.js
```

📍 Server runs on: **http://localhost:3000**

---

### 🎨 Frontend Setup

```id="i62m1f"
cd frontend
npm install
npm run dev
```

📍 App runs on: **http://localhost:5173**

---

## ▶️ How to Use

> 🧪 Test real-time communication easily

1. Open the frontend URL in **multiple browser tabs**
2. Type a message in one tab
3. Watch it appear instantly in all tabs ⚡

---

## 🔄 How It Works

### 📤 Sending Message

```id="78whiz"
socket.emit("sendMessage", message)
```

### 📥 Receiving Message

```id="ijzhyh"
io.emit("receiveMessage", msgData)
```

### 📜 Load Old Messages

```id="3tx3ra"
socket.emit("oldMessages", messages)
```

---

## 🔑 Key Socket.IO Events

<div align="center">

| Event Name     | Direction       | Purpose                |
| -------------- | --------------- | ---------------------- |
| sendMessage    | Client → Server | Send message           |
| receiveMessage | Server → Client | Receive new message    |
| oldMessages    | Server → Client | Load previous messages |

</div>

---

## ⚠️ Limitations

> ⚠️ Current constraints of the project

* Messages are stored in **memory only**
* Data is lost when server restarts
* No authentication or user system
* No private chat (only global chat)

---

## 🚀 Future Improvements

> 🔥 Planned upgrades

* ✅ Add MongoDB for permanent storage
* ✅ Implement private chat using rooms
* ✅ Add usernames instead of socket IDs
* ✅ Show online/offline users
* ✅ Typing indicator

---

## 📸 Demo Idea

> 💡 Try this:

👉 Open multiple tabs and test real-time chat

---

## 🤝 Contributing

> ❤️ Contributions are welcome!

* Fork the repository
* Create your feature branch
* Submit a pull request

---

## 📄 License

This project is open-source and available under the **MIT License**

---

## 👨‍💻 Author

Dhruvi Savaliya
---

<h3 align="center">🌟 If you like this project, give it a star on GitHub!</h3>
