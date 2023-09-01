import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";

import { ReactComponent as Logo } from "@images/logo.svg";

import Hamburger from "./hamburger/Hamburger";

import styles from "./Header.module.scss";

export interface HeaderDataType {}

export interface HeaderProps {}

interface MenuDataType {
  name: string;
  href: string;
}

const Mock_Menu: MenuDataType[] = [
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Create new job",
    href: "/jobs/new",
  },
  {
    name: "Update a job",
    href: "/jobs/{id}/edit",
  },
];

const Header: React.FC<HeaderProps> = (props) => {
  const [isShowSide, setIsShowSide] = useState(false);

  return (
    <div className={styles["root"]}>
      <div className={styles["top-header"]}>
        <Link href={"/"} className={styles["logo"]}>
          <Logo />
        </Link>
        <Hamburger isShowSide={isShowSide} setIsShowSide={() => setIsShowSide(!isShowSide)} />
      </div>

      <div className={classNames(styles["side-menu"], { [styles["side-open"]]: isShowSide })}>
        {Mock_Menu.map((item, index) => (
          <Link href={item.href} key={index} className={classNames(styles["menu-item"], "text-h2")}>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;

interface MenuListProps {
  isShowSide?: boolean;
  setIsShowSide?: Function;
}
