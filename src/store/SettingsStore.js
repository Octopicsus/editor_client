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

  getType(id) {
    return this.typeById[id]
  }

  getValue(id) {
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

  canIncrement(id) {
    return this.getValue(id) < this.getMaxCount(id)
  }

  canDecrement(id) {
    return this.getValue(id) > 0
  }

  increment(id) {
    if (this.canIncrement(id)) {
      this.setClampValue(id, this.getValue(id) + 1)
    }
  }

  decrement(id) {
    if (this.canDecrement(id)) {
      this.setClampValue(id, this.getValue(id) - 1)
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

  //  ROUTES

  // -------------- FULL LIST ---------------------------

  async loadSettings() {
    try {
      const { data } = await axios.get(
        `http://localhost:${API_PORT}/api/settings`
      )

      runInAction(() => {
        this.settings = data
      })
    } catch (error) {
      console.error("Loading Setting List", error)
    }
  }

  //  -------------- GET ------------------------------

  async getValues(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:${API_PORT}/api/settings/values`,
        { params: { id } }
      )

      runInAction(() => {
        this.typeById[id] = data.type
        this.defaultValueById[id] = data.defaultValue

        if (data.type === "carousel") {
          const settings = data.options ?? []
          this.optionsById[id] = settings
          this.maxCountById[id] = settings.length - 1
        }

        this.setClampValue(id, data.value)
      })
    } catch (error) {
      console.error("Loading Error", error)
    }
  }

  //  -------------- POST ------------------------------

  async postValues(id, value) {
    try {
      const { data } = await axios.post(
        `http://localhost:${API_PORT}/api/settings/values`,
        { id, value }
      )

      runInAction(() => {
        this.setClampValue(id, data.value)
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
        })
      })
    } catch (error) {
      console.error("Reset Error", error)
    }
  }
}

export const settingsStore = new SettingsStore()
