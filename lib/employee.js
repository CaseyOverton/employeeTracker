class Employee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;

    }
  
    // printInfo() {
    //   console.log(`The depa is ${this.name}!!`);
    //   console.log(`This employee has an id of ${this.id}`);
    //   console.log(`This employee's email address is: ${this.email}`)
    //   console.log(`Employer Role: ${this.role}`)
    // }


// watch capitalized letter in function name ******

    getId() {
      return this.id
    }

    getFirst_name() {
      return this.first_name;
    }

    getLast_name() {
        return this.last_name;
      }

    getRole_id() {
        return this.role_id;
      }
    getManager_id() {
        return this.manager_id;
    }

  }
  module.exports = Employee;
  

  