import express from 'express';

import { searchBoardGame } from '../controllers/boardgames.js';

const router = express.Router();
router.post("/search-boardgames", searchBoardGame)

export default router;
