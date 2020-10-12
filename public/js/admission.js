$(function () {
    $("#shortTerm").click(function () {
        if ($(this).is(":checked")) {
            $("#dvshortTerm").show();
        } else {
            $("#dvshortTerm").hide();
        }
    });

    $("#longTerm").click(function () {
        if ($(this).is(":checked")) {
            $("#dvlongTerm").show();
        } else {
            $("#dvlongTerm").hide();
        }
    });

    $("#interns").click(function () {
        if ($(this).is(":checked")) {
            $("#dvInterns").show();
        } else {
            $("#dvInterns").hide();
        }
    });
    $("#yesAccommodation").click(function () {
        if ($(this).is(":checked")) {
            $("#dvSupport").show();
        } else {
            $("#dvSupport").hide();
        }
    });
    $("#agreeTerm").click(function () {
        if ($(this).is(":checked")) {
            $("#sbAdmission").show();
        } else {
            $("#sbAdmission").hide();
        }
    });
    $("#agreeTerm").click(function () {
        if ($(this).is(":checked")) {
            $("#sbAdmission").show();
        } else {
            $("#sbAdmission").hide();
        }
    });
   
});
$(document).ready(function () {
    $('input[type="radio"]').click(function () {
        if ($(this).attr("value") == "Yes") {
            $("#dvSupport").show('slow');
        }
        if ($(this).attr("value") == "No") {
            $("#dvSupport").hide('slow');

        }
    });
});

// $(function show1(){
//       document.getElementById('dvSupport').style.display ='none';
//     });
// $(function show2(){
//       document.getElementById('dvSupport').style.display = 'block';
//     });
// $(function displayAdmission() {
//     document.getElementById('sbAdmission').disabled = !this.checked;
// });
