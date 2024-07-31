import { usePlayerStore } from '@/store/playerStore'
import { getPlayListInfoById } from '@/services/ApiService'
import { Pause, Play } from '@/icons/PlayerIcons'

export function CardPlayButton({ id, size = 'small' }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id
  const isThisPlaylistInStore = currentMusic?.playlist?.id === id

  const handleClick = () => {
    if (isThisPlaylistInStore) {
      setIsPlaying(!isPlaying)
      return
    }

    getPlayListInfoById(id)
      .then(data => {
        const { songs, playlist } = data
        setCurrentMusic({ songs: songs, playlist: playlist, song: songs[0] })
      })
      .then(() => {
        setIsPlaying(true)
      })
  }

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <button
      onClick={handleClick}
      className='card-play-button rounded-full text-black bg-[#1ed760] p-4 hover:scale-105 transition hover:bg-[#1fdf64]'
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  )
}
