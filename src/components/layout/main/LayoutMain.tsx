import Header from "@components/header/Header";

// import { GetStaticPropsContext } from "next";
import React from "react";

// import { combineProps } from "utils/combineProps";
import styles from "./LayoutMain.module.scss";

export interface LayoutMainDataType {}

export interface LayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: React.FC<LayoutMainProps> = (props) => {
  return (
    <>
      <Header />
      <main className={styles["root"]}>{props.children}</main>
    </>
  );
};

export default LayoutMain;

// TODO: Will be using it when getting data from the CMS
// export const getStaticLayoutMainProps = async (context: GetStaticPropsContext): Promise<Record<string, any>> => {
//   const data = await combineProps(context);

//   return data;
// };
