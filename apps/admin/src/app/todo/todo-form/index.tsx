/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TodoList } from '..';
import { config, environment } from 'apps/admin/src/environments/environments';
import './style.less';

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
  };

  // const removeTodo = (index: number) => {
  //   const updatedTasks = [...todoDetailsInfo];
  //   updatedTasks.splice(index, 1);
  //   setTodoDetailsInfo(updatedTasks);
  // };

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
          className="custom-add-btn"
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
      />
    </div>
  );
};
