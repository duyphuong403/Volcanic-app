import JobForm from "@components/job-form/JobForm";

import React from "react";

export interface NewJobDataType {}

export interface NewJobProps {}

const NewJob: React.FC<NewJobProps> = (props) => {
  return (
    <div>
      <div className="text-h2">Create New Job</div>
      <JobForm />
    </div>
  );
};

export default NewJob;
