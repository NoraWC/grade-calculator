/* calculates current grade in a class and
* tells you what grade you need on final to get a desired overall grade
 */

/* MUST HAVE
* button to calculate current grade
* button to calculate necessary final grade
* all fields in a table w/ border of 1
* dummy data to persist even on refresh
* fails gracefully
 */

/* CAN HAVE
* color coding
* data validation + error messages
 */

var CLASS_GRADES = "N/A, N/A, N/A, N/A";
var GRADES_FOR = "Homework, Quizzes, Tests, Midterm";


//tries to run before page is loaded
function setTable(category, other) {
    //category should be grades_for
    //other should be whatever variation on class grades is being returned
    category = category.split(", ");
    if (other.split(", ")[0] !== "N/A") {
        //if there have been grades input
        other = digify(other);
    } else {
        other = other.split(", ");
    }
    var final = "<table>";
    var content = "";
    for (var x = 0; x < 4; x++) {
        content += "<tr><th id = '" + category[x] + "'>" + category[x] + "</th>";
        content += "<td id = '" + category[x] +"Value'>" + other[x] + "</td>";
    }
    final += content + "</table>";
    document.getElementById("main").innerHTML = final;
}

function sortInputs() {
    //takes all inputs from table
    var arr = CLASS_GRADES.split(", ");
    for (var z = 0; z < 4; z ++) {
        arr[z] = digify(arr[z]);
        var str = GRADES_FOR[z]+"Value";
        var x = document.getElementById(str).value;
        arr[z] = x + ", ";
    }
    arr = arr.toString[0, arr.length-2];
    CLASS_GRADES = arr;
    setTable(GRADES_FOR, arr);
}


function digify(inp) {
    //turns input into number
    //use string.split(',') and parseInt()
    inp = inp.split(", ");
    for (var x = 0; x < 4; x ++) {
        inp[x] = parseInt(inp[x]);
    }
    inp = inp.toString();
    return inp;
}

function averageify(z) {
    //takes the average of the input (as a comma-separated string)
    z = z.split(", ");
    var baseline = 0;
    for (var b = 0; b , 4; b ++) {
        baseline += z[b]; //string length?
    }
    return baseline/4;
}

function currentGrade() {
    //finds current grade
    var avg = averageify(digify(CLASS_GRADES));
    //input avg to HTML page and
    return avg;
}

function finalGrade(current) {
    //finds final grade needed to get desired output using currentGrade
    var final = 100-current;
    //need to output to HTML page
    return final;
}


function returnAll(bool) {
    //outputs all values
    if(bool) {
        document.getElementById("showOff").innerHTMl = currentGrade();
    } else {
        document.getElementById("showOff").innerHTMl = finalGrade(currentGrade);
    }
}