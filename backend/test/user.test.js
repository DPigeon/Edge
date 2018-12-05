const { GET , POST} = require('./CreateTest');

GET('/test/users', 'Response should be list of users', ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.length).to.equal(8);
    expect(res.body[0].email).to.equal('d_pig@encs.concordia.ca');
    expect(res.body[7].email).to.equal('toto@tata');
});

const UserUpdateValidBody = {
    firstname: "toto",
    lastname: "tata",
    email: "toto@tata"
};

const UserUpdateInvalidBody = {
    lastname: "tata",
    email: "toto@tata"
};

POST('/test/user', 'Response should be success', UserUpdateValidBody, ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.success).to.equal(true);
});

POST('/test/user', 'Response should be failure', UserUpdateInvalidBody, ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(400);
    expect(res.body.error).to.equal("Please provide the user email and his name/lastname");
});

const UserPasswordValidBody = {
    password: "secret",
    email: "toto@tata"
};

const UserPasswordInvalidBody = {
    email: "toto@tata"
};

POST('/test/users/password', 'Response should be success', UserPasswordValidBody, ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.success).to.equal(true);
});

POST('/test/users/password', 'Response should be failure', UserPasswordInvalidBody, ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(400);
    expect(res.body.error).to.equal("Please provide the user email and new password");
});
