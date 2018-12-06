const { POST } = require('./CreateTest')



const samplePost ={
    author_email: "ribal@aladeeb.com",
    data: "testing posts from within node test"
}

POST('/test/posts', 'testing post persistence', samplePost,({ expect, res }) => {
    expect(res.body.success).to.equal(true)
    expect(res.body.message).to.equal('Post successfully saved to database')
})

// GET(`/test/posts/${samplePost.author_email}`, 'fetch samplePost', ({ expect, res }) => {
    // let postList = res.body.postList
    // if (postList.length<1){
        // expect(false).to.equal(true)
    // }
    // let success =false
    // for (let i=0;i<postList.length;i++){
        // if (postList[0].data == samplePost.data){
            // success =true
        // }
        // break
    // }
    // expect(success).to.equal(true)
// })


