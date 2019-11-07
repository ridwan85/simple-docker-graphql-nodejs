const chai = require("chai");

const expect = chai.expect;
const url = "http://localhost:4000/";
const request = require("supertest")(url);
const should = require("chai").should();

describe("Pets", () => {
    // Tests
    it("Returns pet with id = 'bO7Fabrhahh66Jb0TSN64XMD1OxTHK8X' and their owner", done => {
        request
            .post('graphql')
            .send({
                query: `{ 
                    pet(id:"bO7Fabrhahh66Jb0TSN64XMD1OxTHK8X") {
                        id
                        name
                        age
                        breed
                        colour
                        ownerId
                        owner {
                          name
                          address
                          email
                        },
                        animal {
                          name
                          description
                        }
                      }
                }`
            })
            .expect(200)
            .end((err, res) => {
                // res will contain data for one pet
                if (err) return done(err);
                should.exist(res.body);
                let data = res.body.data.pet;
                data.should.have.property("id");
                data.should.have.property("name");
                data.should.have.property("age");
                data.should.have.property("breed");
                data.should.have.property("colour");
                data.should.have.property("ownerId");
                data.should.have.property("owner");
                data.should.have.property("animal");

                done();
            });
    });

    it("Returns all pets and their owner", done => {
        request
            .post("graphql")
            .send({
                query: `{ 
                    pets {
                        id
                        name
                        age
                        breed
                        colour
                        ownerId
                        owner {
                          name
                          address
                          email
                        },
                        animal {
                          name
                          description
                        }
                      }
                }`
            })
            .expect(200)
            .end((err, res) => {
                // res will contain array of all pets
                if (err) return done(err);
                should.exist(res.body);
                let data = res.body.data.pets;
                for (var i in data) {
                    data[i].should.have.property("id");
                    data[i].should.have.property("name");
                    data[i].should.have.property("age");
                    data[i].should.have.property("breed");
                    data[i].should.have.property("colour");
                    data[i].should.have.property("ownerId");
                    data[i].should.have.property("owner");
                    data[i].should.have.property("animal");
                }
                done();
            });
    });

    //   it("Add pets", done => {
    //     request
    //       .post("graphql")
    //       .send({
    //         query: `
    //        mutation { 
    //         addPet(
    //             name:"Felix",
    //             colour:"Pink",
    //             breed:"Siamese Cat",
    //             age:1,
    //             ownerId:"3QDFxuWPSuNQ6JmxIy54U2SJdKeqzrWz",
    //              animalId:"eCi7shetqUZJFrmiDCn1W8P3HgVzpIx2",
    //             ){
    //                 id,
    //                 name,
    //                 colour,
    //                 breed,
    //                 age,
    //                 ownerId,
    //                 animalId,
    //                 owner{
    //                     name
    //                 }
    //              }
    //         }`
    //       })
    //       .expect(200)
    //       .end((err, res) => {
    //         // res will contain array of all pets
    //         if (err) return done(err);
    //         should.exist(res.body);
    //         let data = res.body.data.addPet;
    //         data.should.have.property("id");
    //         data.should.have.property("name");
    //         data.should.have.property("breed");
    //         data.should.have.property("colour");
    //         data.should.have.property("age");
    //         data.should.have.property("ownerId");
    //         data.should.have.property("animalId");
    //         data.should.have.property("owner");
    //         done();
    //       });
    //   });

    it("Update pet with id = 'bO7Fabrhahh66Jb0TSN64XMD1OxTHK8X'", done => {
        request
            .post("graphql")
            .send({
                query: `
                mutation { 
                  updatePet(
                      id:"bO7Fabrhahh66Jb0TSN64XMD1OxTHK8X",
                      name:"Fluffy",
                      colour:"Brown",
                      breed:"Bulldog",
                      age:3,
                      ownerId:"3QDFxuWPSuNQ6JmxIy54U2SJdKeqzrWz",
                      animalId :"nN5rd03PprEfPMdKesVeWQLgrraSu0Zu"
                      ){
                          id,
                          name,
                          colour,
                          breed,
                          age,
                          ownerId,
                          owner{
                              name
                          }
                      }
                  }`
            })
            .expect(200)
            .end((err, res) => {
                // res will contain array of all users
                if (err) return done(err);
                should.exist(res.body);
                let data = res.body.data.updatePet;
                data.should.have.property("id");
                data.should.have.property("name");
                data.should.have.property("breed");
                data.should.have.property("colour");
                data.should.have.property("age");
                data.should.have.property("ownerId");
                data.should.have.property("owner");
                done();
            });
    });

    it("Delete pet with id = '6tP4m1XrUpcdRvUKQn6jN28A8PN8P5ZH'", done => {
        request
            .post("graphql")
            .send({
                query: `
                mutation { 
                  deletePet(
                      id:"6tP4m1XrUpcdRvUKQn6jN28A8PN8P5ZH",
                    ) {
                      id
                    }
                  }`
            })
            .expect(200)
            .end((err, res) => {
                // res will contain array of all users
                if (err) return done(err);
                should.exist(res.body);
                let data = res.body.data.deletePet;
                data.should.have.property("id");
                done();
            });
    });

});