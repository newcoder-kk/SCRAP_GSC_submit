const {db} = require("../firebase");
const {v4: uuidv4} = require("uuid");

const scoreRef = db.collection('scores');

exports.addScore = async (data) => {

    const uuid = uuidv4(null, null, null);
    //checking if data already exists;
    await scoreRef.doc(uuid.toString()).set(
        {
            ...data
        }
    );
    return 200;

}

exports.findDataWithUserId = async (id) => {

    const userScoreData = await scoreRef.where('userId', '==', id).get();
    if (userScoreData.empty) {
        return 404

    }

    return userScoreData;

}

