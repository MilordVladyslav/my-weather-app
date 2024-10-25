import { defineStore } from 'pinia'
import { appid, weatherApiGeo } from '@/requests/endpoints'
import axios from 'axios'
import type { GeolocationStore } from '@/interfaces'

export const useGeolocationStore = defineStore('todos', {
  state: (): GeolocationStore => ({
    geolocations: [],
    limit: 10,
  }),
  getters: {
    getGeolocations: state => state.geolocations,
  },
  actions: {
    getCoordinates(location: string) {
      axios
        .get(
          `${weatherApiGeo}/direct?q=${location}&limit=${this.$state.limit}&appid=${appid}`,
        )
        .then(res => {
          this.$state.geolocations = res.data || []
        })
    },
    clearGeolocations() {
      this.$state.geolocations = null
    },
    // getWeatherByCoordinates()
  },
})
