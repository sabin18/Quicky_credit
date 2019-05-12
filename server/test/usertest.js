import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import authentication from '../helpers/authentication';

chai.should();
chai.use(chaiHttp);

let userToken;
let adminToken;
let aunthorizedToken;
// Test the route of user
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
// Create a user
describe('user routes test', () => {
  it('it should allow signup of the user', (done) => {
    const users = {
      id: 1,
      email: 'ben0@gmail.com',
      firstname: 'kwizera',
      lastname: 'kivin',
      password: '5858949',
      address: 'kigali',
      status: 'unverified',
      isadmin: 'false',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(users)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('user registered successfully');
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not allow signup of the user with existing email', (done) => {
    const users = {
      id: 1,
      email: 'ben0@gmail.com',
      firstname: 'kwizera',
      lastname: 'kivin',
      password: '5858949',
      address: 'kigali',
      status: 'unverified',
      isadmin: 'false',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(users)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('email already exist please use another email!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not allow signup of the user with feck  email', (done) => {
    const users = {
      id: 1,
      email: 'ben0gmail.com',
      firstname: 'kwizera',
      lastname: 'kivin',
      password: '5858949',
      address: 'kigali',
      status: 'unverified',
      isadmin: false,
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(users)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  describe('It should be able to get all users', () => {
    it('It should return the list of all user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
        .set({ token: adminToken })
        .end((error, res) => {
          if (error) done(error);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('It should return a particular user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/1')
        .set({ token: adminToken })
        .end((error, res) => {
          if (error) done(error);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('It should not get  a particular user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/145')
        .set({ token: adminToken })
        .end((error, res) => {
          if (error) done(error);
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });

    describe('Test a user logged in successfully', () => {
      before('Create a user in a database', (done) => {
        const users = {
          id: 1,
          email: 'ake120@gmail.com',
          firstname: 'kwizera',
          lastname: 'kivin',
          password: '5858949',
          address: 'kigali',
          status: 'unverified',
          isadmin: 'false',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(users)
          .end((error, res) => {
            if (error) done(error);
            res.body.should.have.property('message').eql('user registered successfully');
            res.body.should.be.a('object');
            done();
          });
      });

      it('It should test a successful log in', (done) => {
        const user = {
          email: 'ake120@gmail.com',
          password: '5858949',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Logged in successfully');
            res.body.should.have.property('token');
            done();
          });
      });
      it('It should test a not matching password', (done) => {
        const users = {
          email: 'ake120@gmail.com',
          password: 'adafdafdafeae',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(users)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('incorrect Password !');
            done();
          });
      });
      it('It should test a non existing record', (done) => {
        const users = {
          email: 'iruwaraivos@gmail.com',
          password: 'adafdafdafeae',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(users)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('No user with that email !');
            done();
          });
      });
      it('it should be able to verify a user', (done) => {
        const users = {
          id: 1,
          email: 'ake120@gmail.com',
          firstname: 'kwizera',
          lastname: 'kivin',
          password: '5858949',
          address: 'kigali',
          status: 'verified',
          isadmin: false,
        };
        chai.request(app)
          .patch('/api/v1/users/ake0@gmail.com/verify')
          .send(users)
          .set({ token: adminToken })
          .end((err, res) => {
            res.should.have.property('status').eql(201);
            res.body.should.have.property('message').eql('user is verified succesfully');
            res.body.should.be.a('object');
            done();
          });
      });

      it('it should be able to verify a user with status {verified}', (done) => {
        const users = {

          status: 'ok',

        };
        chai.request(app)
          .patch('/api/v1/users/ake0@gmail.com/verify')
          .send(users)
          .set({ token: adminToken })
          .end((error, res) => {
            if (error) done(error);
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            done();
          });
      });

      it('it should  not be able to verify a user', (done) => {
        const users = {
          id: 1,
          email: 'ake120@gmail.com',
          firstname: 'kwizera',
          lastname: 'kivin',
          password: '5858949',
          address: 'kigali',
          status: 'verified',
          isadmin: false,
        };

        chai.request(app)
          .patch('/api/v1/users/ayui0@gmail.com/verify')
          .send(users)
          .set({ token: adminToken })
          .end((err, res) => {
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error').eql("can't find user with that email");
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });
});
