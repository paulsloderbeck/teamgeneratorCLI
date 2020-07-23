const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { get } = require("https");
let employees = [];

function getTeamType() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Does your team include Engineers?",
            name: "engineerBoolean"
        },
        {
            type: "confirm",
            message: "Does your team include Managers?",
            name: "managerBoolean"
        },
        {
            type: "confirm",
            message: "Does your team include interns?",
            name: "internBoolean"
        }
    ])
        .then(answers => {
            console.log(answers)
            //start engineer prompt, then manager, then intern
        })
}

function getEngineerInput() {
    const questions = [
        {
            type: "input",
            message: "What is the engineers's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the engineers's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the engineers's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the engineer's github?",
            name: "github"
        },
        {
            type: "confirm",
            message: "Would you like to add another Engineer?",
            name: "askAgain"
        }
    ]
    function ask() {
        inquirer.prompt(questions)
            .then(answer => {
                //create Engineer object, push to employees
                let newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
                employees.push(newEngineer);
                if (answer.askAgain) {
                    ask();
                } else {
                    console.log(employees);
                    return
                }
            });
    }
    ask();
}
//getTeamType();
getEngineerInput();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
