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

