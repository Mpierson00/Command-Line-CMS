# Command-Line CMS

## Introduction
This Command-Line Content Management System (CLI CMS) is a Node.js application designed to manage a company's departments, roles, and employee records through a command-line interface. It utilizes MySQL for data storage and the Inquirer library for handling user interactions.

## Features
- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles
- Interactive command-line interface

## Prerequisites
Before you begin, ensure you have installed:
- Node.js
- MySQL

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Mpierson00/Command-Line-CMS.git
2. Navigate to the project directory: cd Command-Line-CMS
3. Install the required npm packages: npm install
4. Create a .env file in the root directory with the following content: 
    - DB_HOST=localhost
    - DB_USER=<your_mysql_username>
    - DB_PASSWORD=<your_mysql_password>
    - DB_DATABASE=<your_database_name>
    Replace <your_mysql_username>, <your_mysql_password>, and <your_database_name> with your MySQL credentials and the name of the database you wish to use.
5. Run the database setup script to create the schema and seed the database: node db/setupDatabase.js

## Usage
To start the application, run: node index.js
Follow the on-screen prompts to interact with the database.

## Walkthrough Video

<https://www.youtube.com/watch?v=padoN3sjaWY>

This video provides a step-by-step guide on how to use the Command-Line CMS, demonstrating its features and capabilities.

## Contributing
Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
Distributed under the MIT License. See LICENSE for more information.

## Acknowledgments
Node.js
Inquirer.js
MySQL