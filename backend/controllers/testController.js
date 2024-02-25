const questionModel = require("../models/questionModel")
const scoreModel = require("../models/scoreModel")
const userModel = require("../models/userModel")
const model = require("../AI_model/connector")
const vertex = require("../AI_model/vertexAPICall")

function Question(id, question, code) {
    this.id = id;
    this.question = question;
    this.code = code;

}

function parseToJSX(inputString) {
    // Replace \n with <br>
    let parsedString = inputString.replace(/\n/g, '<br>');

    // Replace **text** with <strong>text</strong>
    parsedString = parsedString.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace *text* with <em>text</em>
    parsedString = parsedString.replace(/\*(.*?)\*/g, '<em>$1</em>');

    return parsedString;
}

exports.addQuestion = async (req, res) => {
    try {
        const {
            code,
            question
        } = req.body;
        const isCodeValid = !!code.trim();
        const isQuestionValid = !!question.trim();
        if (!(isCodeValid && isQuestionValid)) {
            return res.status(400).json({
                message: "Fields are not valid"
            })
        }

        const response = await questionModel.addQuestion({code, question});
        if (response === 400) {
            return res.status(400).json({
                message: "Question Already Exists"
            })
        }

        return res.status(201).json({
            message: 'success',
        });


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}



exports.addMultipleQuestion = async (req, res) => {
    try {
        const {
            code,
            question
        } = req.body;
        if (!(Array.isArray(code) && Array.isArray(question))) {
            return res.status(400).json({
                message: "Code and Question are not array"
            })
        }
        let errors = [];
        for (let i = 0; i < code.length && i < question.length; i++) {
            const response = await questionModel.addQuestion({code: code[i], question: question[i]});
            if (response === 400) {
                errors.push(`${question[i]} already exists`)
            }
        }
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", ")
            })
        }


        return res.status(201).json({
            message: 'success',
        });


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getQuestions = async (req, res) => {
    try {
        const response = await questionModel.getAllQuestion();
        if (response === 404) {
            return res.status(404).json({
                message: "No Questions Found"
            })
        }
        let questions = [];
        response.forEach(doc => {
            const data = doc.data();
            const question = new Question(doc.id, data.question, data.code);
            questions.push(question);

        })
        return res.status(201).json({
            message: 'success',
            questions,
            length: questions.length
        });


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.addScore = async (req, res) => {
    try {
        const {
            results

        } = req.body;
        const userId = req.user;
        const user = await userModel.findDataWithId(userId);
        if (user === 404) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const response = await scoreModel.addScore(
            {
                results,
                userId
            });

        if (response !== 200) {
            return res.status(400).json({
                message: "Error storing score"
            })
        }
        let counts = { "OPN": 0, "CSN": 0, "EXT": 0, "AGR": 0, "EST": 0 };
        let sums = { "OPN": 0, "CSN": 0, "EXT": 0, "AGR": 0, "EST": 0 };

        // Aggregate scores and calculate sums
        for (const key in results) {
            if (results.hasOwnProperty(key)) {
                const category = key.substring(0, 3);
                if (counts.hasOwnProperty(category)) {
                    if (results[key] !== null) {
                        counts[category]++;
                        sums[category] += results[key] +1;
                    }else{
                        counts[category]++;
                        sums[category] += 1;
                    }
                }
            }
        }

        // Calculate averages
        let averages = {};
        for (const category in counts) {
            if (counts.hasOwnProperty(category) && counts[category] > 0) {
                averages[category] = sums[category] / counts[category];
            }
        }

        // const profession = await model.main(Object.values(results).map(res => {
        //     if (res === null) {
        //         return 1;
        //     } else {
        //         return res + 1;
        //     }
        // }));
        const responseFromVertex = await vertex.generateContent(user.data().name, user.data().dob, "Engineering", averages)

        return res.status(201).json({
            message: 'success',
            response: parseToJSX(responseFromVertex)
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getScore = async (req, res) => {
    try {
        const user = req.user;
        const response = await scoreModel.findDataWithUserId(user);
        let responses = [];
        if (response === 404) {
            return res.status(404).json({
                message: "Scores for user not found"
            })
        }
        response.forEach(doc => {
            responses.push(doc.data())
        })

        res.status(200).json({
            responses
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}