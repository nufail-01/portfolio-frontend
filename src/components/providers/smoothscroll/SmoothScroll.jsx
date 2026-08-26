import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Wraps the app to enable buttery-smooth momentum scrolling site-wide.
 * Mount this once, high up in the tree (e.g. in App.jsx), and it
 * takes over the browser's native scroll with Lenis.
 */
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // shorter settle time = faster, snappier glide
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)), // exponential ease-out: fast start, soft tail
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.3, // raw scroll speed boosted for a faster feel
      touchMultiplier: 2, // back up for quicker touch/trackpad response
      infinite: false,
    })

    lenisRef.current = lenis

    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    const handleVisibility = () => {
      if (document.hidden) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return children
}

export default SmoothScroll