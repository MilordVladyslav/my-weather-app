interface store {
  limit: number
}

interface Geolocation {
  country: string
  lat: number
  local_names: object
  lon: number
  name: string
  state: string
}

interface GeolocationStore extends store {
  geolocations: Geolocation[] | []
}

export { GeolocationStore }
