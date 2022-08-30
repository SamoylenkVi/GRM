'use strict';

export default function() {
  const links = document.querySelectorAll(".about-nav a");
  if (links) {
      links.forEach(link => {
        link.onclick = (e) => {
          e.preventDefault()
          const href = link.getAttribute('href')
          const target = document.querySelector(href)
          const from = window.pageYOffset
          const to = target.getBoundingClientRect().top + window.pageYOffset
          
          scrollTo(from, to, to/1.7)
        }
      })
      
      const scrollTo = (from, to, duration) => {
        let start = from
        let change = to - start
        let currentTime = 0
        let increment = 20;
      
        const animateScroll = () => {
          currentTime += increment;
          const val = easeInOutQuad(currentTime, start, change, duration);
          window.scroll(0, val)
          if (currentTime < duration) {
            setTimeout(animateScroll, increment);
          }
        }
      
        animateScroll()
      }
      
      // Easing function -> easeInOutQuad
      // 
      //t = current time
      //b = start value
      //c = change in value
      //d = duration
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
      }
  }
}