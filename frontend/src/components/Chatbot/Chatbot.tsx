import React from 'react';

const Chatbot: React.FC = () => {
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h5>Chat with our AI Assistant</h5>
      </div>
      <div className="chatbot-body">
        {/* Chat messages will go here */}
      </div>
      <div className="chatbot-footer">
        <input type="text" className="form-control" placeholder="Type a message..." />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
