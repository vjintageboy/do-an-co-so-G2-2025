import React, { useState, useEffect, useRef } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/jb_2016.jpg'
import hero_title from '../../assets/purposejb.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import videobanner from '../../assets/Greece.mp4'


const Home = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Bật tiếng mặc định
  const videoRef = useRef(null);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, showVideo]);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        // Nếu video bị pause thì play lại
        if (videoRef.current.paused) {
          videoRef.current.play();
        }
      } else {
        videoRef.current.muted = true;
      }
    }
    setIsMuted((prev) => !prev);
  };

  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        {showVideo ? (
          <div style={{position: 'relative'}}>
            <video
              className='banner-video'
              ref={videoRef}
              width="100%"
              height="100%"
              src={videobanner}
              autoPlay
              loop
              muted={isMuted}
              controls={false}
              playsInline
              style={{display: 'block'}}
            />
            <button
              className={`mute-btn${isMuted ? ' muted' : ''}`}
              onClick={handleMuteToggle}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                // Biểu tượng mute SVG giống Netflix
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              ) : (
                // Biểu tượng unmute SVG giống Netflix
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9H2v6h4l5 4V5z"/><path d="M19 12c0-2.21-1.79-4-4-4"/><path d="M19 12c0 2.21-1.79 4-4 4"/></svg>
              )}
            </button>
          </div>
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
