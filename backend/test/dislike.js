const { POST } = require('./CreateTest')


const sampleDislike = {
    author_email: "tata@toto",
    post_id: 6,
    dislike: true
}


POST('/test/likes', 'testing persistence of likes', sampleDislike, ({ expect, res }) => {
    expect(res.body.success).to.equal(false)
    expect(res.body.message.code).to.equal('ER_DUP_ENTRY')
})
