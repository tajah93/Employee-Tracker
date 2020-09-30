var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();

var connection = mysql.createConnection({


  port: 3306,
  database: "employee_tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });

const cTable = require('console.table');
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);