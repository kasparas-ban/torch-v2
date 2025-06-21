import { TimerState } from "@/types/timer-types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StateCreator, create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"

interface TimerStore {
  // Core timer state
  timeRemaining: number
  timerState: TimerState
  isBreak: boolean

  // Configuration
  initialWorkTime: number
  initialBreakTime: number
  initialLongBreakTime: number
  timerCount: number

  // Internal state for drift correction
  // We use `targetTime` to know when the timer should officially end.
  targetTime: number | null
  timeoutId?: number

  // Actions
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: (isBreak?: boolean) => void
  endTimer: () => void
  tick: () => void
}

// --- Configuration Constants ---
const DEFAULT_WORK_MINS = 1
const DEFAULT_BREAK_MINS = 5
const DEFAULT_LONG_BREAK_MINS = 15
const DEFAULT_SESSION_COUNT = 3

const workSeconds = DEFAULT_WORK_MINS * 60
const breakSeconds = DEFAULT_BREAK_MINS * 60
const longBreakSeconds = DEFAULT_LONG_BREAK_MINS * 60

const middlewares = (f: StateCreator<TimerStore>) =>
  devtools(
    persist(f, {
      name: "timer-store",
      storage: createJSONStorage(() => AsyncStorage),
    })
  )

const useTimerStore = create<TimerStore>()(
  middlewares((set, get) => ({
    // --- Initial State ---
    timeRemaining: workSeconds,
    timerState: "idle",
    isBreak: false,

    initialWorkTime: workSeconds,
    initialBreakTime: breakSeconds,
    initialLongBreakTime: longBreakSeconds,
    timerCount: 0,

    targetTime: null,
    timeoutId: undefined,

    // --- Actions ---

    startTimer: () => {
      const { timerState, timeRemaining, tick } = get()
      if (timerState === "running") return

      // Set the target end time based on current time + remaining time
      const newTargetTime = new Date().getTime() + timeRemaining * 1000

      set({
        timerState: "running",
        targetTime: newTargetTime,
      })

      // Start the tick loop
      tick()
    },

    pauseTimer: () => {
      const { timeoutId } = get()
      clearTimeout(timeoutId)
      set({ timerState: "paused", timeoutId: undefined, targetTime: null })
    },

    resetTimer: (isBreakOverride?: boolean) => {
      const {
        timeoutId,
        isBreak,
        timerCount,
        initialWorkTime,
        initialBreakTime,
        initialLongBreakTime,
      } = get()
      clearTimeout(timeoutId)

      const nextIsBreak =
        isBreakOverride !== undefined ? isBreakOverride : isBreak
      let newTime

      if (nextIsBreak) {
        newTime =
          (timerCount + 1) % DEFAULT_SESSION_COUNT === 0
            ? initialLongBreakTime
            : initialBreakTime
      } else {
        newTime = initialWorkTime
      }

      set({
        timeRemaining: newTime,
        timerState: "idle",
        isBreak: nextIsBreak,
        timeoutId: undefined,
        targetTime: null,
      })
    },

    endTimer: () => {
      const { isBreak, timerCount, resetTimer } = get()

      if (!isBreak) {
        set({ timerCount: timerCount + 1 })
      }

      // Reset to the next state (work -> break, or break -> work)
      resetTimer(!isBreak)
      // You might want to add notifications or other side effects here
    },

    tick: () => {
      const { targetTime, endTimer, tick } = get()

      if (!targetTime) return // Should not happen in a running state

      const now = new Date().getTime()
      const newTimeRemaining = Math.round((targetTime - now) / 1000)

      if (newTimeRemaining <= 0) {
        set({ timeRemaining: 0 })
        endTimer()
        return
      }

      // Self-correcting timeout.
      // It calculates the delay for the *next* tick based on how much the
      // current one was off. `(targetTime - now) % 1000` gives us the "drift".
      const nextTickDelay = (targetTime - now) % 1000 || 1000

      const timeoutId = setTimeout(tick, nextTickDelay)
      set({ timeRemaining: newTimeRemaining, timeoutId })
    },
  }))
)

export default useTimerStore
