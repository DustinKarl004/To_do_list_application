import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter a task');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await axios.post('http://localhost:5000/api/todos', { text });
      setText('');
      setSuccess('Task added successfully! Click refresh to see the new task.');

    } catch (error) {
      console.error(error);
      setError('Failed to add task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          disabled={isLoading}
          autoFocus
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default TodoForm;
