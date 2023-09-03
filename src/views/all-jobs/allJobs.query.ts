export const getJobQuery = (page: number = 1, size: number = 10) => `
query {
  jobs (page:${page}, size: ${size}){
    title
    id
    description
    expiry
    created_at
    updated_at
  }
}
`;

export const getAllJobIdsQuery = () => `
query {
  getAllJobs{
    id
  }
}`;

export const deleteJobByIdQuery = (id: number) => `
mutation {
  deleteJob(
    id: ${id},
  ) {
    id
  }
}`;
