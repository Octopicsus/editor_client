import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class EditorStore {
  settings = []
  formData = {}

  constructor() {
    makeAutoObservable(this)
  }

  getFromSession() {
    const data = sessionStorage.getItem("editorStore")
    if (data) {
      this.settings = JSON.parse(data)
    }
  }

  saveToSession() {
    sessionStorage.setItem("editorStore", JSON.stringify(this.settings))
  }

  cleanSession() {
    sessionStorage.removeItem("editorStore")
  }

  setFormField(field, value) {
    this.formData[field] = value
  }

  clearFormRefs(refs) {
    refs.typeRef.current.value = "gauge"
    refs.titleRef.current.value = ""
    refs.valueRef.current.value = ""
    refs.defaultValueRef.current.value = ""
  }

  addItem(data) {
    const newItem = {
      id: this.settings.length,
      ...data,
    }
    
    this.settings.push(newItem)
    this.saveToSession()
  }
}

export const editorStore = new EditorStore()
