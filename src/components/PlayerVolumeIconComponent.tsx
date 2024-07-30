import { usePlayerStore } from '@/store/playerStore'
import {
  VolumeSilence,
  VolumeMin,
  VolumeMedium,
  VolumeMax,
} from '@/icons/Volume'

const isVolumeSilenced = (loud: number) => loud < 0.1
const isVolumeLow = (loud: number) => loud >= 0.1 && loud < 0.5
const isVolumeMedium = (loud: number) => loud >= 0.5 && loud < 0.9
const isVolumeFull = (loud: number) => loud >= 0.9

const getVolumeIconByLouder = (loud: number) => {
  return (
    <>
      {isVolumeSilenced(loud) && <VolumeSilence />}
      {isVolumeLow(loud) && <VolumeMin />}
      {isVolumeMedium(loud) && <VolumeMedium />}
      {isVolumeFull(loud) && <VolumeMax />}
    </>
  )
}

export const PlayerVolumeIconComponent = () => {
  const volume = usePlayerStore(state => state.volume)
  return getVolumeIconByLouder(volume)
}
