import React from "react";

const Button = ({ handleClick, name }) => {
  return (
    <button onClick={() => handleClick()} class="button type1">
      <span class="btn-txt">{name}</span>
    </button>
  );
};

export default Button;
