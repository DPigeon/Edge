var attempt = 3; // nubmber of attempts to log in.(can chnage)
//function to check for correctness. 
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if ( username == "Formget" && password == "formget#123"){
alert ("Login successfully");
window.location = ""; // Redirecting to other page?????????????????.
return false;
}
else{
attempt --;// lose attempt.
alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}