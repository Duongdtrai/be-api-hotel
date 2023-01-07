import { Router } from 'express'
import UserRouting from "./user"
import AdminRouting from './admin'
import AccountRouting from './Account'
const router = Router();

router.use('/u', UserRouting);
router.use('/a', AdminRouting);
router.use('/session', AccountRouting)
export default router;