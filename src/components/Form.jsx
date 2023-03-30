import React, { useState } from "react";
import { Button, Form, Input, Space, Select, message } from "antd";

// context
import { useAppContext } from "../context/AppContext";

export default function FormComponent({ addTodo }) { 
  // hooks
  const { messageApi } = useAppContext();
  const [form] = Form.useForm();

  const onFinish = (value) => {
    const { description } = value;

    if (!description) {
      messageApi
        .open({
          type: "loading",
          // content: "Action in progress..",
          duration: 0.5,
        })
        .then(() => message.error("Please enter Todo Description", 2));
      return;
    }  

    messageApi
      .open({
        type: "loading",
        // content: "Action in progress..",
        duration: 0.5,
      })
    
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        completed: false,
        title: description,
        userId: Date.now(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(data => {
        form.resetFields();
        addTodo(data);
        messageApi
          .open({
            // type: "loading",
            // content: "Action in progress..",
            duration: 0.5,
          })
          .then(() => message.info("Add Successfully!", 5));
      })
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="form"
      >
        <Form.Item name="description" label="Todo Description ">
          <Input placeholder="Describe the issue" />
        </Form.Item>{" "}
        <Form.Item>
          <Space className="a">
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
