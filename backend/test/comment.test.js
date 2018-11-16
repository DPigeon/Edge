const { POST } = require('./CreateTest')

const sampleComment ={
    author_email: "ribal@aladeeb.com",
    data: "testing a comment from within node js",
    post_id: 6
}

POST('/test/comments', 'testing comment persistence',sampleComment,({expect,res})=>{
    expect(res.body.success).to.equal(true)
    expect(res.body.message).to.equal('Comment successfully saved to database')
})
