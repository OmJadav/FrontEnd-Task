import axios from "axios";
import toast from "react-hot-toast";
import apiUrl from "./urlHelper";
export const postApi = async (url, data) => {
  try {
    const response = await axios.post(`${apiUrl}/${url}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  }
};
export const getApi = async (url) => {
  try {
    const response = await axios.get(`${apiUrl}/${url}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  }
};
export const deleteApi = async (url) => {
  try {
    const response = await axios.delete(`${apiUrl}/${url}`);
    console.log(response.data);
    // return response.data;
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  }
};
export const putApi = async (url, data) => {
  try {
    const response = await axios.put(`${apiUrl}/${url}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  }
};
