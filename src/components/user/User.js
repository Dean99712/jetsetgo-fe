import {getUserByEmail} from "../../services/UserService";

export const getUser = async (id) => {
    await getUserByEmail(id)
        .then(res => res.data)
}