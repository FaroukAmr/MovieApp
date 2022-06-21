import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import { Typography } from '@mui/material';
import React, { useEffect, useState,useContext } from "react";
import axios from 'axios'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')




  const [usernameError, setUsermameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmpasswordError, setConfirmPasswordError] = useState(false)

  const [usernameErrorHelper, setUsermameErrorHelper] = useState('')
  const [emailErrorHelper, setEmailErrorHelper] = useState('')
  const [passwordErrorHelper, setPasswordErrorHelper] = useState('')
  const [confirmpasswordErrorHelper, setConfirmPasswordErrorHelper] = useState('')

  const [BackendValidationResponse, setBackendValidationResponse] = useState('Invalid input')
  const [BackendValidationError,setBackendValidationError]=useState(false)
  const Alert = React.forwardRef(function Alert(props, ref) {
    
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open1, setOpen1] = React.useState(false);
      const handleClick1 = () => {
        setOpen1(true);
      };
    
      const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen1(false);
      };
      const [open2, setOpen2] = React.useState(false);
    
      const handleClick2 = () => {
        setOpen2(true);
      };
    
      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
      };

      const handleSubmit = (e) => {
        e.preventDefault()
    
        setUsermameError(false)
        setEmailError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)
    
        setUsermameErrorHelper('')
        setEmailErrorHelper('')
        setPasswordErrorHelper('')
        setConfirmPasswordErrorHelper('')
    
    

        if (username == '') {
          setUsermameError(true)
          setUsermameErrorHelper('Username is required')
        }
        else{
          setUsermameError(false)
          setUsermameErrorHelper('')
        }
        if (email == '') {
          setEmailError(true)
          setEmailErrorHelper('Email is required')
        }
        else{
          setEmailError(false)
          setEmailErrorHelper('')
        }
        if (password == '') {
          setPasswordError(true)
          setPasswordErrorHelper('Password is required')
        }
        else{
          setPasswordError(false)
          setPasswordErrorHelper('')
        }
        if (confirmpassword == '') {
          setConfirmPasswordError(true)
          setConfirmPasswordErrorHelper('Confirm Pass is required')
        }
        else{
          setConfirmPasswordError(false)
          setConfirmPasswordErrorHelper('')
        }
        if(password!=confirmpassword){
          setConfirmPasswordError(true)
          setConfirmPasswordErrorHelper('Passwords must match')
        }

        if(emailErrorHelper==="" && passwordErrorHelper===""&& confirmpasswordErrorHelper===""&& usernameErrorHelper===""){
          axios.post('/api/users', {username:username, email: email, password: password })
          .then((response)=>{
            if (response.data.message!="User created successfully") {
              handleClick2()
              setBackendValidationResponse(response.data)
              setBackendValidationError(true)
            }
            else{
              handleClick1()
              navigate("/signIn")

            }
          }).catch((error)=>{
            handleClick2()
              setBackendValidationError(true)
              setBackendValidationResponse(error.response.data.message)
          })
        }

        
      }

    const avatarStyle = { backgroundColor: '#1976d2' }
    const paperStyle = { padding: 20, height: '60vh', width: 400, margin: "150px auto", minheight: '60vh' }
    return (
      <>
      <header>
            
            <Button onClick={()=>{navigate('/')}}>Home</Button>
            </header>
        <Container>
            <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <Typography variant="h5">Sign Up</Typography>
            </Grid>
  
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
              onChange={(e) => setEmail(e.target.value)}
                helperText={emailErrorHelper}
                error={emailError}
                label="Email"
                variant="outlined"
                placeholder="Enter Email"
                required 
                style={{ width: '100%', margin: "8px 0" }}
              />
              <TextField
              onChange={(e) => setUsername(e.target.value)}
              helperText={usernameErrorHelper}
              error={usernameError}
                label="Username"
                variant="outlined"
                placeholder="Enter Username"
                required 
                style={{ width: '100%', margin: "8px 0" }}
              />
  
              <TextField
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordErrorHelper}
              error={passwordError}
                label="Password"
                placeholder="Enter Password"
                variant="outlined"
                required
                type='password'
                style={{ width: '100%', margin: "8px 0" }}
  
              />
              <TextField
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText={confirmpasswordErrorHelper}
              error={confirmpasswordError}
                label="Confirm Password"
                placeholder="Confirm Password"
                variant="outlined"
                required
                type='password'
                style={{ width: '100%', margin: "8px 0" }}
  
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                endIcon={<KeyboardArrowRightOutlinedIcon />}
                style={{ width: '100%', fontSize: 20, margin: '8px 0' }}
                
              >Sign Up</Button>
              <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          User Created Successfully!
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
        {BackendValidationResponse+"!"}
        </Alert>
      </Snackbar>
      </Stack>
            </form>
          </Paper>
        </Grid>
        </Container>
        </>
    );
  }
  
  export default SignUp;