import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SensorInfo {
  id: string;
  value: number;
  timestamp: string;
}

export interface SensorInfoState {
  data: Record<string, SensorInfo>; // Using an object to mimic a map for Redux's JSON serialization
}

const initialState: SensorInfoState = {
  data: {
    ph: {
      id: "ph",
      value: 0,
      timestamp: Date.now().toString(),
    },
    temperature: {
      id: "temperature",
      value: 0,
      timestamp: Date.now().toString(),
    },
    humidity: {
      id: "humidity",
      value: 0,
      timestamp: Date.now().toString(),
    },
    tds: {
      id: "tds",
      value: 0,
      timestamp: Date.now().toString(),
    },
    'water-temperature': {
      id: "water-temperature",
      value: 0,
      timestamp: Date.now().toString(),
    }
  }, // Initial state as an empty object
};

const sensorInfoSlice = createSlice({
  name: "sensorInfo",
  initialState,
  reducers: {
    updateSensorInfo(state, action: PayloadAction<Record<string, any>>) {
      // Add or update the sensor data using its `id`
      state.data = {};
      for (const key in action.payload) {
        state.data[key] = {
          value: action.payload[key],
          id: key,
          timestamp: Date.now().toString(),
        };
      }
    },
    removeSensorInfo(state, action: PayloadAction<string>) {
      // Remove a sensor's data by its `id`
      const sensorId = action.payload;
      delete state.data[sensorId];
    },
    clearSensorInfo(state) {
      // Clear all sensor data
      state.data = {};
    },
  },
});

export const { updateSensorInfo, removeSensorInfo, clearSensorInfo } =
  sensorInfoSlice.actions;
export default sensorInfoSlice;
