
import React,{Component} from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import './App.css';
import Tree from './media/forest_960.mp4';
import Logo from './media/logo.svg';


export default class App extends Component {
  constructor(){
    super();
   }
  

   componentDidMount(){
    console.clear();
    /* The encoding is super important here to enable frame-by-frame scrubbing. */
  
    // ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
    // ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4
  
    const video = document.querySelector(".video-background");
    let src = video.currentSrc || video.src;
    console.log(video, src);
  
    /* Make sure the video is 'activated' on iOS */
    function once(el, event, fn, opts) {
      var onceFn = function (e) {
        el.removeEventListener(event, onceFn);
        fn.apply(this, arguments);
      };
      el.addEventListener(event, onceFn, opts);
      return onceFn;
    }
  
    once(document.documentElement, "touchstart", function (e) {
      video.play();
      video.pause();
    });
  
    /* ---------------------------------- */
    /* Scroll Control! */
  
    gsap.registerPlugin(ScrollTrigger);
  
    let tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: "#container",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
  
    once(video, "loadedmetadata", () => {
      tl.fromTo(
        video,
        {
          currentTime: 0
        },
        {
          currentTime: video.duration || 1
        }
      );
    });
  
    /* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
    setTimeout(function () {
      if (window["fetch"]) {
        fetch(src)
          .then((response) => response.blob())
          .then((response) => {
            var blobURL = URL.createObjectURL(response);
  
            var t = video.currentTime;
            once(document.documentElement, "touchstart", function (e) {
              video.play();
              video.pause();
            });
  
            video.setAttribute("src", blobURL);
            video.currentTime = t + 0.01;
          });
      }
    }, 1000);
  
    /* ---------------------------------- */
  }

  render(){
   
    return (
      <div className="App">
      <div id="letters">
        <img src={Logo} class="mtLogo" />
        <h2>It’s time to rethink how we design.</h2>
        <h3>We design systems, campaigns, and products to increase equality, reconnect ourselves with nature, and fight for democracy across the globe.</h3>
        <h3>Making the world a more just and beautiful place takes intention.  We aim to help design a society more aligned with caretaking for ourselves and all of life.</h3>
        <h2>Nothing is an externality.</h2>
        <h3>For too long, we have designed systems that leave the liability or the impact to outside organizations or nations. Let us help you transform your business to have more intentional design practices.</h3>
        <h2>We are Mother Tree.</h2>
        <img src={Logo} class="mtLogo" />
       
        </div>
      <video src={Tree} playsinline="true" webkit-playsinline="true" preload="auto" muted="muted" class="video-background"></video>

      <div id="container"></div>

      
    </div>
    );
  }
}


