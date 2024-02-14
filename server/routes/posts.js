import express from 'express';


import { getPosts, createPost, getPost, joinEvent } from '../controllers/posts.js'

const router = express.Router();

router.post('/', getPosts)
router.get('/:id', getPost)
router.post('/create', createPost)
router.post('/join-event', joinEvent)

export default router;