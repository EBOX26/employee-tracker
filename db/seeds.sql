-- Insert data into the department table
INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Finance'),
  ('Engineering'),
  ('Legal');

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', 65000.00, 1),
  ('Sales Person', 85000.00, 1),
  ('Lead Engineer', 120000.00, 3),
  ('Software Engineer', 140000.00, 3),
  ('Legal Team Lead', 110000.00, 4); 

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 2, 2),
  ('Tom', 'McBoyl', 3, 1),
  ('Chris', 'Jacobs', 5, 2),
  ('Bat', 'Man', 3, 2),
  ('Tony', 'Soprano', 3, 1);