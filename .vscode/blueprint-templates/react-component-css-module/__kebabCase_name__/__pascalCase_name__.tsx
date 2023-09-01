import React from "react";

import styles from "./{{pascalCase name}}.module.scss";

export interface {{pascalCase name}}DataType {
  
}

export interface {{pascalCase name}}Props {
  
}

const {{pascalCase name}} : React.FC<{{pascalCase name}}Props> = (props) => {
  return (
    <div className={styles["root"]}>
      Component {{pascalCase name}}
    </div>
  );
}

export default {{pascalCase name}};