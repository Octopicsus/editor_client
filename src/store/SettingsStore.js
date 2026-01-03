import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class SettingsStore {
  settings = []

  constructor() {
    makeAutoObservable(this)
    this.loadSettings()
  }

  async loadSettings() {
    try {
      const { data } = await axios.get(`http://localhost:${API_PORT}/api/settings`)

      runInAction(() => {
        this.settings = data
      })
      
    } catch (error) {
      console.error('Loading Setting List', error)
    }
  }
}

export const settingsStore = new SettingsStore()