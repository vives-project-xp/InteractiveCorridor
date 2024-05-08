# Documentation
Welcome to the documentation page! This is your go-to resource for understanding everything about our hardware system, including a detailed breakdown of the components we use. Whether you're building your own setup or simply exploring the technology, this page aims to provide all the information you need.

## Table of contents

- [Table of contents](#table-of-contents)
- [Bill of Materials](#bill-of-materials)
- [Level shifter](#level-shifter)
- [Architecture document](#architecture-document)
  - [Input requirements](#input-requirements)
  - [Functional requirements](#functional-requirements)
  - [Output requirements](#output-requirements)
  - [Software architecture diagram](#software-architecture-diagram)
  - [Hardware architecture diagram](#hardware-architecture-diagram)
  - [Wiring architecture diagram](#wiring-architecture-diagram)
  - [Wiring for Level shifter](#wiring-for-level-shifter)
- [Project document](#project-document)
- [ESP32](#esp32)
  - [WLED Software](#wled-software)

## Bill of Materials

These are the components that we purchased. You of course have different websites to purchase this, but we mainly looked at the price and quality of the product.

The Bill of Materials (BOM) lists all the components, parts, and materials needed for one corridor consisting of 6 pillars:

| Component                                       | Quantity | Price / unit | 
| :---------------------------------------------- | :------: | -----------: | 
| **ws2814-rgbw-led-strip**                       |    6     |              |         
| **esp32-c3**                                    |    6     |       8,8451 |         
| **ledstrip-profile**                            |    16    |        17,95 |         
| **dcdc-converter**                              |    6     |         5,39 |         
| **prototype-printplate**                        |    6     |         1,25 |         
| **cable-box**                                   |    6     |         1,59 |         
| **power-supply**                                |    1     |        76,95 |         
| **block-terminal**                              |    6     |         2,12 |         
| **fuse-holder**                                 |    3     |         4,22 |         
| **autofuse-set-10a**                            |    1     |         5,29 |         
| **cables**                                      |    1     |        36,30 |         
| **female-pin-header-set**                       |    10    |         19,8 |         
| **Male-pin-header-set**                         |    10    |         3,52 |         
| **cable-tray**                                  |    1     |         6,79 |    
| **Lusterklemmen**                               |    1     |         4,59 |     

## Level shifter 

| Component                                       | Quantity | Price / unit | 
| :---------------------------------------------- | :------: | -----------: | 
| **Resistor1K**                                  |    5     |         0,49 |         
| **Resistor1,5K**                                |    2     |         1,00 |         
| **transistor**                                  |    24    |         6,312|    
| **capacity**                                    |    24    |         0,08 |


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

### Hardware architecture diagram

<picture>
  <source
    srcset="./exports/HardwareArchitectureDiagram_dark.svg"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="./exports/HardwareArchitectureDiagram_light.svg"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img alt="Hardware Architecture diagram" />
</picture>

The [architecture diagram](./ArchitectureDiagram.drawio) can be visualized in [app.diagrams.net](https://app.diagrams.net/) or with the [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) vscode extension.

### Wiring architecture diagram

<picture>
  <source
    srcset="./exports/Wiring-Wiring.drawio_Dark.svg"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="./exports/Wiring-Wiring.drawio_Light.svg"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img alt="Hardware Architecture diagram" />
</picture>

### Wiring for Level shifter

<picture>
  <source
    srcset="./exports/Wiring-Level-Shifter.drawio_Dark.svg"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="./exports/Wiring-Level-Shifter.drawio_Light.svg"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img alt="Hardware Architecture diagram level shifter" />
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
