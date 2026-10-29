import React from 'react'
import  './index.css'
import useDebounce from './useDebounce';
import { useState,useEffect } from 'react';
const InfoP = () => {
    const[query,setquery]=useState("");
    const[result,setresult]=useState([])
    const debounce=useDebounce(query,1000)
    useEffect(()=>{
        async function getplayer(){
        if(debounce){
            try{
            const res=await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${debounce}`)
            if(!res.ok){
                throw new Error("cant fetch data"); 
            }

           const property= await res.json();
           console.log(property)
        setresult(property.player||[])
    }catch(error){
    console.error(error.message)
}
       
    }
}
      getplayer();  
    },[debounce])

    
  return (
   <>
   <h1 style={{textAlign:"center", color:"white", textShadow: "2px 2px 4px rgba(0,0,0,0.8)"}}>Footballer Search App</h1>
   <div style={{textAlign:"center"}}>
    <input style={{width:"30%" }} 
    type='search'
    value={query}
    onChange={(e)=>setquery(e.target.value)}
    placeholder='Search for a sports star...'>
    </input>
   </div>
   {result.length>0&&(
    <div className='container'>
        <h2 style={{color:"white", fontSize:"40px"}}>Result</h2>
        <ul>
            {
result.map((player) => (
    <li key={player.idPlayer}>
        <p>Name: {player.strPlayer}</p>
        <p>Date of birth: {player.dateBorn}</p>
        <p>Gender: {player.strGender}</p>
        <p>Nationality: {player.strNationality}</p>
        <p>Sport: {player.strSport}</p>
        <p>Status: {player.strStatus}</p>
        <p>Position: {player.strPosition}</p>
        <p>Team: {player.strTeam || "Unknown"}</p>
    </li>
))

}
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