import axios, { AxiosError } from "axios";

const _post = async <T = any>(url: string, data: any): Promise<T | null> => {
  return axios
    .post<T>(url, data)
    .then((response) => {
      const res = response.data;
      return res;
    })
    .catch((error: AxiosError) => {
      console.error(`Error! Server api POST ${url} : `, error.message);
      console.error(error.response?.data);
      return null;
    });
};

const sapi = {
  axios,
  post: _post,
};

export default sapi;
