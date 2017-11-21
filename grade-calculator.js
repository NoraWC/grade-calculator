/* Grade Calculator Nora Coates
*
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
    var lock = false;

    for (var count = 0; count < category.length; count ++) {
        if (other.split(", ")[count]!=="N/A") {
            //if there have been grades input
            key = true;
        }
        if (weight.split(", ")[count]!=="N/A") {
            //if there is a given weight
            lock = true;
        }
    }
    if(key) {
        other = digify(other);
    } else {
        other = other.split(", ");
    }

    if (lock) {
        weight = digify(weight);
    } else {
        weight = weight.split(", ");
    }

    //sets up first part of html table
    var content = "<table id = 'tab'>";
    content += "<tr><th></th><td class = 'Title'>Grades</td><td class = 'Title'>Weight</td></tr>";

    //checks grade value and color codes
    for (var x = 0; x < 5; x++) {
        if (key) {
            if (other[x] === 0) {
                //placeholder (resets color values)
                classroom = 'inp';
            } else if (other[x]<=50) {
                //red
                classroom = 'bad';
            } else if (other[x] < 90) {
                //blue
                classroom = 'middle';
            } else if (other[x] < 120) {
                //green
                classroom = 'good';
            }
        }
        //add input areas to table
        content += "<tr><th class = 'caption' id = '" + category[x] + "'>" + category[x] + "</th>";
        content += "<td class = " + classroom + " id = '"+category[x]+"IValue'>"+"<input type = 'text' class = "+classroom+" id = '"+category[x]+"Input' value = '"+other[x]+"'></td>";
        content += "<td class = "+ classroom + " id = '"+category[x]+"WValue'>"+"<input type = 'text' class = "+classroom+" id = '"+category[x]+"Weight' value = '"+weight[x]+"'>%</td></tr>";
    }
    //add desired
    content += "<tr><th></th><td>Enter your desired grade:</td>";
    content += "<td><input title = 'desired' type = 'text' id = 'desired' value = 'N/A'></td></tr>";

    //add buttons
    content += "<tr><th id = 'buttons'></th>";
    content += "<td class = 'sub'><button id = 'total' onclick = 'currentGrade();'>Calculate Your Current Grade</button></td>";
    content += "<td class = 'sub'><button id = 'end' onclick = 'finalGrade();'>Calculate the Grade You Need</button></td></tr>";

    //show results
    content += "<tr><th id = 'displays'></th><td class = 'showOff' id = 'displaysCurrent'>Your current total grade in this class is... </td>";
    content += "<td class = 'showOff' id = 'displaysFinal'>The grade you need on your final is... </td></tr>";
    document.getElementById("main").innerHTML = content + "</table>";
}


function sortInputs() {
    //takes all inputs from table

    //changes to usable values
    var arr = CLASS_GRADES.split(", ");
    var ray = GRADE_WEIGHT.split(", ");

    for (var z = 0; z < 5; z ++) {
        //replaces placeholders with user values from table
        var str1 = GRADES_FOR.split(", ")[z]+"Input";
        arr[z] = " " + document.getElementById(str1).value;
        var str2 = GRADES_FOR.split(", ")[z]+"Weight";
        ray[z] = " " + document.getElementById(str2).value;
    }

    //cleans up values and turns to string
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

    //validates grade vals
    var key = true;
    var x = digify(arr);
    for (var i =0; i< x.length; i ++) {
        if(x[i] < 0 || x[i] > 120) {
            key = false;
        }
    }

    if (total!==100 || !key) {
        document.getElementById("displaysCurrent").innerHTML = "Check the values you entered. Do the grade weights add up to 100? Even if you don't have a grade for a category, enter the weight.";
        return 0;
    }

    GRADE_WEIGHT = ray;
    //resets table with user values
    setTable(GRADES_FOR, CLASS_GRADES, GRADE_WEIGHT);
    return arr;
}

function finalGrade() {
    //finds final grade needed to get desired output by using currentGrade
    var str = digify(CLASS_GRADES);
    var per = percentify(GRADE_WEIGHT);
    var grades = 0;
    for (var b = 0; b < 5; b ++) {
        grades += str[b] * per[b];
    }
    //weight of final
    var weight = percentify(GRADE_WEIGHT)[4];

    //desired grade
    var desired = parseInt(document.getElementById('desired').value);

    //validates desired
    if(desired > 110 || desired < 50) {
        document.getElementById("displaysFinal").innerHTML = "Are you sure that's the grade you want?";
        return 0;
    }

    //difference between desired grade and current grade
    var diff = desired - grades;

    //return val(difference of grades divided by weight of final)
    var final = diff/weight;

    //the highest possible cumulative grade given other grades
    var highest = grades + 120*weight;

    //if the desired grade is unreasonably high
    if(final > 120) {
        document.getElementById("displaysFinal").innerHTML = "The highest grade you can get is a " + highest+", which requires a 120 on your final.";
        return 0;
    }

    if (final < 50 || desired < grades) {
        //if the user has low expectations
        var deer = "Are you sure that's the grade you want? Your current grade is already higher than that. ";
        deer += "If you get a 120 on your final, you could get a " + highest + ".";
        document.getElementById("displaysFinal").innerHTML = deer;
        return 0;
    }

    final = Math.round(final);
    final = final.toString();

    if (final === "NaN") {
        document.getElementById("displaysFinal").innerHTML = "Make sure you entered the grade you want to get!";
        return 0;
    } else {
        document.getElementById("displaysFinal").innerHTML = "The grade you need on your final is "+final;
    }
    return final;
}

function digify(inp) {
    //turns input from comma-separated string into array of numbers

    //converts to array
    var final = inp.split(", ");
    for (var x = 0; x < 5; x ++) {
        if(final[x] === "N/A") {
            //if the field was left blank, the value will be 0
            final[x] = 0;
        }
        final[x] = parseInt(final[x]);
    }
    return final;
}

function percentify(inp) {
    //turns comma-separated string into array of percentages

    //turns inp to int
    inp = digify(inp);
    for (var x = 0; x < 5; x ++) {
        //divide into percentage
        inp[x] = inp[x]/100;
    }
    return inp;

}

function averageify(inp) {
    //takes the average of the input (as an array)

    //turns inputted string value into array of numbers
    var str = digify(inp);
    //turns grade weight into array of percentages
    var per = percentify(GRADE_WEIGHT);
    //return value
    var baseline = 0;
    for (var b = 0; b < 5; b ++) {
        //if the final value is empty
        if(str[4] === 0 || str[4] === "N/A") {
            //distribute that weight among the other categories to avoid bad math
            var beg = per[4];
            per[b] += beg/4;
        }
        //add the grade value multiplied by the percentage weight
        baseline += str[b] * per[b];
    }
    return baseline;
}

function gradeify(inp) {
    //turns string input to letter grade

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

    //if there was bad data input, it won't run
    if(sortInputs() === 0) {
        return 0;
    }
    //takes average of all grades (including any value for the final)
    var avg = averageify(sortInputs());
    //cleans up grade average
    avg = Math.round(avg);
    //if the average is ridiculously high or low
    if(avg>120 || avg <= 5) {
        document.getElementById("displaysCurrent").innerHTML = "Are you sure you entered your grades correctly?";
        return 0;
    } else {
        //otherwise, concatenate a letter grade
        avg = gradeify(avg);
    }
    document.getElementById("displaysCurrent").innerHTML = "Your current grade is "+avg;
    return avg;
}
