-- Rebuilds store_db exactly as it should look at the END of Part 1.
-- Run in phpMyAdmin > SQL tab, so you can jump straight to Part 2 or 3 in a demo.
DROP DATABASE IF EXISTS store_db;
CREATE DATABASE store_db;
USE store_db;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  stock INT DEFAULT 10
);
INSERT INTO products (product_name, category, price) VALUES
('Wireless Mouse', 'Electronics', 2750.00),
('Mechanical Keyboard', 'Electronics', 8500.00);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL
);
INSERT INTO customers (full_name, email, city) VALUES
('Kasun Perera', 'kasun@gmail.com', 'Nugegoda'),
('Nimasha Silva', 'nimasha@yahoo.com', 'Kandy');
