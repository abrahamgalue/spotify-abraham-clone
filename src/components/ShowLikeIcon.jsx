import { useState } from 'react'
import { Like, LikeFilled } from '@/icons/Like'

function ShowLikeIcon({
  width,
  height,
  title = {
    addText: 'Save to',
    removeText: 'Remove from',
    entity: 'Your Library',
  },
}) {
  const [like, setLike] = useState(false)

  return (
    <button
      title={`${like ? title.removeText : title.addText} ${title.entity}`}
      className='flex items-center justify-center text-table-text hover:cursor-pointer hover:scale-105 hover:text-white'
      onClick={() => setLike(!like)}
    >
      {like ? (
        <LikeFilled width={width} height={height} />
      ) : (
        <Like width={width} height={height} />
      )}
    </button>
  )
}

export default ShowLikeIcon
