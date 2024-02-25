import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import backgroundImage from '../images/newimg.png';
import professionalpic from '../images/professional.jpg';
import studentpic from '../images/student.jpg'
const CustomGlassBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  borderRadius: '12px',
  boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
  border: '1px solid rgba( 255, 255, 255, 0.18 )',
  padding: theme.spacing(3),
  textAlign: 'center',
  maxWidth: '300px',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  
  
}));

const Path = () => {
  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', padding: '20px', paddingBottom: '50px', paddingTop: '50px' }}>
        <Box container spacing={4} display="flex" justifyContent="center">
          <CustomGlassBox sx={{ xs: 12, sm: 6, md: 6, margin: '10px' }}>
            <img src={studentpic} alt="studpic" />
            <div>
              <Typography variant="h5" component="h2" sx={{ color: 'white' }}>Student</Typography>
              <Typography variant="body1" sx={{ color: 'white', textAlign: 'justify' }}>
                Feeling unsure about your future career path? No worries! SCRAP AI is here. Our system can help you identify your strengths and interests so you can find the right path for you.
              </Typography>
            </div>
            <Button href="https://your_scrap_ai_link" variant="contained" color="primary" sx={{ width: '100%' }}>
              Predict
            </Button>
          </CustomGlassBox>

          <CustomGlassBox sx={{ xs: 12, sm: 6, md: 6, margin: '10px' }}>
            <img src={professionalpic} alt="proffpic" />
            <div>
              <Typography variant="h5" component="h2" sx={{ color: 'white' }}>Professional</Typography>
              <Typography variant="body1" sx={{ color: 'white', textAlign: 'justify' }}>
                If you are a professional, you may provide us with your data so that we can analyze it and include it in our research and algorithm improvement.
              </Typography>
            </div>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              Provide
            </Button>
          </CustomGlassBox>
        </Box>
      </div>
    </>
  );
};

export default Path;
