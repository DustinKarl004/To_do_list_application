import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshTodos = () => setRefresh(!refresh);

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoForm refreshTodos={refreshTodos} />
      <TodoList refresh={refresh} />
    </div>
  );
};

export default App;
