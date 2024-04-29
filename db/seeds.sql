-- Inserting data into 'department'
INSERT INTO department (name) VALUES
 ('Sales'), 
 ('Engineering'),
 ('Human Resources');

-- Inserting data in 'role'
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Lead', 50000, 1), 
('Software Engineer', 80000, 2), 
('HR Manager', 65000, 3);

-- Inserting data in 'employee'
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Brenda', 'Jones', 1, 1), 
('Anthony', 'Porter', 2, 1), 
('Jerry', 'Mcquire', 3, NULL);