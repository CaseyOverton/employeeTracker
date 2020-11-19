var inquirer = require("inquirer");
var mysql = require("mysql");
var console.table = require('console.table')

//connecting the db 
const { connect } = require("tls");
const Department = require("./lib/department");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "tombrady",
	database: "employee_trackerDB",
});
connection.connect(function (err) {
	if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    promptOptions();
});
const promptOptions = async () => {
    const answers = await inquirer.prompt([
        { 
            name: 'Department_id',
            type: 'input'
            message: 'Enter Department ID'
        },
        {
            name: 'Department_name',
            type: 'input'
            message: 'Enter Department Name:' 
        }
    ])
} 
//  role questions 
.then inquirer.prompt([
    { 
        name: 'role_id',
        type: 'input'
        message: 'Enter Role ID'
    },
    {
        name: 'role_title',
        type: 'input'
        message: 'Enter role title:' 
    },
    {
        name: 'role_salary',
        type: 'input'
        message: 'Enter role salary:' 
    },
    {
        name: 'department_id',
        type: 'input'
        message: 'Please reenter Department ID:' 
    }
    .then console.table

    inquirer.prompt([
        { 
            name: 'employee_id',
            type: 'input'
            message: 'Enter employee ID'
        },
        {
            name: 'employee_firstName',
            type: 'input'
            message: 'Enter employee first name:' 
        },
        {
            name: 'employee_lastName',
            type: 'input'
            message: 'Enter employee last name:' 
        },
        {
            name: 'role_id',
            type: 'input'
            message: 'Enter role ID:' 
        }
        {
            name: 'manager_id',
            type: 'input'
            message: 'Enter Manager ID:' 
        }
])
} 


