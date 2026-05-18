import { imageManifest } from './imageManifest'

export function getOptimizedImage(src) {
  return imageManifest[src] ?? {
    src,
    srcSet: undefined,
    sizes: undefined,
    width: undefined,
    height: undefined,
  }
}
