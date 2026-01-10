import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class SettingsStore {
  settings = []

  typeById = {}
  valuesById = {}
  defaultValueById = {}
  optionsById = {}
  maxCountById = {}

  constructor() {
    makeAutoObservable(this)
    this.loadSettings()
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

    //  -------- KEY Title

  keyTitle = `id-`

  preloadCache(data) {
    data.forEach((widget) => {
      const cached = this.getCache(`${this.keyTitle}${widget.id}`)

      if (cached) {
        this.typeById[widget.id] = cached.type
        this.defaultValueById[widget.id] = cached.defaultValue
        this.valuesById[widget.id] = cached.value

        if (cached.type === "carousel") {
          this.optionsById[widget.id] = cached.options
          this.maxCountById[widget.id] = cached.options.length - 1
        }
      }
    })
  }

  // ----------------  Get Varibales

  getType(id) {
    return this.typeById[id]
  }

  getCurrentValue(id) {
    return this.valuesById[id] ?? this.getDefaultValue(id)
  }

  getDefaultValue(id) {
    return this.defaultValueById[id] ?? 0
  }

  getOptions(id) {
    return this.optionsById[id] ?? []
  }

  maxCount(id) {
    return this.maxCountById[id] ?? 0
  }

  getMaxCount(id) {
    if (this.getType(id) === "carousel") {
      return this.maxCount(id)
    } else {
      return 100
    }
  }

  setClampValue(id, value, min = 0, max = this.getMaxCount(id)) {
    const clamped = Math.min(Math.max(Number(value), min), max)
    this.valuesById[id] = clamped
    return clamped
  }

  // ----------------  Actions

  canIncrement(id) {
    return this.getCurrentValue(id) < this.getMaxCount(id)
  }

  canDecrement(id) {
    return this.getCurrentValue(id) > 0
  }

  increment(id) {
    if (this.canIncrement(id)) {
      this.setClampValue(id, this.getCurrentValue(id) + 1)
    }
  }

  decrement(id) {
    if (this.canDecrement(id)) {
      this.setClampValue(id, this.getCurrentValue(id) - 1)
    }
  }

  isDefaultValues() {
    const arrState = Object.keys(this.valuesById).every(
      (id) => this.valuesById[id] === this.defaultValueById[id]
    )
    return arrState
  }

  disabledButton = (value, side) => {
    switch (side) {
      case "decrement":
        return value === 0
      case "increment":
        return value === 100
      default:
        return false
    }
  }

  //
  //
  //  ROUTES

  // -------------- FULL LIST ---------------------------

  async loadSettings() {
    const cached = this.getCache("settings")

    if (cached) {
      runInAction(() => {
        this.settings = cached
        this.preloadCache(cached)
      })
      return
    }

    try {
      const { data } = await axios.get(
        `http://localhost:${API_PORT}/api/settings`
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
    const key = `${this.keyTitle}${id}`
    const cached = this.getCache(key)

    if (cached) {
      runInAction(() => {
        this.typeById[id] = cached.type
        this.defaultValueById[id] = cached.defaultValue

        if (cached.type === "carousel") {
          this.optionsById[id] = cached.options
          this.maxCountById[id] = cached.options.length - 1
        }

        this.setClampValue(id, cached.value)
      })
      return
    }

    try {
      const { data } = await axios.get(
        `http://localhost:${API_PORT}/api/settings/values`,
        { params: { id } }
      )

      runInAction(() => {
        this.typeById[id] = data.type
        this.defaultValueById[id] = data.defaultValue

        if (data.type === "carousel") {
          this.optionsById[id] = data.options
          this.maxCountById[id] = data.options.length - 1
        }

        this.setClampValue(id, data.value)
        this.setCache(key, data)
      })
    } catch (error) {
      console.error("Loading Error", error)
    }
  }

  //  -------------- POST ------------------------------

  async postValues(id, value) {
    const key = `${this.keyTitle}${id}`

    try {
      const { data } = await axios.post(
        `http://localhost:${API_PORT}/api/settings/values`,
        { id, value }
      )

      runInAction(() => {
        this.setClampValue(id, data.value)
        this.setCache(key, data)
      })
    } catch (error) {
      console.error("Sync Data error", error)
    }
  }

  //  -------------- RESET ------------------------------

  async resetAll() {
    try {
      const { data } = await axios.post(
        `http://localhost:${API_PORT}/api/settings/reset`
      )

      runInAction(() => {
        data.forEach((item) => {
          this.valuesById[item.id] = item.value
          this.setCache(`${this.keyTitle}${item.id}`, item)
          this.clearCahce(`${this.keyTitle}${item.id}`)
          this.clearCahce("settings")
        })
      })
    } catch (error) {
      console.error("Reset Error", error)
    }
  }
}

export const settingsStore = new SettingsStore()
