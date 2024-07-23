import React from "react";

const Input = ({ placeholder, handleChange, value }) => {
  return (
    <div className="form-group input-icon-container">
      <i class="icon  icon-addimage">➤</i>
      <input
        onChange={handleChange}
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
