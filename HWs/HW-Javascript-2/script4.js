const _console7 = document.getElementById("console7");
const _console8 = document.getElementById("console8");
const _console9 = document.getElementById("console9");
if(!_console7) throw "Element #console1 is not accessible";
if(!_console8) throw "Element #console2 is not accessible";
if(!_console9) throw "Element #console3 is not accessible";

var classrooms = [
  {
    name: "Room 101",
    numberOfSeats: 30,
    faculty: "Physics" 
  },
  {
    name: "Lecture Hall A",
    numberOfSeats: 120,
    faculty: "Mathematics" 
  },
  {
    name: "Lab B",
    numberOfSeats: 20,
    faculty: "Biology" 
  },
  {
    name: "Seminar Room 3",
    numberOfSeats: 15,
    faculty: "Chemistry" 
  },
  {
    name: "Auditorium",
    numberOfSeats: 250,
    faculty: "Computer Science" 
  }
];

output(classrooms, _console7);
_console7.innerHTML += "--------- OUTPUT BY FACULTY ---------<br/>"
outputByFaculty(classrooms, "Physics", _console7)
_console8.innerHTML += "--------- OUTPUT BY GROUP---------<br/>"
outputByGroup(classrooms, 
    {
        name: "Auditorium",
        numberOfSeats: 250,
        faculty: "Computer Science"
    },
    _console8
);
sortBySeats(classrooms);
_console9.innerHTML += "--------- SORTED BY SEATS---------<br/>";
output(classrooms, _console9);

sortByNames(classrooms);
_console9.innerHTML += "<br/>--------- SORTED BY NAMES---------<br/>";
output(classrooms, _console9);




function sortByNames(arr)
{
    for(let i = 0; i < arr.length - 1; i++)
    {
        for(let j = 0; j < arr.length - i - 1; j++)
        {
            //console.log(Number(arr[j - 1]["numberOfSeats"]));
            //console.log(Number(arr[j]["numberOfSeats"]));
            //console.log(Number(arr[j - 1]["numberOfSeats"]) < Number(arr[j]["numberOfSeats"]));
            if((arr[j + 1]["name"]) < (arr[j]["name"]))
            {
                
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}


function sortBySeats(arr)
{
    for(let i = 0; i < arr.length - 1; i++)
    {
        for(let j = 0; j < arr.length - i - 1; j++)
        {
            //console.log(Number(arr[j - 1]["numberOfSeats"]));
            //console.log(Number(arr[j]["numberOfSeats"]));
            //console.log(Number(arr[j - 1]["numberOfSeats"]) < Number(arr[j]["numberOfSeats"]));
            if(Number(arr[j + 1]["numberOfSeats"]) > Number(arr[j]["numberOfSeats"]))
            {
                
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}


function outputByGroup(arr, group, _console)
{
    var data = "";
    for(let item of arr)
    {
        if(item["name"] == group["name"] && item["numberOfSeats"] == group["numberOfSeats"] && item["faculty"] == group["faculty"])
        {
            for(let field in item)
            {
                data += `${field}: ${item[field]}<br/>`;
            }
            data += "--------<br/>";
        }
        
    }
    _console.innerHTML += data;
}

function outputByFaculty(arr, faculty, _console)
{
    var data = "";
    for(let item of arr)
    {
        if(item["faculty"] == faculty)
        {
            for(let field in item)
            {
                data += `${field}: ${item[field]}<br/>`;
            }
            data += "--------<br/>";
        }
        
    }
    _console.innerHTML += data;
}

function output(arr, _console)
{
    var data = "";
    for(let item of arr)
    {
        for(let field in item)
        {
            data += `${field}: ${item[field]}<br/>`;
        }
        data += "--------<br/>";
    }
    _console.innerHTML += data;
}