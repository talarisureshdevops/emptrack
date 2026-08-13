-- ============================================
-- EmpTrack Database Schema
-- Run this FIRST before anything else
-- ============================================

CREATE DATABASE IF NOT EXISTS emptrack_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE emptrack_db;

-- ─────────────────────────────────────────
-- TABLE: departments
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ─────────────────────────────────────────
-- TABLE: employees
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS employees (
  id              INT           AUTO_INCREMENT PRIMARY KEY,
  first_name      VARCHAR(50)   NOT NULL,
  last_name       VARCHAR(50)   NOT NULL,
  email           VARCHAR(150)  NOT NULL UNIQUE,
  phone           VARCHAR(20),
  position        VARCHAR(100)  NOT NULL,
  department_id   INT           NOT NULL,
  salary          DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  hire_date       DATE          NOT NULL,
  status          ENUM('active','inactive','on_leave') NOT NULL DEFAULT 'active',
  avatar_initials VARCHAR(3)    GENERATED ALWAYS AS (
                    CONCAT(UPPER(LEFT(first_name,1)), UPPER(LEFT(last_name,1)))
                  ) STORED,
  created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_employee_department
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  INDEX idx_status       (status),
  INDEX idx_department   (department_id),
  INDEX idx_hire_date    (hire_date)
) ENGINE=InnoDB;