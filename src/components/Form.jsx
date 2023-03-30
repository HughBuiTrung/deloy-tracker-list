import React, { useState } from "react";
import { Button, Form, Input, Space, Select, message } from "antd";
export default function FormComponent() {
  const [form] = Form.useForm();
  const [valueInput, setValueInput] = useState();
  console.log("valueInput: ", valueInput);
  const onFinish = (value) => {
    console.log("value Des: ", value.Des);
    if (value.Des === undefined || value.Des === "") {
      messageApi
        .open({
          type: "loading",
          // content: "Action in progress..",
          duration: 2.5,
        })
        .then(() => message.error("Please enter Todo Description", 2.5));
    } else {
      messageApi
        .open({
          type: "loading",
          // content: "Action in progress..",
          duration: 2.5,
        })
        .then(() => message.success("Add Todo finished", 2.5));
      Add(value);
    }
  };
  function Add(value) {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10&_page=1", {
      method: "POST",
      body: JSON.stringify({
        completed: false,
        id: 11,
        title: value.Des,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setValueInput(json));
  }
  // Messages
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="form"
      >
        <Form.Item name="Des" label="Todo Description ">
          <Input placeholder="Describe the issue" />
        </Form.Item>{" "}
        <Form.Item name="Sev" label="Status">
          <Select allowClear defaultValue="Incomplete">
            <Option value="incomplete">Incomplete</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space className="a">
            {contextHolder}
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
