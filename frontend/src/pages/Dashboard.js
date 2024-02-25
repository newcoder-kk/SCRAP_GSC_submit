import React, {useState} from 'react';
import {Box, Button, FormControl, Grid, Input, MenuItem, Select, Typography} from '@mui/material';
import backgroundImage from '../images/newimg.png';

function Signup() {
    const [formData, setFormData] = useState({
        Name: '',
        DOB: '',
        Email: '',
        Number: '',
        Gender: '',
        school: '',
        Institution: '',
        Profession: '',
        Country:'',
        State: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        // You can perform form submission logic here, such as sending data to a server
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: theme => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
    p: 3,
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: theme => `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.125)' : 'rgba(0, 0, 0, 0.125)'}`,
  }}>
                <Typography variant="h5" gutterBottom align="center" >Registration</Typography>
                <form onSubmit={handleSubmit} className="form_class">
                    <div className="form first">
                        <div className="details personal">
                            <Typography variant="subtitle1" className="title" align="center" sx={{ mb: 2 }}>Your Details</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="Name" placeholder="Enter your name" value={formData.name}
                                           onChange={handleChange} fullWidth required sx={{}}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="date" name="DOB" placeholder="Enter Date of birth" value={formData.DOB} onChange={handleChange} fullWidth required sx={{}} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="Email" placeholder="Enter your email" value={formData.Email} onChange={handleChange} fullWidth required sx={{}} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="number" name="Number" placeholder="Enter mobile number" value={formData.Number} onChange={handleChange} fullWidth required sx={{}} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <Select name="Gender" value={formData.Gender} onChange={handleChange} displayEmpty sx={{}}>
                                            <MenuItem disabled value="">{formData.Gender}</MenuItem>
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Others">Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="school" placeholder="Enter your institution's name" value={formData.school} onChange={handleChange} fullWidth required sx={{  }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <Select name="Institution" value={formData.Institution} onChange={handleChange} displayEmpty sx={{  }}>
                                            <MenuItem disabled value="">{formData.Institution}</MenuItem>
                                            <MenuItem value="class 8-10 th">class 8-10 th</MenuItem>
                                            <MenuItem value="class 11-12 th">class 11-12 th</MenuItem>
                                            <MenuItem value="College">College</MenuItem>
                                            <MenuItem value="Working Professional">Working Professional</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="Profession" placeholder="Enter your Profession" value={formData.Profession} onChange={handleChange} fullWidth required sx={{ }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="Country" placeholder="Enter your Country" value={formData.State} onChange={handleChange} fullWidth required sx={{}} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="State" placeholder="Enter your Home State" value={formData.State} onChange={handleChange} fullWidth required sx={{  }} />
                                </Grid>
                            </Grid>
                        </div>
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Save</Button>
                    </div>
                </form>
            </Box>
        </div>
    );
}

export default Signup;
