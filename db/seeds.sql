USE company_cms;
-------------------------------------------------------------------------------------
INSERT INTO department
  (name)
VALUES
  ('Sales'), --1
  ('Engineering'), --2
  ('Finance'), --3
  ('Legal'); --4
-------------------------------------------------------------------------------------
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1), --1
  ('Salesperson', 80000, 1), --2
  ('Lead Engineer', 150000, 2), --3
  ('Software Engineer', 120000, 2), --4
  ('Accountant', 125000, 3), --5
  ('Legal Team Lead', 250000, 4), --6
  ('Lawyer', 190000, 4); --7
-------------------------------------------------------------------------------------
INSERT INTO employees 
  (first_name, last_name, role_id)
VALUES
  ('Spacetaylor', 'Russellmoondancer', 1),
  ('Howardsef', 'Roberg', 3),
  ('Hermiguilar', 'Wager', 5),
  ('Weane', 'Harkker', 6);

  INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
  VALUES
    ('Kramcia', 'Firerong', 2, 1),
    ('Waradrin', 'Magicwalker', 4, 2),
    ('Shazora', 'Bradleflame', 7, 4);