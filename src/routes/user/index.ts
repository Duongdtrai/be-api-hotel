import { Router } from 'express'
import UserRouter from "./User"
import RoomRouter from './Room'
import RentRoomRouter from './RentRoom'
const router = Router();

router.use('/user', UserRouter);
router.use('/room', RoomRouter);
router.use('/rent-room', RentRoomRouter);
export default router;