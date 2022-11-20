import React, { useState } from 'react'
import App from './App';
import Intro from './pages/intropage/intro';
export default function App2() {
    const [introState,setIntroState]=useState(true);

    const value=setTimeout(()=>{
        setIntroState(false)
    },3000);
  return (
    introState?<Intro setIntroState={setIntroState}></Intro>:<App/>
  )
}
