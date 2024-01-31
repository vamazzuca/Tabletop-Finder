import express from 'express';

import { accessChat, fetchChats, createGroupChat, removeFromGroup, addToGroup } from '../controllers/chats.js';

const router = express.Router();
router.post("/access-chat", accessChat)
router.post("/fetch-chats", fetchChats)
router.post("/group-chat", createGroupChat)
router.put("/group-remove", removeFromGroup)
router.put("/group-add", addToGroup)

export default router;