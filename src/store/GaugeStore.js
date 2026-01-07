import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"
import { API_PORT } from "../../config/port"

class GaugeStore {
    valuesById = {}
    defaultValueById = {}

    constructor() {
        makeAutoObservable(this)
    }

    getCount(id) {
        return this.valuesById[id] ?? this.getDefaultCount(id)
    }

    getDefaultCount(id) {
        return this.defaultValueById[id] ?? 0
    }

    setGaugeValue(id, value, min = 0, max = 100) {
        const clamped = Math.min(Math.max(value, min), max)
        this.valuesById[id] = clamped
        return clamped
    }

    canIncrement(id) {
        return this.getCount(id) < 100
    }

    canDecrement(id) {
        return this.getCount(id) > 0
    }

    increment(id) {
        if (this.canIncrement(id)) {
            this.setGaugeValue(id, this.getCount(id) + 1)
        }
    }

    decrement(id) {
        if (this.canDecrement(id)) {
            this.setGaugeValue(id, this.getCount(id) - 1)
        }
    }

    async getValue(id) {
        try {
            const { data } = await
                axios.get(`http://localhost:${API_PORT}/api/valueGauge`,
                    { params: { id } })

            runInAction(() => {
                this.setGaugeValue(id, data.value)
            })

        } catch (error) {
            console.error('Loading Error', error)
        }
    }

    async postValue(id, value) {
        try {
            const { data } = await
                axios.post(`http://localhost:${API_PORT}/api/valueGauge`,
                    { id, value })

            runInAction(() => {
                this.setGaugeValue(id, data.value)
            })

        } catch (error) {
            console.error('Sync Data error', error)
        }
    }
}

export const gaugeStore = new GaugeStore();
