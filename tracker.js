var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Gj243315",
    database: "employee_tracker_db"
});


connection.connect(function (err) {
    if (err) throw err;
    startSearch();
});

function startSearch() {
    inquirer
        .prompt({
            name: "tracker",
            type: "list",
            message: "Hello, what would you like to do?",
            choices: [
                "View all employees.",
                "View all roles.",
                "View all departments.",
                "Add a new employee.",
                "Add a new role.",
                "Add a new department.",
                "Update an employee's role."
            ]
        })
        .then(function (answer) {
            switch (answer.tracker) {
                case "View all employees.":
                    viewEmp();
                    break;

                case "View all roles.":
                    viewRole();
                    break;

                case "View all departments.":
                    viewDept();
                    break;

                case "Add a new employee.":
                    addEmp();
                    break;

                case "Add a new role.":
                    addRole();
                    break;

                case "Add a new department.":
                    addDept();
                    break; 

                case "Update a role.":
                    upRole();
                    break;  

            }
        });
}

function viewEmp() {
    var query = "SELECT first_name, last_name, role_id FROM employee";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.table(res[i].first_name + " " + res[i].last_name + " " + res[i].role_id);
        }
        startSearch();
    });
}

function viewRole() {
    var query = "SELECT title, salary, department_id FROM role";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.table(res[i].title + " " + res[i].salary + " " + res[i].department_id);
        }
        startSearch();
    });
}

function viewDept() {
    var query = "SELECT name FROM department";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.table(res[i].name);
        }
        startSearch();
    });
}

function addEmp() {

    connection.query("SELECT * FROM role", function (err, res) {

        if (err) console.log(err)

        var roles = []

        for (var i = 0; i < res.length; i++) {

            roles.push(res[i].title)
        }

        inquirer.prompt([{

            name: "first",

            type: "input",

            message: "What is the employee's first name?",

        },

        {

            name: "last",

            type: "input",

            message: "What is the employee's last name?",

        },

        {

            name: "role",

            type: "list",

            message: "What is the employee's role?",

            choices: roles

        }

        ])
            .then(function (answer) {
                console.log(answer)

                console.log(res)

                var query = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
                for (var i = 0; i < res.length; i++) {
                    for (var x = 0; x < roles.length; x++) {
                        if (answer.role === roles[x]) {
                            console.log(roles[i].id)
                        }

                    }

                }
                connection.query(query, [answer.first, answer.last, res[i].id], function (err, res) {

                    if (err) console.log(err),

                        console.table(res),

                        startSearch();

                })

            });

    })
};


    function addRole() {
        connection.query("SELECT * FROM department", function (err, res) {

            if (err) console.log(err)

            var depts = []

            for (var i = 0; i < res.length; i++) {

                roles.push(res[i].name)
            }

            inquirer.prompt([{

                name: "roleName",
                type: "input",
                message: "What is the new role's name?",
            },
            {
                name: "pay",
                type: "input",
                message: "How much is earned in this role?",
            },
            {
                name: "departmentId",
                type: "list",
                message: "Which department are you assigning this role to?",
                choices: depts
            }

            ])
                .then(function (answer) {
                    console.log(answer)
                    console.log(res)

                    var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
                    for (var i = 0; i < res.length; i++) {
                        for (var x = 0; x < depts.length; x++) {
                            if (answer.departmentId === depts[x]) {
                                console.log(depts[i].id)
                            }

                        }

                    }
                    connection.query(query, [answer.roleName, answer.pay, res[i].id], function (err, res) {

                        console.table(res);
                        startSearch();
                    });



                });

        })
    }


    function addDept() {

        inquirer.prompt([{

            name: "dept",
            type: "input",
            message: "What is the new department's name?",
        }],
        )
            .then(function (answer) {
                console.log(answer);

                var query = "INSERT INTO department (name) VALUES ?";
                connection.query(query, {id: answer.dept}, function (err, res) {

                    console.table(res);
                    startSearch();
                });

            });

    }

    function upRole() {
        inquirer
            .prompt([{
                name: "promote",
                type: "input",
                message: "Which employee's role are you updating?",
            },
            {
                name: "job",
                type: "input",
                message: "What is the role they will be changing to?",
            }]
            )
            .then(function (answer) {
                console.log(answer);
                var query = "UPDATE employee SET role_id WHERE ?";
                connection.query(query, [answer.job], function (err, res) {

                    console.table(res);
                    startSearch();
                });

            });

    }


