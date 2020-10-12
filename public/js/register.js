$(document).ready(() => {

    $('#myTable').DataTable({ 
       "processing": true,
        "ajax": {
            "url": "/admin/list-student-register",
            "type": "POST",
            "dataSrc": ""
        },
        dom: 'Bfrtip',
       buttons: [
           'copyHtml5',
           'excelHtml5',
           'csvHtml5',
       ],
        "columns": [
           { "data": "username" },
           { "data": "englishName" },
           { "data": "nationallity" },
           { "data": "gender" },
           { "data": "birthOfDay" },
           { "data": "career" },
           { "data": "email" },
           { "data": "passportNumber" },
           { "data": "address" },
           { "data": "nameOfInstitution" },
           { "data": "timeOfStudy" },
           { "data": "program" },
           { "data": "degree" },
           { "data": "termYear" },
       ],
    });
     
});