import joi from 'joi';


const userSchema = joi.object().keys({
  firstname: joi.string().alphanum().min(3).max(15)
    .required(),
  lastname: joi.string().alphanum().min(3).max(15)
    .required(),
  address: joi.string().alphanum().min(3).max(15)
    .required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  email: joi.string().email().required(),
  isadmin: joi.string().min(5).max(5).valid(['false', 'true'])
    .required()
    .trim(),

});


const verifySchema = joi.object().keys({
  status: joi.string().min(8).max(8).valid(['verified'])
    .required()
    .trim(),

});

const paidamountSchema = joi.object().keys({
  paidamount: joi.number().integer().min(1).required(),

});

const loanSchema = joi.object().keys({
  firstname: joi.string().alphanum().min(3).max(15)
    .required(),
  lastname: joi.string().alphanum().min(3).max(15)
    .required(),
  email: joi.string().email().required(),
  tenor: joi.number().integer().min(1).max(12)
    .required(),
  amount: joi.number().integer().min(1).required(),
});

const approveSchema = joi.object().keys({
  status: joi.string().min(7).max(7).valid(['approved'])
    .required()
    .trim(),
});


export default {
  userSchema, paidamountSchema, verifySchema, loanSchema, approveSchema,
};
