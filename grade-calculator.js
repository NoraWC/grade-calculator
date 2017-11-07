/* calculates current grade in a class and
* tells you what grade you need on final to get a desired overall grade
 */

/* MUST HAVE
* button to calculate current grade (NEEDS CATEGORY WEIGHTS)
* button to calculate necessary final grade (Final exam weight + desired grade)
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
var GRADE_WEIGHT = "0, 0, 0, 0";


//tries to run before page is loaded
function setTable(category, other, weight) {
    //category should be grades_for
    //other should be whatever variation on class grades is being returned
    category = category.split(", ");
    if (other.split(", ")[0] !== "N/A") {
        //if there have been grades input
        other = digify(other);
    } else {
        other = other.split(", ");
    }
    if (weight.split(", ")[0]!=="0") {
        weight = digify(weight);
    } else {
        weight = weight.split(", ");
    }
    var final = "<table id = 'tab'>";
    var content = "";
    for (var x = 0; x < 4; x++) {
        content += "<tr><th id = '" + category[x] + "'>" + category[x] + "</th>";
        content += "<td id = '"+category[x]+"Value'>"+"<input type = 'text' id = "+category[x]+"Input value = '"+other[x]+"'></td>";
        content += "<td id = '"+category[x]+"Weight'>"+"<input type = 'text' id = "+category[x]+"Weight value = '"+weight[x]+"'></td>";
    }
    final += content + "</table>";
    document.getElementById("main").innerHTML = final;
}

function sortInputs(inp) {
    //takes all inputs from table
    var arr = inp.split(", ");
    for (var z = 0; z < 4; z ++) {
        //arr[z] = digify(arr[z]);
        var str = GRADES_FOR.split(", ")[z]+"Input";
        var x = document.getElementById(str).value;
        arr[z] = " " + x;
    }
    arr = arr.toString();
    arr = arr.substring(1, arr.length);
    inp = arr;//need to make class grades equal to inp w/o losing vals for grade weight (when implemented)
    setTable(GRADES_FOR, CLASS_GRADES, GRADE_WEIGHT);
    return inp;
}


function digify(inp) {
    //turns input into number
    //use string.split(',') and parseInt()
    var final = inp.split(", ");
    for (var x = 0; x < 4; x ++) {
        final[x] = parseInt(final[x]);
    }
    return final;
}

function averageify(inp) {
    //takes the average of the input (as an array)
    var str = inp;
    var baseline = 0;
    for (var b = 0; b < 4; b ++) {
        baseline += str[b]; //uses too much memory?
    }
    return baseline/4;
}

function currentGrade(input) {
    //finds current grade
    //NEEDS CATEGORY WEIGHTS
    var avg = averageify(digify(input));
    //input avg to HTML page and return
    document.getElementById("showOff").innerHTML = avg;
    return avg
}

function finalGrade(current) {
    //finds final grade needed to get desired output using currentGrade
    var final = 100-current;
    //need to output to HTML page
    document.getElementById("showOff").innerHTML = final.toString();
    return final;
}


function returnAll(bool) {
    //outputs all values
    if(bool) {
        document.getElementById("showOff").innerHTMl = currentGrade(sortInputs(CLASS_GRADES));
    } else {
        document.getElementById("showOff").innerHTMl = finalGrade(currentGrade(sortInputs(CLASS_GRADES)));
    }
}