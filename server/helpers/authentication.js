import jwt from 'jwt-simple';
import moment from 'moment';


const encodeToken = (user) => {
  const payload = {
    expiration: moment()
      .add(2, 'hour')
      .unix(),
    iat: moment().unix(),
    sub: user,
  };
  const token = jwt.encode(payload, 'mysecret');
  return token;
};

const decodeToken = (token) => {
  const decoded = jwt.decode(token, 'mysecret');
  return decoded;
};
// Access token required for a user
const UseraccessRequired = (req, res, next) => {
  const { token } = req.headers;
  if (token != '') {
    if (token == undefined || token == null) {
      res.status(403).send({
        status: 403,
        error: 'Not authorized to this page Login first!',
      });
    } else {
      const now = moment().unix();
      const decodedToken = decodeToken(token);
      if (now > decodedToken.expiration) {
        res.status(400).send({ error: 'Token expired' });
      } else {
        req.body.userId = decodedToken.sub.userId;
        req.body.isadmin = decodedToken.sub.isadmin;
        if (decodedToken.sub.status == 'verified') {
          next();
        } else {
          res.status(403).send({
            status: 403,
            error: 'Not authorized to this page you must be verified before accessing to this page',
          });
        }
      }
    }
  } else {
    res.status(400).send({
      staus: 400,
      error: 'Token needed to get access to this page',
    });
  }
};

const adminAccessRequired = (req, res, next) => {
  const token = req.headers.token;
  if (token != '') {
    if (token != undefined) {
      const now = moment().unix();
      const decodedToken = decodeToken(token);
      if (now > decodedToken.expiration) {
        res.status(400).send({ error: 'Token expired' });
      } else {
        req.body.userId = decodedToken.sub.userId;
        req.body.isadmin = decodedToken.sub.isadmin;
        if (decodedToken.sub.isadmin == 'true') {
          next();
        } else {
          res.status(403).send({
            status: 403,
            error: 'Not authorized to this page admin only',
          });
        }
      }
    }
  } else {
    res.status(400).send({ error: 'admin Token needed to get access to this page' });
  }
};
export default { UseraccessRequired, encodeToken, adminAccessRequired };
