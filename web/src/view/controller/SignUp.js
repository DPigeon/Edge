$.validator.setDefaults({
	highlight: (element) => {
		$(element).removeClass("is-valid");
		$(element).addClass("is-invalid");
	},
	unhighlight: (element) => {
		$(element).removeClass("is-invalid");
		$(element).addClass("is-valid");
	},
	errorElement: 'div',
	errorClass: 'invalid-feedback',
});

$("#FormRegister").validate({
	rules: {
		firstname: {
			required: true,
			minlength: 2
		},
		lastname: {
			required: true,
			minlength: 2
		},
		password: {
			required: true,
			minlength: 8
		},
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		firstname: {
			required: "Your first name is required",
			minlength: jQuery.validator.format("Your first name should be at least {0} characters long")
		},
		lastname: {
			required: "Your last name is required",
			minlength: jQuery.validator.format("Your first name should be at least {0} characters long")
		},
		password: {
			required: "A password is required",
			minlength: jQuery.validator.format("Your password should be at least {0} characters long")
		},
		email: {
			required: "An email is required",
			email: "Your email should be a valid one"
		}
	},
	errorPlacement: (error, element) => {
		console.log(element.attr('id'));
		switch(element.attr('id')) {
			case "InputFirstName":
				error.appendTo($("#ErrorMessageFirstName"));
				break;
			case "InputLastName":
				error.appendTo($("#ErrorMessageLastName"));
				break;
			case "InputEmail":
				error.appendTo($("#ErrorMessageEmail"));
				break;
			case "InputPassword":
				error.appendTo($("#ErrorMessagePassword"));
				break;
		}
	},
	submitHandler: (form) => {
		let data = {
			firstname: $("#InputFirstName").val(),
			lastname: $("#InputLastName").val(),
			email: $("#InputEmail").val(),
			password: $("#InputPassword").val(),
			teacher: $("#CheckBoxTeacher").is(":checked")
		};

    console.log("Data " + $(form).serialize());

		request = $.ajax({
			type: "POST",
			cache: false,
      url: "/signup/parent", // signup/parent || /signup/teacher
      dataType: "json",
      data: $(form).serialize(),
//			data: JSON.stringify(data),
			timeout: 3000
		});

		request.done((data, textStatus, jqXHR) => {
			console.log("Request good");
			console.log("Answer : " + data, textStatus);
			console.log(jqXHR);
			alert("You have been registered !");
		});

		request.fail((jqXHR, textStatus, errorThrown) => {
			console.log("Request fail");
			console.log("Answer : " + textStatus, errorThrown);
			console.log(jqXHR);
      alert("An error occurred, please try again or input valid information");
    });
	}
});
