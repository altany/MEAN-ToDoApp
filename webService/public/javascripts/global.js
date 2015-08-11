// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/tasks', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowtask" rel="' + this._id + '">' + this.title + '</a></td>';
            tableContent += '<td>' + this.deadline + '</td>';
			tableContent += '<td>' + this.location + '</td>';
			tableContent += '<td>' + this.done + '</td>';
			tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td><a href="#" class="linkdeletetask" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#taskList table tbody').html(tableContent);
    });
};

 $('#btnAddTask').on('click', addTask);

// Add Task
function addTask(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
   
    if($('#inputTaskTitle').val() === '') { errorCount++; }
  

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newTask = {
            'title': $('#addTask fieldset input#inputTaskTitle').val(),
            'deadline': $('#addTask fieldset input#inputTaskDeadline').val(),
            'location': $('#addTask fieldset input#inputTaskLocation').val(),
			'done': $('#addTask fieldset input#inputTaskDone').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newTask,
            url: '/tasks/new',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addTask fieldset input').val('');
				// Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                console.log('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

 // Delete User link click
    $('#taskList table tbody').on('click', 'td a.linkdeletetask', deleteTask);

// Delete User
function deleteTask(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this task?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
		// If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/tasks/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
           if (typeof response.msg !== 'undefined' && response.msg!='') {
				console.log('Error: ' + response.msg);
			}
		   // Update the table
			populateTable();

           

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

 // Show task link click
    $('#taskList table tbody').on('click', 'td a.linkshowtask', showTask);

// Show Task
function showTask(event) {

    event.preventDefault();

	$.ajax({
		type: 'GET',
		url: '/tasks/' + $(this).attr('rel')
	}).done(function( response ) {

		// Check for a successful (blank) response
		if (typeof response.msg !== 'undefined' && response.msg!='') {
			console.log('Error: ' + response.msg);
		}
		else {

			// Update the infotable
			$('#updateTaskTitle').val(response.title);
			$('#updateTaskDeadline').val(response.deadline);
			$('#updateTaskLocation').val(response.location);
			$('#updateTaskId').text(response._id);
			$('#updateTaskDone').prop( 'checked', response.done );
			console.log(response.done, typeof response.done);
		}
	});

    

};

 $('#btnEditTask').on('click', editTask);

// Edit Task
function editTask(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    
    if($('#updateTaskTitle').val() === '') { errorCount++; }

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
		
        var updatedTask = {
            'title': $('#updateTaskTitle').val(),
            'deadline': $('#updateTaskDeadline').val(),
            'location': $('#updateTaskLocation').val(),
			'done': $('#updateTaskDone').prop('checked')
        }
		console.log(updatedTask);
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'PUT',
            data: updatedTask,
            url: '/tasks/'+ $('#updateTaskId').text(),
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (typeof response.msg !== 'undefined' && response.msg!='') {
				 // If something goes wrong, alert the error message that our service returned
                console.log('Error: ' + response.msg);


            }
            else {
				
                // Clear the form inputs
                $('#editTask fieldset input').val('');
				$('#updateTaskId').text('');
				 // Update the table
                populateTable();
               
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please give a title');
        return false;
    }
};
