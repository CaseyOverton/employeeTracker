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



function beginAdd() {
inquirer.prompt([
    {
    type: 'list',
    name: 'option1',
    message: 'Add Department or stop application?',
    choices: [
        'Add Department',
        'Stop Application',
       ]
}
// answer could be response
]) .then((answer) => {
     
        if (answer.option1 === 'Add Department'){
                departmentInfo();}

        else {                  
             connection.end();
                }
    });
}




const departmentInfo = () => {
    // const answers = await 
    inquirer.prompt([
        {
            name: 'Department_name',
            type: 'input',
            message: 'Enter Department Name:' 
        }
    ]).then((answer) => {
        
        connection.query(
        "INSERT INTO department SET ?", 
        {
           name: answer.name
        })
        var name = answer.name
        console.table([name])
        })}


// const roleInfoAdd = () => {
//     inquirer.prompt([
//         { 
//             name: 'role_id',
//             type: 'input',
//             message: 'Enter Role ID'
//         },
//         {
//             name: 'role_title',
//             type: 'input',
//             message: 'Enter role title:' 
//         },
//         {
//             name: 'role_salary',
//             type: 'input',
//             message: 'Enter role salary:' 
//         },
//         {
//             name: 'department_id',
//             type: 'input',
//             message: 'Please reenter Department ID:' 
//         }
//     ]).then(addInfo => {
//         const employeeInfoAdd = new role (addInfo.role_id, addInfo.role_title, addInfo.role_salary, addInfo.department_id)
//         completeTable.push(employeeInfoAdd)
//         employeeInfo();
//     })
//     }

//     const employeeInfo = () => {
//         inquirer.prompt([
//             { 
//                 name: 'employee_id',
//                 type: 'input',
//                 message: 'Enter employee ID'
//             },
//             {
//                 name: 'employee_firstName',
//                 type: 'input',
//                 message: 'Enter employee first name:' 
//             },
//             {
//                 name: 'employee_lastName',
//                 type: 'input',
//                 message: 'Enter employee last name:' 
//             },
//             {
//                 name: 'role_id',
//                 type: 'input',
//                 message: 'Enter role ID:' 
//             },
//             {
//                 name: 'manager_id',
//                 type: 'input',
//                 message: 'Enter Manager ID:' 
//             }
//         ]).then(addInfo => {
//             const employeeInfoAdd = new employee (addInfo.employee_id, addInfo.employee_firstName, addInfo.employee_lastName, addInfo.role_id, addInfo.manager_id)
//             completeTable.push(employeeInfoAdd)
//             // beginAdd();
//         })
//         }
// beginAdd();
// console.table(completeTable);

// }};