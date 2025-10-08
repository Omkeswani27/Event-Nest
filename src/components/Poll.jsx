import React, { useState, useEffect } from 'react';

// Poll Component
const Poll = () => {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '']);
  const [selectedChoice, setSelectedChoice] = useState(null);

  // Load saved polls from localStorage on component mount
  useEffect(() => {
    const savedPolls = JSON.parse(localStorage.getItem('polls')) || [];
    setPolls(savedPolls);
  }, []);

  // Save polls to localStorage whenever polls state changes
  useEffect(() => {
    localStorage.setItem('polls', JSON.stringify(polls));
  }, [polls]);

  // Function to add a new poll
  const handleAddPoll = () => {
    const newPoll = {
      question,
      choices: choices.map((choice) => ({ text: choice, votes: 0 })),
    };
    setPolls([...polls, newPoll]);
    setQuestion('');
    setChoices(['', '']);
  };

  // Function to handle voting
  const handleVote = (pollIndex, choiceIndex) => {
    const updatedPolls = polls.map((poll, i) => {
      if (i === pollIndex) {
        const updatedChoices = poll.choices.map((choice, j) => {
          if (j === choiceIndex) {
            return { ...choice, votes: choice.votes + 1 };
          }
          return choice;
        });
        return { ...poll, choices: updatedChoices };
      }
      return poll;
    });
    setPolls(updatedPolls);
    setSelectedChoice(null);
  };

  return (
    <div className='mt-5'style={{marginLeft: "450px"}}>
      <h2>Create a New Poll</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div>
        {choices.map((choice, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Choice ${index + 1}`}
            value={choice}
            onChange={(e) => {
              const newChoices = [...choices];
              newChoices[index] = e.target.value;
              setChoices(newChoices);
            }}
          />
        ))}
        <button className='btn btn-success' onClick={() => setChoices([...choices, ''])}>Add Choice</button>
      </div>
      <button className='btn btn-success' onClick={handleAddPoll}>Create Poll</button>

      <h2>Active Polls</h2>
      {polls.map((poll, pollIndex) => (
        <div key={pollIndex} style={{ marginBottom: '20px' }}>
          <h3>{poll.question}</h3>
          {poll.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <label>
                <input
                  type="radio"
                  name={`poll-${pollIndex}`}
                  onChange={() => setSelectedChoice(choiceIndex)}
                  checked={selectedChoice === choiceIndex}
                />
                {choice.text} ({choice.votes} votes)
              </label>
            </div>
          ))}
          <button
            className='btn btn-success'
            onClick={() => handleVote(pollIndex, selectedChoice)}
            disabled={selectedChoice === null}
          >
            Vote
          </button>
        </div>
      ))}
    </div>
  );
};

export default Poll;
