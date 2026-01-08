import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { API_PORT } from "../../config/port";
import { gaugeStore } from "./GaugeStore";
import { carouselStore } from "./CarouselStore";

class SettingsStore {
  settings = [];

  constructor() {
    makeAutoObservable(this);
    this.loadSettings();
  }

  async loadSettings() {
    try {
      const { data } = await axios.get(
        `http://localhost:${API_PORT}/api/settings`
      );

      runInAction(() => {
        this.settings = data;
      });
    } catch (error) {
      console.error("Loading Setting List", error);
    }
  }

  async resetSettings() {
    try {
      const { data } = await axios.post(
        `http://localhost:${API_PORT}/api/settings/reset`
      );

      runInAction(() => {
        const widgets = data.data;
        this.settings = widgets;

        widgets.forEach((widget) => {
          if (widget.type === "gauge") {
            gaugeStore.setGaugeValue(widget.id, widget.value);
          }

          if (widget.type === "carousel") {
            carouselStore.setCarouselValue(widget.id, widget.value);
          }
        });
      });
    } catch (error) {
      console.error("Reset Setting List", error);
    }
  }
}

export const settingsStore = new SettingsStore();
