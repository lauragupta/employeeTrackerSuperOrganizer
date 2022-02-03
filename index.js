const inquirer = require('inquirer');

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

