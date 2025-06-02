class Employee
{
    name;
    job;
    salary;

    constructor(name, job, salary)
    {
        this.name = name || "Nameless";
        this.salary = salary || 0.0;
        this.job = job || "None";
    }
};

class EmployeesTable
{
    employees;

    constructor(employees)
    {
        this.employees = employees;
    }
    getHtml()
    {
        var text = "<table><th>Name</th><th>Job</th><th>Salary</th>";

        for(let i = 0; i < this.employees.length; i++)
        {
            text += `<tr><td>${this.employees[i].name}</td><td>${this.employees[i].job}</td><td>${this.employees[i].salary}</td></tr>`;
        }

        text += "</table>";
        return text;
    }
};

class StyledEmployeesTable extends EmployeesTable
{
    style;
    getStyle(styles) // array of styles;
    {
        if(styles.length == 0) return;
        var style = `style="`;
        for(let st of styles)
        {
            style += `${st}; `;
        }
        style += '"';
        this.style = style;
    }
    getHtml()
    {
        var text = `<table ${this.style}><th ${this.style}>Name</th><th ${this.style}>Job</th><th ${this.style}>Salary</th>`;

        for(let i = 0; i < this.employees.length; i++)
        {
            text += `<tr ${this.style}><td ${this.style}>${this.employees[i].name}</td><td ${this.style}>${this.employees[i].job}</td><td ${this.style}>${this.employees[i].salary}</td></tr>`;
        }

        text += "</table>";
        console.log(text);
        return text;
    }
}

const element = document.getElementById("resultsTable");
if(!element) throw "Element #table is not accessible";

var bankEmployees = 
[
    new Employee("Alice Smith", "Branch Manager", 95000),
    new Employee("Bob Johnson", "Loan Officer", 70000),
    new Employee("Carol White", "Teller", 40000),
    new Employee("David Brown", "Financial Advisor", 80000),
    new Employee("Eve Davis", "Customer Service Rep", 45000),
    new Employee("Frank Miller", "IT Support", 60000),
    new Employee("Grace Wilson", "HR Manager", 75000),
    new Employee("Henry Moore", "Accountant", 68000),
    new Employee("Ivy Taylor", "Marketing Specialist", 55000),
    new Employee("Jack Anderson", "Security Guard", 35000)
];
var table = new EmployeesTable(bankEmployees);
element.innerHTML += table.getHtml();

const element1 = document.getElementById("styledResultsTable");
if(!element1) throw "Element #styledResultsTable is not accessible";

var styles = 
[
    "border-color: lightcoral",
    "border-width: 5px",
    "padding: 10px"
];
var styledTable = new StyledEmployeesTable(bankEmployees);
styledTable.getStyle(styles);
//console.log(styledTable.style);
element1.innerHTML += styledTable.getHtml();
