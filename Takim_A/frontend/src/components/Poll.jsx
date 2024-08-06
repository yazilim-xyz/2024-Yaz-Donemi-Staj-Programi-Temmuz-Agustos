import React, { useState } from 'react';

const Poll = ({ poll, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = () => {
    if (selectedOption !== null) {
      onVote(selectedOption);
    }
  };

  return (
    <div className="poll bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-md">
      <h3 className="text-lg font-semibold mb-2">{poll.question}</h3>
      <div>
        {poll.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input 
              type="radio" 
              name="poll-option" 
              value={index} 
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              className="mr-2"
            />
            <label>{option} ({poll.votes[index]} votes)</label>
          </div>
        ))}
      </div>
      <button 
        onClick={handleVote}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Vote
      </button>
    </div>
  );
};

export default Poll;
