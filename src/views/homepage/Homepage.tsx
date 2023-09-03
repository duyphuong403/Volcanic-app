import { useRouter } from "next/router";
import React, { useEffect } from "react";

export interface HomepageDataType {}

export interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = (props) => {
  const { push } = useRouter();

  useEffect(() => {
    push("/jobs");
  }, [push]);

  return null;
};

export default Homepage;
