import { Button } from "antd";
import React from "react";

export default function ButtonList({
  handleAll,
  handleIncompleted,
  handleCompleted,
}) {
  return (
    <div>
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
  );
}
