import React from 'react'
import { useState,useEffect } from 'react'
const useDebounce = (value,delay) => {
    const[debounceval,usedebounceval]=useState(value);
    useEffect(()=>{
        const timeout=setTimeout(() => {
           usedebounceval(value) 
        }, delay);
        return ()=>{
            clearTimeout(timeout)
        }
    },[value,delay])
    return debounceval
}

export default useDebounce