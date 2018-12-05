const { GET , POST} = require('./CreateTest');

GET('/test/groups', 'Response should be list of groups', ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.length).to.equal(5);
    expect(res.body[0].name).to.equal('The NHLs');
    expect(res.body[4].name).to.equal('Request testing');
});

GET('/test/groups/52', 'Response should be group with id 52', ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.id).to.equal(52);
});

GET('/test/groups/52/members', 'Response should be members of group with id 52', ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.length).to.equal(2);
    expect(res.body[0].user_id).to.equal("d_pig@encs.concordia.ca");
    expect(res.body[1].user_id).to.equal("ritu329@gmail.com");
});
