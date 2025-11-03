import express from 'express'
import { getTopRatedHostels } from '../Controller/Hostel.js'

const router = express.Router();
router.get('/topRated', getTopRatedHostels )

export default router;