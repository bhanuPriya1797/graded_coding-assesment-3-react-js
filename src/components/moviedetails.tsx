
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getmoviedetail } from "../services/movies";
import { movie } from "./moviesection";
import "../custom css/moviedetail.css";
import Button from "react-bootstrap/esm/Button";



const Moviedetails=()=>{

    const params=useParams();
    const[details,setdetails]=useState<movie|null>(null);
    console.log(details);
    
    useEffect(()=>{
       
        console.log(typeof params.moviesection,typeof params.details);
        const getmoviedetails=async()=>{
 
             try
             {
                const res=await getmoviedetail(params.moviesection,params.details);
                setdetails({...res.data});   


             }
             catch(error)
             {

             }

        }
        


        getmoviedetails();
        
        
    },[params.moviesection,params.details])
  
   return <>
   {
       <div className="detailsection">
         
          <h1 className="title">{details?.title}</h1>
          <img className="poster" src={details?.posterurl} alt="No preview available"/>
          <p style={{color:"brown",marginTop:"10px"}}>Story</p>
          <h6 className="story">{details?.storyline}</h6>
          <p style={{color:"brown"}}>Actors</p>
          <ul style={{listStyle:"none"}}>
            {
                details?.actors.map(ele=><li style={{marginLeft:"5px",color:"white"}}>{ele}</li>)
            }
          </ul>
          <p style={{color:"brown"}}>Genres</p>
          <ul style={{listStyle:"none"}}>
            {
                details?.genres.map(ele=><li style={{marginLeft:"5px",color:"white"}}>{ele}</li>)
            }
          </ul>
       </div>
   }
  

   </>

}

export default Moviedetails;