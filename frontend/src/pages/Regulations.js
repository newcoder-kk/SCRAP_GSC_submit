import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import backgroundImage from '../images/newimg.png';
import Quiz from "./Quiz";
import Home from "./Home";

const CustomGlassBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light"
    ? "rgba(255, 255, 255, 0.4)" // Match AppBar's light mode bgcolor
    : "rgba(0, 0, 0, 0.4)", // Match AppBar's dark mode bgcolor
  backdropFilter: "blur(24px)", // Match AppBar's blur
  borderRadius: "12px",
  boxShadow:
    theme.palette.mode === "light"
      ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
      : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
  border: "1px solid",
  borderColor: theme.palette.mode === "light" ? "divider" : "rgba(255, 255, 255, 0.18)",
  padding: theme.spacing(3),
  textAlign: "center",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const Regulations = () => {
  return (
    <Box sx={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CustomGlassBox>
        <div className="info-title">
          <Typography variant="h5">Some Rules of this Quiz</Typography>
        </div>
        <div className="info-list">
          <Typography variant="body1" className="info" sx={{textAlign: 'justify' }}>1. You will have only <span>15 seconds</span> per each question.</Typography>
          <Typography variant="body1" className="info" sx={{textAlign: 'justify' }}>2. Once you select your answer, it can't be undone.</Typography>
          <Typography variant="body1" className="info" sx={{ textAlign: 'justify' }}>3. You can't select any option once time goes off.</Typography>
          <Typography variant="body1" className="info" sx={{textAlign: 'justify' }}>4. You can't exit from the Quiz while you're playing.</Typography>
          <Typography variant="body1" className="info" sx={{textAlign: 'justify' }}>5. You'll get an analysis on the basis of your answers.</Typography>
        </div>
        
      
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ pt: 2 }}>
          <Button variant="contained" color="error" onClick={Home}>
              Quit Quiz
          </Button>
          <Button variant="contained" color="primary" onClick={Quiz}>
            Continue
          </Button>
          
        </Box>
      </CustomGlassBox>
    </Box>
  );
}

export default Regulations;
