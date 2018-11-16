const { GET } = require('./CreateTest')

GET('/', 'message should say healthy', ({expect, res}) => {
    console.log(res.body)
    expect(res.body.response).to.equal('hello world')
    expect(res.body.method).to.equal('GET')
})
