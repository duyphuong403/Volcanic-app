import { motion } from "framer-motion";
import React from "react";

import styles from "./Hamburger.module.scss";

export interface SideMenuDataType {}

export interface SideMenuProps {
  isShowSide?: boolean;
  setIsShowSide?: Function;
}

const Hamburger: React.FC<SideMenuProps> = (props) => {
  const { isShowSide, setIsShowSide } = props;

  return (
    <div className={styles["root"]}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        onClick={() => {
          setIsShowSide?.();
        }}
        className={styles["hambuger"]}
        animate={isShowSide ? "show" : "hide"}
      >
        <motion.g fill="none" stroke="black" strokeLinecap="square" strokeWidth="3">
          <motion.path
            d="M3,23L24,23"
            variants={{
              hide: { d: "M3,23L24,23", translateY: 0, transition: { duration: 0.3 } },
              show: { d: "M5.636 24.331L24.272 5.639", translateY: 0, transition: { duration: 0.3 } },
            }}
          />
          <motion.path
            d="M3 15H24"
            initial={{ opacity: 1 }}
            variants={{
              hide: { d: "M3 15H24", opacity: 1, transition: { duration: 0.3 } },
              show: { opacity: 0, transition: { duration: 0.3 } },
            }}
          />
          <motion.path
            d="M3,7L24,7"
            variants={{
              hide: { d: "M3,7L24,7", translateY: 0, transition: { duration: 0.3 } },
              show: { d: "M5.636 5.639l18.693 18.692", translateY: 0, transition: { duration: 0.3 } },
            }}
          />
          <path d="M0 0h30v30H0z" stroke="none" />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default Hamburger;
