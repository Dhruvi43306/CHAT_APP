import React, { useState, useEffect, useMemo, useRef } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [myId, setMyId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);

  useEffect(() => {
    socket.on("connect", () => setMyId(socket.id));
    socket.on("oldMessages", (msgs) => setChat(msgs));
    socket.on("receiveMessage", (data) => setChat((prev) => [...prev, data]));

    return () => {
      socket.off("connect");
      socket.off("oldMessages");
      socket.off("receiveMessage");
    };
  }, [socket]);

  const sendMessage = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.chatCard}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.avatar}>
            <div style={styles.onlineBadge} />
            <span style={{ fontSize: "20px" }}>💬</span>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={styles.headerTitle}>Public Lounge</h3>
            <p style={styles.headerStatus}>Connected as: {myId.slice(0, 6)}</p>
          </div>
        </div>

        {/* Message Display Area */}
        <div style={styles.chatBody} ref={scrollRef}>
          {chat.length === 0 && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>☁️</div>
              <p>The air is clear! Be the first to speak.</p>
            </div>
          )}
          
          {chat.map((msg, index) => {
            const isMe = msg.senderId === myId;
            return (
              <div key={index} style={{ ...styles.msgRow, justifyContent: isMe ? "flex-end" : "flex-start" }}>
                <div style={{ 
                  ...styles.bubble, 
                  backgroundColor: isMe ? "#E3F2FD" : "#F5F5F5",
                  border: isMe ? "1px solid #BBDEFB" : "1px solid #E0E0E0",
                  borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px"
                }}>
                  {!isMe && <span style={styles.senderLabel}>User_{msg.senderId.slice(0,4)}</span>}
                  <div style={styles.msgText}>{msg.text}</div>
                  <div style={styles.timestamp}>{msg.time || "Just now"}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} style={styles.footer}>
          <input
            type="text"
            style={styles.input}
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" style={styles.sendBtn}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#F0F4F8", // Soft cool gray-blue
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  chatCard: {
    width: "450px",
    height: "85vh",
    backgroundColor: "#FFFFFF",
    borderRadius: "28px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  header: {
    padding: "20px 25px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #F0F0F0",
    background: "linear-gradient(to right, #ffffff, #fafafa)",
  },
  avatar: {
    width: "45px",
    height: "45px",
    backgroundColor: "#F0F7FF",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  onlineBadge: {
    width: "12px",
    height: "12px",
    backgroundColor: "#4CAF50",
    borderRadius: "50%",
    position: "absolute",
    bottom: "-2px",
    right: "-2px",
    border: "2px solid white",
  },
  headerTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
    color: "#333",
  },
  headerStatus: {
    margin: 0,
    fontSize: "12px",
    color: "#999",
  },
  chatBody: {
    flex: 1,
    padding: "20px 25px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#FFFFFF",
  },
  msgRow: {
    display: "flex",
    width: "100%",
  },
  bubble: {
    padding: "10px 16px",
    maxWidth: "75%",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  },
  senderLabel: {
    display: "block",
    fontSize: "10px",
    fontWeight: "700",
    color: "#90A4AE",
    marginBottom: "4px",
    textTransform: "uppercase",
  },
  msgText: {
    fontSize: "14px",
    color: "#444",
    lineHeight: "1.5",
  },
  timestamp: {
    fontSize: "9px",
    color: "#BDBDBD",
    textAlign: "right",
    marginTop: "4px",
  },
  footer: {
    padding: "20px 25px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    gap: "12px",
    borderTop: "1px solid #F0F0F0",
  },
  input: {
    flex: 1,
    padding: "14px 20px",
    borderRadius: "16px",
    border: "1px solid #E0E6ED",
    backgroundColor: "#F9FBFC",
    outline: "none",
    fontSize: "14px",
    color: "#333",
    transition: "all 0.2s ease",
  },
  sendBtn: {
    width: "48px",
    height: "48px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
    transition: "transform 0.2s ease",
  },
  emptyState: {
    textAlign: "center",
    color: "#B0BEC5",
    marginTop: "50%",
    fontSize: "14px",
  }
};

export default App;