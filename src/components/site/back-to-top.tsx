import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useScrollTo } from '@/hooks/use-portfolio'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()
  const scrollTo = useScrollTo()

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 700))

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3 }}
          onClick={() => scrollTo('home')}
          aria-label="Back to top"
          className="glass fixed right-5 bottom-5 z-[62] grid size-11 place-items-center rounded-full border border-border text-[var(--domain)] transition-colors duration-300 hover:border-[var(--domain)] md:right-8 md:bottom-8"
        >
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
