import './App.css';
import Movie from './movie'
import axios from 'axios'
import React, {useEffect,useState} from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from './usercontext.js';
import {useContext} from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
const FEATURED_API="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const SEARCH_API="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

function Home() {
  const {value,setValue} = useContext(UserContext)
  const {res,setRes}=useState('')
  let id=value
  console.log(id)
  const navigate = useNavigate();
  const handleClick = async(title,poster_path,overview,vote_average)=>{
    console.log(id,title,poster_path,overview,vote_average)
    const res = await axios.post("http://localhost:1000/api/favs",{
       userid:id,
       title:title,
       poster_path:poster_path,
       overview:overview,
       vote_average:vote_average


       
    }).then((res)=>{
      handleClick1()
      
       
        
        
    }).catch((err)=>{
        handleClick2()
    })

   



}

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
const handleLogOut=()=>{
  setValue("")
  navigate('/login')
}
  const [movies,setMovies]=useState([''])
  const [searchTerm,setsearchTerm]=useState('')
  useEffect(()=>{
    getMovies(FEATURED_API)
  },[])

  const getMovies=(API)=>{
    fetch(API)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setMovies(data.results)
    })
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(searchTerm){
      getMovies(SEARCH_API+searchTerm)

    setsearchTerm('');
  }
  }
  const handleChange=(e)=>{
    setsearchTerm(e.target.value)

  }
  return (
    <>
    <header>
      <form onSubmit={handleSubmit}>
        {value===""?<Button onClick={()=>{navigate('/login')}}>Login</Button>:null}
        {value!==""?<Button onClick={()=>{navigate('/favorites')}}  >Favorites</Button>:null}
        {value!==""?<Button onClick={()=>{handleLogOut()}}  >Log Out</Button>:null}
        
      <input className='search' type="text" placeholder='Search...' value={searchTerm} onChange={handleChange}/>

      </form>
      </header>

    <div className="movie-container">
      
      {movies.length>0&&movies.map(function(movie){
        return (<div className='wholel'><Movie key={movie.id} {...movie} />{value!==""?<Button className='whole' variant="contained" onClick={()=>handleClick(movie.title,movie.poster_path,movie.overview,movie.vote_average)}>Add To Favorites</Button>:null} </div>)
      })}
       <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
        Added To Favorites
          
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={2000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
        Already In Favorites
        </Alert>
      </Snackbar>
      </Stack>
    </div>
    </>
  );
}

export default Home;

