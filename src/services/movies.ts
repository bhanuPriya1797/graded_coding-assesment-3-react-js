import axios from "axios";
import { movie } from "../components/moviesection";




const getmoviedata=(option:string|undefined)=>{

    return axios.get(`http://localhost:3001/${option}`);
    


    
}

const getmoviedetail=(option:string|undefined,id:string|undefined)=>{
    return axios.get(`http://localhost:3001/${option}/${id}`)
}

const getfavouritesitem=()=>{
    return axios.get(`http://localhost:3001/favourite`)
}


const addtofavourite=(ele:movie)=>{

   const newobj={...ele,id:ele.id+Math.random().toString()} 

   return  axios.post("http://localhost:3001/favourite",newobj,{
        headers:{
            'Content-Type': 'application/json'          }
    })

}

const deletefromfavourite=(id:string)=>{
   
    return axios.delete(`http://localhost:3001/favourite/${id}`)

}

export  {getmoviedata,addtofavourite,deletefromfavourite,getfavouritesitem,getmoviedetail};