const app = require('../Controller')
const chai = require('chai')
  ,chaiHttp = require('chai-http')
  chai.use(chaiHttp)
  const expect = chai.expect
// https://mochajs.org/
module.exports.GET =  function (APIroute, description, handler) {
describe(`● [${APIroute}] route test`, ()=> {
  it(description, done => {

    chai.request(app)
    .get(APIroute)
    .then(async res => {
        await handler({expect, res})
        done()

    }).catch( err => {

        done(err)
    })

  })
})}

module.exports.POST =  function (APIroute, description, data, handler) {
  describe(`● [${APIroute}] route test`, ()=> {
    it(description, done => {

      chai.request(app)
      .post(APIroute)
      .send(data)
      .then(async res => {
          await handler({expect, res})
          done()

      }).catch( err => {

          done(err)
      })

    })
  })}


module.exports.DELETE =  function (APIroute, description, data, handler) {
  describe(`● [${APIroute}] route test`, ()=> {
    it(description, done => {

      chai.request(app)
      .delete(APIroute)
      .send(data)
      .then(async res => {
          await handler({expect, res})
          done()

      }).catch( err => {

          done(err)
      })

    })
  })}


  module.exports.PUT =  function (APIroute, description, data, handler) {
    describe(`● [${APIroute}] route test`, ()=> {
      it(description, done => {

        chai.request(app)
        .put(APIroute)
        .send(data)
        .then(async res => {
            await handler({expect, res})
            done()

        }).catch( err => {

            done(err)
        })

      })
    })}
