import axios, { AxiosInstance } from "axios";
import { getCookie } from "../utils/cookie";

const SERVER_ADDRESS = "http://localhost:8000/";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie("access_token")}`


const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});

customAxios.defaults.withCredentials = true;


customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // 인증되지 않은 요청일 경우 로그아웃 처리
      axios
        .get("http://localhost:8000/api/v1/auth/refresh")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("토큰 재요청 실패 ");
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export default customAxios;
