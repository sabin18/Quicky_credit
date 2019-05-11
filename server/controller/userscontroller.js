 import passwordHash from 'password-hash';
import joi from 'joi';
import authentication from '../helpers/authentication';
import users from '../models/user';
import mymodel from '../models/user';
import Schema from '../helpers/inputvalidation';

class userController {
  static createUser(req, res) {
    const {
      email, firstname, lastname, password, address, isadmin,
    } = req.body;
    const { error, value } = joi.validate(
      {
        email,
        firstname,
        lastname,
        password,
        address,
        isadmin,
      },
      Schema.userSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      // generate the id and pass it to a user
      const id = parseInt(mymodel.users.length) + 1;
      const token = authentication.encodeToken({
        email,
        firstname,
        lastname,
        password,
        address,
        userId: id,
        status: 'unverified',
        isadmin,
      }); 
      const checkemail= mymodel.userEmail(email); 
      if (checkemail) {
        return res.status(400).json({
          message: 'email already exist please use another email!',
        });
      }
      mymodel.signupuser(req.body);

      res.status(201).send({
        message: 'user registered successfully',
        user: {
          token,
          id,
          firstname,
          lastname,
          email,
          isadmin,

        },

      });
    }
  }

  static getuser(req, res) {
    return res.json({
      status: 200,
      message: 'List of all users',
      user: users,
    });
  }

  // get user by id
  static getOneuser(req, res) {
    const { id } = req.params;
    const user = mymodel.getuser(id);
    if (user) {
      return res.status(200).json({
        message: 'one user found',
        user: user,
      });
    }
    res.status(400).json({
      error: 'no user found with that id',
    });
  }

  // Login data processing
  static login(req, res) {
    const { email, password } = req.body;
    const specificUser = mymodel.userEmail(email);
    if (!specificUser) {
      return res.status(400).json({

        message: 'No user with that email !',
      });
    } if (specificUser) {
      if (passwordHash.verify(password,specificUser.password)) {
        const {
          firstname, lastname, email, password, isadmin,
        } = specificUser;
        const user = {
          firstname,
          lastname,
          email,
          password,
          status: specificUser.status,
          isadmin: specificUser.isadmin,
          id: specificUser.id,
        };
        const token = authentication.encodeToken(user);
        res.status(200).send({
          message: 'Logged in successfully',
          token,
          id: specificUser.id,
          firstname,
          lastname,
          email,
          status: specificUser.status,
          isadmin,


        });
      } else {
        res.status(400).send({ error: 'incorrect Password !' });
      }
    }
  }

  // update function (patch)
  static verifyuser(req, res) {
    const { email } = req.params;
    const { status } = req.body;
    const { error, value } = joi.validate(
      {
        status,
      },
      Schema.verifySchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const getuser = mymodel.userEmail(email);
      if (getuser) {
        (getuser.status = status);
        return res.status(201).json({
          status: 201,
          message: 'user is verified succesfully',
          user: getuser,
        });
      }
      res.status(400).json({
        status: 400,
        error: "can't find user with that email",
      });
    }
  }
}


export default userController;
