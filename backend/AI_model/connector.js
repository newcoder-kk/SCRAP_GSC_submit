const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");

 async function main(values) {
  try {
    const model = await tf.loadLayersModel("file://personality_model.h5");
    console.log("model")
    // Prepare input data (replace with your actual input)
    //input the personality questionaire data in this order
    //EXT1,EXT2,EXT3,EXT4,EXT5,EXT6,EXT7,EXT8,EXT9,EXT10,EST1,EST2,EST3,EST4,EST5,EST6,EST7,EST8,EST9,EST10,AGR1,AGR2,AGR3,AGR4,AGR5,AGR6,AGR7,AGR8,AGR9,AGR10,CSN1,CSN2,CSN3,CSN4,CSN5,CSN6,CSN7,CSN8,CSN9,CSN10,OPN1,OPN2,OPN3,OPN4,OPN5,OPN6,OPN7,OPN8,OPN9,OPN10
    const inputData = tf.tensor(values);

    // Make predictions
    const predictions = await model.predict(inputData);
    console.log("hh",model.summary())

    // Load encoded labels (replace with your actual loading logic)
    const encodedLabels = await fetch("file://label_encoder.pkl").then((response) =>
      response.json()
    ); // Assuming pickled labels

    // Decode predictions using the encoded labels
    predictions.dataSync().forEach((pred, i) => {
      const predictedClass = Math.round(pred); // Assuming integer class indices
      const label = encodedLabels[predictedClass];
      console.log(`Prediction ${i + 1}: ${label}`); // Output the decoded label
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
     main
}