import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const TitleCards = ({title, category}) => {  

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2YzN2E2MGE0ZTMwM2RlNzdlOTNiMjU0YWQxZmVkMCIsIm5iZiI6MTc0ODQwNTkyNi42Niwic3ViIjoiNjgzNjhlYTZlNTgxMjU0NmI3ODM4YTdhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k87UmjwVVT_oGcUc8caRitrSYXo6dEA1ESU6FwTru2E'
  }
};



const handlewheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handlewheel)
},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/original/`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        
        })}
      </div>
    </div>
  )
}

export default TitleCards
