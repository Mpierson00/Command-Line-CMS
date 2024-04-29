USE project_db;

SELECT * FROM department;

-- view all roles
SELECT r.id, r.title, r.salary, d.name AS department_name
FROM role r
JOIN department d ON r.department_in = d.id;