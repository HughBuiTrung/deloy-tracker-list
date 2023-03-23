import React from "react";
import { Button, Form, Input, Space, Select, message } from "antd";

export default function ReactTrackerList() {
  const [input, setInput] = React.useState([]);
  // Form
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
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
  // Search
  function handleOnChange(event) {
    setInput(event.target.value);
    console.log("input: ", input);
  }
  return (
    <div>
      <div className="a">
        <Button className="logOut">Logout</Button>
      </div>
      <h2>ISSUE TRACKER</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
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
        <div className="b">
          <span className="filter">Filter:</span>{" "}
          <Button type="primary">All</Button>
          <Button className="open" type="primary">
            Open
          </Button>
          <Button className="close" type="primary">
            Close
          </Button>
        </div>{" "}
        <div className="b">
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
    </div>
  );
}
