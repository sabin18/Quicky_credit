
import joi from 'joi';
import repayments from '../models/repayments';
import Schema from '../helpers/inputvalidation';
import model from '../models/loans';
import model1 from '../models/repayments';

class repaymentsController {

  static getrepayments(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'List of all repayments',
      repayments,
    });
  }
  
  // create repayments function

  static createrepayments(req, res) {
    const { loanid } = req.params;
    const { paidamount } = req.body;
    const { error, value } = joi.validate(
      {
        paidamount,
      },
      Schema.paidamountSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const getloan = model.findOne(loanid);
      if (getloan) {
        if (parseFloat(getloan.balance) < paidamount) {
          return res.status(400).json({
            status: 400,
            message: 'you payed much money than that you must pay on the balance !',
          });
        }
        if (getloan.status != 'approved') {
          return res.status(400).json({
            status: 400,
            message: 'this loan is not approved !',
          });
        }

        const Repayment = model1.createRepayments(req.body, loanid);
        return res.status(200).json({
          status: 200,
          message: 'payment done successfully',
          Repayment,
        });
      }
      return res.status(400).json({
        status: 400,
        message: "that loan doesn't exist",
      });
    }
  }
  
  // get payment by id
  static getOnepayment(req, res) {
    const { id } = req.params;
    const getpayment = model1.findOnepayments(id);
    if (getpayment.length>=1) {
       return res.status(200).json({
        status:200, 
        message: 'payment found',
        getpayment,
      });
    }
    else{
    res.status(400).json({
      status: 400,
      error: 'no payment found with that loan id',
    });
  }
}

}


export default repaymentsController;
