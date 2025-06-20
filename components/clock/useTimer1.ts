import { Subs } from "react-sub-unsub"
import { create } from "zustand"

// We still need this utility

// --- Type definitions from the original hook ---
export interface TimerOptions {
  runOnce?: boolean
}

const never = Number.MAX_SAFE_INTEGER

// Define the store state type
interface TimerStoreState {
  status: "stopped" | "running" | "paused"
  start: (startTimeMillis?: number) => void
  stop: () => void
  pause: () => void
  resume: () => void
  isStarted: () => boolean
  isStopped: () => boolean
  isRunning: () => boolean
  isPaused: () => boolean
  getRemainingTime: () => number
  getStartTime: () => number
  getLastFireTime: () => number
  getNextFireTime: () => number
  getPauseTime: () => number
  getResumeTime: () => number
  getElapsedStartedTime: () => number
  getElapsedRunningTime: () => number
}

/**
 * A factory function to create a Zustand store that encapsulates the logic
 * of the useTimer (use-precision-timer) hook.
 *
 * @param options The TimerOptions for the timer.
 * @param callback The callback to call when the timer fires. It receives the overdue call count.
 */
export const createPrecisionTimerStore = (
  options: TimerOptions = {},
  callback?: (overdueCallCount: number) => void
) => {
  // --- Internal variables (equivalent to useRef) ---
  const subs = new Subs()
  let startedRef = false
  let startTimeRef = never
  let lastFireTimeRef = never
  let nextFireTimeRef = never
  let pauseTimeRef = never
  let resumeTimeRef = never
  let periodElapsedPauseTimeRef = 0
  let totalElapsedPauseTimeRef = 0

  // --- Memoized options, calculated once ---
  const runOnce = options.runOnce ?? false

  const store = create<TimerStoreState>((set, get) => ({
    // --- Public State ---
    // A single status string is often cleaner for Zustand state
    status: "stopped", // 'stopped', 'running', 'paused'

    // --- Actions and Getters ---
    ...(() => {
      // --- Getter Functions ---
      // These are defined inside an IIFE to get a private scope
      // They read directly from the internal variables, not from state.
      const isStarted = () => startedRef
      const isStopped = () => !isStarted()
      const isPaused = () => isStarted() && pauseTimeRef !== never
      const isRunning = () => isStarted() && !isPaused()

      const getRemainingTime = () => {
        const currentTime = Date.now()
        if (isStarted()) {
          if (isRunning()) {
            return Math.max(0, nextFireTimeRef - currentTime)
          } else if (isPaused()) {
            const edgeTime =
              lastFireTimeRef !== never ? lastFireTimeRef : startTimeRef
            return Math.max(
              0,
              -(pauseTimeRef - edgeTime - periodElapsedPauseTimeRef)
            )
          }
        }
        return 0
      }

      // --- Internal Core Logic (the `useEffect` replacement) ---
      const _checkTimer = () => {
        subs.unsubAll() // Clear any previous timeouts before setting a new one
        if (isRunning()) {
          const now = Date.now()
          if (now >= nextFireTimeRef) {
            const overdueCalls =
              lastFireTimeRef !== never ? Math.max(0, now - nextFireTimeRef) : 0

            lastFireTimeRef = now
            periodElapsedPauseTimeRef = 0
            const newFireTime = Math.max(now, nextFireTimeRef)
            nextFireTimeRef = newFireTime

            callback?.(overdueCalls)

            if (!runOnce) {
              subs.setTimeout(
                () => _checkTimer(),
                Math.max(newFireTime - Date.now(), 1)
              )
            } else {
              get().stop()
            }
          } else if (nextFireTimeRef < never) {
            subs.setTimeout(
              () => _checkTimer(),
              Math.max(nextFireTimeRef - Date.now(), 1)
            )
          }
        }
      }

      return {
        // --- Public Control Actions ---
        start: (startTimeMillis = Date.now()) => {
          startedRef = true
          startTimeRef = startTimeMillis
          lastFireTimeRef = never
          nextFireTimeRef = never
          pauseTimeRef = never
          resumeTimeRef = startTimeMillis
          periodElapsedPauseTimeRef = 0
          totalElapsedPauseTimeRef = 0

          set({ status: "running" })
          _checkTimer()
        },
        stop: () => {
          subs.unsubAll()
          startedRef = false
          startTimeRef = never
          lastFireTimeRef = never
          nextFireTimeRef = never
          pauseTimeRef = never
          resumeTimeRef = never
          periodElapsedPauseTimeRef = 0
          totalElapsedPauseTimeRef = 0

          set({ status: "stopped" })
        },
        pause: () => {
          if (isRunning()) {
            subs.unsubAll()
            pauseTimeRef = Date.now()
            resumeTimeRef = never
            set({ status: "paused" })
          }
        },
        resume: () => {
          if (isPaused()) {
            const currentTime = Date.now()
            nextFireTimeRef = currentTime + getRemainingTime()
            totalElapsedPauseTimeRef += currentTime - pauseTimeRef
            pauseTimeRef = never
            resumeTimeRef = currentTime
            periodElapsedPauseTimeRef = 0

            set({ status: "running" })
            _checkTimer()
          }
        },

        // --- Public Getter Methods ---
        isStarted,
        isStopped,
        isRunning,
        isPaused,
        getRemainingTime,
        getStartTime: () => (isStarted() ? startTimeRef : -1),
        getLastFireTime: () => (lastFireTimeRef < never ? lastFireTimeRef : -1),
        getNextFireTime: () => (isRunning() ? nextFireTimeRef : -1),
        getPauseTime: () => (isPaused() ? pauseTimeRef : -1),
        getResumeTime: () =>
          isStarted() && resumeTimeRef < never ? resumeTimeRef : -1,
        getElapsedStartedTime: () =>
          isStarted() ? Date.now() - startTimeRef : 0,
        getElapsedRunningTime: () => {
          if (isStarted()) {
            return (
              (isPaused() ? pauseTimeRef : Date.now()) -
              startTimeRef -
              totalElapsedPauseTimeRef
            )
          }
          return 0
        },
      }
    })(),
  }))

  return store
}

export const useGlobalTimer = createPrecisionTimerStore(
  {},
  overdueCallCount => {
    console.log(`Timer Fired! Overdue calls: ${overdueCallCount}`)
  }
)
