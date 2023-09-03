// import { getStaticLayoutMainProps } from "@components/layout/main/LayoutMain";

import AllJobs, { getStaticAllJobsProps } from "@views/all-jobs/AllJobs";

import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { combineProps } from "utils/combineProps";

export default function NewJobPage(data: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AllJobs {...data.totalJobs} />;
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const data = await combineProps(
    context,
    // getStaticLayoutMainProps,
    getStaticAllJobsProps
  );

  return {
    props: {
      ...data,
    },
    revalidate: 1 * 60,
  };
};
