import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"
import { settingsStore } from "./settingsStore"

class EditorStore {
  typeById = {}
  titleById = {}
  valuesById = {}
  defaultValueById = {}
  optionsById = {}
  actionById = {}

  settings = []
  formData = {}
  eventSource = null

  constructor() {
    makeAutoObservable(this)
    this.loadSettings()
  }

  // ----------------  Storage

  getStorage() {
    const cached = sessionStorage.getItem("editor")
    return cached ? JSON.parse(cached) : null
  }

  setStorage(data) {
    sessionStorage.setItem("editor", JSON.stringify(data))
  }

  cleanStorage() {
    sessionStorage.removeItem("editor")
    sessionStorage.removeItem("settings")
  }

  // ----------------  Actions

  clearFormRefs(refs) {
    refs.typeRef.current.value = "gauge"
    refs.titleRef.current.value = ""
    refs.defaultValueRef.current.value = ""
    refs.actionRef.current.value = ""
  }

  //
  //  ROUTES

  // -------------- SSE ---------------------------

  connectSEE() {
    const url = `http://${window.location.hostname}:${API_PORT}/api/settings/stream`
    this.eventSource = new EventSource(url)
  }

  // -------------- LOAD LIST ---------------------------

  async loadSettings() {
    try {
      const response = await axios.get(
        `http://${window.location.hostname}:${API_PORT}/api/editor/`,
      )

      const items = response.data
      runInAction(() => {
        items.forEach((item) => {
          this.typeById[item.id] = item.type
          this.titleById[item.id] = item.title
          this.valuesById[item.id] = item.value
          this.defaultValueById[item.id] = item.defaultValue
          if (item.options) this.optionsById[item.id] = item.options
          this.actionById[item.id] = item.action
        })
        this.settings = items
        this.setStorage(items)
      })

      return items
    } catch (error) {}
  }

  //  -------------- GET ------------------------------

  getAllItems() {
    return this.settings
  }

  getItem(id) {
    const storage = this.getStorage()

    if (storage) {
      const selected = storage.find((i) => i.id === id)

      if (selected) {
        runInAction(() => {
          this.typeById[id] = selected.type
          this.titleById[id] = selected.title
          this.valuesById[id] = selected.value
          this.defaultValueById[id] = selected.defaultValue
          if (selected.type === "carousel")
            this.optionsById[id] = selected.options
          this.actionById[id] = selected.action
        })
        return selected
      }
    }
  }

  //  -------------- POST ------------------------------

  async postItem(itemData) {
    try {
      const response = await axios.post(
        `http://${window.location.hostname}:${API_PORT}/api/editor/item`,
        itemData,
      )

      runInAction(() => {
        const item = response.data

        this.typeById[item.id] = item.type
        this.titleById[item.id] = item.title
        this.valuesById[item.id] = item.value
        this.defaultValueById[item.id] = item.defaultValue
        if (item.options) this.optionsById[item.id] = item.options
        this.actionById[item.id] = item.action

        this.settings.push(item)

        settingsStore.clearCahce("settings")
        settingsStore.loadSettings()

        this.setStorage(this.settings)

        return this.settings
      })
    } catch (error) {
      console.error("Error posting item:", error)
    }
  }

  //  -------------- CLEAN ------------------------------

  async cleanDB() {
    try {
      return await axios.post(
        `http://${window.location.hostname}:${API_PORT}/api/editor/clean`,
      )
    } catch (error) {
      console.error("Error clean list:", error)
    }
  }
}

export const editorStore = new EditorStore()
