import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class GaugeStore {
    count = 0

    constructor() {
        makeAutoObservable(this)
        this.getValue()
    }

    setClampValue(value, min = 0, max = 100) {
        this.count = Math.min(Math.max(value, min), max)
    }

    async getValue() {
        try {
            const { data } = await axios.get(`http://localhost:${API_PORT}/api/valueGauge`)

            runInAction(() => {
                const startValue = data.value !== null ? data.value : data.defaultValue
                this.setClampValue(startValue)
            })
        } catch (error) {
            console.error('Loading Error', error)
        }
    }

    async postValue(value) {
        try {
            const { data } = await axios.post(`http://localhost:${API_PORT}/api/valueGauge`, { value })

            runInAction(() => {
                this.setClampValue(data.value)
            })

        } catch (error) {
            console.error('Sync Data error', error)
        }
    }

    get canIncrement() {
        return this.count < 100
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

export const gaugeStore = new GaugeStore();
