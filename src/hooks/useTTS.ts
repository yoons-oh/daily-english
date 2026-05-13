import { useEffect, useMemo, useRef, useState } from 'react'

export type TTSVoiceOption = {
  name: string
  lang: string
}

export function useTTS() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [rate, setRate] = useState(0.9)
  const [selectedVoiceName, setSelectedVoiceName] = useState('')
  const [speaking, setSpeaking] = useState(false)
  const stopRequestedRef = useRef(false)

  useEffect(() => {
    function loadVoices() {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)

      const englishVoice =
        availableVoices.find((voice) => voice.lang === 'en-US') ||
        availableVoices.find((voice) => voice.lang.startsWith('en'))

      if (englishVoice && !selectedVoiceName) {
        setSelectedVoiceName(englishVoice.name)
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      stopRequestedRef.current = true
      window.speechSynthesis.cancel()
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [selectedVoiceName])

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: '매일 10분 영어 대화',
        artist: 'Daily English',
        album: 'Listening Practice',
      })

      navigator.mediaSession.setActionHandler('pause', stop)
      navigator.mediaSession.setActionHandler('stop', stop)
    }
  }, [])

  const englishVoices = useMemo(() => {
    return voices.filter((voice) => voice.lang.startsWith('en'))
  }, [voices])

  function getSelectedVoice() {
    return (
      voices.find((voice) => voice.name === selectedVoiceName) ||
      voices.find((voice) => voice.lang === 'en-US') ||
      voices.find((voice) => voice.lang.startsWith('en')) ||
      null
    )
  }

  function stop() {
    stopRequestedRef.current = true
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  function speak(text: string) {
    if (!text.trim()) return

    stop()
    stopRequestedRef.current = false

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    utterance.pitch = 1

    const voice = getSelectedVoice()
    if (voice) {
      utterance.voice = voice
      utterance.lang = voice.lang
    }

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  function speakOneLine(text: string) {
    return new Promise<boolean>((resolve) => {
      if (stopRequestedRef.current || !text.trim()) {
        resolve(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = rate
      utterance.pitch = 1

      const voice = getSelectedVoice()
      if (voice) {
        utterance.voice = voice
        utterance.lang = voice.lang
      }

      utterance.onstart = () => {
        if (!stopRequestedRef.current) setSpeaking(true)
      }

      utterance.onend = () => resolve(!stopRequestedRef.current)
      utterance.onerror = () => resolve(!stopRequestedRef.current)

      window.speechSynthesis.speak(utterance)
    })
  }

  async function speakLines(lines: string[]) {
    window.speechSynthesis.cancel()
    stopRequestedRef.current = false
    setSpeaking(true)

    for (const text of lines) {
      if (stopRequestedRef.current) break
      const continued = await speakOneLine(text)
      if (!continued || stopRequestedRef.current) break
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    if (!stopRequestedRef.current) setSpeaking(false)
    return !stopRequestedRef.current
  }

  async function speakRepeated(lines: string[], repeatCount: number) {
    window.speechSynthesis.cancel()
    stopRequestedRef.current = false
    setSpeaking(true)

    const safeRepeatCount = Math.min(10, Math.max(1, repeatCount))

    for (let i = 0; i < safeRepeatCount; i += 1) {
      if (stopRequestedRef.current) break

      for (const text of lines) {
        if (stopRequestedRef.current) break
        const continued = await speakOneLine(text)
        if (!continued || stopRequestedRef.current) break
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      if (i < safeRepeatCount - 1 && !stopRequestedRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 800))
      }
    }

    if (!stopRequestedRef.current) setSpeaking(false)
    return !stopRequestedRef.current
  }

  return {
    voices: englishVoices,
    rate,
    setRate,
    selectedVoiceName,
    setSelectedVoiceName,
    speaking,
    speak,
    speakLines,
    speakRepeated,
    stop,
  }
}
