import { Input } from "antd";
import React from "react";

export default function InputSearch({ handleOnChange, input }) {
  return (
    <div>
      <div className="issue">
        <h3>List Issue</h3>
        <Input
          onChange={handleOnChange}
          value={input}
          style={{ width: 200 }}
          placeholder=" Search by description"
        />
      </div>
    </div>
  );
}
