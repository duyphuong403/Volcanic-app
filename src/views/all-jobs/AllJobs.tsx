import JobCard from "@components/job-card/JobCard";
import NotificationBar from "@components/notification-bar/NotificationBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Pagination from "@mui/material/Pagination";

import classNames from "classnames";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AllIdResponseDataType, JobIdType } from "pages/jobs/[id]/edit";
import React, { useEffect, useState } from "react";

import sapi from "utils/api";
import { API_SERVER } from "utils/constants";

import { deleteJobByIdQuery, getAllJobIdsQuery, getJobQuery } from "./allJobs.query";

import styles from "./AllJobs.module.scss";

export interface JobDataTypeApiResponseType {
  data: { jobs: JobDataType[] };
}

export interface JobDataType {
  id: string;
  title: string;
  description: string;
  expiry: string;
  created_at: string;
  updated_at: string;
}

export interface AllJobProps {
  totalJobs: JobIdType[];
}

export interface PopupDeleteType {
  id?: number;
  isOpen: boolean;
}

const MAX_JOB = 10;

const AllJobs: React.FC<AllJobProps> = (props) => {
  const [page, setPage] = useState(1);
  const [openPop, setOpenPopup] = useState<PopupDeleteType>({ isOpen: false });
  const [notiPopup, setNotiPopup] = useState<{ isOpen: boolean; content?: string; type?: "error" | "info" | "success" | "warning" }>({ isOpen: false, content: "" });

  const [data, setData] = useState<JobDataType[]>();
  const router = useRouter();

  const totalRows = props.totalJobs?.length;
  const totalPages = Math.ceil(totalRows / MAX_JOB);

  const handlePaginationChange = (_: any, page: number) => {
    setPage(page);
  };

  const handleDeleteConfirm = () => {
    setOpenPopup({ isOpen: false });

    if (openPop.id) {
      deleteJob(openPop.id)
        .then((res) => {
          if (res.id) {
            setData(data?.filter((item) => item.id !== res.id));
            setNotiPopup({ isOpen: true, content: "Delete Job Successful", type: "success" });
          }
        })
        .catch((error) => {
          console.error(error);
          setNotiPopup({ isOpen: true, content: "Delete Job Failed", type: "error" });
        });
    }
  };

  useEffect(() => {
    router.query = {
      page: page.toString(),
      size: MAX_JOB.toString(),
    };

    router.push({
      pathname: router.pathname,
      query: {
        page: page.toString(),
        size: MAX_JOB.toString(),
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getJobWithPagination(page, MAX_JOB)
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error(error));
  }, [page]);

  return (
    <div className={styles["root"]}>
      {(data?.length || 0) > 0 ? (
        <>
          <div className="text-h2">All Jobs:</div>

          <div className={styles["job-cards"]}>{data?.map((item, index) => <JobCard key={index} {...item} setOpenPopup={setOpenPopup} />)}</div>

          {totalPages > 1 && (
            <div className={styles["pagination"]}>
              <Pagination count={totalPages} showFirstButton showLastButton size="large" onChange={handlePaginationChange} color="primary" />
            </div>
          )}

          <Dialog open={openPop.isOpen} onClose={() => setOpenPopup({ isOpen: false })} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Are you sure want to DELETE THIS JOB</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{`You can't undo after CLICK CONFIRM button`}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPopup({ isOpen: false })} autoFocus>
                CANCEL
              </Button>
              <Button onClick={() => handleDeleteConfirm()} color="error">
                CONFIRM
              </Button>
            </DialogActions>
          </Dialog>

          <NotificationBar content={notiPopup.content} isOpen={notiPopup.isOpen} type={notiPopup.type} setPopup={setNotiPopup} />
        </>
      ) : (
        <div className={classNames(styles["no-data"], "text-subtitle")}>
          There is no data here. <Link href="/jobs/new">Creat new job</Link>
        </div>
      )}
    </div>
  );
};

export default AllJobs;

export const getStaticAllJobsProps = async (context: GetStaticPropsContext): Promise<Record<string, any> | null> => {
  const resJobID = await sapi.post<AllIdResponseDataType | null>(`${API_SERVER}/graphql`, { query: getAllJobIdsQuery() });

  return {
    totalJobs: resJobID?.data?.getAllJobs,
  };
};

const getJobWithPagination = async (page: number, size: number) => {
  const response = await sapi.post<JobDataTypeApiResponseType | null>(`${API_SERVER}/graphql`, { query: getJobQuery(page, size) });
  return response?.data?.jobs;
};

const deleteJob = async (id: number) => {
  const response = await sapi.post(`${API_SERVER}/graphql`, { query: deleteJobByIdQuery(id) });
  return response?.data?.deleteJob;
};
