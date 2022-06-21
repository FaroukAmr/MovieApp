import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios'
const IMG_API="https://image.tmdb.org/t/p/w1280";

const setVoteClass=(vote)=>{
    if(vote>=8){
        return 'green'
    }else if(vote>=6){
        return 'orange'
    }else{
        return 'red'
    }
}

function Movie({title,poster_path,overview,vote_average}){
    const handleClick = async(e)=>{
            const res = await axios.post("http://localhost:1000/api/favs",{
               userid:"100",
               title:title,
               poster_path:poster_path,
               overview:overview,
               vote_average:vote_average


               
            }).then((res)=>{
                console.log(res)
                
            }).catch((err)=>{
                console.log(err)
            })


        

    }
    return(
        <div className='movie'>
            
            <img src={poster_path?(IMG_API+poster_path):'https://images.unsplash.com/photo-1634322487121-ba84c23cbc78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'} alt={title}/>
            <div className='movie-info'>
                <h3>{title}</h3>
                <span className={
                    `tag ${setVoteClass(vote_average)}`
                    }>
                    {vote_average}
                    </span>
            </div>

            <div className='movie-over'>
                <h2>Overview:</h2>
                <p>{overview} 
                </p>
            </div>
        </div>
    )
}

export default Movie