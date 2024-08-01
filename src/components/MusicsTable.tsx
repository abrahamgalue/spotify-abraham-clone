import { type Song } from '@/lib/data'
import { MusicsTablePlay } from '@/components/MusicsTablePlay'
import { usePlayerStore, type CurrentMusic } from '../store/playerStore'
import { EqualiserIcon, TimeIcon } from '@/icons/MusicsTableIcons'

interface Props {
  songs: Song[]
}

const isCurrentSong = (song: Song) => {
  const { song: currentSong, playlist } = usePlayerStore(
    state => state.currentMusic
  )
  return currentSong?.id == song.id && playlist?.albumId == song.albumId
}

const isCurrentSongRunning = (
  song: Song,
  currentMusic: CurrentMusic,
  isPlaying: boolean
) => {
  return (
    currentMusic.song?.id == song.id &&
    currentMusic.playlist?.albumId == song.albumId &&
    isPlaying
  )
}

export const MusicsTable = ({ songs }: Props) => {
  const { currentMusic, isPlaying } = usePlayerStore(state => state)

  return (
    <table className='table-auto text-left min-w-full divide-y divide-gray-500/20'>
      <thead className=''>
        <tr className='text-zinc-400 text-sm'>
          <th className='px-4 py-2'>#</th>
          <th className='px-4 py-2 hover:text-white'>Title</th>
          <th className='px-4 py-2 hover:text-white'>Album</th>
          <th className='px-4 py-2 hover:text-white' title='Duration'>
            <TimeIcon />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className='h-[16px]'></tr>
        {songs.map((song, index) => {
          const isCurrentSongBoolean = isCurrentSong(song)
          return (
            <tr
              key={`{song.albumId}-${song.id}`}
              className='hover:text-white border-spacing-0 text-sm hover:bg-white/10 overflow-hidden transition duration-300 group text-zinc-400'
            >
              <td className='relative px-4 py-2 rounded-tl-lg rounded-bl-lg w-5'>
                {!isCurrentSongRunning(song, currentMusic, isPlaying) ? (
                  <>
                    <span
                      className={`absolute top-5 opacity-100 transition-all group-hover:opacity-0
                        ${
                          isCurrentSongBoolean ? 'text-green-400' : 'text-white'
                        }
                        `}
                    >
                      {index + 1}
                    </span>
                    <div className='absolute top-5 opacity-0 transition-all group-hover:opacity-100'>
                      <MusicsTablePlay
                        song={song}
                        isCurrentSong={isCurrentSongBoolean}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <EqualiserIcon
                      className={`absolute top-5 opacity-100 transition-all group-hover:opacity-0`}
                    />
                    <div className='absolute top-5 opacity-0 transition-all group-hover:opacity-100'>
                      <MusicsTablePlay
                        song={song}
                        isCurrentSong={isCurrentSongBoolean}
                      />
                    </div>
                  </>
                )}
              </td>
              <td className='px-4 py-2 flex gap-3'>
                <picture className=''>
                  <img
                    src={song.image}
                    alt={song.title}
                    className='w-11 h-11'
                  />
                </picture>
                <div className='flex flex-col'>
                  <h3
                    className={`text-base font-normal
                        ${
                          isCurrentSongBoolean ? 'text-green-400' : 'text-white'
                        }
                        `}
                  >
                    {song.title}
                  </h3>
                  <span>{song.artists.join(', ')}</span>
                </div>
              </td>
              <td className='px-4 py-2'>{song.album}</td>
              <td className='px-4 py-2 rounded-tr-lg rounded-br-lg'>
                {song.duration}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
