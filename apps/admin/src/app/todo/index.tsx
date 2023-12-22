import { useState } from 'react';

export const TodoList: React.FC = () => {
  const [todoDetailsInfo, setTodoDetailsInfo] = useState<string[]>([]);
  const [todoValue, setTodoValue] = useState<string>('');

  const addTodo = () => {
    if (todoValue.trim() !== '') {
      setTodoDetailsInfo([...todoDetailsInfo, todoValue]);
      setTodoValue('');
    }
  };

  const removeTodo = (index: number) => {
    const updatedTasks = [...todoDetailsInfo];
    updatedTasks.splice(index, 1);
    setTodoDetailsInfo(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          className="custom-input"
          placeholder="Add a new todo"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="task-list">
        {todoDetailsInfo?.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
