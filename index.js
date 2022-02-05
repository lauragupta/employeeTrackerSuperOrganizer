//Import requirements and their consts
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const { table } = require('console');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
  );
const departmentList = `SELECT * FROM department;`;
const roleList = `SELECT * FROM role;`;
const managerList = `SELECT id, first_name, last_name, manager_id FROM employee WHERE manager_id IS null;`;
const employeeList = `SELECT * FROM employee ORDER BY employee.last_name;`;
const listDepartments = `SELECT name FROM department;`;

//Starting question
const startQuestion = [
    {
        name: 'startQuestion',
        message: "What would you like to do?",
        type: 'list',
        choices: ['View All Employees', 'View All Departments', 'Add Depeartment', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']
    }
];

//Department question
const addDepeartmentQuestion = [
    {
        name: 'department',
        message: "What is the name of the department?",
        type: 'input',
    }
];



//Start Inquirer and next step function
function askStartQuestion() {
    inquirer.prompt(startQuestion).then((response) => {
        if(response.startQuestion === 'View All Employees') {
            db.query(employeeList, function (err, results) {
               console.table(results);
                askStartQuestion();
            });
        } else if(response.startQuestion === 'View All Departments') {
            db.query(departmentList, function (err, results) {
                console.table(results); 
                askStartQuestion();
            });
        } else if(response.startQuestion === 'Add Depeartment') {
            inquirer.prompt(addDepeartmentQuestion).then((response) => {
                const newDepartment = response.department;
                console.log(newDepartment);
                db.query(`INSERT INTO department (name) VALUES ('${newDepartment}');`, function(err, results) {
                    console.log(results);
                });
                askStartQuestion();
            });
        } else if(response.startQuestion === 'Add Role') {
            db.query(departmentList, function (err, results) {
                //Add a Role
                const addRoleQuestions = [
                    {
                        name: 'role',
                        message: "What is the name of the role?",
                        type: 'input',
                    },
                    {
                        name: 'roleSalary',
                        message: "What is the salary of the role?",
                        type: 'input',
                    },
                    {
                        name: 'roleDepartment',
                        message: "Which department does the role belong to?",
                        type: 'list',
                        choices: results
                    }
                ];
                inquirer.prompt(addRoleQuestions).then((response) => {
                    let newRoleDepartment = response.roleDepartment;
                    db.query(`SELECT id FROM department WHERE name = '${newRoleDepartment}';`, function (err, results) {
                        console.log(results);
                        const deptID = results[0].id;
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.role}', '${response.roleSalary}', '${deptID}');`, function(err, results) {
                            console.log(results);
                            askStartQuestion();
                        });
                    });
                });
            });
        } else if(response.startQuestion === 'Add Employee') {
            db.query(roleList, function (err, roleResponse) {
                let roleTitles = roleResponse.map(function(roleResponseItem) {
                    let newRoleID = {
                        id: roleResponseItem.id,
                        name: roleResponseItem.title
                    }
                    return newRoleID;
                })
                db.query(managerList, function (err, managerResults) {
                    console.log(managerResults);
                    let managers = managerResults.map(function(row) {
                        let newManagers = {
                            id: row.id,
                            name: row.first_name
                        }
                        console.log(`managers `, newManagers);
                        return newManagers;
                    })
                    //Add an Employee
                    const addEmployeeQuestions = [
                        {
                            name: 'firstName',
                            message: "What is the employee's first name?",
                            type: 'input',
                        },
                        {
                            name: 'lastName',
                            message: "What is the employee's last name?",
                            type: 'input',
                        },
                        {
                            name: 'employeeRole',
                            message: "What is the employee's role?",
                            type: 'list',
                            choices: roleTitles
                        },
                        {
                            name: 'employeeManager',
                            message: "Who is the employee's manager?",
                            type: 'list',
                            choices: managers
                        }
                    ];
                    inquirer.prompt(addEmployeeQuestions).then((response) => {
                        console.log(response);
                        db.query(`SELECT id FROM role WHERE title = '${response.employeeRole}';`, function (err, results) {
                            console.log(results);
                            const roleID = results[0].id;
                            db.query(`SELECT id FROM employee WHERE first_name = '${response.employeeManager}';`, function (err, results) {
                                console.log(results);
                                const managerID = results[0].id;
                                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', '${roleID}', '${managerID}');`, function(err, results) {
                                    console.log(results);
                                    askStartQuestion();
                                });
                            });
                        });
                    });
                });
            });
        }else if (response.startQuestion === 'Update Employee Role') {

        }else if (response.startQuestion === 'Quit') {
            return;
        }
    });
}


//Add Employee function

//Update Employee function

askStartQuestion();