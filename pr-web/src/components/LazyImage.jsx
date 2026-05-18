import { useEffect, useRef, useState } from 'react'
import { getOptimizedImage } from '../imageUtils'

/**
 * LazyImage Component
 * Efficiently loads images only when they enter the viewport
 * Supports blur-up effect for smooth loading experience
 */
export function LazyImage({ src, alt, className = '', onLoad, priority = false, width, height }) {
  const [loadedSrc, setLoadedSrc] = useState(null)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)
  const optimizedImage = getOptimizedImage(src)
  const shouldLoad = priority || isInView
  const imageSrc = shouldLoad ? optimizedImage.src : undefined
  const isLoaded = loadedSrc === optimizedImage.src

  useEffect(() => {
    if (priority || isInView) {
      return
    }

    // Use Intersection Observer for lazy loading
    const imageNode = imgRef.current
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    )

    if (imageNode) {
      observer.observe(imageNode)
    }

    return () => {
      if (imageNode) {
        observer.unobserve(imageNode)
      }
    }
  }, [priority, isInView])

  const handleImageLoad = () => {
    setLoadedSrc(optimizedImage.src)
    if (onLoad) onLoad()
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={imageSrc ? optimizedImage.srcSet : undefined}
      sizes={imageSrc ? optimizedImage.sizes : undefined}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      onLoad={handleImageLoad}
      width={width ?? optimizedImage.width}
      height={height ?? optimizedImage.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  )
}

/**
 * LazyBackgroundImage Component
 * For CSS background images with lazy loading
 */
export function LazyBackgroundImage({ src, children, className = '', onLoad, priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef(null)
  const optimizedImage = getOptimizedImage(src)
  const shouldLoad = priority || isInView

  useEffect(() => {
    if (!shouldLoad) {
      return
    }

    const img = new Image()
    img.onload = () => {
      setIsLoaded(true)
      if (onLoad) onLoad()
    }
    img.src = optimizedImage.src
  }, [shouldLoad, optimizedImage.src, onLoad])

  useEffect(() => {
    if (shouldLoad) {
      return
    }

    const containerNode = containerRef.current
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.01
      }
    )

    if (containerNode) {
      observer.observe(containerNode)
    }

    return () => {
      if (containerNode) {
        observer.unobserve(containerNode)
      }
    }
  }, [shouldLoad])

  return (
    <div
      ref={containerRef}
      className={`${className} ${isLoaded ? 'bg-loaded' : 'bg-loading'}`}
      style={shouldLoad ? { backgroundImage: `url("${optimizedImage.src}")` } : {}}
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
          if (entry.isIntersecting && imageNode) {
            // Trigger the image loading by setting srcSet
            if (imageNode.dataset.srcset) {
              imageNode.srcSet = imageNode.dataset.srcset
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

    const imageNode = imgRef.current

    if (imageNode) {
      observer.observe(imageNode)
    }

    return () => {
      if (imageNode) {
        observer.unobserve(imageNode)
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
