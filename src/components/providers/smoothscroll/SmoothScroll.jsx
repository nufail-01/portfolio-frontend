import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Wraps the app to enable buttery-smooth momentum scrolling site-wide.
 * Mount this once, high up in the tree (e.g. in App.jsx), and it
 * takes over the browser's native scroll with Lenis.
 */
const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // lower = more floaty/buttery (try 0.07–0.08 for even smoother), higher = snappier
      smoothWheel: true,
      wheelMultiplier: 0.9, // slightly lowers raw scroll speed so the glide reads as smoother
      touchMultiplier: 2,
    })

    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return children
}

export default SmoothScroll
