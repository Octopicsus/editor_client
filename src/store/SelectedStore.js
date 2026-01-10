import { makeAutoObservable } from "mobx"

class SelectedStore {
  selected = -1
  key = "index"

  constructor() {
    makeAutoObservable(this)
    this.getCache()
  }

  getCache() {
    const cached = sessionStorage.getItem(this.key)
    this.selected = JSON.parse(cached)
  }

  setCache(key, item) {
    sessionStorage.setItem(key, JSON.stringify(item))
  }

  setValue(value) {
    this.selected = value
    this.setCache(this.key, value)
  }
}

export const selectedStore = new SelectedStore()
