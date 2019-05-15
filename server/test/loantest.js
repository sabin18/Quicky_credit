import chai from 'chai';
import chaiHttp from 'chai-http';
bug-fix-home-page-165998
import jwt from 'jwt-simple';
 gh-pages
import app from '../src/server';
import authentication from '../helpers/authentication';

chai.should();
chai.use(chaiHttp);

let userToken;
let adminToken;
let aunthorizedToken;
// Test the route of loans
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

describe('loans routes test', () => {
  it('it should GET all the loans', (done) => {
    chai.request(app)
      .get('/api/v1/loans')
     .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not GET all the loans without admin Token', (done) => {
    chai.request(app)
      .get('/api/v1/loans')
     .set({ token: userToken })
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Not authorized to this page admin only');
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should GET all the loans without Token', (done) => {
    chai.request(app)
      .get('/api/v1/loans')
     .set({ token: '' })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('admin Token needed to get access to this page');
        res.body.should.be.a('object');
        done();
      });
  });


  it('it should be able to send a loan application', (done) => {
    const loans = {
      id: 1,
      createdOn: '2019-04-14T12:16:56Z',
      firstname: 'muagbe',
      lastname: 'bertrand',
      email: 'ake0@gmail.com',
      status: 'pending',
      repaid: false,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,

    };


    chai.request(app)
      .post('/api/v1/loans')
      .send(loans)
      .set({ token: userToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('loan created successfully');
        res.body.should.be.a('object');

        done();
      });
  });
  it('it should be able to send second  loan application', (done) => {
    const loans = {
      id: 2,
      createdOn: '2019-04-14T12:16:56Z',
      firstname: 'muagbe',
      lastname: 'bertrand',
      email: 'ake120@gmail.com',
      status: 'pending',
      repaid: false,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,

    };

 bug-fix-home-page-165998180


 gh-pages
    chai.request(app)
      .post('/api/v1/loans')
      .send(loans)
     .set({ token: userToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('loan created successfully');
        res.body.should.be.a('object');

        done();
      });
  });

bug-fix-home-page-165998180

 gh-pages
   it('it should not be able to send a loan application without valid Token ', (done) => {
    const loans = {
      id: 5,
      createdOn: '2019-04-14T12:16:56Z',
      firstname: 'muagbe',
      lastname: 'bertrand',
      email: 'a0@gmail.com',
      status: 'pending',
      repaid: true,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,

    };

    chai.request(app)
      .post('/api/v1/loans')
      .send(loans)
      .set({  })
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Not authorized to this page Login first!');

        done();
      });
  });


  it('it should not be able to send a loan application without  Token ', (done) => {
    const loans = {
      id: 4,
      createdOn: '2019-04-14T12:16:56Z',
      firstname: 'muagbe',
      lastname: 'bertrand',
      email: 'ake0@gmail.com',
      status: 'pending',
      repaid: true,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,

    };

bug-fix-home-page-165998180

gh-pages
    chai.request(app)
      .post('/api/v1/loans')
      .send(loans)
      .set({ token: '' })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('Token needed to get access to this page');

        done();
      });
  });
  it('it should not be able to send a loan application with user who is not verified ', (done) => {
    const loans = {
      id: 5,
      createdOn: '2019-04-14T12:16:56Z',
      firstname: 'muagbe',
      lastname: 'bertrand',
      email: 'a0@gmail.com',
      status: 'pending',
      repaid: true,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,

    };

    chai.request(app)
      .post('/api/v1/loans')
      .send(loans)
     .set({ token:aunthorizedToken  })
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Not authorized to this page you must be verified before accessing to this page');

        done();
      });
  });
  
  it('it should not be able to send a loan application with exist email', (done) => {
    const loans = {
      id: 1,
      createdOn: '2019-04-14T12:16:56Z',
      firstname: 'muagbe',
      lastname: 'bertrand',
      email: 'ake0@gmail.com',
      status: 'pending',
      repaid: false,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,

    };


    chai.request(app)
      .post('/api/v1/loans')
      .send(loans)
     .set({ token: userToken })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('loan already exist');
        done();
      });
  });

  it('firstname must be required to send loan application', (done) => {
    const loans = {
      id: 1,
      createdOn: '2019-04-14T12:16:56Z',
      lastname: 'bertrand',
      email: 'ake0@gmail.com',
      status: 'pending',
      repaid: false,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,

    };


    chai.request(app)
      .post('/api/v1/loans')
      .send(loans)
      .set({ token: userToken })
      .end((error, res) => {
        res.should.have.property('status').eql(400);
        if (error) done(error);
        res.body.should.have.property('error');

        done();
      });
  });

  it('it should GET a single loan', (done) => {
    chai.request(app)
      .get('/api/v1/loans/1')
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not GET a single loan', (done) => {
    chai.request(app)
      .get('/api/v1/loans/11')
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should be able to verify a loan', (done) => {
    const loans = {
      id: 1,
      createdOn: '2019-04-14T12:16:56Z',
      firstname: 'muagbe',
      lastname: 'bertrand',
      email: 'ake0@gmail.com',
      status: 'approved',
      repaid: false,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,
    };
    chai.request(app)
      .patch('/api/v1/loans/1')
      .send(loans)
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should  not be able to verify a loan', (done) => {
    const loans = {
      id: 1,
      createdOn: '2019-04-14T12:16:56Z',
      firstname: 'muagbe',
      lastname: 'bertrand',
      email: 'ake0@gmail.com',
      status: 'approved',
      repaid: false,
      tenor: '7',
      amount: '5500',
      paymentInstallment: 825,
      balance: 5775,
      interest: 275,
    };
    chai.request(app)
      .patch('/api/v1/loans/12')
      .set({ token: adminToken })
      .send(loans)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('status must be {approved} to allow loan approvement', (done) => {
    const loans = {

      status: 'apdddhd',
    };
    chai.request(app)
      .patch('/api/v1/loans/12')
      .send(loans)
       .set({ token: adminToken })
      .end((error, res) => {
        res.should.have.property('status').eql(400);
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
  });
  
  it('it should GET all  fully notrepaid loans', (done) => {
    
    chai.request(app)
      .get('/api/v1/loans/notrepaid')
     .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should be able to Delete a loan', (done) => {
    chai.request(app)
      .delete('/api/v1/loans/2')
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not be able to Delete a loan', (done) => {
    chai.request(app)
      .delete('/api/v1/loans/21')
      .set({ token: adminToken })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
