const {db} = require("../firebase");
const {v4: uuidv4} = require("uuid");

const userRef = db.collection('users');

exports.addData = async (data) => {

    const uuid = uuidv4(null, null, null);
    //checking if data already exists;
    const userData = await userRef.where('email', '==', data.email).get();
    if (userData.empty){
        await userRef.doc(uuid.toString()).set(
            {
                ...data
            }
        );
        return uuid.toString();
    }else{
        return 400
    }

}

exports.findDataWithEmail = async (email) => {

    const userData = await userRef.where('email', '==', email).get();
    if (userData.empty){
        return 404

    }

    return userData;

}

exports.findDataWithId = async (id) => {

    const userData = await userRef.doc(id).get();
    if (userData.empty){
        return 404

    }

    return userData;

}

exports.update = async (id, data) => {
    return await userRef.doc(id).set({
        ...data
    }, {merge: true});
}