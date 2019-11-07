const chai = require("chai");

const expect = chai.expect;
const url = `http://localhost:4000/`;
const request = require("supertest")(url);
const should = require("chai").should();

describe("Owners", () => {
  // Tests
  it('Returns owner with id = "3QDFxuWPSuNQ6JmxIy54U2SJdKeqzrWz" and their pets', done => {
    request
      .post("graphql")
      .send({
        query: `{ 
            owner (id: "3QDFxuWPSuNQ6JmxIy54U2SJdKeqzrWz") 
            { id 
              name 
              address 
              phone 
              email 
              pet { 
                  name 
                  breed 
                  colour 
                  age
                } 
            } 
        }`
      })
      .expect(200)
      .end((err, res) => {
        // res will contain data for one owner
        if (err) return done(err);
        should.exist(res.body);
        let data = res.body.data;
        data.owner.should.have.property("id");
        data.owner.should.have.property("name");
        data.owner.should.have.property("address");
        data.owner.should.have.property("phone");
        data.owner.should.have.property("email");
        data.owner.should.have.property("pet");
        done();
      });
  });

  it("Returns all owners with their pets", done => {
    request
      .post("graphql")
      .send({
        query: `{ 
            owners { 
              id 
              name 
              address 
              phone 
              email 
              pet { 
                  name 
                  breed 
                  colour 
                  age
                } 
            } 
        }`
      })
      .expect(200)
      .end((err, res) => {
        // res will contain array of all owners
        if (err) return done(err);
        should.exist(res.body);
        let data = res.body.data.owners;
        for (var i in data) {
          data[i].should.have.property("id");
          data[i].should.have.property("name");
          data[i].should.have.property("address");
          data[i].should.have.property("phone");
          data[i].should.have.property("email");
          data[i].should.have.property("pet");
        }
        done();
      });
  });
});
