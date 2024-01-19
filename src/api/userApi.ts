import { User } from "@auth0/auth0-react";
import { UserModel } from "../types/user";
import http from "./api";

/**
 * Sends a user object to the server.
 * @param user - The user object to send.
 * @returns A Promise that resolves to the server response.
 * @throws If an error occurs during the request.
 */
export const sendUser = async (user: UserModel | User) => {
  try {
    const res = await http.post(`/u/`, user);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    return await http.get(`/u/id/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await http.get(`/u/email/${email}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id: string, user: UserModel) => {
  try {
    return await http.put(`/u/id/${id}`, user);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await http.delete(`/u/id/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const UserApi = {
  sendUser,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
};
