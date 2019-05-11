import moment from 'moment';
import loans from './loans';

// Define a class for creating loan
class Payment {
  constructor() {
    this.payments = [];
  }

  fetchOne(LoanId) {
    const foundLoan = loans.findOne(LoanId);
    return foundLoan;
  }

  // Fetch repayments by id
  findOnepayments(paymentId) {
    const foundPayment = this.payments.filter(payment => payment.loanId === parseInt(paymentId));
    return foundPayment;
  }

  createRepayments(data, loanid) {
    const payloan = this.fetchOne(parseInt(loanid));
    const insertpayment = {
      id: this.payments.length + 1,
      createdOn: moment.utc().format('DD-MM-YYYY HH:MM:SS'),
      loanId: payloan.id,
      amount: payloan.amount,
      monthlyinstallment: payloan.paymentInstallment,
      paidamount: data.paidamount,
      balance: parseFloat(payloan.balance) - parseFloat(data.paidamount),

    };
    this.payments.push(insertpayment);
    payloan.balance = parseFloat(payloan.balance) - parseFloat(data.paidamount);

    if(payloan.balance==0){
      payloan.repaid=true;
    }
    
    return insertpayment;
  }
}


export default new Payment();
