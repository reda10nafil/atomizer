export async function takeScreenshot(canvas: HTMLCanvasElement, filename = 'atomizer-screenshot.png') {
  return new Promise<void>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
      resolve()
    }, 'image/png', 1.0)
  })
}

export async function takeHighResScreenshot(
  canvas: HTMLCanvasElement,
  scale = 2,
  filename = 'atomizer-4k.png'
) {
  const width = canvas.width * scale
  const height = canvas.height * scale
  
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = width
  tempCanvas.height = height
  
  const ctx = tempCanvas.getContext('2d')
  if (!ctx) return
  
  ctx.drawImage(canvas, 0, 0, width, height)
  
  tempCanvas.toBlob((blob) => {
    if (!blob) return
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }, 'image/png', 1.0)
}
