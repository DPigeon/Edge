function validateForm() {
	var uname = document.getElementById("uname").value;
	var password = document.getElementById("password").value;
	if (uname === ""){
		document.getElementById("div1").innerHTML="Enter a valid username";
		document.getElementById("div1").style.color="Red";
	}
	else
	{
		document.getElementById("div1").innerHTML="";
	}
	if (password === "" || password.length <= 5){
		document.getElementById("div2").innerHTML="Enter a valid password";
		document.getElementById("div2").style.color="Red";
	}
	else
	{
		document.getElementById("div2").innerHTML="";
	}
}
			
$("#button1").on("click", function(s) {
	s.preventDefault(); //prevents from opening a link
	var log = $("#log");
	$(".form_error").css("display", "none");
	var login = {user: $.trim(log.find("#uname").val()), pass: $.trim(log.find("#password").val()),};
	if ((login.user === '') && (login.pass === '')) { //if it is blank
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
	dataType: "json", crossDomain: true, data: backend,}).done(function(backend) {
	}).fail(function(xhr) {
	document.getElementById("button1").disabled = false;
	$("#button1").html("Login");
	$(".alert").css("display", "block");
	})
});
			
$(function() {
	if (localStorage.chkbx && localStorage.chkbx != '') {
		$('#rememberMe').attr('checked', 'checked');
		$('#password').val(localStorage.pass);
	} else {
		$('#rememberMe').removeAttr('checked');
		$('#password').val('');
	}
	$('#rememberMe').click(function() {
		if ($('#rememberMe').is(':checked')) { 
			localStorage.pass = $('#password').val();
			localStorage.chkbx = $('#rememberMe').val();
		} else {
			localStorage.usrname = '';
			localStorage.pass = '';
			localStorage.chkbx = '';
		}
	});
});