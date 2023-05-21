import LabsStore from "./LabsStore";
import UserStore from "./UserStore";


const state = {
    user: new UserStore(),
    labs: new LabsStore(),
}

export default state