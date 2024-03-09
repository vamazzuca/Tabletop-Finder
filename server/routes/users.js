import express from 'express';

import { signin, signup, getUser, updateUser} from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/getuser', getUser);
router.put('/updateuser', updateUser);


export default router;