import React, { useEffect, useState } from "react";
import { Button, Input, Card, Col, Row, Pagination } from "antd";
// componens
import FormComponent from "../../components/Form";
import Header from "../../components/Header";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filteredTodo, setFilteredTodo] = useState([]);
  // const [isCompleted, setIsCompleted] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [postPerPage, setPostPerPage] = useState(10);
  const [todoRender, setTodoRender] = useState("");
  const [lengthTodos, setLengthTodos] = useState(filteredTodo.length);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setFilteredTodo(data);
      });
  }, []);

  // Set Page
  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 1000);
  }, []);

  // Search Input
  React.useEffect(() => {
    const cloneRender = [...filteredTodo];
    const inputSearch = cloneRender.filter(
      (x) => x.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
    );
    setTodos(inputSearch);
  }, [input]);
  // Pages
  useEffect(() => {
    test();
  }, [currentPage]);

  useEffect(() => {
    test();
  }, [todoRender]);

  function test() {
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = todos.slice(firstPostIndex, lastPostIndex);
    setTodos(currentPosts);
  }

  // Completed
  function handleCompleteTodo(todoId) {
    const cloneTodos = [...todos];
    const todoIndex = cloneTodos.findIndex((x) => x.id === todoId);
    cloneTodos[todoIndex].completed = true;
    setTodos(cloneTodos);
  }

  // Delete
  function handleDeleteTodo(todoId) {
    const cloneTodos = [...todos];
    const todoIndex = cloneTodos.findIndex((x) => x.id === todoId);
    cloneTodos.splice(todoIndex, 1);
    setTodos(cloneTodos);
    const clonefilteredTodo = [...filteredTodo];
    const todoIndexFilteredTodo = clonefilteredTodo.findIndex(
      (x) => x.id === todoId
    );
    clonefilteredTodo.splice(todoIndexFilteredTodo, 1);
    setFilteredTodo(clonefilteredTodo);
  }

  // Search
  function handleOnChange(event) {
    setInput(event.target.value);
  }

  // Button All
  function handleAll() {
    setCurrentPage(1);
    setTodoRender("all");
    setTodos(filteredTodo);
    setLengthTodos(filteredTodo.length);
  }

  // Button Completed
  function handleCompleted() {
    setCurrentPage(1);
    setTodoRender("completed");
    const isCompleted = true;
    const cloneRender = [...filteredTodo];
    const completedTodos = cloneRender.filter(
      (x) => x.completed === isCompleted
    );
    setTodos(completedTodos);
    setLengthTodos(completedTodos.length);
  }

  // Button incomplete
  function handleIncompleted() {
    setCurrentPage(1);
    setTodoRender("incompleted");
    const isCompleted = false;
    const cloneRender = [...filteredTodo];
    const completedTodos = cloneRender.filter(
      (x) => x.completed === isCompleted
    );
    setTodos(completedTodos);
    setLengthTodos(completedTodos.length);
  }
  function addTodo(data) {
    setTodos((prevState) => [data, ...prevState]);
    setFilteredTodo((prevState) => [data, ...prevState]);
  }

  function handleChangePage(current) {
    if (todoRender === "all" || todoRender === "") {
      setTodos(filteredTodo);
      setCurrentPage(current);
      console.log("testtttt: ", todoRender);
    }
    if (todoRender === "incompleted") {
      handleIncompleted();
      setCurrentPage(current);
    }
    if (todoRender === "completed") {
      handleCompleted();
      setCurrentPage(current);
    }
  }

  return (
    <div>
      <Header />
      <FormComponent addTodo={addTodo} />

      <hr />
      <div className="listButton">
        <div className="issue">
          <h3>List Issue</h3>
          <Input
            onChange={handleOnChange}
            value={input}
            style={{ width: 200 }}
            placeholder=" Search by description"
          />
        </div>
        <div className="filterBy">
          <span className="filter">Filter:</span>{" "}
          <Button type="primary" onClick={handleAll}>
            All
          </Button>
          <Button className="open" type="primary" onClick={handleIncompleted}>
            Incomplete
          </Button>
          <Button className="close" type="primary" onClick={handleCompleted}>
            Completed
          </Button>
        </div>{" "}
      </div>
      <Row>
        <Pagination
          current={currentPage}
          defaultCurrent={1}
          total={todoRender === "" ? filteredTodo.length : lengthTodos}
          onChange={handleChangePage}
        />

        {todos.map((todo) => (
          <Col key={todo.id} span={24} style={{ marginTop: 10 }}>
            <Card
              title={<>Id: {todo.id}</>}
              extra={
                <>
                  <Button
                    type="text"
                    onClick={
                      todo.completed ? null : () => handleCompleteTodo(todo.id)
                    }
                    disabled={todo.completed}
                  >
                    Completed
                  </Button>
                  <Button
                    type="text"
                    danger
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </>
              }
            >
              {todo.title}
              {todo.completed}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
