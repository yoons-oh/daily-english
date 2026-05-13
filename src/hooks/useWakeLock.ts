import { useEffect, useRef, useState } from 'react'

type WakeLockSentinelLike = {
  release: () => Promise<void>
  addEventListener: (type: 'release', listener: () => void) => void
}

type NavigatorWithWakeLock = Navigator & {
  wakeLock?: {
    request: (type: 'screen') => Promise<WakeLockSentinelLike>
  }
}

export function useWakeLock() {
  const wakeLockRef = useRef<WakeLockSentinelLike | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setSupported(Boolean((navigator as NavigatorWithWakeLock).wakeLock))
  }, [])

  async function requestWakeLock() {
    const wakeLockApi = (navigator as NavigatorWithWakeLock).wakeLock
    if (!wakeLockApi) return false

    try {
      wakeLockRef.current = await wakeLockApi.request('screen')
      wakeLockRef.current.addEventListener('release', () => {
        wakeLockRef.current = null
        setEnabled(false)
      })
      setEnabled(true)
      return true
    } catch {
      setEnabled(false)
      return false
    }
  }

  async function releaseWakeLock() {
    try {
      await wakeLockRef.current?.release()
    } finally {
      wakeLockRef.current = null
      setEnabled(false)
    }
  }

  useEffect(() => {
    async function handleVisibilityChange() {
      if (document.visibilityState === 'visible' && enabled && !wakeLockRef.current) {
        await requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [enabled])

  useEffect(() => {
    return () => {
      releaseWakeLock()
    }
  }, [])

  return {
    supported,
    enabled,
    requestWakeLock,
    releaseWakeLock,
  }
}
