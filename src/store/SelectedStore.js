import { makeAutoObservable } from "mobx"

class SelectedStore {
  selected = -1

  constructor() {
    makeAutoObservable(this)
  }

  setValue(value) {
    this.selected = value
  }
}

export const selectedStore = new SelectedStore()
