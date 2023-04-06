import React from "react";
import { Pagination } from "antd";

export default function Pagi({
  currentPage,
  todoRender,
  filteredTodo,
  lengthTodos,
  handleChangePage,
}) {
  return (
    <div>
      {" "}
      <Pagination
        current={currentPage}
        defaultCurrent={1}
        total={todoRender === "" ? filteredTodo.length : lengthTodos}
        onChange={handleChangePage}
      />
    </div>
  );
}
