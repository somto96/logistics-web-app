"use client"

import Aos from "aos"
import Script from "next/script"

export default ()=>{
    return(
        <Script 
            src="https://unpkg.com/aos@2.3.1/dist/aos.js"
            onLoad={()=>{
                Aos.init()
            }}
        />
    )
}