import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import authentication from '../helpers/authentication';

chai.should();
chai.use(chaiHttp);

// Test the route of repayments
let userToken;
let adminToken;
let aunthorizedToken;
before('Create a user who will apply for loan', (done) => {
  const users = {
    id: 1,
    email: 'ake0@gmail.com',
    firstname: 'kwizera',
    lastname: 'kivin',
    password: '5858949',
    address: 'kigali',
    status: 'verified',
    isadmin: 'false',
  };
  chai
    .request(app)
    .post('/api/v1/auth/signup')
    .send(users)
    .end((error, res) => {
      if (error) done(error);
      userToken = authentication.encodeToken(users);
      done();
    });
});
before('Create an admin', (done) => {
  const admin = {
    id: 1,
    email: 'mukire0@gmail.com',
    firstname: 'mukire',
    lastname: 'kivin',
    password: '5858949',
    address: 'kigali',
    status: 'unverified',
    isadmin: 'true',
  };
  chai
    .request(app)
    .post('/api/v1/auth/signup')
    .send(admin)
    .end((error, res) => {
      if (error) done(error);
      adminToken = authentication.encodeToken(admin);
      done();
    });
});

before('Create an unkown user', (done) => {
  const unknown = {
    id: 2,
    email: 'ak0@gmail.com',
    firstname: 'kwize',
    lastname: 'kiin',
    password: '558949',
    address: 'kigali',
    status: 'unverified',
    isadmin: 'false',


  };
  chai
    .request(app)
    .post('/api/v1/auth/signup')
    .send(unknown)
    .end((error, res) => {
      if (error) done(error);
      aunthorizedToken = authentication.encodeToken(unknown);
      done();
    });
});

describe('repayments routes test', () => {
  it('it should GET all repayments', (done) => {
    chai.request(app)
      .get('/api/v1/repayments')
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

 bug-fix-home-page-165998180

 

 gh-pages
  it('it should be able to record repayments history', (done) => {
    const repayments = {
      id: 1,
      createdOn: '2019-04-14T20:29:41Z',
      loanId: 1,
      amount: '5500',
      monthlyInstallment: 825,
      paidamount: '200',
      balance: 5575,

    };


    chai.request(app)
      .post('/api/v1/loans/1/repayments')
      .send(repayments)
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('paid amount must be required to record payments', (done) => {
    const repayments = {


    };

    chai.request(app)
      .post('/api/v1/loans/1/repayments')
      .send(repayments)
      .set({ token: adminToken })
      .end((error, res) => {
        res.should.have.property('status').eql(400);
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
  });


  it('it should not be able to record repayments history with wrong id', (done) => {
    const repayments = {
      id: 1,
      createdOn: '2019-04-14T20:29:41Z',
      loanId: 4,
      amount: '5500',
      monthlyInstallment: 825,
      paidamount: '200',
      balance: 5575,

    };
 bug-fix-home-page-165998180


 gh-pages
    chai.request(app)
      .post('/api/v1/loans/5666y/repayments')
      .send(repayments)
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("that loan doesn't exist");
        done();
      });
  });

  it('it should not be able to record repayments history with paidmount greater to balance', (done) => {
    const repayments = {
      paidamount: '10500',


    };


    chai.request(app)
      .post('/api/v1/loans/1/repayments')
      .send(repayments)
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('you payed much money than that you must pay on the balance !');
        done();
      });
  });
  
  it('it should be able to pay a fully loan', (done) => {
    const repayments = {
      id: 3,
      createdOn: '2019-04-14T20:29:41Z',
      loanId: 1,
      amount: '5500',
      monthlyInstallment: 825,
      paidamount: '5575',
      balance: 0,

    };


    chai.request(app)
      .post('/api/v1/loans/1/repayments')
      .send(repayments)
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('payment done successfully');
        done();
      });
  });

  it('it should GET all fully repaid loans', (done) => {
    
    chai.request(app)
      .get('/api/v1/loans/repaid')
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });
  
  it('it should GET a single repayments', (done) => {
    chai.request(app)
      .get('/api/v1/loans/1/repayments')
      .set({ token: userToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not GET a single repayments', (done) => {
    chai.request(app)
      .get('/api/v1/loans/11/repayments')
      .set({ token: userToken })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

});
