const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");
const { get } = require("https");
let employees = [];

async function init() {
    await getManagerInput();

}

function askTeam() {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select a type of team member.",
            name: "type",
            choices: [
                "Engineer",
                "Intern"
            ]
        }
    ])
        .then(async function (answer) {
            if (answer.type === "Engineer") {
                await getEngineerInput();
            } if (answer.type === "Intern") {
                await getInternInput();
            }
        })
}

function getManagerInput() {
    const questions = [
        {
            type: "input",
            message: "What is the Manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Manager's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Manager's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Manager's office number?",
            name: "officeNumber"
        },

    ]
    inquirer.prompt(questions)
        .then(answer => {
            //create Manager object, push to employees
            let newManager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
            employees.push(newManager);
            askTeam();
        });
}

function getEngineerInput() {
    const questions = [
        {
            type: "input",
            message: "What is the Engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Engineer's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Engineer's github?",
            name: "github"
        },
        {
            type: "confirm",
            message: "Would you like to add another Employee?",
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
                    askTeam();
                } else {
                    let HTML = render(employees);
                    writeFileAsync(outputPath, HTML);
                    return
                }
            });
    }
    ask();
}


function getInternInput() {
    const questions = [
        {
            type: "input",
            message: "What is the Intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Intern's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Intern's school?",
            name: "school"
        },
        {
            type: "confirm",
            message: "Would you like to add another Employee?",
            name: "askAgain"
        }
    ]
    function ask() {
        inquirer.prompt(questions)
            .then(answer => {
                //create Intern object, push to employees
                let newIntern = new Intern(answer.name, answer.id, answer.email, answer.school);
                employees.push(newIntern);
                if (answer.askAgain) {
                    askTeam();
                } else {
                    let HTML = render(employees);
                    writeFileAsync(outputPath, HTML);
                    return
                }
            });
    }
    ask();
}
init();




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
