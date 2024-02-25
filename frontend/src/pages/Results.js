import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import backgroundImage from '../images/newimg.png';
import RLogo from '../images/ResultLogo.png'
import Regulations from "./Regulations";
import Home from "./Home";
const CustomGlassBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(24px)',
  borderRadius: '12px',
  boxShadow:
    theme.palette.mode === 'light'
      ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
      : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
  border: '1px solid',
  borderColor: theme.palette.mode === 'light' ? 'divider' : 'rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(3),
  textAlign: 'center',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const IconImage = styled('img')({
    width: '100px', // Set the width of the image
    height: 'auto', // Maintain aspect ratio
    margin: '0 auto', // Center the image horizontally
  });

function Results() {
  const result = sessionStorage.getItem("result");
  // sessionStorage.setItem("result", "");

  return (
    <Box sx={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <CustomGlassBox>
      <div className="icon">
        <IconImage src={RLogo} alt="Result Logo" />
      </div>
      <Typography variant="h5" component="h2" >You've completed the Quiz!</Typography>
      <Typography variant="body1">Here are your results</Typography>
      {result}
      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={Regulations}>
          Replay Quiz
        </Button>
        <Button variant="contained" color="error" onClick={Home}>Quit Quiz</Button>
      </Box>
    </CustomGlassBox>
    </Box>
  );
}

// Example usage:
<Results />
export default Results;