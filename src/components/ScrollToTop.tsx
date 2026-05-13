import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { forceScrollTopAfterRender } from '../utils/scroll'

export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  useLayoutEffect(() => {
    forceScrollTopAfterRender()
  }, [pathname, search])

  return null
}
