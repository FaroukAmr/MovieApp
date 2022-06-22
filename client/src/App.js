import React, { useEffect, useState } from "react";
import SignUp from './signUp.js'
import SignIn from './signIn.js'
import Home from './home.js'
import Favs from './favs.js'
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import { UserContext} from "./usercontext.js";

const App = ()=>{
   const [value,setValue] = useState('')
   const [uzer,setUzername] = useState('')
    useEffect(() => {
        document.title = "Movie App"
     }, []);
    return(
        <BrowserRouter>
        <UserContext.Provider value={{value,setValue}}>
        <Routes>   
          <Route exact path="/" element={ <Home/> } />
          <Route  path="*" element={ <Home/> } />
          <Route exact path="/signUp" element={ <SignUp/> } />
          <Route exact path="/favorites" element={ <Favs/> } />
          <Route exact path="/login" element={ <SignIn/> } />     
        </Routes>
        </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App