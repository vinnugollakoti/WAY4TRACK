import React, { useState, useEffect } from 'react'
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa'
import './ChatWidget.css'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  
  // Simulate receiving a message after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        const systemMessage = {
          id: Date.now(),
          text: "Hello! Need any help with our tracking devices?",
          sender: 'system',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prevMessages => [...prevMessages, systemMessage])
        setShowNotification(true)
      }
    }, 20000)
    
    return () => clearTimeout(timer)
  }, [isOpen])
  
  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setShowNotification(false)
    }
  }
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (newMessage.trim() === '') return
    
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prevMessages => [...prevMessages, userMessage])
    setNewMessage('')
    
    // Simulate response after 1 second
    setTimeout(() => {
      const responses = [
        "Thank you for your message! Our team will get back to you shortly.",
        "I'd be happy to tell you more about our tracking devices. What specifically are you interested in?",
        "Great question! Our bike trackers have a battery life of up to 2 weeks on a single charge.",
        "Our tracking devices are compatible with both iOS and Android phones.",
        "We offer a 30-day money-back guarantee on all our products."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const systemResponse = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'system',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setMessages(prevMessages => [...prevMessages, systemResponse])
    }, 1000)
  }

  return (
    <>
      <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <div className="status-indicator"></div>
            Live Support
          </div>
          <button className="close-btn" onClick={toggleChat}>
            <FaTimes />
          </button>
        </div>
        
        <div className="chat-body">
          <div className="welcome-message">
            <h5>Welcome to TrackerTech Support</h5>
            <p>How can we help you today?</p>
          </div>
          
          {messages.map(message => (
            <div 
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'system-message'}`}
            >
              <div className="message-content">
                {message.text}
              </div>
              <div className="message-time">
                {message.time}
              </div>
            </div>
          ))}
        </div>
        
        <form className="chat-footer" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-btn">
            <FaPaperPlane />
          </button>
        </form>
      </div>
      
      <button 
        className={`chat-toggle ${showNotification ? 'notification' : ''}`}
        onClick={toggleChat}
      >
        <FaComments />
        {showNotification && <span className="notification-dot"></span>}
      </button>
    </>
  )
}

export default ChatWidget