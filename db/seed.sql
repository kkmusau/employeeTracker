INSERT INTO department (department_name)
VALUES
    ('sales'),
    ('production'),
    ('engineering');

INSERT INTO role (title, salary,department_id)
VALUES 
    ('manager', 80000, 1),
    ('floor manager', 65000, 2),
    ('engineer', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES 
    
    ('bob', 'BOB', 1, NULL),
    ('jane', 'JANE', 2, 1),
    ('paul', 'Paul', 3, 2);
    
