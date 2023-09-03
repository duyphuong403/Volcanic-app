// import { getStaticLayoutMainProps } from "@components/layout/main/LayoutMain";

import NewJob from "@views/new-job/NewJob";

import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { combineProps } from "utils/combineProps";

export default function NewJobPage(data: InferGetStaticPropsType<typeof getStaticProps>) {
  return <NewJob />;
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
