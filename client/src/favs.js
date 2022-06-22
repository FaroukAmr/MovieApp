import Movie from './movie'
import './App.css';
import Button from '@mui/material/Button';
import axios from 'axios'
import React, {useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from './usercontext.js';
import {useContext} from 'react'

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
        const res = await axios.delete("/api/favs",{
            params:{
                userid:value,
                title:title
            } 
        }).then((res)=>{
        }).catch((err)=>{
        })
        allData()
    }
      const handleChange=(e)=>{
        setsearchTerm(e.target.value)
      }
    const [movies,setMovies]=useState([''])
      const allData = async()=>{
         let res = await axios.get("/api/favs",{
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