import { Next, Pause, Play, Prev } from '@/icons/PlayerIcons'
import { useCurrentMusic } from '@/hooks/useCurrentMusic'
import { usePlayerStore } from '@/store/playerStore'

export function PlayerControlButtonBar() {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore(state => state)
  const { getNextSong, getPreviousSong } = useCurrentMusic(currentMusic)

  const onPlayPause = () => {
    if (currentMusic.song === null) return
    setIsPlaying(!isPlaying)
  }

  const onNextSong = () => {
    const nextSong = getNextSong()
    if (nextSong) {
      setCurrentMusic({ ...currentMusic, song: nextSong })
    }
  }

  const onPrevSong = () => {
    const prevSong = getPreviousSong()
    if (prevSong) {
      setCurrentMusic({ ...currentMusic, song: prevSong })
    }
  }

  return (
    <div className='flex justify-center flex-row flex-nowrap items-center gap-4'>
      <button
        className='opacity-60 hover:scale-105 hover:opacity-100'
        onClick={onPrevSong}
        title='Previous'
      >
        <Prev />
      </button>
      <button
        className='bg-white text-black rounded-full p-2 hover:scale-110'
        onClick={onPlayPause}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className={''} /> : <Play className={''} />}
      </button>
      <button
        className='opacity-60 hover:scale-105 hover:opacity-100'
        onClick={onNextSong}
        title='Next'
      >
        <Next />
      </button>
    </div>
  )
}
