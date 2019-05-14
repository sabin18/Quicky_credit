[![Build Status](https://travis-ci.org/sabin18/Quicky_credit.svg?branch=develop)](https://travis-ci.org/sabin18/Quicky_credit)  [![Maintainability](https://api.codeclimate.com/v1/badges/af40541d90819393286b/maintainability)](https://codeclimate.com/github/sabin18/Quicky_credit/maintainability) [![Coverage Status](https://coveralls.io/repos/github/sabin18/Quicky_credit/badge.svg)](https://coveralls.io/github/sabin18/Quicky_credit)

# Quicky_credit

Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners. 

- HOSTED UI link: https://sabin18.github.io/Quicky_credit/UI/
- HOSTED API link :https://quickcredit19.herokuapp.com/

 ## PROJECT DESCRIPTION

To get the project up and running on your local machine, please follow these instructions.

- Clon this project on your machine , by running this command on in your command line or Terminal:
 ```
 git clone https://github.com/sabin18/Quicky_credit.git
 
 ````
 - Install the required dependencies found in package.json by running this command:
 ```
 npm install
 ```
 
 - And then to start running  this project on your machine , run this command:
 ```
    npm start
 ```
 - then to run test, run this command:
 ````
 npm test
`````
 ## Required Features
 
 - User can sign up.
 - User can login.
 - User can create an account.
 - User can apply for a loan.
 - User can view repayment history.
 - admin can view loan applications.
 - admin can view loan repayment history.
 - Admin can view all users.
 - admin can view fully loan repayments .
 - admin can view not fully repaid loan.
 - Admin can mark user as verified.
 - Admin can  mark loan as approved.

## Optional Features

  - User can reset password.
  - Integrate real time email notification when a loan is approved or rejected.
    Technologies

## Frontend

 - HTML
 - CSS -Javascript

## Backend

 - NodeJs
 - Express JS
 - Mocha
 - Chai
 
## TABLE FOR END POINTS AND HOW YOU CAN TEST THEM

| HTTP MEHOD | ENDPOINTS                       | ACCESS                       | DESCRIPTION                           |
|------------|---------------------------------|------------------------------|---------------------------------------|
| POST       | /api/v1/auth/signup             | public                       | create an account                     |
| POST       | /api/v1/auth/signin             | public                       | login to the app                      |
| POST       | /api/v1/loans/                  | private(user)                | apply for the loan                    |
| GET        | /api/v1/loans/                  | private(admin only)          | get all loans                         |
| GET        | /api/v1/loans/id                | private(admin only)          | get specific loan                     |
| PATCH      | /api/v1/loans/id                | private(admin only)          | approve or reject loan                |
| POST       | /api/v1/loans/loanid/repayments | private(admin only)          | post loan repayments                  |
| GET        | /api/v1/repayments              | private(admin only)          | get all repayments history            |
| GET        | /api/v1/loans/loanid/repayments | private(user and admin only) | get a specific loan repayment history |
| GET        | /api/v1/users                   | private(admin only)          | get all users                         |
| GET        | /api/v1/users/id                | private(admin only)          | get a specific users                  |
| PATCH      | /api/v1/users/email/verify      | private(admin only)          | verify a user (as verified)           |
```
Warning: where there is loanid and id it is a number example :1,2
if you want to access the app as admin 
use this to login:

-Email:mugabe@gmail.com
-password:sha1$db1129e7$1$14d8764a1910de685c04cefc47bd265667780921
```
## OTHER TOOLS USED IN THIS PROJECT

- Linter
 #### ESLint - Linter Tool

## Style Guide
```
 Airbnb is used in this project : Airbnb maintains a very popular JavaScript Style Guide
````
- Compiler
```
  Babel - Compiler for Next Generation JavaScript(ES6).
```
-Pivotal Tracker  Link:https://www.pivotaltracker.com/n/projects/2330302
```
Project is currently being managed with Pivotal Tracker, a project management tool. You can find the stories on the Quick_credit Pivotal Tracker Board
```
   
- Author:
 ### izere Roger Sabin 

