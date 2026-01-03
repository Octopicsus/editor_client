import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class SelectedStore {
  selected = -1

  constructor() {
    makeAutoObservable(this)
    this.getValue()
  }

  async getValue() {
    try {
      const { data } = await axios.get(`http://localhost:${API_PORT}/api/selected`)

      runInAction(() => {
        this.selected = data.selected
      })

    } catch (error) {
      console.error('get Selected state Error: ', error)
    }
  }

  async postValue(value) {
    try {
      const { data } = await axios.post(`http://localhost:${API_PORT}/api/selected`, { selected: value })

      runInAction(() => {
        this.selected = data.selected
      })

    } catch (error) {
      console.error('set Selected state Error: ', error)
    }
  }

  setValue(value) {
    this.selected = value
  }
}

export const selectedStore = new SelectedStore()
