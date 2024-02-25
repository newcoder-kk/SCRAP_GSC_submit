import React, {useState} from "react";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../firebase/firebaseConfig";
import backgroundImage from "../images/newimg.png";
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import {Typography} from "@mui/material";
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

function InitSignup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/users/login", {email});
            sessionStorage.setItem("token", response.data.token)
            navigate("/")
        } catch (e) {
            console.log(e)
        }
    }
    const handleGoogle = async (e) => {
        try {
            const provider = await new GoogleAuthProvider();
            return signInWithPopup(auth, provider).then((result) => {

                  const user = result.user;
                  try {
                    axios.post("/users/login", {email: user.email}).then(res => {
                      if (res.status === 201) {
                        sessionStorage.setItem("token", res.data.token);
                        navigate("/");
                      }
                    }).catch(e => {
                      if (e.response.status === 404) {
                        navigate("/signup?email="+user.email)
                      }

                    })
                  } catch (e) {
                    console.log(e)
                  }
                }
            );

        }catch (e) {
          console.log(e)
        }

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
    >
        <CustomGlassBox>
            <div className="fullflex">
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    name={"email"}
                    fullWidth
                />
                {/*<TextField*/}
                {/*  label="Password"*/}
                {/*  variant="outlined"*/}
                {/*  margin="normal"*/}
                {/*  fullWidth*/}
                {/*/>*/}
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Sign in
                </Button>
                {/*<Button color="secondary" href="Signup">*/}
                {/*  Forgot Password*/}
                {/*</Button>*/}
                <Divider sx={{margin: "20px 0"}}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box sx={{flexGrow: 1, mr: 1, ml: 1}}>or</Box>
                    </Typography>
                </Divider>
                <Button
                    onClick={handleGoogle}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Sign in with Google
                </Button>
                <Button color="secondary" href="Signup">
                    Don't have an account?
                </Button>
            </div>
        </CustomGlassBox>
    </Box>
);
}

export default InitSignup;
