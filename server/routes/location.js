import express from 'express';

import { searchLocation } from '../controllers/location.js';

const router = express.Router();
router.post("/search-location", searchLocation)

export default router;