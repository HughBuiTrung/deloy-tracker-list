import React from "react";
import { Button, Input, Select, Card, Col, Row  } from "antd";

// componens
import FormComponent from '../../components/Form'

export default function Dashboard() {
  const [input, setInput] = React.useState([]);
  const [todos, setTodos] = React.useState([]);

  // initial todos
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10&_page=1')
      .then(response => response.json())
      .then(data => setTodos(data))
  }, [])

  console.log('todos: ', todos)

  // Form
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
 
  // Search
  function handleOnChange(event) {
    setInput(event.target.value);
    console.log("input: ", input);
  }

  function handleDeleteTodo(todoId) {
    console.log('handleDeleteTodo: ', todoId)
   
  }


  return (
    <div>
      <Row justify="end">
        <Col span={4}>
          <Button>Logout</Button>
        </Col>
      </Row>
      <h2>ISSUE TRACKER</h2>
     
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
          <Button type="primary">All</Button>
          <Button className="open" type="primary">
            Open
          </Button>
          <Button className="close" type="primary">
            Close
          </Button>
        </div>{" "}
        <div className="orderBy">
          <span className="filter">Order By:</span>{" "}
          <Select
            defaultValue="choose"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "choose",
                label: "Choose...",
              },
              {
                value: "asc",
                label: "ASC",
              },
              {
                value: "desc",
                label: "DESC",
              },
            ]}
          />
        </div>
      </div>

      <Row>
        {todos.map(todo => (
          <Col key={todo.id} span={24} style={{ marginTop: 10 }}>
            <Card 
              title={
                <>Id: {todo.id}</>
              }
              extra={
                <>
                  <Button type="text">Close</Button>
                  <Button 
                    type="text" danger 
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </>
              }
            >
              {todo.title}
            </Card>
          </Col>
        ))}
      </Row>
      
    </div>
  );
}
