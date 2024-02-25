const { VertexAI } = require("@google-cloud/vertexai");

//DO this before excuting
//npm install @google-cloud/vertexai
//gcloud auth application-default login

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({
  project: process.env.PROJECT_ID,
  location: "us-central1",
});
const model = "gemini-1.0-pro-001";

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generation_config: {
    max_output_tokens: 8192,
    temperature: 0.9,
    top_p: 1,
  },
  safety_settings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});

async function generateContent(name, age, profession, average ) {
  const req = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `generate me a report for a student of Name : ${name} with age calculated from dob: ${age} and personality of a person in the ${profession} field with OCEAN model parameters as Openness : ${average["OPN"]}/5.0, Conscientiousness : ${average["CSN"]}/5.0,  Extroversion : ${average["EXT"]}/5.0,  Agreeableness : ${average["AGR"]}/5 and Neuroticism : ${average["EST"]}/5 give me a 150 word small report about this person's personality , career path he can choose and ways to become it like exams in native to India like NEET, JEE`,
          },
        ],
      },
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  // for await (const item of streamingResp.stream) {
  //   console.log(item.candidates[0].content)
  //   // process.stdout.write("stream chunk: " + JSON.stringify(item));
  // }

  const res  = await streamingResp.response;
  return res.candidates[0].content.parts[0].text
}

module.exports = {generateContent};
