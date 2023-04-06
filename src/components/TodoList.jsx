import { Button, Card, Col, Row } from "antd";
import React from "react";

export default function TodoList({
  todos,
  handleCompleteTodo,
  handleDeleteTodo,
}) {
  console.log(todos);
  return (
    <div>
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
