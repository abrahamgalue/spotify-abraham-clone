import React, { useState, useRef } from 'react'

const ExpandIcon = () => {
  return (
    <svg
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      fill='currentColor'
      width={16}
      height={16}
    >
      <path d='M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z'></path>
    </svg>
  )
}

const ContrackIcon = () => {
  return (
    <svg
      data-encore-id='icon'
      role='img'
      ariah-hidden='true'
      viewBox='0 0 24 24'
      width={16}
      height={16}
      fill='currentColor'
    >
      <path d='M21.707 2.293a1 1 0 0 1 0 1.414L17.414 8h1.829a1 1 0 0 1 0 2H14V4.757a1 1 0 1 1 2 0v1.829l4.293-4.293a1 1 0 0 1 1.414 0zM2.293 21.707a1 1 0 0 1 0-1.414L6.586 16H4.757a1 1 0 0 1 0-2H10v5.243a1 1 0 0 1-2 0v-1.829l-4.293 4.293a1 1 0 0 1-1.414 0z'></path>
    </svg>
  )
}

function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  // En lugar de un ref para un elemento específico, usaremos document.documentElement
  // Esto representa el elemento raíz del documento HTML

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  return (
    <button
      onClick={handleFullscreen}
      title={`${isFullscreen ? 'Exit full screen' : 'Full screen'}`}
      className='opacity-60 hover:scale-105 hover:opacity-100'
    >
      {isFullscreen ? <ContrackIcon /> : <ExpandIcon />}
    </button>
  )
}

export default FullscreenButton
