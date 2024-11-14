import React from "react";
import styles from "../../styles/button.module.css"

const Button = ({ handleClick, name }) => {
  return (
    <button onClick={() => handleClick()} className={styles.button}>
      <span className={styles.text}>{name}</span>
    </button>
  );
};

export default Button;
