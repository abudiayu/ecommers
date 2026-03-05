import React, { useState, useRef, useEffect } from 'react';
import classes from './chatbot.module.css';
import { IoMdClose, IoMdSend } from 'react-icons/io';
import { BsChatDots } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 Welcome to TinaMart. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'Track my order',
    'Return policy',
    'Payment methods',
    'Shipping info',
    'Contact support'
  ];

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
      return 'You can track your order by going to "Orders" section in your account. Need your order number?';
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return 'We offer 30-day returns on most items. Visit our Returns & Orders page or contact us at +251 901 013 902 for assistance.';
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return 'We accept credit cards, debit cards, and mobile payments. All transactions are secure and encrypted.';
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return 'We offer free shipping on orders over 500 ETB. Standard delivery takes 3-5 business days within Ethiopia.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return 'You can reach us at:\n📧 abudiayuu@gmail.com\n📞 +251 901 013 902\n💬 Telegram: @AbudyTy';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! How can I assist you with your shopping today? 😊';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    } else {
      return 'I\'m here to help! You can ask me about orders, returns, shipping, payments, or contact our support team.';
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Blur input on mobile after sending
    if (inputRef.current) {
      inputRef.current.blur();
    }

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(inputValue),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    // Auto-focus input after quick reply on desktop
    if (window.innerWidth > 768 && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    // Focus input after opening on desktop
    setTimeout(() => {
      if (window.innerWidth > 768 && inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button 
          className={classes.chatButton} 
          onClick={handleOpen}
          aria-label="Open chat"
        >
          <BsChatDots size={28} />
          <span className={classes.badge}>1</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={classes.chatWindow}>
          {/* Header */}
          <div className={classes.chatHeader}>
            <div className={classes.headerContent}>
              <FaRobot size={24} />
              <div>
                <h3>TinaMart Support</h3>
                <span className={classes.status}>
                  <span className={classes.statusDot}></span> Online
                </span>
              </div>
            </div>
            <button 
              className={classes.closeButton} 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className={classes.chatMessages}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${classes.message} ${classes[message.type]}`}
              >
                {message.type === 'bot' && (
                  <div className={classes.botAvatar}>
                    <FaRobot size={16} />
                  </div>
                )}
                <div className={classes.messageContent}>
                  <p>{message.text}</p>
                  <span className={classes.messageTime}>{message.time}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className={`${classes.message} ${classes.bot}`}>
                <div className={classes.botAvatar}>
                  <FaRobot size={16} />
                </div>
                <div className={classes.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className={classes.quickReplies}>
            {quickReplies.map((reply, index) => (
              <button 
                key={index} 
                className={classes.quickReply}
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={classes.chatInput}>
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className={classes.sendButton} 
              onClick={handleSend}
              aria-label="Send message"
              disabled={inputValue.trim() === ''}
            >
              <IoMdSend size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
