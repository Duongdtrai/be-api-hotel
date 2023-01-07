import { Router } from 'express'
import RoomRouting from "./Room"
import UserRouting from "./User"
const router = Router();
router.use('/list-user', UserRouting)
router.use('/room', RoomRouting);
export default router;