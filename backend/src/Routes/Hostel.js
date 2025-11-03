import express from 'express'
import { getTopRatedHostels, fetchDifferentLocation } from '../Controller/Hostel.js'

const router = express.Router();
router.get('/topRated', getTopRatedHostels )
router.get('/locationBasedHostels', fetchDifferentLocation )

export default router;