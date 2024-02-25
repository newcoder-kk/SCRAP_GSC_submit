import React, {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {styled} from "@mui/system";
import backgroundImage from "../images/newimg.png";
import axios from "../axiosConfig";
import {useNavigate} from "react-router-dom";

const CustomGlassBox = styled(Box)(({theme}) => ({
  backgroundColor:
      theme.palette.mode === "light"
          ? "rgba(255, 255, 255, 0.4)"
          : "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(24px)",
  borderRadius: "12px",
  boxShadow:
      theme.palette.mode === "light"
      ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
      : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
  border: "1px solid",
  borderColor:
    theme.palette.mode === "light" ? "divider" : "rgba(255, 255, 255, 0.18)",
  padding: theme.spacing(3),
  textAlign: "center",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));



const options = [
  "Very Inaccurate",
  "Moderately Inaccurate",
  "Neither Accurate Nor Inaccurate",
  "Moderately Accurate",
  "Very Accurate",
];

const Quiz = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const nextButtonRef = useRef(null);
  const [questions, setQuestion] = useState(null);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {

    axios.get("/test/questions", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      setQuestion(res.data.questions)
    })
  }, [])

  useEffect(() => {
    if (questions && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [questions, gameOver]);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer]);

  useEffect(() => {
    if (selectedOption !== null) {
      nextButtonRef.current.focus();
    }
  }, [selectedOption]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    setAnswers({...answers, [questions[currentQuestionIndex].code]: selectedOption});
    setSelectedOption(null);


    if (currentQuestionIndex + 1 >= questions.length) {
      setGameOver(true)
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(15);
    }
  };
  const handleGameOver = async () => {
    try {
      const response = await axios.post("/test/score", {results: answers}, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      console.log(response.data);
      sessionStorage.setItem("result", response.data.response)
      setAnswers({})
      setCurrentQuestionIndex(0);
      setGameOver(false);
      navigate("/result")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (gameOver)
      handleGameOver();
  }, [gameOver])

  const handleKeyPress = (event) => {
    if (event.key >= "1" && event.key <= "5") {
      handleOptionSelect(parseInt(event.key) - 1);
    } else if (event.key === "Enter" && selectedOption !== null) {
      handleNextQuestion();
    }
  };
  if (!token) {
    navigate("/signin")
    return
  }

  return (
      <Box
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
      }}
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
        {questions &&
            <CustomGlassBox>
              <div>
                <div>Question {currentQuestionIndex + 1}</div>
                <div><strong>{questions[currentQuestionIndex].question}</strong></div>
                <div>Time Left: {timer} seconds</div>
              </div>
              <div>
                {options.map((option, index) => (
                    <div key={index} style={{display: ""}}>
                      <Button
                          variant="outlined"
                          onClick={() => handleOptionSelect(index)}
                          disabled={selectedOption !== null}
                          sx={{ width: "100%", margin: "10px 0", color: "black" }}
                      >
                        {option}
                      </Button>
                    </div>
                ))}
              </div>
              {selectedOption !== null && (
                  <Button
                      ref={nextButtonRef}
                      variant="contained"
                      color="primary"
                      onClick={handleNextQuestion}
                  >
                    Next Question
                  </Button>
              )}
            </CustomGlassBox>
        }
    </Box>
  );
};

export default Quiz;
