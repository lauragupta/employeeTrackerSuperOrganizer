INSERT INTO department (name)
VALUES  ('Human Resources'),
        ('Finance'),
        ('Public Relations');

INSERT INTO role (title, salary, department_id)
VALUES  ('Director', 100.00, 1),
        ('Recruiter', 50.00, 1),
        ('Benefits', 80.00, 1),
        ('CFO', 300.00, 2),
        ('Accounting', 100.00, 2),
        ('Publicist', 60.00, 3),
        ('Social Media Account Manager', 75.00, 3),
        ('Fundriasing', 65.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Jane', 'Doe', 1, null),
        ('John', 'Smith', 2, 1),
        ('Bill', 'Bright', 3, 1), 
        ('Sally', 'May', 4, null), 
        ('Margie', 'Jones', 2, 1),
        ('Sarah', 'Johnson', 5, 4),
        ('John', 'Frank', 6, null),
        ('Ashley', 'Scott', 7, 6);