import express from 'express'
import { getTopRatedHostels, fetchDifferentLocation, getAllHostel } from '../Controller/Hostel.js'

const router = express.Router();
router.get('/topRated', getTopRatedHostels )
router.get('/locationBasedHostels', fetchDifferentLocation )
router.get('/allHostels', getAllHostel)

export default router;