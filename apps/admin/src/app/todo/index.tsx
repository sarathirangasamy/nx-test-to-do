/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropType {
  todoDetailsInfo: string[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoList: React.FC<PropType> = ({
  todoDetailsInfo,
  page,
  setPage,
}) => {
  return (
    <>
      <div className="list-container">
        {todoDetailsInfo?.map((todo: any, index) => (
          <div className="to-do-item">{todo?.name.toUpperCase()}</div>
        ))}
      </div>

      <div>
        <button
          className="pagination-btn"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        >
          Previous Page
        </button>
        <span className="page-text"> {page}</span>
        <button
          className="pagination-btn"
          disabled={todoDetailsInfo?.length < 5 ? true : false}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next Page
        </button>
      </div>
    </>
  );
};
