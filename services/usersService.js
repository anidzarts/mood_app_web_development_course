import { executeQuery } from "../database/database.js";


const getUsersItem = async(email) => {
    const res = await executeQuery("SELECT * FROM users WHERE email = $1", email.toLowerCase());
    if (!res) {
        return null;
    }

    return res.rowsOfObjects()[0];
}


const addUsersItem = async(email, password) => {
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2)", email.toLowerCase(), password);
}


export {getUsersItem, addUsersItem };