import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class CarouselStore {
  count = 0
  options = []

  constructor() {
    makeAutoObservable(this)
    this.getValue()
  }

  async getValue() {
    try {
      const { data } = await axios.get(`http://localhost:${API_PORT}/api/valueCarousel`)

      runInAction(() => {
        this.options = data.options
        this.maxCount = data.options.length - 1
        const startValue = data.value !== null ? data.value : data.defaultValue
        this.setClampValue(startValue)
      })

    } catch (error) {
      console.error('Loading Error', error)
    }
  }

  async postValue(value) {
    try {
      const { data } = await axios.post(`http://localhost:${API_PORT}/api/valueCarousel`, { value })

      runInAction(() => {
        this.setClampValue(data.value)
      })

    } catch (error) {
      console.error('Sync Data error', error)
    }
  }


  setClampValue(value, min = 0, max = this.maxCount) {
    this.count = Math.min(Math.max(value, min), max)
  }

  get canIncrement() {
    return this.count < this.maxCount
  }

  get canDecrement() {
    return this.count > 0
  }

  increment() {
    if (this.canIncrement) {
      this.count++
    }
  }

  decrement() {
    if (this.canDecrement) {
      this.count--
    }
  }
}

export const carouselStore = new CarouselStore()