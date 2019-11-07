"use strict";
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require("graphql");

const fs = require("fs");

const ownerType = new GraphQLObjectType({
  description :"Owner Data type",
  name: "owner",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: { type: GraphQLString },
      address: { type: GraphQLString },
      phone: { type: GraphQLString },
      email: { type: GraphQLString },
      pet: {
        type: new GraphQLList(petType),
        resolve(root, args) {
          return new Promise((resolve, reject) => {
            try {
              fs.readFile("data/pets.json", "utf8", (err, jsonData) => {
                if (err) reject(err);
                if (!jsonData) {
                  let data = [];
                  resolve(data);
                } else {
                  let arr = JSON.parse(jsonData);
                  let filtered = arr.filter(item => {
                    return item.ownerId == root.id;
                  });
                  resolve(filtered);
                }
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
        }
      }
    };
  }
});

const petType = new GraphQLObjectType({
  description :"Pet Data type",
  name: "pet",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      ownerId: { type: GraphQLString },
      name: { type: GraphQLString },
      colour: { type: GraphQLString },
      age: { type: GraphQLInt },
      breed: { type: GraphQLString },
      owner: {
        type: ownerType,
        resolve(root, args) {
          return new Promise((resolve, reject) => {
            try {
              fs.readFile("data/owners.json", "utf8", (err, jsonData) => {
                if (err) reject(err);
                if (!jsonData) {
                  let data = [];
                  resolve(data);
                } else {
                  console.log("ROOT", root);
                  let arr = JSON.parse(jsonData);
                  console.log(arr);
                  let filtered = arr.filter(item => {
                    return item.id == root.ownerId;
                  });
                  //return only single data as a pet belong to 1 owner
                  resolve(filtered[0]);
                }
              });
            } catch (err) {
              console.log(err);
            }
          });
        }
      }
    };
  }
});

module.exports = { petType, ownerType };
