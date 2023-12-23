/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.less';

import { config, environment } from 'apps/admin/src/environments/environments';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { TodoList } from '..';

export const TodoForm: React.FC = () => {
  const [todoDetailsInfo, setTodoDetailsInfo] = useState<string[]>([]);
  const [todoValue, setTodoValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const pageSize = 5;

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
    if (todoValue === '') return alert('Please enter to do name');
    axios
      .post(`${environment?.port}/create`, { name: todoValue }, config)
      .then((response) => {
        setTodoValue('');
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="todo-container">
      <h1 className="page-text">To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          className="custom-input"
          placeholder="Add a new todo"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
        />
        <button
          className={`${
            todoValue ? 'custom-add-btn' : 'custom-add-btn-disabled'
          }`}
          disabled={todoValue ? false : true}
          onClick={addTodo}
        >
          ADD
        </button>
      </div>
      <hr />

      <TodoList
        todoDetailsInfo={todoDetailsInfo}
        page={page}
        setPage={setPage}
        fetchData={fetchData}
      />
    </div>
  );
};
