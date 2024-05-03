USE project_db;

-- Inserting data into 'department'
INSERT INTO department (name) VALUES
 ('Sales'), 
 ('Engineering'),
 ('Human Resources'),
 ('Insurace'),
 ('Learning');

-- Inserting data in 'role'
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Lead', 50000, 1), 
('Software Engineer', 80000, 2), 
('HR Manager', 65000, 3),
('Insurance Supervisor', 63000, 4),
('Trainer', 95000, 5);

-- Inserting data in 'employee'
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Brenda', 'Jones', 1, NULL), 
('Anthony', 'Porter', 2, 1), 
('Jerry', 'Mcquire', 3, 1),
('Emily', 'Jenkins', 3, 2),
('Brad', 'Pasley', 4, 2);