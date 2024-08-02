import { useState, useEffect } from 'react'
import Back from '@/icons/Back'

export default function BackHistory() {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.pathname)
  }, [])

  const isBackHistoryEnabled = currentUrl !== '/'

  return (
    <button
      disabled={!isBackHistoryEnabled}
      className={`${isBackHistoryEnabled ? '' : 'opacity-70'}`}
      onClick={() => window.history.back()}
    >
      <div
        title={isBackHistoryEnabled ? 'Go Back' : undefined}
        className='flex items-center'
      >
        <span
          className={`${
            isBackHistoryEnabled
              ? 'hover:cursor-pointer'
              : 'hover:cursor-not-allowed'
          } text-white p-2 bg-[rgb(0,0,0,0.7)] transition-colors rounded-full`}
        >
          <Back />
        </span>
      </div>
    </button>
  )
}
