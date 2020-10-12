$(document).ready(() => {
    //Table luu hoc sinh tiep nhan moi
    $('#newStudent').DataTable({ 
         "ajax": {
             "url": "/admin/dashboard",
             "type": "POST",
             "dataType": "json",
             "dataSrc": "data",
         },
         dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ],
         "columns": [
            { "data": "username" },
            { "data": "nationallity" },
            { "data": "major" },
            { "data": "degree" },
            { "data": "kindsOfEnrollment" },
            { "data": "termYear" },
            
        ],
        
    });

    //Table luu hoc sinh dang hoc
    $('#studentStudy').DataTable({ 
         "ajax": {
             "url": "http://127.0.0.1:3000/api/v1/students/studentStudy",
             "type": "GET",
             "dataType": "json",
             "dataSrc": "studentActive",
         },
         dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ],
         "columns": [
            { "data": "username" },
            { "data": "birthOfDay" },
            { "data": "gender" },
            { "data": "passportNumber" },
            { "data": "address" },
            { "data": "nationallity" },
            { "data": "degree" },
            { "data": "major" },
            { "data": "termYear" },
            { "data": null, render: function(data, type, row) {
                return data === 'no data'
            } },
            { "data": "kindsOfEnrollment" },   
        ],
    });
    //Table luu hoc sinh ve nuoc
    $('#studentBackHome').DataTable({ 
         "ajax": {
             "url": "http://127.0.0.1:3000/api/v1/students/studentBackHome",
             "type": "GET",
             "dataType": "json",
             "dataSrc": "studentBackHome",
         },
         dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ],
         "columns": [
            { "data": "username" },
            { "data": "nationallity" },
            { "data": "major" },
            { "data": "degree" },
            { "data": "kindsOfEnrollment" },
            { "data": "termYear" },    
        ],
    });
});