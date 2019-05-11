import express from 'express';
import loansController from '../controller/loancontroller';
import repaymentsController from '../controller/repaymentcontroller';
import userController from '../controller/userscontroller';
import authentication from '../helpers/authentication';

const router = express.Router();
// get routers

router.get('/api/v1/users',authentication.adminAccessRequired,userController.getuser);
router.get('/api/v1/loans',authentication.adminAccessRequired,loansController.getloans);
router.get('/api/v1/repayments', authentication.adminAccessRequired,repaymentsController.getrepayments);
router.get('/api/v1/loans/notrepaid',authentication.adminAccessRequired,loansController.getnotrepaid);
router.get('/api/v1/loans/repaid',authentication.adminAccessRequired,loansController.getrepaid);


// post routers
router.post('/api/v1/loans',authentication.UseraccessRequired, loansController.createloans);
router.post('/api/v1/loans/:loanid/repayments',authentication.adminAccessRequired, repaymentsController.createrepayments);
router.post('/api/v1/auth/signup', userController.createUser);
router.post('/api/v1/auth/signin', userController.login);


// get by id  routers
router.get('/api/v1/users/:id',authentication.adminAccessRequired,userController.getOneuser);
router.get('/api/v1/loans/:id',authentication.adminAccessRequired,loansController.getOneloan);
router.get('/api/v1/loans/:id/repayments',authentication.UseraccessRequired,repaymentsController.getOnepayment);

// patch router
router.patch('/api/v1/loans/:id/',authentication.adminAccessRequired,loansController.verifyloan);
router.patch('/api/v1/users/:email/verify',authentication.adminAccessRequired, userController.verifyuser);


// delete routers
router.delete('/api/v1/loans/:id',authentication.adminAccessRequired,loansController.deleteloan);


export default router;
