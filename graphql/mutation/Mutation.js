const addPet = require("./pet/AddPet").add;
const updatePet = require("./pet/UpdatePet").update;
const deletePet = require("./pet/DeletePet").remove;

const addOwner = require("./owner/AddOwner").add;
const updateOwner = require("./owner/UpdateOwner").update;
const deleteOwner = require("./owner/DeleteOwner").remove;

module.exports = {
  addPet,
  updatePet,
  deletePet,
  addOwner,
  updateOwner,
  deleteOwner
};
