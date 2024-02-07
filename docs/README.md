# Documentation

## Table of contents

- [Documentation](#documentation)
  - [Table of contents](#table-of-contents)
  - [Measurements](#measurements)
  - [Architecture diagram](#architecture-diagram)
  - [Project document](#project-document)
  - [ESP32](#esp32)
    - [WLED Software](#wled-software)

## Measurements

The size of the hallway is:

- Height: 331cm
- Width: 240cm

## Architecture diagram

The [architecture diagram](./ArchitectureDiagram.drawio) can be visualized in [app.diagrams.net](https://app.diagrams.net/) or with the [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) vscode extension.

## Project document

Refer to the [project document](./project_document.pdf) for a broad explanation of what this project is about.

## ESP32

The ESP32 is a series of low-cost, low-power system on a chip microcontrollers with integrated Wi-Fi and dual-mode Bluetooth.

In this project, we use the ESP32 to control the LED strips via the WLED software.

### WLED Software

WLED is a fast and feature-rich implementation of an LED controller based on the ESP8266/ESP32 platform. It supports a variety of animations and allows for extensive customization.

In this project, WLED is used to control the LED lights connected to the ESP32. It provides a user-friendly interface to adjust the lighting effects.
