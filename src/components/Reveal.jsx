import { useReducedMotion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1]

export default function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
}) {
  const reduce = useReducedMotion()
  const MotionTag = motionTag(as)

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0 : 0.9, delay, ease }}
    >
      {children}
    </MotionTag>
  )
}

import { motion } from "framer-motion"

function motionTag(as) {
  return motion[as] || motion.div
}
