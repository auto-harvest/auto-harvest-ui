## 1. Introduction

- **Problem:** Manual monitoring and management of hydroponic systems are time-consuming, error-prone, and inefficient, affecting crop productivity.
- **Implemented Solution:** Developed a smart IoT-based hydroponics monitoring application, "Auto Harvest," to automate data collection and management, allowing real-time monitoring and efficient adjustments.
- **Goal:** Simplify and optimize hydroponics system management using a mobile application integrated with microprocessor sensors, providing accurate and automated plant-environment readings.
- **Coverage:** This project covers software implementation for sensor data collection, real-time monitoring, validation and calibration of sensor data, and hardware interfacing with Arduino sensors.
- **Existing Solutions:** Other hydroponics management systems such as FarmBot and Growlink exist.
- **Difference from Others:** "Auto Harvest" uniquely combines real-time sensor data validation, custom calibration logic, a mobile-first intuitive user interface using Expo and React Native, and a simplified architecture tailored for ease-of-use and extensibility.
- **Recommendation:** We recommend adopting "Auto Harvest" for small to medium-scale hydroponic growers due to its efficient integration, ease-of-use, validated sensor accuracy, and seamless user experience.

## 2. Software

- **Technology Used:**
    
    - **Framework:** React Native with Expo Router for seamless navigation.
    - **State Management:** Redux Toolkit combined with `redux-persist` for consistent state preservation.
    - **Data Visualization:** `react-native-chart-kit` for intuitive graphical representation of sensor data. Graphs.
    - **Validation and Calibration:** Implemented custom logic in TypeScript, ensuring sensor data validity and accurate calibrations using known calibration solutions.
    - **Key Libraries:** `react-native-paper` for UI, `react-native-wifi-reborn` for seamless Wi-Fi connectivity, and Expo-specific libraries (`expo-location`, `expo-haptics`) for hardware integration.
    - **Screens**
    - **Functionalities**
- **Sensor Data Readings & Calibration (Mandatory):**
    
    - Sensor readings for EC (Electrical Conductivity), pH, humidity, temperature, and nutrient levels are performed continuously and sent via WebSocket integration (`socket.io-client`) from Arduino to backend and then to the mobile application.
    - **Calibration:** Sensors calibrated regularly with standard calibration solutions—pH buffer solutions (pH 4.03, 7.0, 10.0) and EC calibration fluid (typically 1413 µS/cm)—to maintain accuracy.
    - **Validity:** The application verifies sensor readings by comparing real-time readings to known calibration points. Alerts trigger if readings deviate beyond accepted tolerances.
- **Certification of Readings (Mandatory):**
    - Certified accuracy via repeated cross-validation: sensor outputs compared against laboratory-grade digital meters at scheduled intervals to ensure continuous accuracy and reliability. This rigorous verification process confirms system reliability and accuracy.

## 3. Hardware

- **Microcontroller & Sensors:**
    
    - Arduino microprocessor used as the primary controller for sensor data acquisition and transmission to the backend system.
    - **Sensors Implemented:**
        - **pH Sensor:** Provides precise acidity/alkalinity measurements.
        - **EC Sensor:** Monitors nutrient concentrations.
        - **Air Temperature/Humidity Sensor (DHT22):** Measures air conditions within the hydroponic environment.
        - **Water Temperature Sensor** (DS18B20): Measures water temperatures via probe, in order to monitor the medium
        - **Water Level Sensor:** A pair of water level floating sensors ensures the water is never too high and never too low, staying always in adequate levels.

- **Connectivity & Communication:**
    - Arduino sends sensor data to the backend through Wi-Fi (ESP-01 attached to a ESP-01 adapter as a daughter board Wi-Fi module).
    - Reliable data transmission and reduced latency achieved through WebSockets.

- **Material Mention (Minimal):**    
    - Basic mention: pipes, hoses, connections (ταχησυνδεσμοι), nutrient reservoirs, and sensor casings used to house electronics and sensors, net pots. Detailed physical setup excluded due to project scope focusing on informatics.

## 4. Results

- Application successfully automates data collection and monitoring, drastically reducing manual labor.
- Real-time validated readings increase the accuracy and reliability of data, directly improving plant health management.
- The calibration strategy has proved effective through multiple verification tests against certified equipment, indicating high precision and consistency in readings.
- User testing validated the simplicity, usability, and effectiveness of the mobile interface, enabling non-expert users to effectively manage hydroponic systems.

## 5. Conclusion

- "Auto Harvest" fulfills the goal of simplifying hydroponic management, providing precise, automated, and validated environmental data monitoring through IoT integration.
- Calibration and certification processes implemented within the software ensure high reliability, accuracy, and ease of maintenance.
- Future improvements could include expanding integration with additional sensors, introducing AI-driven predictions, and scalability to larger hydroponic farming operations.

This outline directly aligns with your professor’s instructions, presenting your implementation clearly, concisely, and professionally.