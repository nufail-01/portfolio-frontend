import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const Icon3D = ({ src, alt, size = 72 }) => {
  const ref = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [18, -18]),
    { stiffness: 200, damping: 20 }
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-18, 18]),
    { stiffness: 200, damping: 20 }
  )

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div style={{ perspective: 600 }}>
      <motion.div
        ref={ref}
        drag
        dragElastic={0.5}
        dragSnapToOrigin
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        whileHover={{ scale: 1.08 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: size,
          height: size,
          rotateX,
          rotateY,
          cursor: 'grab',
        }}
        className="touch-none select-none"
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="pointer-events-none h-full w-full object-contain drop-shadow-xl"
        />
      </motion.div>
    </div>
  )
}

export default Icon3D