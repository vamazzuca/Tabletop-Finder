import express from 'express';

import { searchBoardGame, getBoardGame, getHotGames } from '../controllers/boardgames.js';

const router = express.Router();
router.post("/search-boardgames", searchBoardGame)
router.post("/boardgame-data", getBoardGame)
router.get("/boardgame-hot", getHotGames)

export default router;
