import { add as addPet } from "./pet/AddPet";
import { update as updatePet } from "./pet/UpdatePet";
import { remove as deletePet } from "./pet/DeletePet";

import { add as addOwner } from "./owner/AddOwner";
import { update as updateOwner } from "./owner/UpdateOwner";
import { remove as deleteOwner } from "./owner/DeleteOwner";

module.exports = {
    addPet,
    updatePet,
    deletePet,
    addOwner,
    updateOwner,
    deleteOwner
};