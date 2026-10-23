import React from 'react'
import  './index.css'
import useDebounce from './useDebounce';
import footballers from './footballers';
import { useState,useEffect } from 'react';
const InfoP = () => {
    const[query,setquery]=useState("");
    const[result,setresult]=useState([])
    const debounce=useDebounce(query,1000)
    useEffect(()=>{
        if(debounce){
            const Fresult=footballers.filter(footballer=>(footballer.name.toLocaleLowerCase().includes(debounce.toLocaleLowerCase())))
            setresult(Fresult)
        }
        else{
            setresult([])
        }
    },[debounce])
  return (
   <>
   <h1 style={{textAlign:"center"}}>Footballer Search App</h1>
   <div style={{textAlign:"center"}}>
    <input style={{padding:"5px",width:"30%"}} 
    type='text'
    value={query}
    onChange={(e)=>setquery(e.target.value)}>
    </input>
   </div>
   {result.length>0&&(
    <div className='container'>
        <h2>Result</h2>
        <ul>
            {result.map((player)=>
            (<li key={player.id}>Name:{player.name} 
            <li>Age:{player.age}</li> 
            Position:{player.position}</li>))}
        </ul>
    </div>
   )}
   {debounce&&result.length===0&&(
    <div className='fail'> <h4> Can't find player "{debounce}" </h4></div>
   )}
   </>
  )
}

export default InfoP