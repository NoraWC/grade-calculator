/* calculates current grade in a class and
* tells you what grade you need on final to get a desired overall grade
 */

/* MUST HAVE
* button to calculate current grade CHECK
* button to calculate necessary final grade (Final exam weight + desired grade)
* all fields in a table w/ border of 1
* dummy data to persist even on refresh CHECK
* fails gracefully (what does this even)
 */

/* CAN HAVE
* color coding
* data validation + error messages
 */

var CLASS_GRADES = "N/A, N/A, N/A, N/A, N/A";
var GRADES_FOR = "Homework, Quizzes, Tests, Midterm, Final";
var GRADE_WEIGHT = "N/A, N/A, N/A, N/A, N/A";



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
    if (weight.split(", ")[0]!=="N/A") {
        weight = digify(weight);
    } else {
        weight = weight.split(", ");
    }
    var final = "<table id = 'tab'>";
    var content = "";
    for (var x = 0; x < 5; x++) {
        content += "<tr><th id = '" + category[x] + "'>" + category[x] + "</th>";
        content += "<td id = '"+category[x]+"IValue'>"+"<input type = 'text' id = '"+category[x]+"Input' value = '"+other[x]+"'></td>";
        content += "<td id = '"+category[x]+"WValue'>"+"<input type = 'text' id = '"+category[x]+"Weight' value = '"+weight[x]+"'></td>";
    }
    final += content + "</table>";
    document.getElementById("main").innerHTML = final;
}

function sortInputs(inp1, inp2) {
    //takes all inputs from table
    var beans = "Input";
    var cheese = "Weight";

    var arr = inp1.split(", ");
    var ray = inp2.split(", ");
    for (var z = 0; z < 5; z ++) {
        var str1 = GRADES_FOR.split(", ")[z]+beans;
        arr[z] = " " + document.getElementById(str1).value;
        var str2 = GRADES_FOR.split(", ")[z]+cheese; //undefined?
        ray[z] = " " + document.getElementById(str2).value;
    }
    arr = arr.toString();
    arr = arr.substring(1, arr.length);
    CLASS_GRADES = arr;
    inp1 = arr;
    ray = ray.toString();
    ray = ray.substring(1, ray.length);
    GRADE_WEIGHT = ray;
    //inp2 = ray;
    setTable(GRADES_FOR, CLASS_GRADES, GRADE_WEIGHT);
    return inp1;
}


function digify(inp) {
    //turns input into number
    var final = inp.split(", ");
    for (var x = 0; x < 5; x ++) {
        if(final[x] === "N/A") {
            final[x] = 0;
        }
        final[x] = parseInt(final[x]);
    }
    return final;
}

function percentify(inp) {
    inp = digify(inp);
    for (var x = 0; x < 4; x ++) {
        inp[x] = inp[x]/100;
    }
    return inp;
}

function averageify(inp, num) {
    //takes the average of the input (as an array)
    var str = digify(inp);
    var per = percentify(GRADE_WEIGHT);
    var baseline = 0;
    for (var b = 0; b < num; b ++) {
        baseline += str[b] * per[b];
    }
    return baseline;
}

function currentGrade(input) {
    //finds current grade
    var avg = averageify(input, 4);
    //input avg to HTML page and return
    document.getElementById("showOff").innerHTML = avg;
    return avg
}

function finalGrade() {
    //finds final grade needed to get desired output using currentGrade

    //save current grade

    //unaverageify desired grade
    // subtract all grade vals and divide by all weight vals (including final)
    //unaverageify current grade
    // see above


    var grade = currentGrade(sortInputs(CLASS_GRADES, GRADE_WEIGHT));

    var weight = digify(GRADE_WEIGHT)[4]; //weight of final

    var desired = document.getElementById('desired').value;
    desired = parseInt(desired);
    var dif = desired - grade; //difference between desired grade and current grade

    var ex = (averageify(CLASS_GRADES, 5)+averageify(GRADE_WEIGHT,5))/2;
    var final = weight/dif;
    document.getElementById("showOff").innerHTML = (final*100).toString();
    return final;
}


function returnAll(bool) {
    //outputs all values
    if(bool) {
        document.getElementById("showOff").innerHTMl = currentGrade(sortInputs(CLASS_GRADES, GRADE_WEIGHT));
    } else {
        document.getElementById("showOff").innerHTMl = finalGrade();
    }
}