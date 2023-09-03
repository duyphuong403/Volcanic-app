import Button from "@mui/material/Button";
import { JobDataType, PopupDeleteType } from "@views/all-jobs/AllJobs";

import classNames from "classnames";
import React from "react";

import { formatDate } from "utils/functions";

import styles from "./JobCard.module.scss";

export interface JobCardDataType {}

export interface JobCardProps extends JobDataType {
  setOpenPopup?: (isOpen: PopupDeleteType) => void;
}

const JobCard: React.FC<JobCardProps> = (props) => {
  const { id, title, description, expiry, created_at, updated_at, setOpenPopup } = props;

  const isExpired = new Date(parseInt(expiry)) < new Date();

  return (
    <div className={styles["root"]}>
      <div>
        <div className={classNames(styles["title"], "text-h3", { [styles["title-expired"]]: isExpired })}>
          {title}
          {isExpired && <span className={classNames(styles["expired"], "text-subtitle")}>Expired</span>}
        </div>

        <div className={classNames(styles["job-info"], "text-subtitle")}>
          <div>Description:</div>
          <div dangerouslySetInnerHTML={{ __html: description || "" }}></div>
          <div>Expiry:</div>
          <div>{formatDate(expiry)}</div>
          <div>Created At:</div>
          <div>{formatDate(created_at)}</div>
          <div>Updated At:</div>
          <div>{formatDate(updated_at) || "--"}</div>
        </div>
      </div>

      <div className={styles["cta-btn"]}>
        <Button variant="contained" color="info" href={`jobs/${id}/edit`}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={() => setOpenPopup?.({ isOpen: true, id: parseInt(id) })}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
