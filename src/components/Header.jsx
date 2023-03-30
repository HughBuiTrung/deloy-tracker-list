import React from "react";
import { Button, Row, Col } from "antd";

export default function Header() {
  return (
    <div>
      <Row justify="end">
        <Col span={4}>
          <Button>Logout</Button>
        </Col>
      </Row>
      <h2>ISSUE TRACKER</h2>
    </div>
  );
}
