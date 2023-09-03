// import { getStaticLayoutMainProps } from "@components/layout/main/LayoutMain";

import { getAllJobIdsQuery } from "@views/all-jobs/allJobs.query";
import UpdateJob, { getStaticJobProps } from "@views/update-job/UpdateJob";

import { GetStaticPathsContext, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import sapi from "utils/api";
import { combineProps } from "utils/combineProps";
import { API_SERVER } from "utils/constants";

export default function UpdateJobPage(data: InferGetStaticPropsType<typeof getStaticProps>) {
  return <UpdateJob {...data.job[0]} />;
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const data = await combineProps(
    context,
    // getStaticLayoutMainProps,
    getStaticJobProps
  );

  return {
    props: {
      ...data,
    },
    revalidate: 1 * 60,
  };
};

export const getStaticPaths = async (context: GetStaticPathsContext) => {
  let paths: any[] = [];
  const res = await getAllId();

  const path = res?.data.getAllJobs?.map((job: JobIdType) => {
    return {
      params: { id: job.id.toString() },
    };
  });

  paths = [...paths, ...(path || [])];

  return {
    paths,
    fallback: false,
  };
};

export interface AllIdResponseDataType {
  data: {
    getAllJobs: JobIdType[];
  };
}

export interface JobIdType {
  id: number;
}

const getAllId = async () => {
  return await sapi.post<AllIdResponseDataType>(`${API_SERVER}/graphql`, { query: getAllJobIdsQuery() });
};
