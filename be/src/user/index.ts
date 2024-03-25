import { Router } from "express";
import { deleteUser, getUser, postUser, updateUser } from "./controller";

const router = Router();

const routes = () => {
  router.post("/v1/user", postUser);
  router.get("/v1/users", getUser);
  router.put("/v1/user/:id", updateUser);
  router.delete("/v1/user/:id", deleteUser);
  return router;
};

export default routes;
