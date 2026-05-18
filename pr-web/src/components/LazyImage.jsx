import { useEffect, useRef, useState } from 'react'

/**
 * LazyImage Component
 * Efficiently loads images only when they enter the viewport
 * Supports blur-up effect for smooth loading experience
 */
export function LazyImage({ src, alt, className = '', onLoad, priority = false, width, height }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const imgRef = useRef(null)

  useEffect(() => {
    // If priority or already loaded, load immediately
    if (priority) {
      setImageSrc(src)
      return
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, priority])

  const handleImageLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      onLoad={handleImageLoad}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}

/**
 * LazyBackgroundImage Component
 * For CSS background images with lazy loading
 */
export function LazyBackgroundImage({ src, children, className = '', onLoad, priority = false }) {
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (priority) {
      setBackgroundImage(src)
      setIsLoaded(true)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Preload image
            const img = new Image()
            img.onload = () => {
              setBackgroundImage(src)
              setIsLoaded(true)
              if (onLoad) onLoad()
            }
            img.src = src
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.01
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [src, priority, onLoad])

  return (
    <div
      ref={containerRef}
      className={`${className} ${isLoaded ? 'bg-loaded' : 'bg-loading'}`}
      style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : {}}
    >
      {children}
    </div>
  )
}

/**
 * OptimizedPicture Component
 * Serves WebP to modern browsers, fallback to other formats
 */
export function OptimizedPicture({ sources, alt, className = '', priority = false, width, height }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (priority) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && imgRef.current) {
            // Trigger the image loading by setting srcSet
            if (imgRef.current.dataset.srcset) {
              imgRef.current.srcSet = imgRef.current.dataset.srcset
            }
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [priority])

  return (
    <picture>
      {sources.map((source, index) => (
        <source key={index} {...source} />
      ))}
      <img
        ref={imgRef}
        alt={alt}
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={() => setIsLoaded(true)}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
      />
    </picture>
  )
}
