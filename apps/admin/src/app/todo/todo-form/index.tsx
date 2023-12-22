/* eslint-disable @typescript-eslint/no-explicit-any */
import { config, environment } from 'apps/admin/src/environments/environments';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { TodoList } from '..';

export const TodoForm: React.FC = () => {
  const [todoDetailsInfo, setTodoDetailsInfo] = useState<string[]>([]);
  const [todoValue, setTodoValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const pageSize = 10;

  useEffect(() => {
    const newSkip = (page - 1) * pageSize;
    setSkip(newSkip);
  }, [page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [skip]);

  const fetchData = async () => {
    try {
      await axios
        .post(`${environment?.port}/get-all-todo-list`, {
          take: pageSize,
          skip: skip,
        })
        .then((response: any) => {
          setTodoDetailsInfo(response?.data);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addTodo = async () => {
    if (todoValue.trim() === '') return;
    axios
      .post(`${environment?.port}/create`, { name: todoValue }, config)
      .then((response) => {
        setTodoValue('');
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // await axios
    //   .post(`${environment?.port}/create`, { name: todoValue })
    //   .then((data) => {
    //     setTodoValue('');
    //   });
  };

  const removeTodo = (index: number) => {
    const updatedTasks = [...todoDetailsInfo];
    updatedTasks.splice(index, 1);
    setTodoDetailsInfo(updatedTasks);
  };

  return (
    <>
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
          <button disabled={todoValue ? false : true} onClick={addTodo}>
            Add
          </button>
        </div>

        <ul className="task-list">
          {todoDetailsInfo?.map((todo: any, index) => (
            <li key={index}>
              {todo?.name}
              <button onClick={() => removeTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>

        {/* Pagination controls */}
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        >
          Previous Page
        </button>
        <span>Page {page}</span>
        <button
          disabled={todoDetailsInfo?.length < 10 ? true : false}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next Page
        </button>
      </div>

      <TodoList />
    </>
  );
};
