import React from "react";
import Typography from '@mui/material/Typography';
import backgroundImage from '../images/newimg.png'; // Import the background image

const Hometop = () => {
    const styles = {
        oh: {
          position: 'relative',
          overflow: 'hidden',
          willChange: 'transform',
          display: 'inline-block',
          fontFamily: 'Kudryashev Display Extra Contrast Sans',
          color: '#ECB159',
        },
        previewItem: {
            gridArea: 'title',
            opacity: 1,
            display: 'grid',
            gridGap: '1rem',
            paddingTop: '12rem',
            gridTemplateColumns: '100%',
            gridTemplateRows: 'auto auto auto auto auto 1fr',
            gridTemplateAreas: "'title' 'subtitle' 'meta' 'box-left' 'box-right' '...'",
            willChange: 'clip-path',
            position: 'relative', // Set position to relative
            minHeight: '100vh', // Ensure the preview item fills the viewport height
            backgroundSize: 'cover', // Ensure the background image covers the whole container
            backgroundPosition: 'center', // Center the background image
            backgroundAttachment: 'fixed', // Ensure the background image does not scroll
            backgroundImage: `url(${backgroundImage})`, // Use the imported background image
        },
        previewItemTitle: {
          alignSelf: 'center',
          justifySelf: 'center',
          fontSize: 'clamp(3rem, 25vw, 25rem)',
          fontWeight: 300,
          margin: 0,
          lineHeight: 1,
          paddingTop: '1vw',
          '@media screen and (min-width: 53em)': {
            gridRow: '1 / span 4',
          },
        }
    };

    return (
        <div style={styles.previewItem} >
            <Typography variant="h2" component="h2" sx={styles.previewItemTitle}>
                <span style={styles.oh}>SCRAP</span>
            </Typography>
        </div>
    );
}

export default Hometop;
