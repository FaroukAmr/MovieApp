import Movie from './movie'
import './App.css';
import Button from '@mui/material/Button';
import axios from 'axios'
import React, {useEffect,useState} from 'react'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { Link, useNavigate } from "react-router-dom";
import  {IconButton} from '@mui/material';
import { UserContext } from './usercontext.js';
import {useContext} from 'react'

const SEARCH_API="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

function Favs(){
  const {value,setValue} = useContext(UserContext)
  let id=value
    const navigate = useNavigate();
    const handleLogOut=()=>{
      setValue("")
      navigate('/login')
    }
    
  const [searchTerm,setsearchTerm]=useState('')
    const handleClick = async(title,poster_path,overview,vote_average)=>{
        const res = await axios.delete("http://localhost:1000/api/favs",{
            params:{
                userid:value,
                title:title
            }
           
           
    
    
           
        }).then((res)=>{
            console.log(res)
            
        }).catch((err)=>{
            console.log(err)
        })

        allData()
    

}
    const getMovies=(API)=>{
        fetch(API)
        .then(res=>res.json())
        .then(data=>{
          setMovies(data.results)
        })
      }

     
      const handleChange=(e)=>{
        setsearchTerm(e.target.value)
    
      }
    const [movies,setMovies]=useState([''])
   
      const allData = async()=>{
         let res = await axios.get("http://localhost:1000/api/favs",{
            params:{
                userid:id
            }
        })
        setMovies(res.data)
    }
    useEffect(()=>{
        allData()
      },[])
     if(movies.length!==0){
    return(
        
        <>
        <header>
            
            <Button onClick={()=>{navigate('/')}}>Home</Button>
            <Button onClick={()=>{handleLogOut()}}>Log Out</Button>
            
        
      <form onChange={(e) => setsearchTerm(e.target.value)}>
        
      <input className='search' type="text" placeholder='Search...' value={searchTerm} onChange={handleChange}/>

      </form>
      </header>
        
        <div className="movie-container">
        {movies.filter((val)=>{
    if(searchTerm===""){
        return val;
    }else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())){
        return val
    }
  }).map(function(movie){
     return (<div ><Movie key={movie.id} {...movie} /><Button className='whole' variant="contained" onClick={()=>handleClick(movie.title,movie.poster_path,movie.overview,movie.vote_average)}>Remove From Favorites</Button> </div>)
  })} 
      
    </div>
    </>
    
    )
}else{
  return(
    <>
  <header>
            
            <Button onClick={()=>{navigate('/')}}>Home</Button>
            <Button onClick={()=>{handleLogOut()}}>Log Out</Button>
            
        
      
      </header>
      <div>
        <h1 className='text'>
      No movies, go to home page and add some
      </h1>
    </div>
    </>
  )
}
}



export default Favs;