import NotificationBar from "@components/notification-bar/NotificationBar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { JobDataType } from "@views/all-jobs/AllJobs";
import { newJobQuery } from "@views/new-job/newJob.query";
import { updateJobByIdQuery } from "@views/update-job/updateJob.query";

import { isFuture } from "date-fns";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import sapi from "utils/api";
import { API_SERVER } from "utils/constants";

import styles from "./JobForm.module.scss";

interface JobFormDataType {
  title: string;
  description: string;
  expiry: string | Date;
}

export interface JobFormProps extends Partial<JobDataType> {}

const JobForm: React.FC<JobFormProps> = (props) => {
  const expiryParsed = props.expiry ? new Date(parseInt(props.expiry as string)) : "";

  const [localData, setLocalData] = useState<JobFormDataType>({
    title: props.title || "",
    description: props.description || "",
    expiry: expiryParsed,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    control,
  } = useForm({
    defaultValues: localData,
  });

  const [popup, setPopup] = useState<{ isOpen: boolean; content?: string; type?: "error" | "info" | "success" | "warning" }>({ isOpen: false, content: "" });

  const onSubmit = async (data: any) => {
    const { title, description, expiry } = data;
    const descriptionParsed = description.replace(/(?:\r\n|\r|\n)/g, "\\n");

    const query = props?.id ? updateJobByIdQuery(parseInt(props.id), title, descriptionParsed, expiry) : newJobQuery(title, descriptionParsed, expiry);

    try {
      const response = await sapi.post(`${API_SERVER}/graphql`, { query });

      if ((props.id && response.data.updateJob.updated_at) || response.data.createJob.created_at) {
        setPopup({ isOpen: true, content: "Save Job Successful", type: "success" });
        !props.id && reset({ title: "", description: "", expiry: "" });
        props.id && setLocalData({ ...localData, ...data });
      } else {
        setPopup({ isOpen: true, content: "Save Job Failed", type: "error" });
      }
    } catch (error) {
      setPopup({ isOpen: true, content: "Save Job Failed", type: "error" });
    }
  };

  useEffect(() => {
    reset(localData);
  }, [localData, reset]);

  return (
    <div className={styles["root"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <TextField
          error={!!errors.title?.message}
          label="Title"
          helperText={errors.title?.message}
          type="text"
          {...register("title", { required: "Please enter the Title." })}
          fullWidth
        />

        <TextField
          error={!!errors.description?.message}
          label="Description"
          helperText={errors.title?.message}
          type="text"
          {...register("description", { required: "Please enter the Description" })}
          fullWidth
          multiline
          rows={5}
        />

        <Controller
          control={control}
          name="expiry"
          rules={{
            validate: {
              min: (date) => (date && isFuture(new Date(date))) || "Please enter a future date",
            },
          }}
          render={({ field: { ref, onBlur, name, value, ...field }, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                {...field}
                inputFormat="dd/MM/yyyy hh:mm"
                inputRef={ref}
                label="Expiry"
                renderInput={(inputProps: any) => (
                  <TextField {...inputProps} onBlur={onBlur} name={name} error={!!fieldState.error} helperText={fieldState.error?.message} onKeyDown={(e) => e.preventDefault()} />
                )}
                minDate={new Date()}
                disablePast
                value={value}
              />
            </LocalizationProvider>
          )}
        />

        <Button variant="contained" color="primary" type="submit" disabled={!isDirty} className={styles["btn-submit"]} fullWidth>
          Submit
        </Button>
      </form>

      <NotificationBar content={popup.content} isOpen={popup.isOpen} type={popup.type} setPopup={setPopup} />
    </div>
  );
};

export default JobForm;
