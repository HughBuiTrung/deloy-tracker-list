import React, { useState } from "react";
import { Button, Input, Card, Col, Row } from "antd";
// componens
import FormComponent from "../../components/Form";
import Header from "../../components/Header";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filteredTodo, setFilteredTodo] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // initial todos
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10&_page=1")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setFilteredTodo(data);
      });
  }, []);

  // Search Input
  React.useEffect(() => {
    const cloneRender = [...filteredTodo];
    const inputSearch = cloneRender.filter(
      (x) => x.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
    );
    setTodos(inputSearch);
  }, [input]);

  // =====
  React.useEffect(() => {
    const cloneRender = [...filteredTodo];
    const completedTodos = cloneRender.filter(
      (x) => x.completed === isCompleted
    );
    setTodos(completedTodos);
  }, [isCompleted]);

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
    setFilteredTodo(cloneTodos);
  }

  // Search
  function handleOnChange(event) {
    setInput(event.target.value);
  }

  // Button All
  function handleAll() {
    setTodos(filteredTodo);
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
    setFilteredTodo((prevState) => [data, ...prevState]);
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
