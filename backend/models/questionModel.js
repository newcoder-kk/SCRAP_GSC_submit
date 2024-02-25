const {db} = require("../firebase");
const {v4: uuidv4} = require("uuid");

const questionRef = db.collection('questions');

exports.addQuestion = async (data) => {

    const uuid = uuidv4(null, null, null);
    //checking if data already exists;
    const question = await questionRef.where('question', '==', data.question).get();
    if (question.empty) {
        await questionRef.doc(uuid.toString()).set(
            {
                ...data
            }
        );
        return 200;
    } else {
        return 400
    }

}

exports.findById = async (id) => {
    const question = await questionRef.doc(id).get();
    if (!question.exists) {
        return 404;
    }
    return question;
}

exports.getAllQuestion = async () => {

    const questions = await questionRef.get();
    if (questions.empty) {
        return 404

    }

    return questions;

}

exports.update = async (id, data) => {
    return await questionRef.doc(id).set({
        ...data
    }, {merge: true});
}