-- Erases (drops) database if in existence
DROP DATABASE IF EXISTS bamazon_DB;

-- Creates a new database called bamazonDB
CREATE database bamazon_DB;

-- Call to use the bamazonDB database
USE bamazon_DB;

-- creates tables called "products" that contains the inventory
CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Data for our products table 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ('Nike Shoes', 'Shoes', 69.99, 35),
    ('Adidas Shoes', 'Shoes', 59.99, 45),
    ('Samsung Notebook', 'Electronics', 1509.99, 92),
    ('Tenis Raquets', 'Sports', 59.40, 95),
    ('Nintendo Zelda', 'Games', 39.95, 241),
    ('Polo RL Shirt', 'Clothing', 119.50, 100),
    ('Instant Pot', 'Kitchen', 99.95, 350),
    ('Nintendo Switch', 'Electronics', 299.00, 60),
    ('Tennis balls', 'Sports', 3.99, 525),
    ('Uno Cards', 'Games', 7.99, 100),
    ('Adidas Jacket', 'Clothing', 89.99, 70),
    ('Kitchenaide Mixer', 'Kitchen', 259.00, 210);