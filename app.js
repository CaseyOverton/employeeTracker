var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require('console.table');

//connecting the db 
const { connect } = require("tls");
// const Department = require("./lib/department");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "tombrady",
	database: "employee_trackerDB"
});
connection.connect(function (err) {
	if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    beginAdd();
});

const completeTable = [];



function initialCommand() {
inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
          'View All Departments',
          "View All Employee Positions",
          'View All Employees',
          'Add a Department',
          'Add an Employee Position',
          'Add an Employee',
          'View Employees By Department',
          'View Employees by Manager',
          'Search an Employee Position',
          'Update Employee Positions',
          'Exit'
      ],
  })
  .then((answer) => {
      switch (answer.action) {
          case 'View All Departments':
              departmentInfo();
              break;
          case 'View All Employee Positions':
              allEmployeePositions();
              break;
          case 'View All Employees':
              allEmployees();
              break;
          case 'Add a Department':
              addDepartment();
              break;
          case 'Add an Employee Position':
              addEmployeePosition();
              break;
          case 'Add an Employee':
              addEmployee();
              break;
          case 'View Employees by Department':
              employeeByDepartment();
              break;
          case 'View Employees by Manager':
                  employeeByManager();
                  break;
          case 'Search an Employee Position':
              searchEmployeePosition();
              break;
          case 'Update Employee Positions':
              updateEmployee();
              break;
          case 'Exit':
              console.log("Have a good day!")
              connection.end();
              break;
      }
  });
};



function allDepartments() {
  connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.table(res);
      initialCommand();
  });
};

function allEmployeePositions() {
  connection.query("SELECT * FROM position", function(err, res) {
      if (err) throw err;
      console.table(res);
      initialCommand();
  });
};

function allEmployees() {
  connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.table(res);
      initialCommand();
  });
};

