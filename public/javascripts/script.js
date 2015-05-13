$(document).ready(function(){
    container = $('.js-assignments');

    getData();

    assignClicks();
});

var container;
var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

function getData(){
    $.ajax({
        url: '/assignments',
        data: {},
        method: 'get',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            console.log(data);
            clearData();
            appendData(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("Ajax Get Complete:", textStatus);
        }
    });
}


function deleteData(id){
    $.ajax({
        url: '/assignments/' + id,
        data: {},
        method: 'delete',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            getData();
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("Ajax Get Complete:", textStatus);
        }
    });
}


function clearData(){
    container.empty();
}

function appendData(assignments){

    for(var i = 0; i< assignments.length; i++){
        var assignment = assignments[i];

        var name = assignment.name || '';

        var date = new Date(assignment.date_completed);
        var day = date.getDate() || '';
        var monthIndex = date.getMonth() || -1;
        var year = date.getFullYear() || '';
        var month = monthIndex == -1 ? '' : monthNames[monthIndex];

        var score = assignment.score || 0;

        var section = $('<section/>');

        var ul = $('<ul/>')
            .appendTo(section);

        var liName = $('<li/>')
            .text('Name: ' + name)
            .appendTo(ul);


        var liScore = $('<li/>')
            .text('Score: ' + score)
            .appendTo(ul);


        var liDate = $('<li/>')
            .text('Date Completed: '+ day + ' ' + month + ' ' + year)
            .appendTo(ul);

        var btn = $('<button/>')
            .text('delete')
            .attr('id', assignment._id)
            .appendTo(ul);

        container.append(section);
    }
}

function assignClicks(){
    container.on('click', 'button', function(){
        var id = $(this).attr('id');
        deleteData(id);
    })
}