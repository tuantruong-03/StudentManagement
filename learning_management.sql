-- Create user table
drop database student_management;
create database student_management;
use student_management;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email varchar(255) not null,
	first_name varchar(255),
    last_name varchar(255),
    `created_at` timestamp default current_timestamp,
	`modified_at` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (user_id)
);

-- Create course_student table
CREATE TABLE courses (
    course_id INT,
    name VARCHAR(255) not null,
    max_number_of_student INT,
    `created_at` timestamp default current_timestamp,
	`modified_at` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (course_id)
);


    
