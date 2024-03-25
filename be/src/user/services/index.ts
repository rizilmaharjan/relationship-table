import { getAllUsers, postUser, updateUser, deleteUser } from "../repository";

export const createUser = async (
  user: any
): Promise<{ status: number; message: string; data?: any }> => {
  try {
    const response = await postUser(user);
    return response;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const getUsers = async (): Promise<{
  status: number;
  message: string;
  users?: any;
}> => {
  try {
    const response = await getAllUsers();
    return response;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
export const userUpdate = async (
  user: any,
  id: string
): Promise<{
  status: number;
  message: string;
  users?: any;
}> => {
  try {
    const response = await updateUser(user, id);
    return response;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
export const userDelete = async (
  id: string
): Promise<{
  status: number;
  message: string;
  users?: any;
}> => {
  try {
    const response = await deleteUser(id);
    return response;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
