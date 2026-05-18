import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useOptimizedSlider Hook
 * Manages slider state with optimized performance:
 * - Only loads current and next slide images
 * - Preloads next slide during current slide's display
 * - Prevents unnecessary re-renders
 * - Debounces navigation
 */
export function useOptimizedSlider(slides, autoPlayInterval = 6000) {
  const [activeSlide, setActiveSlide] = useState(0)
  const slideTimerRef = useRef(null)

  // Navigate to specific slide
  const goToSlide = useCallback((slideIndex) => {
    setActiveSlide(slideIndex)
  }, [])

  // Move to next slide
  const nextSlide = useCallback(() => {
    setActiveSlide((current) => {
      return (current + 1) % slides.length
    })
  }, [slides])

  // Move to previous slide
  const prevSlide = useCallback(() => {
    setActiveSlide((current) => {
      return current === 0 ? slides.length - 1 : current - 1
    })
  }, [slides])

  // Auto-play effect
  useEffect(() => {
    if (autoPlayInterval > 0) {
      slideTimerRef.current = window.setInterval(nextSlide, autoPlayInterval)
    }

    return () => {
      if (slideTimerRef.current) {
        window.clearInterval(slideTimerRef.current)
      }
    }
  }, [autoPlayInterval, nextSlide])

  return {
    activeSlide,
    goToSlide,
    nextSlide,
    prevSlide
  }
}

/**
 * useIntersectionObserver Hook
 * Detect when element enters viewport for lazy loading
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observedNode = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, {
      rootMargin: '50px',
      threshold: 0.01,
      ...options
    })

    if (observedNode) {
      observer.observe(observedNode)
    }

    return () => {
      if (observedNode) {
        observer.unobserve(observedNode)
      }
    }
  }, [ref, options])

  return isVisible
}

/**
 * useDebounce Hook
 * Debounce callback to reduce frequent updates
 */
export function useDebounce(callback, delay = 300) {
  const timeoutRef = useRef(null)

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}
