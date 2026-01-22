import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class SettingsStore {
  settings = []
  eventSource = null

  constructor() {
    makeAutoObservable(this)
    this.loadSettings()
    this.connectSSE()
  }

  // ----------------  Cache

  getCache(key) {
    const cached = sessionStorage.getItem(key)
    return cached ? JSON.parse(cached) : null
  }

  setCache(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  clearCahce(key) {
    sessionStorage.removeItem(key)
  }

  // ----------------  Get Varibales

  getItem(id) {
    return this.settings.find((item) => item.id === id)
  }

  getType(id) {
    return this.getItem(id)?.type
  }

  setClampValue(id, value, min = 0, max = 100) {
    const item = this.getItem(id)
    if (!item) return
    const clamped = Math.min(Math.max(Number(value), min), max)
    item.value = clamped
    return clamped
  }

  // ----------------  Actions

  canIncrement(id) {
    const item = this.getItem(id)
    const maxCount = item?.type === "carousel" ? item?.options?.length - 1 : 100
    return item?.value < maxCount
  }

  canDecrement(id) {
    return this.getItem(id)?.value > 0
  }

  increment(id) {
    if (this.canIncrement(id)) {
      this.setClampValue(id, this.getItem(id).value + 1)
    }
  }

  decrement(id) {
    if (this.canDecrement(id)) {
      this.setClampValue(id, this.getItem(id).value - 1)
    }
  }

  isDefaultValues() {
    return this.settings.every((item) => item.value === item.defaultValue)
  }

  disabledButton = (value, side, max = 100) => {
    switch (side) {
      case "decrement":
        return value === 0
      case "increment":
        return value >= max
      default:
        return false
    }
  }

  //
  //  ROUTES

  // -------------- SSE ---------------------------

  connectSSE() {
    const url = `http://${window.location.hostname}:${API_PORT}/api/settings/stream`
    this.eventSource = new EventSource(url)

    this.eventSource.addEventListener("settings-updated", (event) => {
      const data = JSON.parse(event.data)

      runInAction(() => {
        const item = this.getItem(data.id)
        if (item) {
          item.value = data.value
          this.setCache("settings", this.settings)
        }
      })
    })

    this.eventSource.addEventListener("settings-reset", (event) => {
      const data = JSON.parse(event.data)

      runInAction(() => {
        data.forEach((resetItem) => {
          const item = this.getItem(resetItem.id)
          if (item) {
            item.value = resetItem.value
          }
        })
        this.setCache("settings", this.settings)
      })
    })

    this.eventSource.addEventListener("settings-list-updated", (event) => {
      const updatedList = JSON.parse(event.data)

      runInAction(() => {
        this.settings = updatedList
        this.setCache("settings", updatedList)
      })
    })
  }

  // -------------- LOAD LIST ---------------------------

  async loadSettings() {
    const cached = this.getCache("settings")

    if (cached) {
      runInAction(() => {
        this.settings = cached
      })
      return
    }

    try {
      const { data } = await axios.get(
        `http://${window.location.hostname}:${API_PORT}/api/settings`,
      )

      runInAction(() => {
        this.settings = data
        this.setCache("settings", data)
      })
    } catch (error) {
      console.error("Loading Setting List", error)
    }
  }

  //  -------------- GET ------------------------------

  async getValues(id) {
    const cached = this.getCache("settings")

    if (cached) {
      runInAction(() => {
        const item = this.getItem(id)
        const cachedItem = cached.find((i) => i.id === id)
        if (item && cachedItem) {
          item.value = cachedItem.value
        }
      })
      return
    }

    try {
      const { data } = await axios.get(
        `http://${window.location.hostname}:${API_PORT}/api/settings/values`,
        { params: { id } },
      )

      runInAction(() => {
        const item = this.getItem(id)
        if (item) {
          item.value = data.value
          this.setCache("settings", this.settings)
        }
      })
    } catch (error) {
      console.error("Loading Error", error)
    }
  }

  //  -------------- POST ------------------------------

  async postValues(id, value) {
    try {
      const { data } = await axios.post(
        `http://${window.location.hostname}:${API_PORT}/api/settings/values`,
        { id, value },
      )

      runInAction(() => {
        const item = this.getItem(id)
        if (item) {
          item.value = data.value
          this.setCache("settings", this.settings)
        }
      })
    } catch (error) {
      console.error("Sync Data error", error)
    }
  }

  //  -------------- RESET ------------------------------

  async resetAll() {
    try {
      const { data } = await axios.post(
        `http://${window.location.hostname}:${API_PORT}/api/settings/reset`,
      )

      runInAction(() => {
        this.settings = data
        this.setCache("settings", data)
      })
    } catch (error) {
      console.error("Reset Error", error)
    }
  }
}

export const settingsStore = new SettingsStore()
