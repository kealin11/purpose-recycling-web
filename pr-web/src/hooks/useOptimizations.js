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
  const preloadedImagesRef = useRef(new Set())

  // Preload an image
  const preloadImage = useCallback((imageSrc) => {
    if (preloadedImagesRef.current.has(imageSrc)) return

    const img = new Image()
    img.src = imageSrc
    preloadedImagesRef.current.add(imageSrc)
  }, [])

  // Navigate to specific slide
  const goToSlide = useCallback((slideIndex) => {
    setActiveSlide(slideIndex)
    
    // Preload the next slide
    const nextIndex = (slideIndex + 1) % slides.length
    preloadImage(slides[nextIndex])
  }, [slides, preloadImage])

  // Move to next slide
  const nextSlide = useCallback(() => {
    setActiveSlide((current) => {
      const next = (current + 1) % slides.length
      const nextNext = (next + 1) % slides.length
      preloadImage(slides[nextNext])
      return next
    })
  }, [slides, preloadImage])

  // Move to previous slide
  const prevSlide = useCallback(() => {
    setActiveSlide((current) => {
      const prev = current === 0 ? slides.length - 1 : current - 1
      const prevNext = (prev + 1) % slides.length
      preloadImage(slides[prevNext])
      return prev
    })
  }, [slides, preloadImage])

  // Auto-play effect
  useEffect(() => {
    // Preload first slide
    preloadImage(slides[0])

    if (autoPlayInterval > 0) {
      slideTimerRef.current = window.setInterval(nextSlide, autoPlayInterval)
    }

    return () => {
      if (slideTimerRef.current) {
        window.clearInterval(slideTimerRef.current)
      }
    }
  }, [autoPlayInterval, nextSlide, slides, preloadImage])

  return {
    activeSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    preloadedImages: preloadedImagesRef.current
  }
}

/**
 * useIntersectionObserver Hook
 * Detect when element enters viewport for lazy loading
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
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
