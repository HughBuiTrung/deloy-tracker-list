import React from "react";
import { Button, Form, Input, Space, Select, message } from "antd";

export default function FormComponent() {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log(value);
    if ((value = [undefined])) {
      messageApi.open({
        type: "loading",
        // content: "Action in progress..",
        duration: 2.5,
      });
      // .then(() => message.success("Loading finished", 2.5));
      // .then(() => message.info("Loading finished", 2.5));
    } else {
      messageApi
        .open({
          type: "loading",
          // content: "Action in progress..",
          duration: 2.5,
        })
        .then(() => message.error("Please enter Issue Description", 2.5));
      // .then(() => message.info("Please enter Issue Description", 2.5));
    }
  };
  // Messages
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="form"
    >
      <Form.Item name="Des" label="Description">
        <Input placeholder="Describe the issue" />
      </Form.Item>{" "}
      <Form.Item name="Sev" label="Severity">
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          defaultValue="low"
        >
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
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
  );
}
