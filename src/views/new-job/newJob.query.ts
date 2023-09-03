export const newJobQuery = (title: string, description: string, expiry: string) => `
mutation {
  createJob(
    title: "${title}",
    description: "${description}",
    expiry:"${expiry}"
  ) {
    created_at
  }
}
`;
