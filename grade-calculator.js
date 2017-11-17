/* calculates current grade in a class and
* tells you what grade you need on final to get a desired overall grade
 */

/* MUST HAVE
* button to calculate current grade CHECK
* button to calculate necessary final grade (Final exam weight + desired grade) CHECK
* all fields in a table w/ border of 1
* dummy data to persist even on refresh CHECK
* fails gracefully CHECK
 */

/* CAN HAVE
* color coding
* data validation + error messages CHECK
 */
var CLASS_GRADES = "N/A, N/A, N/A, N/A, N/A";
var GRADES_FOR = "Homework, Quizzes, Tests, Midterm, Final";
var GRADE_WEIGHT = "N/A, N/A, N/A, N/A, N/A";

function setTable(category, other, weight) {
    //category should be grades_for
    //other should be whatever variation on class grades is being returned
    //weight should be grade_weight

    category = category.split(", ");
    var classroom = 'inp';
    var key = false;
    if (other.split(", ")[0] !== "N/A") {
        //if there have been grades input

        other = digify(other);
        key = true;

    } else {
        other = other.split(", ");
    }
    if (weight.split(", ")[0]!=="N/A") {
        //if there is a given weight
        weight = digify(weight);
    } else {
        weight = weight.split(", ");
    }
    //sets up table w/givens
    var content = "<table id = 'tab'>";
    content += "<tr><th></th><td class = 'Title'>Grades</td><td class = 'Title'>Weight</td></tr>";

    for (var x = 0; x < 5; x++) {
        if (key) {
            //checks grade value/whether it's good, bad, or middle
            if (other[x] === 0) {
                classroom = 'inp';
            } else if (other[x]<=50) {
                //color red
                classroom = 'bad';
            } else if (other[x] > 50 && other[x] < 90) {
                //color blue
                classroom = 'middle';
            } else {
                //color green
                classroom = 'good';
            }
        }
        //adds input areas to table
        content += "<tr><th class = 'caption' id = '" + category[x] + "'>" + category[x] + "</th>";
        content += "<td class = " + classroom + " id = '"+category[x]+"IValue'>"+"<input type = 'text' class = "+classroom+" id = '"+category[x]+"Input' value = '"+other[x]+"'></td>";
        content += "<td class = "+ classroom + " id = '"+category[x]+"WValue'>"+"<input type = 'text' class = "+classroom+" id = '"+category[x]+"Weight' value = '"+weight[x]+"'>%</td></tr>";
    }
    //adds desired
    content += "<tr class = 'simple'><th></th><td>I want a cumulative grade of...</td>";
    content += "<td><input title = 'desired' type = 'text' id = 'desired' value = 'N/A'></td></tr>";

    //buttons woo
    content += "<tr class = 'simple'><th id = 'buttons'></th>";
    content += "<td id = 'currentbutton'><button class = 'sub' onclick = 'currentGrade();'>Calculate Current Grade</button></td>";
    content += "<td id = 'finalbutton'><button class = 'sub' onclick = 'finalGrade();'>Calculate the Grade I Need</button></td></tr>";

    //shows results
    content += "<tr><th id = 'displays'></th><td id = 'displaysCurrent'>Your current grade is...</td>";
    content += "<td id = 'displaysFinal'>The grade you need on your final is...</td></tr>";
    document.getElementById("main").innerHTML = content + "</table>";
}


function sortInputs() {
    //takes all inputs from table

    //changes to usable values
    var arr = CLASS_GRADES.split(", ");
    var ray = GRADE_WEIGHT.split(", ");

    for (var z = 0; z < 5; z ++) {
        //changes to titles of input areas in table
        var str1 = GRADES_FOR.split(", ")[z]+"Input";
        //so the values can be taken
        arr[z] = " " + document.getElementById(str1).value;
        var str2 = GRADES_FOR.split(", ")[z]+"Weight";
        ray[z] = " " + document.getElementById(str2).value;
    }


    arr = arr.toString();
    arr = arr.substring(1, arr.length);
    CLASS_GRADES = arr;
    ray = ray.toString();
    ray = ray.substring(1, ray.length);

    //validates GRADE_WEIGHT
    var total = 0;
    var g = digify(ray);
    for (var b = 0; b < g.length; b++) {
        total += g[b];
    }
    if (total!==100) {
        document.getElementById("displaysCurrent").innerHTML = "Did you enter your grades correctly? Make sure your percentage weights add up to 100!";
        return 0;
    }

    GRADE_WEIGHT = ray;
    setTable(GRADES_FOR, CLASS_GRADES, GRADE_WEIGHT);
    return arr;
}

function finalGrade() {
    //finds final grade needed to get desired output using currentGrade

    var str = digify(CLASS_GRADES);
    var per = percentify(GRADE_WEIGHT);
    var grades = 0;
    for (var b = 0; b < 5; b ++) {
        grades += str[b] * per[b];
    }
    var weight = percentify(GRADE_WEIGHT)[4]; //weight of final

    var desired = parseInt(document.getElementById('desired').value);//desired grade

    if(desired > 110 || desired < 50) {
        document.getElementById("displaysFinal").innerHTML = "Are you sure that's the grade you want?";
        return 0;
    }

    //difference between desired grade and current grade
    var diff = desired - grades;

    //return val--difference of grades divided by weight of final
    var final = diff/weight;

    var highest = grades + 120*weight;

    if(final > 120) {
        var returnVal = "Are you sure you entered your grades correctly?";
        returnVal += " The highest possible grade you can get is a " + highest;
        returnVal += ", which requires a 120 on your final.";
        document.getElementById("displaysFinal").innerHTML = returnVal;
        //add highest possible grade w/these vals?
        return 0;
    }

    final = final.toString();
    if(final.length > 4) {
        final = final.substring(0,4);
        //cleans up sometimes messy value
        if(final[4]===".") {
            final = final.substring(0,3);
        }
    }

    if (final === "NaN") {
        document.getElementById("displaysFinal").innerHTML = "Make sure you entered the grade you want to get!";
        return 0;
    } else {
        document.getElementById("displaysFinal").innerHTML = " To get a cumulative "+desired+", you need to get "+final+" on your final.";
    }
    return final;
}

function digify(inp) {
    //turns input into number
    //comma-separated string to array
    var final = inp.split(", ");
    for (var x = 0; x < 5; x ++) {
        if(final[x] === "N/A") {
            //if the field was left blank
            //the value will be 0
            final[x] = 0;
        }
        //turns to int so other functions can use it
        final[x] = parseInt(final[x]);
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

function gradeify(inp) {
    //turns to letter grades
    inp = parseInt(inp);
    var returnVal = inp;
    if(inp>=90) {
        returnVal += ", an A!";
    } else if (inp >=80) {
        returnVal += ", a B.";
    } else if(inp >=70) {
        returnVal += ", a C.";
    } else if(inp>=60) {
        returnVal += ", a D.";
    } else {
        returnVal += ", an F!";
    }
    return returnVal;
}

function currentGrade() {
    //finds current grade
    if(sortInputs() === 0) {
        return 0;
    }
    var avg = averageify(sortInputs());//takes average of all grades (including any val for final)
    if(avg.toString().length>3) {//checks length and cleans up if necessary
        avg = avg.toString().substring(0, 3);
        avg = parseInt(avg);
    }
    if(avg>110 || avg < 10) {
        document.getElementById("displaysCurrent").innerHTML = "Are you sure you entered your grades correctly?";
        return 0;
    } else {
        avg = gradeify(avg);
    }
    document.getElementById("displaysCurrent").innerHTML = "Your current grade is "+avg;
    return avg;
}