function addDepartment() {
  inquirer.prompt({
      name: 'department',
      type: 'input',
      message: 'Enter the name of the new department:',
      validate: async function confirmStringInput(input) {
          if (input.trim() != "" && input.trim().length <= 25) {
              return true;
          }
          return "Invalid department name. Please limit name to 25 characters or fewer.";
      },
  }).then((answer) => { 
      const query = `INSERT INTO department (name) VALUES (?)`
      connection.query(query, [answer.department], (err, res) => {
          if (err) throw err;
          console.log("New department was successfully created!")
          initialCommand();
      });
    });
  };
  function addEmployeePosition() {
    connection.query('SELECT * FROM department', function (err, res) {
        const departmentList = res.map(function (dept) {
            return {
                name: dept.name,
                value: dept.id
            };
        });
        inquirer.prompt([
            {
                name: 'position',
                type: 'input',
                message: 'Enter the title of the new position'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary of new position'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Choose the department of the new position',
                choices: departmentList
            },
            {
                name: 'id',
                type: 'input',
                message: 'Enter the 2-digit positionID that most accurately reflects the department and status of the created position (13-19 for new engineering positions, 22-29 for new sales positions, 32-39 for new finance positions, 42-49 for new legal positions)'
            }
        ]).then((answer) => { 
        connection.query(
            'INSERT INTO position SET ?',
        {
            id: answer.id,
            title: answer.position,
            salary: answer.salary,
            department_id: answer.department,
        },
        function (err, res) {
            if (err) throw err;
            initialCommand();
        }
      );
    });
  });
  };
  
  function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter first name of new employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter last name of new employee'
        },
        {
            type: 'list',
            name: 'posID',
            message: 'Choose position_id of new employee',
            choices: 
               [{value: 10, name: 'Lead Engineer', short: '10-Lead Engineer'}, 
                {value: 11, name: 'Software Engineer', short: '11-Software Engineer'},
                {value: 20, name: 'Manager', short: '20-Manager'}, 
                {value: 21, name: 'Sales', short: '21-Sales'},
                {value: 30, name: 'SQL Dev', short: '30-SQL Dev'}, 
                {value: 31, name: 'React Dev', short: '31-React Dev'}
        },
        {
            type: 'list',
            name: 'manID',
            message: 'Choose manager_id of new employee',
            choices: [
            {value: 1, name: 'Jaime', short: '1-Jaime'}, 
            {value: 2, name: 'Ned', short: '2-Ned'},
            {value: 3, name: 'Jon', short: '3-Jon'}, 
            {value: 4, name: 'Rob', short: '4-Rob'}]
        }
    ]).then((answers) => {
        connection.query(
            'INSERT INTO employee SET ?', 
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            position_id: answers.posID,
            manager_id: answers.manID
        },
        function (err, res) {
            if (err) throw err;
            initialCommand();
        }
        );
    })
  };
  
  function employeeBydepartment() {
    inquirer.prompt({
        name: 'department',
        type: 'list',
        message: 'Which department would you like to search?',
        choices: ['Engineering', 'Sales', 'SQL', 'React']
    }).then((answers) => {
        switch (answers.department) {
            case 'Engineering':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE position_id BETWEEN 10 AND 19', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    initialCommand();
                });
            case 'Sales':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE position_id BETWEEN 20 AND 29', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    initialCommand();
                });
            case 'SQL':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE position_id BETWEEN 30 AND 39', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    initialCommand();
                });
            case 'React':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE position_id BETWEEN 40 AND 49', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    initialCommand();
                });
        }
    })
  };
  
  function employeeByManager() {
    inquirer.prompt({
        name: 'manager',
        type: 'list',
        message: 'Which department manager would you like to search',
        choices: ['Jaime', 'Ned', 'Jon', 'Rob']
    }).then((answers) => {
        switch (answers.manager) {
            case 'Jaime':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title, position.salary FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE employee.manager_id = 1', (err, res) => {
                    console.table(res);
                    initialCommand();
                });
            case 'Ned':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title, position.salary FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE employee.manager_id = 2', (err, res) => {
                    console.table(res);
                    initialCommand();
                });
            case 'Jon':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title, position.salary FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE employee.manager_id = 3', (err, res) => {
                    console.table(res);
                    initialCommand();
                });
            case 'Rob':
                return connection.query('SELECT employee.first_name, employee.last_name, position.title, position.salary FROM employee LEFT JOIN position ON employee.position_id = position.id WHERE employee.manager_id = 4', (err, res) => {
                    console.table(res);
                    initialCommand();
                });
        }
    })
  };

  



  function searchEmployeePosition() {
    inquirer.prompt({
        name: 'position',
        type: 'list',
        message: 'Which Employee Position Would you like to search?',
        choices: ['Software Engineer', 'Manager', 'Sales', 'SQL Dev', 'React Dev']
    }).then((answer) => { 
    const query = 'SELECT * FROM position WHERE ?';
    connection.query(query, {title: answer.position}, (err, res) => {
        if (err) throw err;
        res.map((r) => 
        console.log("\n", "\n", `id: ${r.id} || title: ${r.title} || salary: ${r.salary} || department_id: ${r.department_id}`, "\n", "\n")
        );
        initialCommand();
    });
  });
  };
  
  function updateEmployee() {
    const updatedEmployee = {
        id: 0,
        positionID: 0, 
    };
    const query = `SELECT id, concat(employee.first_name, " ", employee.last_name) AS employee_full_name FROM employee ;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        let employeeList = [];
        let employeesNames = [];
        for (let i=0;i<res.length;i++){
            employeeList.push({
                id: res[i].id,
                fullName: res[i].employee_full_name});
            employeesNames.push(res[i].employee_full_name);
        }
        inquirer
        .prompt({
            type: "list",
            name: "employee",
            message: "Select employee to update:",
            choices: employeesNames
          })
        .then(answer => {
            const chosenEmployee = answer.employee;
            let chosenEmployeeID;
            for (let i = 0; i < employeeList.length; i++) {
              if (employeeList[i].fullName === chosenEmployee) {
                chosenEmployeeID = employeeList[i].id;
                break;
              }
            }
            updatedEmployee.id = chosenEmployeeID;
            const query = `SELECT position.title, position.id FROM position;`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                const employeePositions = [];
                const employeePositionNames = [];
                for (let i = 0; i < res.length; i++) {
                    employeePositions.push({
                        id: res[i].id,
                        title: res[i].title
                    });
                    EmployeePositionNames.push(res[i].title);
                }
                inquirer
                .prompt({
                    type: "list",
                    name: "position",
                    message: "Select new employee position:",
                    choices: employeePositionNames
                })
                .then(answer => {
                    const chosenEmployeePosition = answer.position;
                    let chosenEmployeePositionID;
                    for (let i = 0; i < positions.length; i++) {
                        if (positions[i].title === chosenEmployeePosition){
                            chosenPositionID = positions[i].id;
                        }
                    }
                    updatedEmployee.positionID = chosenPositionID;
                    const query = `UPDATE employee SET ? WHERE ?`;
                    connection.query(query, [
                        {
                          position_id: updatedEmployee.positionID
                        },
                        {
                          id: updatedEmployee.id
                        }
                        ], (err, res) => {
                        if (err) throw err;
                        console.log("\n", "Employee position succeffully updated - please run allEmployees function for confirmation!", "\n");
                        initialCommand();
                    });
                });
            });            
        });
    });
  };
