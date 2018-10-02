function validateForm() {
	//Variables
	var uname = document.getElementById("uname").value; 
	var password = document.getElementById("password").value;
	
	if (uname === ""){ //If it is blank
		document.getElementById("div1").innerHTML="Enter a valid username"; //Message
		document.getElementById("div1").style.color="Red"; //Color
	}
	else
	{
		document.getElementById("div1").innerHTML=""; //Otherwise write nothing
	}
	if (password === "" || password.length <= 5){ //If the password is blank or less (equal) than 5
		document.getElementById("div2").innerHTML="Enter a valid password"; //Message
		document.getElementById("div2").style.color="Red"; //Color
	}
	else
	{
		document.getElementById("div2").innerHTML="";
	}
}
			
$("#button1").on("click", function(s) { //If the login button is clicked
	s.preventDefault(); //prevents from opening a link
	//Variables
	var log = $("#log");
	$(".form_error").css("display", "none");
	var login = {user: $.trim(log.find("#uname").val()), pass: $.trim(log.find("#password").val()),}; //Gets the username and password from login page for endpoint
	if ((login.user === '') && (login.pass === '')) { //if it is blank
		/*Show messages below the login button*/
		$('#userError').text("Username must not be blank").show(); 
		$('#passError').text("Password must not be blank").show();
	} else if (login.pass === '') {
		$('#passError').text("Password cannot be blank").show();
	} else if (login.user === '') {
		$('#userError').text("Username cannot be blank").show();
	} else {
		$('#userError').text("Enter a valid username").show();
	}
	
	/*For backend request*/
	var backend = JSON.stringify(login);
	$.ajax({ type: "POST", // endpoint
	dataType: "json", crossDomain: true, data: backend,}).done(function(backend) { //For the backend request part
	}).fail(function(xhr) {
	document.getElementById("button1").disabled = false;
	$("#button1").html("Login");
	$(".alert").css("display", "block"); //Shows the CSS needed for the block alert
	})
});
			
$(function() { //Function for the remember me button checkbox, uses localStorage from browser
	if (localStorage.chkbx && localStorage.chkbx != '') {
		$('#rememberMe').attr('checked', 'checked');
		$('#password').val(localStorage.pass);
	} else {
		$('#rememberMe').removeAttr('checked');
		$('#password').val('');
	}
	$('#rememberMe').click(function() { //If the button rememberMe is clicked, do the function above
		if ($('#rememberMe').is(':checked')) { 
			localStorage.pass = $('#password').val(); //Stores infos
			localStorage.chkbx = $('#rememberMe').val(); //Stores infos
		} else {
			//Otherwises leave it blank
			localStorage.usrname = '';
			localStorage.pass = '';
			localStorage.chkbx = '';
		}
	});
});