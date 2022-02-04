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
const departmentList = `SELECT * FROM department.name`;
const roleList = `SELECT * FROM role.title`;
const managerList = `SELECT first_name, last_name FROM employee WHERE employee.id = employee.manager_id`
const employeeList = `SELECT * FROM employee ORDER BY employee.last_name;`

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
const addDepeartmentQuestions = [
    {
        name: 'department',
        message: "What is the name of the department?",
        type: 'input',
    }
];

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
        choices: `[${departmentList}]`
    }
];

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
        choices: `[${roleList}]`
    },
    {
        name: 'employeeManager',
        message: "Who is the employee's manager?",
        type: 'list',
        choices: `[${managerList}]`
    }
];

//Start Inquirer and next step function
function askStartQuestion() {
    inquirer.prompt(startQuestion).then((response) => {
        if(response.startQuestion === 'View All Employees') {
            db.query(`SELECT * FROM employee ORDER BY employee.last_name`, function (err, results) {
                console.log(results); 
                askStartQuestion();
            });
        } else if(response.startQuestion === 'View All Departments') {
            db.query(`SELECT * FROM departments ORDER BY employee.last_name`, function (err, results) {
                console.log(results); 
                askStartQuestion();
            });
        } else if(response.startQuestion === 'Add Depeartment') {
            
        } else if(response.startQuestion === 'Add Role') {

        } else if(response.startQuestion === 'Add Employee') {

        }else if (response.startQuestion === 'Update Employee Role') {

        }else if (response.startQuestion === 'Quit') {
            return;
        }
    })
}

//Add Department function

//Add Role function

//Add Employee function

//Update Employee function

askStartQuestion();