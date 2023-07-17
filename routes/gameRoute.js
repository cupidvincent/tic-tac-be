import express from 'express'
 import {  
    registerGame,
    getGame,
    updateGame,
    endGame,
    getGameHistory
} from '../controllers/gameController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/endgame',protect,endGame)
router.get('/history',getGameHistory)
router
    .route('/')
    .post(registerGame)
    .get(protect, getGame)
    .put(protect, updateGame)

export default router