import { UserModel } from "../types/user";
import http from "./api";


/**
 * Sends a user object to the server.
 * @param user - The user object to send.
 * @returns A Promise that resolves to the server response.
 * @throws If an error occurs during the request.
 */
export const sendUser = async (user: UserModel) => {
  try {
    const res = await http.post(`/`, user);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    return await http.get(`/id/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await http.get(`/email/${email}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id: string, user: UserModel) => {
  try {
    return await http.put(`/id/${id}`, user);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await http.delete(`/id/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
