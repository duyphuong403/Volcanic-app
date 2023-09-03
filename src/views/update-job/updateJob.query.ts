export const getJobByIdQuery = (id?: number) => `
query {
  jobs (id: ${id}){
    title
    id
    description
    expiry
    created_at
    updated_at
  }
}
`;

export const updateJobByIdQuery = (id: number, title: string, description: string, expiry: string) => `
mutation {
  updateJob(
    id: ${id},
    title: "${title}",
    description: "${description}",
    expiry:"${expiry}"
  ) {
    updated_at
  }
}
`;
