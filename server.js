// Import required modules
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "FakeUser",
  password: "123456",
  database: "employee_db"
});

// Connect to the MySQL database and initiate the main program
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  showMenu();
});

// Function to set up and display the main menu for user interaction
const showMenu = () => {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then((result) => {
      console.log("You entered: " + result.option);

      const functionMap = {
        "Add department": addNewDepartment,
        "Add role": addNewRole,
        "Add employee": addNewEmployee,
        "View departments": viewAllDepartments,
        "View roles": viewAllRoles,
        "View employees": viewAllEmployees,
        "Update employee role": updateEmployeeRole,
        "Quit": exitApplication
      };

      const selectedFunction = functionMap[result.option];

      if (selectedFunction) {
        selectedFunction();
      } else {
        console.log("Invalid option");
        showMenu();
      }
    });
}

// Function to add a department
const addNewDepartment = () => {
  inquirer.prompt({
    type: "input",
    message: "What is the department name?",
    name: "dept"
  }).then((answer) => {
    connection.query("INSERT INTO department (name) VALUES (?)", [answer.dept], (err, res) => {
      if (err) throw err;
      console.table(res);
      showMenu();
    });
  });
}

// Function to add a role
const addNewRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "role"
      },
      {
        type: "input",
        message: "What is the salary?",
        name: "salary"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ])
    .then((answer) => {
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.role, answer.salary, answer.deptID], (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu();
      });
    });
}

// Function to add a new employee to the database
const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then((answer) => {
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu();
      });
    });
}

// Function to update an employee's role
const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "update"
      },
      {
        type: "input",
        message: "What role would you like to update?",
        name: "updateRole"
      }
    ])
    .then((answer) => {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.update], (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu();
      });
    });
}

// Function to retrieve and display a list of all departments
const viewAllDepartments = () => {
  let query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    showMenu();
  });
}

// Function to retrieve and display a list of all roles
const viewAllRoles = () => {
  let query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    showMenu();
  });
}

// Function to retrieve and display a list of all employees
const viewAllEmployees = () => {
  let query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    showMenu();
  });
}

// Function to quit the application
const exitApplication = () => {
  connection.end();
  process.exit();
}
