import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class GaugeStore {
    valuesById = {}

    constructor() {
        makeAutoObservable(this)
    }

    getCount(id) {
        return this.valuesById[id]
    }

    setClampValue(id, value, min = 0, max = 100) {
        const clamped = Math.min(Math.max(value, min), max)
        this.valuesById[id] = clamped
        return clamped
    }

    async getValue(id) {
        try {
            const { data } = await axios.get(`http://localhost:${API_PORT}/api/valueGauge`, {
                params: { id }
            })

            runInAction(() => {
                const startValue = data.value !== null ? data.value : data.defaultValue
                this.setClampValue(id, startValue)
            })
        } catch (error) {
            console.error('Loading Error', error)
        }
    }

    async postValue(id, value) {
        try {
            const { data } = await axios.post(`http://localhost:${API_PORT}/api/valueGauge`, { id, value })

            runInAction(() => {
                this.setClampValue(id, data.value)
            })

        } catch (error) {
            console.error('Sync Data error', error)
        }
    }

    canIncrement(id) {
        return this.getCount(id) < 100
    }

    canDecrement(id) {
        return this.getCount(id) > 0
    }

    increment(id) {
        if (this.canIncrement(id)) {
            this.setClampValue(id, this.getCount(id) + 1)
        }
    }

    decrement(id) {
        if (this.canDecrement(id)) {
            this.setClampValue(id, this.getCount(id) - 1)
        }
    }
}

export const gaugeStore = new GaugeStore();
