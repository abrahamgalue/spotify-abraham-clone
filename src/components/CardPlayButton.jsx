import { Pause, Play } from './Player'
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButton({ id }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
      })
  }

  return (
    <button
      onClick={handleClick}
      className='card-play-button rounded-full bg-[#1ed760] hover:bg-[#1fdf64] p-4 hover:scale-105 transition shadow-md'
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  )
}
