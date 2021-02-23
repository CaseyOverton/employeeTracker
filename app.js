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
          'View All Positions',
          'View All Employees',
          'Add a Department',
          'Add a Position',
          'Add an Employee',
          'View Employees By Department',
          'View Employees by Manager',
          'Search a Position',
          'Update Employee Positions',
          'Exit'
      ],
  })
  .then((answer) => {
      switch (answer.action) {
          case 'View All Departments':
              departmentInfo();
              break;
          case 'View All Positions':
              allPositions();
              break;
          case 'View All Employees':
              allEmployees();
              break;
          case 'Add a Department':
              addDepartment();
              break;
          case 'Add a Position':
              addPosition();
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
          case 'Search a Position':
              searchPosition();
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

function allPositions() {
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

