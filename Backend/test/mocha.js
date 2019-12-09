var assert = require('assert')
var supertest = require('supertest')
var should = require('should')

var server = supertest.agent('http://localhost:3001')

// Unit Test begin
describe('MochaTest', function () {
  // Login
  it('should login user', function (done) {
    server
      .post('/login')
      .send({ email: 'arunbijjala@gmail.com', password: 'password' })
      .expect(200)
      .end(function (err, res) {
        console.log('Status: ', res.status)
        res.status.should.equal(200)
        done()
      })
  })

//   Signup
  it("should add new user", function(done) {
      server
          .post("/signup")
          .send({
              
              email: "test@gmail.com",
              password: "pass",
            
          })
          .expect(200)
          .end(function(err, res) {
              console.log("Status: ", res.status);
              res.status.should.equal(200);
              done();
          });
  });

  // menu details
  it('Should get menu details for a particular menuid', function (done) {
    server
      .get('/menudetails')
      .send({
        id: 3
      })
      .expect(200)
      .end(function (err, res) {
        console.log('Status: ', res.status)
        res.status.should.equal(200)
        done()
      })
  })

  // User Profile
  it('Should fetch user profile details', function (done) {
    server
      .get('/userprofile')
      .query({ email: 'kiranbijjala@gmail.com' })
      .expect(200)
      .end(function (err, res) {
        console.log('Status: ', res.status)
        res.status.should.equal(200)
        done()
      })
  })

  
  //   //
   

    it('should login user', function (done) {
        server
          .post('/ownerlogin')
          .send({ email: 'jp@gmail.com', password: 'password' })
          .expect(200)
          .end(function (err, res) {
            console.log('Status: ', res.status)
            res.status.should.equal(200)
            done()
          })
        })
})