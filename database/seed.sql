-- ============================================
-- EmpTrack Seed Data
-- Run AFTER schema.sql
-- ============================================

USE emptrack_db;

-- Departments
INSERT INTO departments (name, description) VALUES
  ('Engineering',       'Software development and infrastructure'),
  ('Human Resources',   'People operations and recruitment'),
  ('Marketing',         'Brand, campaigns, and growth'),
  ('Finance',           'Accounting, budgets, and reporting'),
  ('Product',           'Product strategy and roadmap'),
  ('Customer Success',  'Support, onboarding, and retention');

-- Employees
INSERT INTO employees (first_name, last_name, email, phone, position, department_id, salary, hire_date, status) VALUES
  ('Alice',   'Johnson',  'alice.johnson@emptrack.com',  '+1-555-0101', 'Senior Engineer',       1, 110000.00, '2021-03-15', 'active'),
  ('Bob',     'Martinez', 'bob.martinez@emptrack.com',   '+1-555-0102', 'Frontend Developer',    1,  85000.00, '2022-06-01', 'active'),
  ('Carol',   'Smith',    'carol.smith@emptrack.com',    '+1-555-0103', 'HR Manager',            2,  78000.00, '2020-01-20', 'active'),
  ('David',   'Lee',      'david.lee@emptrack.com',      '+1-555-0104', 'Marketing Specialist',  3,  65000.00, '2022-09-12', 'active'),
  ('Eva',     'Brown',    'eva.brown@emptrack.com',      '+1-555-0105', 'Financial Analyst',     4,  90000.00, '2019-11-05', 'active'),
  ('Frank',   'Wilson',   'frank.wilson@emptrack.com',   '+1-555-0106', 'Product Manager',       5, 105000.00, '2021-07-22', 'active'),
  ('Grace',   'Taylor',   'grace.taylor@emptrack.com',   '+1-555-0107', 'DevOps Engineer',       1,  98000.00, '2023-01-09', 'active'),
  ('Henry',   'Anderson', 'henry.anderson@emptrack.com', '+1-555-0108', 'Customer Success Lead', 6,  72000.00, '2022-03-30', 'on_leave'),
  ('Iris',    'Thomas',   'iris.thomas@emptrack.com',    '+1-555-0109', 'UX Designer',           5,  88000.00, '2021-12-15', 'active'),
  ('James',   'Jackson',  'james.jackson@emptrack.com',  '+1-555-0110', 'Backend Developer',     1,  92000.00, '2020-08-01', 'inactive');