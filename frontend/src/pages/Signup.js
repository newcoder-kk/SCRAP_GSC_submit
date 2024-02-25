import React, {useState} from 'react';
import {Box, Button, FormControl, Grid, Input, MenuItem, Select, Typography} from '@mui/material';
import backgroundImage from '../images/newimg.png';
import axios from "../axiosConfig"
import {useNavigate, useSearchParams} from "react-router-dom";

function Signup() {
    const [search] = useSearchParams()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email: search.get("email") || "",
        number: '',
        gender: '',
        school: '',
        institution: '',
        profession: '',
        country: '',
        state: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle form submission here
        console.log(formData);
        try {
            const response = await axios.post("/users/create", formData);
            console.log(response.data)
            sessionStorage.setItem("token", response.data.token);
            navigate("/")
        } catch (e) {
            console.log(e)
        }
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
                            <Typography variant="subtitle1" className="title" align="center" sx={{ mb: 2 }}>Personal and Academic Details</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="name" placeholder="Enter your name" value={formData.name}
                                           onChange={handleChange} fullWidth required sx={{}}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="date" name="dob" placeholder="Enter Date of birth" value={formData.dob}
                                           onChange={handleChange} fullWidth required sx={{}}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="email" placeholder="Enter your email"
                                           value={formData.email} onChange={handleChange} fullWidth required sx={{}}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="number" name="number" placeholder="Enter mobile number"
                                           value={formData.number} onChange={handleChange} fullWidth required sx={{}}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <Select name="gender" value={formData.gender} onChange={handleChange}
                                                displayEmpty sx={{}}>
                                            <MenuItem disabled value="">Select gender</MenuItem>
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
                                        <Select name="institution" value={formData.institution} onChange={handleChange}
                                                displayEmpty sx={{}}>
                                            <MenuItem disabled value="">Select Class</MenuItem>
                                            <MenuItem value="class 8-10 th">class 8-10 th</MenuItem>
                                            <MenuItem value="class 11-12 th">class 11-12 th</MenuItem>
                                            <MenuItem value="College">College</MenuItem>
                                            <MenuItem value="Working Professional">Working Professional</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="profession" placeholder="Enter your Profession"
                                           value={formData.profession} onChange={handleChange} fullWidth required
                                           sx={{}}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="country" placeholder="Enter your Country"
                                           value={formData.country} onChange={handleChange} fullWidth required sx={{}}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input type="text" name="state" placeholder="Enter your Home State"
                                           value={formData.state} onChange={handleChange} fullWidth required sx={{}}/>
                                </Grid>
                            </Grid>
                        </div>
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
                    </div>
                </form>
            </Box>
        </div>
    );
}

export default Signup;
