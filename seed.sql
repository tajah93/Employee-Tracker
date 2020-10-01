USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("IT"), ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 130000.00, 1), ("Tech Consultant", 70000.00, 1), ("Intern", 25000.00, 1), ("Hiring Manager", 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ("Tajah", "Johnson", 1, 1 ), ("Brenda", "Diaz", 2, null), ("Lucy", "Castro", 2, null), ("Claudia", "Albelo", 3, null), ("Coco", "Johnson", 4, 1);


SELECT * FROM role;

SELECT * FROM department;

SELECT department.name, employee.first_name, employee.last_name, role.title, role.salary
FROM employee
INNER JOIN role ON role.id = employee.role_id
INNER JOIN department ON department.id = role.department_id;

UPDATE employee_tracker_db.role 
SET salary = "70000.00"
WHERE id = 4;

SELECT * FROM role;


