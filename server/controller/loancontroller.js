
import joi from 'joi';
import loans from '../models/loans';
import Schema from '../helpers/inputvalidation';
import model from '../models/loans';

class loansController {
// get loans function
  static getloans(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'List of all loans',
      loans,
    });
  }

  static getnotrepaid(req, res) {
    const checknotrepaid= model.findnotrepaid();
    if (checknotrepaid) {
      return res.status(200).json({
        status: 200,
        message: 'List of all loans that are not fully repaid',
        checknotrepaid,
      });
    }

    return res.status(404).json({
      status: 404,
      message: " can't find any loan that is not fully repaid",

    });
  }

  static getrepaid(req, res) {
    const checkrepaid = model.findrepaid();
    if (checkrepaid) {
      return res.status(200).json({
        status: 200,
        message: 'List of all loans that are  fully repaid',
        checkrepaid,
      });
    }

    return res.status(404).json({
      status: 404,
      message: " can't find any loan that is  fully repaid",

    });
  }

  // create loan function
  static createloans(req, res) {
    const id = parseInt(loans.length) + 1;
    const {
      firstname, lastname, email, tenor, amount,
    } = req.body;
    const { error, value } = joi.validate(
      {
        firstname,
        lastname,
        email,
        tenor,
        amount,
      },
      Schema.loanSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const checkloan = model.findEmail(email);
      if (checkloan) {
        return res.status(400).json({
          status: 400,
          message: 'loan already exist',
        });
      }

      const loanInfo = model.createLoan(req.body);
      return res.status(200).json({
        status: 200,
        message: 'loan created successfully',
       loanInfo,
      });
    }
  }

  // update function (patch)
  static verifyloan(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const { error, value } = joi.validate(
      {
        status,
      },
      Schema.approveSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const getloan = model.findOne(id);
      if (getloan) {
        (getloan.status = status);
        return res.status(201).json({
          status: 201,
          message: 'loan is approved succesfully',
          getloan,
        });
      }
      res.status(400).json({
        status: 400,
        error: "can't find that loan with that id",
      });
    }
  }


  // get loan by id function
  static getOneloan(req, res) {
    const { id } = req.params;
    const findloan = model.findOne(id);

    if (findloan) {
      return res.status(200).json({
        status: 400,
        message: 'one loan found',
        findloan,
      });
    }
    res.status(400).json({
      status: 400,
      error: 'no loan found with that id',
    });
  }

  static deleteloan(req, res) {
    const { id } = req.params;
    const findloan = model.findLoan(id);
    if (findloan > -1) {
      model.deleteLoan(id);
      res.status(200).json({
        status: 200,
        message: 'loan successfully deleted',
      });
    } else {
      res.status(400).json({
        status: 400,
        error: 'could not find that loan',
      });
    }
  }
}


export default loansController;
