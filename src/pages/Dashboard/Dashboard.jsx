import React, { useLayoutEffect, useState } from "react";
import { Button, Input, Card, Col, Row } from "antd";
// componens
import FormComponent from "../../components/Form";
import Header from "../../components/Header";

export default function Dashboard() {
  const [input, setInput] = useState([]);
  const [todos, setTodos] = useState([]);
  const [render, setRender] = useState([]);
  const [complete, setComplete] = useState([]);

  // initial todos
  React.useEffect(() => {
    console.log("useEffect");
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10&_page=1")
      .then((response) => response.json())
      .then((data) => {
        return setTodos(data), setRender(data);
      });
  }, []);
  // Search Input
  useLayoutEffect(() => {
    console.log("run Input Uselayout Effect");
    const cloneRender = [...render];
    const inputSearch = cloneRender.filter((x) => x.title.includes(input));
    setTodos(inputSearch);
    console.log("todossssss", todos);
  }, [input]);
  // =====
  useLayoutEffect(() => {
    console.log("effectlayout handle");
    const cloneRender = [...render];
    const completedTodos = cloneRender.filter((x) => x.completed === complete);
    console.log("test:   ", cloneRender);
    setTodos(completedTodos);
    console.log("render: ", render);
    console.log("todos: ", todos);
  }, [complete]);
  // Completed
  function handleCompleteTodo(todoId, index) {
    const cloneTodos = [...todos];
    const arr = cloneTodos.find((x) => x.id === todoId);
    arr.completed = true;
    cloneTodos.splice(index, 1, arr);
    setTodos(cloneTodos);
    console.log("render: ", render);
    console.log("todos: ", todos);
  }
  // Delete
  function handleDeleteTodo(index) {
    console.log(index);
    const cloneTodos = [...todos];
    const deleTodo = cloneTodos[index];
    console.log("deletodo: ", deleTodo);
    cloneTodos.splice(index, 1);
    setTodos(cloneTodos);
    setRender(cloneTodos);
  }
  // Form
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // Search
  function handleOnChange(event) {
    setInput(event.target.value);
  }
  // Filter Button

  // Button All
  function handleAll() {
    console.log("AAAAA");
    setTodos(render);
  }
  // Button Completed

  function handleCompleted() {
    setComplete(true);
    console.log("comp: ", complete);
  }
  // Button incomplete

  function handleIncompleted() {
    setComplete(false);
    console.log("comp: ", complete);
  }
  return (
    <div>
      <Header />
      <FormComponent />
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
                  {todo.completed == true ? (
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
                  )}
                  <Button
                    type="text"
                    danger
                    onClick={() => handleDeleteTodo(index)}
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
