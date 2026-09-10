import type { LocationResult } from '../types/models'

export interface LocationError {
  code: 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED' | 'UNKNOWN'
  message: string
}

export function requestLiveLocation(): Promise<LocationResult> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject({
        code: 'NOT_SUPPORTED',
        message: 'Geolocation is not supported by your browser.'
      } as LocationError)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const acc = Math.round(position.coords.accuracy)
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`

        resolve({
          latitude: lat,
          longitude: lng,
          accuracy: acc,
          timestamp: position.timestamp,
          mapsUrl
        })
      },
      (error) => {
        let code: LocationError['code'] = 'UNKNOWN'
        let message = 'Unable to determine your current location.'

        switch (error.code) {
          case error.PERMISSION_DENIED:
            code = 'PERMISSION_DENIED'
            message = 'Location permission was not granted. Please enable location permissions in your browser settings.'
            break
          case error.POSITION_UNAVAILABLE:
            code = 'POSITION_UNAVAILABLE'
            message = 'Current location signal is unavailable.'
            break
          case error.TIMEOUT:
            code = 'TIMEOUT'
            message = 'Location request timed out. Please try again in an open area.'
            break
        }

        reject({ code, message } as LocationError)
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0
      }
    )
  })
}
