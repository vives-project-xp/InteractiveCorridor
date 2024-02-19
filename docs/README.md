# Documentation

## Table of contents

- [Documentation](#documentation)
  - [Table of contents](#table-of-contents)
  - [Measurements](#measurements)
  - [Bill of Materials](#bill-of-materials)
    - [WS2814 RGBW LED strip](#ws2814-rgbw-led-strip)
    - [ESP32-C3](#esp32-c3)
    - [Ledstrip profile](#ledstrip-profile)
  - [Interfaces](#interfaces)
  - [Architecture document](#architecture-document)
    - [Input requirements](#input-requirements)
    - [Functional requirements](#functional-requirements)
    - [Output requirements](#output-requirements)
    - [Power](#power)
      - [ESP32 supply](#esp32-supply)
      - [LED strip supply](#led-strip-supply)
    - [Software architecture diagram](#software-architecture-diagram)
    - [Hardware architecture diagram](#hardware-architecture-diagram)
  - [Project document](#project-document)
  - [ESP32](#esp32)
    - [WLED Software](#wled-software)

## Measurements

The size of the hallway is:

- Height: 331cm
- Width: 240cm

## Bill of Materials

The Bill of Materials (BOM) lists all the components, parts, and materials needed for one corridor:

| Component                                       | Quantity | Price / unit | Link | Remarks |
| :---------------------------------------------- | :------: | -----------: | :--- | :------ |
| [WS2814 RGBW LED strip](#ws2814-rgbw-led-strip) |          |              |      |         |
| [ESP32-C3](#esp32-c3)                                 |          |              |      |         |
| [ledstrip profile](#ledstrip-profile)           |          |              |      |         |

### WS2814 RGBW LED strip

The model of the ledstrip is **BTF-24V-060L-B**. By this model we know it works on **24V** and has **60 LEDs per meter**. It has 4 channels: Red, Green, Blue, and Warm white.

The ledstrip has the following connections:

- **VCC** (Red): 24V
- **GND** (White): Ground
- **DAT** (Green): Data input

The length of the LED strip is **5 meters**. The ledstrip is **IP65** rated, which means it is waterproof. It uses **30~120W**.

> The **WS2814** ledstrip has a data input and a data output. This means that we can connect multiple ledstrips in series.

### ESP32-C3

Each pin can be used as a general-purpose I/O, or be connected to an internal peripheral signal

Documentation of the ESP32-C3 can be found at [espressif.com](https://www.espressif.com/en/products/socs/esp32-c3).

### Ledstrip profile

The profile is made of aluminium.

The specifications are:

- **Height**: 15,4 mm
- **width**: 19,9 mm
- **insidewidth**: 12,6 mm
- **diffuser**:opal milky white

## Interfaces

## Architecture document

### Input requirements

The input requirements for the project are:

- The user should be able to control the LED strips via a web interface.
- The user should be able to change the color and brightness of the LED strips.
- The user should be able to select different lighting effects and animations for the LED strips.

### Functional requirements

The functional requirements for the project are:

- The system should provide a web interface for the user to control the LED strips.
- The system should provide an API for the web interface to communicate with the server.
- The server should listen to the API and control the ESP32s via the [WLED MQTT interface](https://kno.wled.ge/interfaces/mqtt/).
- The system should provide a user-friendly interface to adjust the color, brightness, and lighting effects of the LED strips.
- The system should provide a variety of lighting effects and animations for the user to choose from.
- The system should be able to handle multiple ESP32s.
- The system should be able to handle multiple users controlling the LED strips simultaneously.

### Output requirements

The output requirements for the project are:

- No flickering or lag in the LED strips.
- Reaction time is below 100ms.

### Power

We need power for our LED strips and the ESP32s.

#### ESP32 supply

The ESP32 can be powered via USB or a 5V power supply.

#### LED strip supply

The LED strips require a 24V power supply.

### Software architecture diagram

<picture>
  <source
    srcset="./exports/ArchitectureDiagram_dark.svg"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="./exports/ArchitectureDiagram_light.svg"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img alt="Architecture diagram" />
</picture>

### Hardware architecture diagram

<picture>
  <source
    srcset="./exports/HardwareArchitectureDiagram_light.svg"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="./exports/HardwareArchitectureDiagram_light.svg"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img alt="Hardware Architecture diagram" />
</picture>

The [architecture diagram](./ArchitectureDiagram.drawio) can be visualized in [app.diagrams.net](https://app.diagrams.net/) or with the [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) vscode extension.

## Project document

Refer to the [project document](./project_document.pdf) for a broad explanation of what this project is about.

## ESP32

The ESP32 is a series of low-cost, low-power system on a chip microcontrollers with integrated Wi-Fi and dual-mode Bluetooth.

In this project, we use the ESP32 to control the LED strips via the WLED software.

### WLED Software

WLED is a fast and feature-rich implementation of an LED controller based on the ESP8266/ESP32 platform. It supports a variety of animations and allows for extensive customization.

In this project, WLED is used to control the LED lights connected to the ESP32. It provides a user-friendly interface to adjust the lighting effects.
