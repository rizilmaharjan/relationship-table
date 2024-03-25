import { Request, Response } from "express";
import { createUser, getUsers, userDelete, userUpdate } from "../services";

export const postUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { status, message, data } = await createUser(body);
    return res.status(status).json({ message, data });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { status, message, users } = await getUsers();
    return res.status(status).json({ users, message });
  } catch (error) {}
};
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("update id", id);
  try {
    const body = req.body;
    const { status, message } = await userUpdate(body, id);
    return res.status(status).json({ message });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { status, message } = await userDelete(id);
    return res.status(status).json({ message });
  } catch (error) {
    return res.status(400).json(error);
  }
};
