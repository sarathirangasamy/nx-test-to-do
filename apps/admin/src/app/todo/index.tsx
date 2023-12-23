/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faArrowLeft,
  faArrowRight,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';

import { environment } from '../../environments/environments';

interface PropType {
  todoDetailsInfo: string[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchData: () => Promise<void>;
}

export const TodoList: React.FC<PropType> = ({
  todoDetailsInfo,
  page,
  setPage,
  fetchData,
}) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string>('');

  const removeTodo = (id: string) => {
    axios
      .get(`${environment?.port}/delete-todo/${id}`)
      .then(() => fetchData())
      .catch((error) => console.error('Error:', error));
  };

  const editTodo = (todo: any) => {
    setEditMode(todo.id);
    setEditedValue(todo.name);
  };

  const saveEditedTodo = (id: string) => {
    axios
      .post(`${environment?.port}/update-todo/${id}`, { name: editedValue })
      .then(() => fetchData())
      .catch((error) => console.error('Error:', error));
    setEditMode(null);
  };

  return (
    <>
      <div className="list-container">
        {todoDetailsInfo?.map((todo: any, index) => (
          <div className="to-do-item" key={index}>
            {editMode === todo.id ? (
              <>
                <input
                  type="text"
                  className="custom-input"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
                <button
                  className="custom-add-btn"
                  onClick={() => saveEditedTodo(todo.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {todo?.name.toUpperCase()}
                <FontAwesomeIcon
                  icon={faTrashCan}
                  color="red"
                  className="icon-align-right"
                  onClick={() => removeTodo(todo?.id)}
                />
                <FontAwesomeIcon
                  icon={faPencil}
                  color="#87CEEB"
                  className="icon-align-right"
                  onClick={() => editTodo(todo)}
                />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="input-container">
        <button
          className="pagination-btn"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Previous
        </button>
        <span className="page-text"> {page}</span>
        <button
          className={`${
            todoDetailsInfo?.length < 5
              ? 'pagination-btn-disabled'
              : 'pagination-btn'
          }`}
          disabled={todoDetailsInfo?.length < 5 ? true : false}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  );
};
