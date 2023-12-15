import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://user-management-server-taupe.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

