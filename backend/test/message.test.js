const { GET , POST} = require('./CreateTest');

GET('/test/messages/37', 'Response should be message with id 37', ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.id).to.equal(37);
    expect(res.body.thread_id).to.equal(50);
    expect(res.body.data).to.equal("This is a message");
});

GET('/test/threads/50/messages', 'Response should be list of messages in thread 50', ({expect, res}) => {
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.length).to.equal(5);
    expect(res.body[0].id).to.equal(34);
    expect(res.body[4].id).to.equal(38);
});
