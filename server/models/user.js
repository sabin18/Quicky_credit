
import passwordHash from 'password-hash';

// Define a class for creating a user
class user {
  constructor() {
    this.users = [];
  }


  userEmail(data) {
    const findemail = this.users.find(oneusers => oneusers.email === data);
    return findemail;
  }
  
  signupuser(info) {
    const insertuser = {
      id: this.users.length + 1,
      firstname: info.firstname,
      lastname: info.lastname,
      phone:info.phone,
      email: info.email,
      password:this.setPassword(info.password),
      address : info.address,
      status: 'unverified',
      isadmin: info.isadmin,
  

    };
    this.users.push(insertuser);
    return insertuser;
  }

  // define a function to hash the password.
  setPassword(password) {
    const hashedPassword = passwordHash.generate(password);
    // hash the password
    return (this.password = hashedPassword);
  }

 
 
  getuser(id) {
    const finduser = this.users.find(fetchusers => fetchusers.id == id);
    return finduser;
  }

}


export default new user();
