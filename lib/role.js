class Role {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
  
    // printInfo() {
    //   console.log(`The depa is ${this.name}!!`);
    //   console.log(`This employee has an id of ${this.id}`);
    //   console.log(`This employee's email address is: ${this.email}`)
    //   console.log(`Employer Role: ${this.role}`)
    // }


    getId() {
      return this.name
    }

    getName() {
      return this.id;
    }
    

  }
  module.exports = Role;
  
