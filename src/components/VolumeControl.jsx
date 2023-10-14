import { usePlayerStore } from '@/store/playerStore'
import { useRef } from 'react'
import {
  VolumeSilence,
  VolumeMax,
  VolumeMedium,
  VolumeMin,
} from '@/icons/Volume'
import { Slider } from './Slider'

export const VolumeControl = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const previusVolumeRef = useRef(volume)

  const isVolumeSilenced = volume < 0.1

  const handleClickVolume = () => {
    if (isVolumeSilenced) {
      setVolume(previusVolumeRef.current)
    } else {
      previusVolumeRef.current = volume
      setVolume(0)
    }
  }

  const VolumeIcon = () => {
    return volume <= 0 ? (
      <VolumeSilence />
    ) : volume < 0.3 ? (
      <VolumeMin />
    ) : volume < 0.7 ? (
      <VolumeMedium />
    ) : (
      <VolumeMax />
    )
  }

  return (
    <div className='flex justify-center gap-x-2 text-white'>
      <button
        title={`${isVolumeSilenced ? 'Unmute' : 'Mute'}`}
        className='opacity-70 hover:opacity-100 transition cursor-default'
        onClick={handleClickVolume}
      >
        <VolumeIcon />
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className='w-[95px]'
        onValueChange={value => {
          const [newVolume] = value
          const volumeValue = newVolume / 100
          setVolume(volumeValue)
        }}
      />
    </div>
  )
}
