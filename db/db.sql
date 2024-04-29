USE project_db;
-- view all departments
SELECT * FROM department;

-- view all roles
SELECT r.id, r.title, r.salary, d.name AS department_name
FROM role r
JOIN department d ON r.department_in = d.id;

-- view all employees
SELECT e.id e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- add a department
INSERT INTO department (name) VALUES ('Marketing');

-- add a role
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Coordinator', 54000, 4);

-- add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jackson', "Smith", 4, 1);

-- update an employee role
UPDATE employee SET role_id = 2 WHERE id = 4;