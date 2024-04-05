import express from 'express';


import { getPosts, createPost, getPost, joinEvent, getPostsByUser, getPostsBySearch, getPostsByMember, deletePost, leaveEvent } from '../controllers/posts.js'

const router = express.Router();

router.get('/search', getPostsBySearch)
router.post('/', getPosts)
router.get('/:id', getPost)
router.post('/create', createPost)
router.post('/join-event', joinEvent)
router.post('/user', getPostsByUser)
router.post('/member', getPostsByMember)
router.delete('/delete/:id', deletePost)
router.put('/leave-event', leaveEvent)

export default router;