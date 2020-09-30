/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("IT"), ("HR");

INSERT INTO role (title, salary)
VALUES ("Manager", 130000.00), ("Tech Consultant", 70000.00), ("Intern", 25000.00), ("Hiring Manager", 50000)

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ("Tajah", "Johnson", 1, 1 ), ("Brenda", "Diaz", 2), ("Lucy", "Castro", 2), ("Claudia", "Albelo", 3), ("Coco Johnson", 4, 1)




