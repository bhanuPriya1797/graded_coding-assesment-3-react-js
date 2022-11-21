import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import  { addtofavourite,deletefromfavourite,getmoviedata, getfavouritesitem } from "../services/movies";
import "../custom css/moviesection.css";
import Ratings from "./ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faDumpster,faSearch} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type movie= {
   actors:[],
   averageRating:number,
   contentRating:string,
   duration:string,
   genres:[],
   id:string,
   imdbRating:string,
   originalTitle:string,
   poster:string,
   posterurl:string,
   ratings:[],
   releaseDate:string,
   storyline:string,
   title:string,
   year:string

}


const Moviesection=()=>{

   const params=useParams();
   const[moviedata,setmoviedata]=useState<movie[]|[]>([]);
   const[bufferdata,setbuffer]=useState<movie[]|[]>([]);
   const[loading,setloading]=useState<boolean>(false);
   let temp=params.option;
 
   

  

   useEffect(()=>{
    console.log("first")
   
       const fetchdata = async()=>{
     
         try
         {
            setloading(true);
            const res= await getmoviedata(params.option);
            if(res.statusText==='OK')
            {
               setmoviedata(res.data);
               setbuffer(res.data);
              
            }
            
         }
         
         catch(error)
         {

         }
          
         setloading(false);

       }
    
       
         fetchdata();
   },[params]);
   
    const searchitem=(event:React.FormEvent<HTMLInputElement>)=>{
        const searche =event.currentTarget.value;
        const filterdata=moviedata.filter(ele=>ele.title.toLowerCase().startsWith(searche.toLowerCase()));
        console.log(filterdata);
        setbuffer(filterdata);
    }


   
   const addtofavourites=async(ele:movie,title:string)=>{
          
          
          
           
          try
          {
          
           const items= await getfavouritesitem(); 
           const item=items.data.find((ele: movie)=>ele.title===title)
           if(item!==undefined)
           {
             return toast.dark("Movie already exists in Favourites")
           }
           else
           {
            const res = await addtofavourite(ele);

            if(res.statusText==="Created")
            {
               toast.success("Successsfully added to Favourties")
            }

           }            
          
       
          
          }
          
           catch(error)
           {

           }
           
           
   }

   const deletefromfavourites=async(ele:movie)=>{
    
    try
    {
        const res=await deletefromfavourite(ele.id);
        if(res.statusText==="OK")
        {
          const res= await getmoviedata(params.option);
          setbuffer(res.data);
          toast("Successfully deleted from favourites")
         
        }

    } 
    catch(error)
    {

    } 

  
   }
    
   const clickaction=()=>{
     console.log("clicked");
   }

   return (

     <>
     {loading ?
        <div style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <h2 style={{marginRight:"20px"}}>Loading</h2>
      <Spinner style={{marginRight:"5px"}} animation="grow" size="sm" />
      <Spinner style={{marginRight:"5px"}} animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
     
     
        </div>
        :
      <>
        
      

          
      <div className="moviesectionheader">
      
        
        
      <input className="searchbox" type="text"  placeholder="Search"  onChange={searchitem} />
       <FontAwesomeIcon className="fontsearch"  style={{color:"red"}} icon={faSearch} />
    </div>
   
    {
       bufferdata.length===0 ? <div style={{minHeight:"100vh",display:"flex",justifyContent:"center"}}>
          <h1 style={{color:"grey",marginTop:"20rem",fontSize:""}} >
            No movies found
          </h1>
            
       </div>  :

      <>
    
      <Row  xs={2}  md={4} lg={5} className="g-4">
      {
      
      bufferdata.map(ele => 
        
        <Col key={Math.random()*Math.random()} >
          <Card onClick={clickaction} key={ele.id}  style={{textAlign:"center",height:"420px"}}>
           <NavLink  to={`${ele.id}`}>
           <Card.Img style={{width:"100%",height:"300px",overflow:"hidden"}} variant="top" src={"img/"+ele.poster} />
           </NavLink>
            <Card.Body>
              <p style={{fontWeight:"bold",}}>{ele.title}</p>
              <Ratings ratingval={ele.ratings}/>
          <>
          {
             temp !== "favourite" ?  <Button style={{border:"none"}} onClick={addtofavourites.bind(null,ele,ele.title)} variant="safe">Add to Favourites <FontAwesomeIcon style={{color:"red"}} icon={faHeart} /> </Button> :  <Button style={{border:"none"}} onClick={deletefromfavourites.bind(null,ele)} variant="safe">Delete from Favourites <FontAwesomeIcon style={{color:"grey"}} icon={faDumpster} /> </Button>  
          }
          </>

            </Card.Body>
            </Card>
        </Col>
      )}
       
    </Row>
    <ToastContainer autoClose={1000} />
   </>
    
    }
   </>
   }
   </>
   )
}

export default Moviesection;