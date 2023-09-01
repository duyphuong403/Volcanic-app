import React from "react";

import styles from "./Homepage.module.scss";

export interface HomepageDataType {}

export interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = (props) => {
  return <div className={styles["root"]}>Component Homepage</div>;
};

export default Homepage;
