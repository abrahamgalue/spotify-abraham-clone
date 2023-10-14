import { usePlayerStore } from '@/store/playerStore'
import { useEffect, useRef, useState } from 'react'
import { Slider } from './Slider'
import { VolumeControl } from './VolumeControl'

export const Pause = ({ className }) => (
  <svg
    className={className}
    role='img'
    height='16'
    width='16'
    aria-hidden='true'
    viewBox='0 0 16 16'
  >
    <path d='M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
  </svg>
)

export const Play = ({ className }) => (
  <svg
    className={className}
    role='img'
    height='16'
    width='16'
    aria-hidden='true'
    viewBox='0 0 16 16'
  >
    <path d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z'></path>
  </svg>
)

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className='flex items-center gap-5 relative overflow-hidden'>
      <picture className='w-16 h-16 bg-zinc-800 rounded shadow-lg overflow-hidden'>
        <img src={image} alt={title} />
      </picture>

      <div className='flex flex-col'>
        <h3 className='font-semibold text-sm block'>{title}</h3>
        <span className='text-xs opacity-80'>{artists?.join(', ')}</span>
      </div>
    </div>
  )
}

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime)
  }

  const formatTime = time => {
    if (time == null) return '0:00'

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const duration = audio?.current?.duration ?? 0

  return (
    <div className='flex gap-x-2 text-xs pt-2'>
      <span className='opacity-50 w-12 text-right'>
        {formatTime(currentTime)}
      </span>

      <Slider
        max={audio?.current?.duration ?? 0}
        min={0}
        value={[currentTime]}
        className='w-[400px]'
        onValueChange={value => {
          const [newCurrentTime] = value
          audio.current.currentTime = newCurrentTime
        }}
      />

      <span className='opacity-50 w-12'>
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}

export function Player() {
  const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(
    state => state
  )
  const audioRef = useRef()

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const { song, playlist, songs } = currentMusic
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.volume = volume
      audioRef.current.play()
    }
  }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className='flex flex-row justify-between w-full px-1 py-3 z-50'>
      <div className='w-[200px]'>
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className='grid place-content-center gap-4 flex-1'>
        <div className='flex justify-center flex-col items-center'>
          <button
            className='bg-white rounded-full p-2 cursor-default hover:scale-105'
            onClick={handleClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <SongControl audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>

      <div className='grid place-content-center'>
        <VolumeControl />
      </div>

      <audio ref={audioRef} />
    </div>
  )
}
