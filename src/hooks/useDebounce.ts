import { useCallback, useRef } from 'react'

export const useDebounce = (callback: (cbArgs: any) => any, delay: number) => {
  const timer = useRef<any>(null)
  return useCallback(
    (...args: any) => {
      if (timer.current) clearInterval(timer.current)
      timer.current = setTimeout(callback, delay, args)
    },
    [callback, delay]
  )
}
