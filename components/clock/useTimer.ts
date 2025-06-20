import { useElapsedTime } from "use-elapsed-time"

type TimerProps = {
  duration: number
  initialRemainingTime: number
}

function useTimer({ duration, initialRemainingTime }: TimerProps) {
  const { elapsedTime } = useElapsedTime({
    isPlaying,
    duration,
    startAt: getStartAt(duration, initialRemainingTime),
    updateInterval: 1,
    onUpdate:
      typeof onUpdate === "function"
        ? (elapsedTime: number) => {
            const remainingTime = Math.ceil(duration - elapsedTime)
            if (remainingTime !== remainingTimeRef.current) {
              remainingTimeRef.current = remainingTime
              onUpdate(remainingTime)
            }
          }
        : undefined,
    onComplete:
      typeof onComplete === "function"
        ? (totalElapsedTime: number) => {
            const { shouldRepeat, delay, newInitialRemainingTime } =
              onComplete(totalElapsedTime) ?? {}
            if (shouldRepeat) {
              return {
                shouldRepeat,
                delay,
                newStartAt: getStartAt(duration, newInitialRemainingTime),
              }
            }
          }
        : undefined,
  })

  return { isPlaying, remainingTime, duration }
}

const getStartAt = (duration: number, initialRemainingTime: number) => {
  if (duration === 0 || duration === initialRemainingTime) return 0
  return duration - initialRemainingTime
}

export default useTimer
