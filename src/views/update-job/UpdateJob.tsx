import JobForm from "@components/job-form/JobForm";
import { JobDataType } from "@views/all-jobs/AllJobs";

import { GetStaticPropsContext } from "next";
import React from "react";

import sapi from "utils/api";
import { API_SERVER } from "utils/constants";

import { getJobByIdQuery } from "./updateJob.query";

interface JobDataTypeApiResponseType {
  data: {
    jobs: JobDataType[];
  };
}

export interface UpdateJobDataType {}

export interface UpdateJobProps extends JobDataType {}

const UpdateJob: React.FC<UpdateJobProps> = (props) => {
  return (
    <div>
      <div className="text-h2">Update Job</div>
      <JobForm {...props} />
    </div>
  );
};

export default UpdateJob;

export const getStaticJobProps = async (context: GetStaticPropsContext): Promise<Record<string, any> | null> => {
  const id = context?.params?.id;
  const response = await sapi.post<JobDataTypeApiResponseType | null>(`${API_SERVER}/graphql`, { query: getJobByIdQuery(parseInt(id as string)) });

  return {
    job: response?.data?.jobs || null,
  };
};
