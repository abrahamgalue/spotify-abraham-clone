import { type Song } from '@/lib/data'
import { Play, Pause } from '@/icons/PlayerIcons'
import { usePlayerStore, type CurrentMusic } from '@/store/playerStore.ts'
import { getPlayListInfoById } from '@/services/ApiService'

interface Props {
  song: Song
  isCurrentSong: boolean
}

const isNewSongOfAnotherPlaylist = (currentMusic: CurrentMusic, song: Song) => {
  return currentMusic.playlist?.id != song.albumId
}

const setNewCurrentMusic = (
  song: Song,
  setIsPlaying: (isPlaying: boolean) => void,
  setCurrentMusic: (currentMusic: CurrentMusic) => void
): void => {
  getPlayListInfoById(song?.albumId).then(data => {
    const { songs, playlist } = data
    setIsPlaying(true)
    setCurrentMusic({ songs: songs, playlist: playlist, song: song })
  })
}

export const MusicsTablePlay = ({ song, isCurrentSong }: Props) => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore(state => state)

  const isCurrentSongRunning = (song: Song) => {
    return (
      currentMusic.song?.id == song.id &&
      currentMusic.playlist?.albumId == song.albumId &&
      isPlaying
    )
  }

  const handleClick = (song: Song) => {
    if (isCurrentSongRunning(song)) {
      setIsPlaying(false)
      return
    }

    if (isNewSongOfAnotherPlaylist(currentMusic, song)) {
      setNewCurrentMusic(song, setIsPlaying, setCurrentMusic)
      return
    }

    // the playlist is the same, set the current song
    setIsPlaying(true)
    setCurrentMusic({
      songs: currentMusic.songs,
      playlist: currentMusic.playlist,
      song: song,
    })
  }

  const className = 'hover:scale-105'
  return (
    <button onClick={() => handleClick(song)}>
      {isCurrentSongRunning(song) ? (
        <Pause className={className} />
      ) : (
        <Play className={className} />
      )}
    </button>
  )
}
