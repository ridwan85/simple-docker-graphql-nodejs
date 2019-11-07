"use strict";
const { GraphQLNonNull, GraphQLString } = require("graphql");
const ownerType = require("../../Types");
const fs = require("fs");
const random = require("randomstring");

exports.add = {
  description : "This action will add single owner into the system",
  type: ownerType.ownerType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    address: {
      type: new GraphQLNonNull(GraphQLString)
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, args) => {
    //under the resolve method we get our arguments
    //generate random id using randomstring library
    args.id = random.generate();

    return new Promise((resolve, reject) => {
      try {
        fs.readFile("data/owners.json", "utf8", (err, jsonData) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (!jsonData) {
              //empty data
              //so add new data into it
              let arr = [];
              arr.push(args);
              let data = JSON.stringify(arr);
              //save to a json file
              fs.writeFileSync("data/owners.json", data);
              resolve(args);
            } else {
              //already have some data
              let arr = JSON.parse(jsonData);
              //push new data
              arr.push(args);
              let data = JSON.stringify(arr);
              //save to a json file
              fs.writeFileSync("data/owners.json", data);
              resolve(args);
            }
          }
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
};
