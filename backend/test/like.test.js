const { POST } = require('./CreateTest')

const sampleLike = {
    author_email:"ribal@aladeeb.com",
    post_id :6
}

POST('/test/likes','testing persistence of likes',sampleLike,({expect,res})=>{
    expect(res.body.success).to.equal(false)
    expect(res.body.message.code).to.equal('ER_DUP_ENTRY')
})
