import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get('http://localhost:5000/api/todos');
      const newTodos = response.data.map(todo => ({...todo, isNew: true}));
      setTodos(newTodos);
      // Remove isNew flag after animation
      setTimeout(() => {
        setTodos(todos => todos.map(todo => ({...todo, isNew: false})));
      }, 500);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      axios.delete(`http://localhost:5000/api/todos/${id}`)
        .then(() => {
          setTodos(todos.filter(todo => todo._id !== id));
          setDeletingId(null);
        })
        .catch((error) => {
          console.error('Error deleting todo:', error);
          setDeletingId(null);
        });
    }, 500); // Wait for animation to complete
  };

  const toggleComplete = (id, completed) => {
    setUpdatingId(id);
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed })
      .then((response) => {
        setTodos(todos.map(todo => 
          todo._id === id ? {...todo, completed: !completed} : todo
        ));
        setUpdatingId(null);
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
        setUpdatingId(null);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={fetchTodos}
          disabled={isRefreshing}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: isRefreshing ? 'not-allowed' : 'pointer' }}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      {todos.length === 0 ? (
        <p>No todos available. Add one!</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li 
              key={todo._id}
              className={`${todo.isNew ? 'added' : ''} ${deletingId === todo._id ? 'deleted' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo._id, todo.completed)}
                  disabled={updatingId === todo._id}
                />
                <span>{todo.text}</span>
              </div>
              <button 
                onClick={() => deleteTodo(todo._id)}
                disabled={deletingId === todo._id}
                style={{ marginLeft: '10px' }}
              >
                {deletingId === todo._id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
