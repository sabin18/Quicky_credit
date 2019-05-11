import moment from 'moment';

// Define a class for creating loan
class Loan {
  constructor() {
    this.loans = [];
  }
  
  // Fetch Email
  findEmail(email) {
    const foundloanemail = this.loans.find(oneloans => oneloans.email === email);
    return foundloanemail;
  }

  // Fetch Loan by id
  findOne(LoanId) {
    const foundLoan = this.loans.find(loan => loan.id === parseInt(LoanId));
    return foundLoan;
  }

  //fecth a loan to delete
  
  findLoan(Loanid) {
    const Loan = this.loans.findIndex(loan => loan.id === parseInt(Loanid));
    return Loan;
    
  }

  deleteLoan(id) {
    const findloan = this.findOne(id);
    const indexof = this.loans.indexOf(findloan);
    const deletedloan = this.loans.splice(indexof, 1);
    return deletedloan;
  }


  //fecth not fully repaid loans
  findnotrepaid(){
  const notrepaidloan=this.loans.find(oneloans =>( oneloans.status =='approved' && oneloans.repaid ==false));
  return notrepaidloan;
  }

  //fecth  fully repaid loans
  findrepaid(){
    const repaidloan=this.loans.find(oneloans =>( oneloans.status =='approved' && oneloans.repaid ==true));
    return repaidloan;
    }

  createLoan(data) {
    const insertloan = {
      id: this.loans.length + 1,
      createdOn: moment.utc().format('DD-MM-YYYY HH:MM:SS'),
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      status: 'pending',
      repaid: false,
      tenor: data.tenor,
      amount: data.amount,
      paymentInstallment: (parseFloat(data.amount) + parseFloat(data.amount * 5 / 100)) / parseFloat(data.tenor),
      balance: parseFloat((parseFloat(data.amount) + parseFloat(data.amount * 5 / 100)) / parseFloat(data.tenor) * data.tenor),
      interest: data.amount * 5 / 100,

    };
    this.loans.push(insertloan);
    return insertloan;
  }
}


export default new Loan();
