import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class CarouselStore {
  valuesById = {}
  optionsById = {}
  maxCountById = {}

  constructor() {
    makeAutoObservable(this)
  }

  getCount(id) {
    return this.valuesById[id] ?? 0
  }

  getOptions(id) {
    return this.optionsById[id] ?? []
  }

  getMaxCount(id) {
    return this.maxCountById[id] 
  }

  setClampValue(id, value, min = 0, max = this.getMaxCount(id)) {
    const clamped = Math.min(Math.max(Number(value), min), max)
    this.valuesById[id] = clamped
    return clamped
  }

  async getValue(id) {
    try {
      const { data } = await axios.get(`http://localhost:${API_PORT}/api/valueCarousel`, {
        params: { id }
      })

      runInAction(() => {
        const settings = data.options ?? []
        this.optionsById[id] = settings
        this.maxCountById[id] = settings.length - 1

        const startValue = data.value ?? 0
        this.setClampValue(id, startValue)
      })

    } catch (error) {
      console.error('Loading Error', error)
    }
  }

  async postValue(id, value) {
    try {
      const { data } = await axios.post(`http://localhost:${API_PORT}/api/valueCarousel`, { id, value })

      runInAction(() => {
        this.setClampValue(id, data.value)
      })

    } catch (error) {
      console.error('Sync Data error', error)
    }
  }


  canIncrement(id) {
    return this.getCount(id) < this.getMaxCount(id)
  }

  canDecrement(id) {
    return this.getCount(id) > 0
  }

  increment(id) {
    if (this.canIncrement(id)) {
      this.setClampValue(id, this.getCount(id) + 1)
    }
  }

  decrement(id) {
    if (this.canDecrement(id)) {
      this.setClampValue(id, this.getCount(id) - 1)
    }
  }
}

export const carouselStore = new CarouselStore()