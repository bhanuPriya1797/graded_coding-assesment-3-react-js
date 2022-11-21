import { faStar,faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type ratingtype={
    ratingval:[]
}

const Ratings=({ratingval}:ratingtype)=>{
    
    const ratings=ratingval.reduce((acc,ele)=>acc+ele,0);
    const newratings=((ratings*100)/(ratingval.length*10))/10;
    const fullstar=Math.floor(newratings);
    const halfstar=Math.round(newratings-fullstar);
  

    return(

        <> 
           {
              Array.from({length:fullstar}).map(ele=>
                <FontAwesomeIcon icon={faStar} key={Math.random()*22} />
              )
           }
           {       Array.from({length:halfstar}).map(ele=>
               <FontAwesomeIcon icon={faStarHalf} key={Math.random()*122} />
              )

           }
          
        </>

    )

    
}

export default Ratings;