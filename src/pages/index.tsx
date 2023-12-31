// import { getStaticLayoutMainProps } from "@components/layout/main/LayoutMain";

import Homepage from "@views/homepage/Homepage";

import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { combineProps } from "utils/combineProps";

export default function IndexPage(data: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Homepage />;
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const data = await combineProps(
    context
    // getStaticLayoutMainProps
  );

  return {
    props: {
      ...data,
    },
    revalidate: 1 * 60,
  };
};
