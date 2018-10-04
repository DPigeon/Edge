
function validateForm() {
	//Variables
	var uname = document.getElementById("uname").value; 
	var passWord = document.getElementById("password").value;
	if (uname === ""){ //If it is blank
		document.getElementById("div1").innerHTML="Enter a valid username"; //Message
		document.getElementById("div1").style.color="Red"; //Color
	}
	else
	{
		document.getElementById("div1").innerHTML=""; //Otherwise write nothing
	}
	if (passWord === "" || passWord.length <= 5){ //If the password is blank or less (equal) than 5
		document.getElementById("div2").innerHTML="Enter a valid password"; //Message
		document.getElementById("div2").style.color="Red"; //Color
	}
	else
	{
		document.getElementById("div2").innerHTML="";
	}
}

function pushButton() { //send json request to server
	//Variables
	var uname = document.getElementById("uname").value; 
	var passWord = document.getElementById("password").value;
	var login = {user: uname, pass: passWord}; //Gets the username and password from login page for endpoint
	var data = JSON.stringify(login);
	if(uname === "" && passWord === ""){
		document.getElementById("div4").innerHTML="Fill in the fields please"; //Message
		document.getElementById("div4").style.color="Red"; //Color
	}
	$.ajax({
			url: 'http://localhost:9090/login/khh',
			type: "POST",
			data: data,
			dataType: "json",
			}).done(function(data) {
				alert("Test Succesfull");
			}).fail(function(xhr) {
				document.getElementById("div3").innerHTML="Username and password do not match."; //Message
				document.getElementById("div3").style.color="red"; //Color
	});
	
}
						
$(function() { //Function for the remember me button checkbox, uses localStorage from browser
	var usrname = localStorage.getItem("usrname"); $('#uname').val();
    var pass = localStorage.getItem("pass"); $('#password').val();
    var chkbx = localStorage.getItem("chkbx"); $('#rememberMe').val();
	if (localStorage.chkbx && localStorage.chkbx != '') {
		$('#rememberMe').attr('checked', 'checked');
		$('#uname').val(localStorage.usrname);
		$('#password').val(localStorage.pass);
	} else {
		$('#rememberMe').removeAttr('checked');
		$('#uname').val('');
		$('#password').val('');
	}
	$('#rememberMe').click(function() { //If the button rememberMe is clicked, do the function above
		if ($('#rememberMe').is(':checked')) { 
			localStorage.usrname = $('#uname').val();
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
	
  	//caps lock verification function
	function isCapsLockOn(e) {
		var keyCode = e.keyCode ? e.keyCode : e.which;
		var shiftKey = e.shiftKey ? e.shiftKey : ((keyCode == 16) ? true : false);
		return (((keyCode >= 65 && keyCode <= 90) && !shiftKey) || ((keyCode >= 97 && keyCode <= 122) && shiftKey))
	}
	function showCapsLockMsg(e) {
		var warningElement = document.getElementById('capsLockWarning');
		if (isCapsLockOn(e))
			warningElement.style.display = 'block';
		else
			warningElement.style.display = 'none';
	}
	document.onkeypress = function (e) {
		e = e || window.event;
		showCapsLockMsg(e);
	}

