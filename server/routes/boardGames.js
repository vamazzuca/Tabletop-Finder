import express from 'express';

import { searchBoardGame, getBoardGame } from '../controllers/boardgames.js';

const router = express.Router();
router.post("/search-boardgames", searchBoardGame)
router.post("/boardgame-data", getBoardGame)

export default router;
