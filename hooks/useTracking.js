'use client'

import { useEffect } from 'react'
import { getTrackingManager } from '../lib/tracking'

export function useTracking() {
  useEffect(() => {
    const tracking = getTrackingManager()
    return () => {
      // Cleanup if needed
    }
  }, [])

  return getTrackingManager()
}
