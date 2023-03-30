import React, { useLayoutEffect, useState } from "react";
import { Button, Input, Card, Col, Row } from "antd";
// componens
import FormComponent from "../../components/Form";
import Header from "../../components/Header";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [render, setRender] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // initial todos
  React.useEffect(() => {
    console.log("useEffect");
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10&_page=1")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setRender(data);
      });
  }, []);

  // Search Input
  useLayoutEffect(() => {
    console.log("run Input Uselayout Effect");
    const cloneRender = [...render];
    const inputSearch = cloneRender.filter(
      (x) => x.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
    );
    setTodos(inputSearch);
  }, [input]);

  // =====
  useLayoutEffect(() => {
    console.log("effectlayout handle");
    const cloneRender = [...render];
    const completedTodos = cloneRender.filter(
      (x) => x.completed === isCompleted
    );
    setTodos(completedTodos);
  }, [isCompleted]);

  // Completed
  function handleCompleteTodo(todoId) {
    console.log("handleCompleteTodo====================");
    const cloneTodos = [...todos];
    const todoIndex = cloneTodos.findIndex((x) => x.id === todoId);
    console.log("todoIndex : ", todoIndex);
    const arr = cloneTodos.find((x) => x.id === todoId);
    arr.completed = true;
    cloneTodos.splice(todoIndex, 1, arr);
    setTodos(cloneTodos);
    console.log("render: ", render);
    console.log("todos: ", todos);
    // const cloneTodos = [...todos];
    // const arr = cloneTodos.find((x) => x.id === todoId);
    // arr.completed = true;
    // cloneTodos.splice(index, 1, arr);
    // setTodos(cloneTodos);
    // console.log("render: ", render);
    // console.log("todos: ", todos);
  }

  console.log("todo: ", todos);
  // Delete
  function handleDeleteTodo(todoId) {
    const cloneTodos = [...todos];
    const todoIndex = cloneTodos.findIndex((x) => x.id === todoId);
    cloneTodos.splice(todoIndex, 1);
    setTodos(cloneTodos);
    setRender(cloneTodos);
  }

  // Search
  function handleOnChange(event) {
    setInput(event.target.value);
  }

  // Button All
  function handleAll() {
    setTodos(render);
  }
  // Button Completed

  function handleCompleted() {
    setIsCompleted(true);
  }
  // Button incomplete

  function handleIncompleted() {
    setIsCompleted(false);
  }

  function addTodo(data) {
    setTodos((prevState) => [data, ...prevState]);
    setRender((prevState) => [data, ...prevState]);
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
        {todos.map((todo, index) => (
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
                  {/* {todo.completed == true ? (
                    <Button
                      type="text"
                      onClick={() => handleCompleteTodo(todo.id, index)}
                      disabled
                    >
                      Completed
                    </Button>
                  ) : (
                    <Button
                      type="text"
                      onClick={() => handleCompleteTodo(todo.id, index)}
                    >
                      Completed
                    </Button>
                  )} */}
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
