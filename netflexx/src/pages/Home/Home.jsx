import React, { useState, useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'


const Home = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsAtTop(false);
        setShowVideo(false);
      } else if (window.scrollY === 0) {
        setIsAtTop(true);
      }
    };

    // Timer cho lần đầu load trang
    const timer = setTimeout(() => {
      if (isAtTop) {
        setShowVideo(true);
      }
    }, 2500);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect riêng cho việc scroll lên đầu trang
  useEffect(() => {
    if (isAtTop) {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isAtTop]);

  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        {showVideo ? (
          <iframe 
            className='banner-video'
            width="100%" 
            height="100%"
            src="https://www.youtube.com/embed/M9XzHK4Hm4w?autoplay=1&mute=1&controls=0&loop=1&playlist=M9XzHK4Hm4w"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
        ) : (
          <img src={hero_banner} alt="" className='banner-img'/>
        )}
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img'/>
          <p>Follow Anh Tram Tinh - the most handsome man in the world, discover the mystery of the second most handsome man in the world</p>
          <div className="hero-btns">
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"}/>
        <TitleCards title={"Top Pics for You"} category={"now_playing"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
