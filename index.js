//Import requirements and their consts
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
  );
const departmentList = `SELECT * FROM department.name`;
const roleList = `SELECT * FROM role.title`;
const managerList = `SELECT first_name, last_name FROM employee WHERE employee.id = employee.manager_id`
const employeeList = `SELECT * FROM employee`

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
            const sql = `SELECT employee.id AS id, employee.first_name AS firstName, employee.last_Name AS lastName, employee.role AS role, employee.manager_id AS manager ORDER BY employee.last_name;`;
            db.query(sql, (err, rows) => {
                if (err) {
                    res.status(500).json({ error:err.message});
                        return;
                }
                res.json({
                    message: 'success', 
                    data: rows
                });
            });
            //cTable = SELECT??
        } else if(response.startQuestion === 'View All Departments') {
            //cTable = 
        } else if(response.startQuestion === 'Add Depeartment') {
            
        } else if(response.startQuestion === 'Add Role') {

        } else if(response.startQuestion === 'Add Employee') {

        }else if (response.startQuestion === 'Update Employee Role') {

        }else if (response.startQuestion === 'Quit') {

        }
    })
}

//Add Department function

//Add Role function

//Add Employee function

//Update Employee function

askStartQuestion();