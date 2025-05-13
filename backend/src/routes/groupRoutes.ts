import express from "express";
import {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../controllers/groupController";

const router = express.Router();

router.route("/").get(getAllGroups).post(createGroup);

router.route("/:id").get(getGroup).patch(updateGroup).delete(deleteGroup);

export default router;
