/* calculates current grade in a class and
* tells you what grade you need on final to get a desired overall grade
 */

/* MUST HAVE
* button to calculate current grade CHECK
* button to calculate necessary final grade (Final exam weight + desired grade)
* all fields in a table w/ border of 1
* dummy data to persist even on refresh CHECK
* fails gracefully
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

function sortInputs() {
    //takes all inputs from table
    var beans = "Input";
    var cheese = "Weight";

    var arr = CLASS_GRADES.split(", ");
    var ray = GRADE_WEIGHT.split(", ");

    for (var z = 0; z < 5; z ++) {
        var str1 = GRADES_FOR.split(", ")[z]+beans;
        arr[z] = " " + document.getElementById(str1).value;
        var str2 = GRADES_FOR.split(", ")[z]+cheese;
        ray[z] = " " + document.getElementById(str2).value;
    }

    arr = arr.toString();
    arr = arr.substring(1, arr.length);
    CLASS_GRADES = arr;
    ray = ray.toString();
    ray = ray.substring(1, ray.length);
    GRADE_WEIGHT = ray;
    setTable(GRADES_FOR, CLASS_GRADES, GRADE_WEIGHT);
    return arr;
}


function digify(inp) {
    //turns input into number
    var final = inp.split(", ");//comma-separated string to array
    for (var x = 0; x < 5; x ++) {
        if(final[x] === "N/A") {//if the field was left blank
            final[x] = 0;//the value will be 0
        }
        final[x] = parseInt(final[x]);//turns to int so other functions can use it
    }
    return final;
}

function percentify(inp) {
    inp = digify(inp);//turns inp to int
    for (var x = 0; x < 5; x ++) {
        inp[x] = inp[x]/100;//divide into percentage
    }
    return inp;
}

function averageify(inp) {
    //takes the average of the input (as an array)
    var str = digify(inp);//turns inputted string vals into array of numbers
    var per = percentify(GRADE_WEIGHT);//turns grade weight into percentage
    var baseline = 0;
    for (var b = 0; b < 5; b ++) {
        if(str[4] === 0 || str[4] === "N/A") {
            var beg = per[4];
            per[b] += beg/4;
        }

        baseline += str[b] * per[b];
    }
    return baseline;
}

function currentGrade() {
    //finds current grade
    var avg = averageify(sortInputs());//takes average of all grades (including any val for final)
    if(avg.toString().length>3) {//checks length and cleans up if necessary
        avg = avg.toString().substring(0, 3);
        avg = parseInt(avg);
    }
    //inputs avg to HTML page and returns
    document.getElementById("showOff").innerHTML = "Your current grade is: "+avg;
    return avg;
}

function finalGrade() {
    //finds final grade needed to get desired output using currentGrade

    ///// with typical weights:

    //when all other grades 50:
    //to get 90: SHOULD BE 140

    //when all other grades 50 and midterm 90:
    //to get 90: should be 122

    //when all other grades 80:
    //to get 90: should be 104

    //all other grades 60:
    //to get 90: should be 128


    //grade1*weight1 + grade2*weight2 + grade3*weight3 + grade4*weight4 + grade5*weight5 = desired
    //grade1*weight1 + grade2*weight2 + grade3*weight3 + grade4*weight4 = desired - grade5*weight5
    //grade = desired - grade5*weight5
    //othergrade/weight5 = grade-grade5
    //othergrade + grade5 = grade

    var str = digify(CLASS_GRADES);
    var per = percentify(GRADE_WEIGHT);
    var z = 0;
    for (var b = 0; b < 5; b ++) {
        z += str[b] * per[b];
    }

    var grade = currentGrade(); //finds current grade

    var weight = digify(GRADE_WEIGHT)[4]; //weight of final

    var desired = parseInt(document.getElementById('desired').value);//desired grade

    var g = z-grade;

    var h = desired/weight;

    var final = h*grade; //difference between desired grade and current grade



    if(final.length > 4) {
        final = parseInt(final.substring(0,4)); //cleans up sometimes messy value
    }
    document.getElementById("showFinal").innerHTMl = "The grade you need on your final is: "+final;
    return final;
}