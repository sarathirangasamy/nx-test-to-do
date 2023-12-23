/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../environments/environments';
import axios from 'axios';
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
  const removeTodo = (id: string) => {
    axios
      .get(`${environment?.port}/delete-todo/${id}`)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className="list-container">
        {todoDetailsInfo?.map((todo: any, index) => (
          <div className="to-do-item" key={index}>
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
              onClick={() => removeTodo(todo?.id)}
            />
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
          className="pagination-btn"
          disabled={todoDetailsInfo?.length < 5 ? true : false}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  );
};
