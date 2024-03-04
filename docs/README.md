# Documentation

## Table of contents

- [Documentation](#documentation)
  - [Table of contents](#table-of-contents)
  - [Measurements](#measurements)
  - [Bill of Materials](#bill-of-materials)
    - [WS2814 RGBW LED strip](#ws2814-rgbw-led-strip)
    - [ESP32-C3](#esp32-c3)
    - [Ledstrip profile](#ledstrip-profile)
    - [DC/DC converter](#dcdc-converter)
    - [Level shifter](#level-shifter)
    - [Prototype printplate](#prototype-printplate)
    - [Cable box](#cable-box)
    - [Power supply](#power-supply)
    - [Block terminal](#block-terminal)
    - [Fuse holder](#fuse-holder)
    - [Autofuse set](#autofuse-set)
    - [cables](#cables)
    - [Female pin header set](#female-pin-header-set)
  - [Architecture document](#architecture-document)
    - [Input requirements](#input-requirements)
    - [Functional requirements](#functional-requirements)
    - [Output requirements](#output-requirements)
    - [Software architecture diagram](#software-architecture-diagram)
    - [Hardware architecture diagram](#hardware-architecture-diagram)
    - [Wiring architecture diagram](#wiring-architecture-diagram)
  - [Project document](#project-document)
  - [ESP32](#esp32)
    - [WLED Software](#wled-software)

## Measurements

The size of the hallway is:

- Height: 331cm
- Width: 240cm

## Bill of Materials

The Bill of Materials (BOM) lists all the components, parts, and materials needed for one corridor consisting of 6 pillars:

| Component                                       | Quantity | Price / unit | Remarks |
| :---------------------------------------------- | :------: | -----------: | :------ |
| [WS2814 RGBW LED strip](#ws2814-rgbw-led-strip) |    6     |              |         |
| [ESP32-C3](#esp32-c3)                           |    6     |       8,8451 |         |
| [ledstrip profile](#ledstrip-profile)           |    24    |        17,95 |         |
| [DC/DC Converter](#dcdc-converter)              |    6     |         5,39 |         |
| [Level shifter](#level-shifter)                 |    6     |         0,85 |         |
| [Prototype printplate](#prototype-printplate)   |    6     |         1,25 |         |
| [Cable box](#cable-box)                         |    6     |         1,59 |         |
| [Power supply](#power-supply)                   |    1     |        76,95 |         |
| [Block terminal](#block-terminal)               |    6     |         2,12 |         |
| [Fuse holder](#fuse-holder)                     |    3     |         4,22 |         |
| [Auto fuse set](#autofuse-set)                  |    1     |         7,39 |         |
| [Cables](#cables)                               |    1     |        72,99 |         |
| [Female pin header set](#female-pin-header-set) |    6     |         1,60 |         |

### WS2814 RGBW LED strip

The model of the ledstrip is **BTF-24V-060L-B**. By this model we know it works on **24V** and has **60 LEDs per meter**. It has 4 channels: Red, Green, Blue, and Warm white.

The ledstrip has the following connections:

- **VCC** (Red): 24V
- **GND** (White): Ground
- **DAT** (Green): Data input

The length of the LED strip is **5 meters**. The ledstrip is **IP65** rated, which means it is waterproof. It uses **30~120W**.
Max measured current: **3A** max calculated current: **5A** .

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

Link to component [groenovatie.com](https://www.ledshop-groenovatie.com/Aluminium-Profiel-LED-Strip-Opbouw-1,5m-Compleet-1)

### DC/DC converter

Info about the component:

- **Output Power max**: 20W
- **Output voltage min**: 1,25V
- **Output voltage max**: 37V
- **Output current max**: 3A
- **Input voltage DC min**: 4V
- **Input voltage DC max**: 40V

Link to component: [Otronic.nl](https://www.otronic.nl/nl/lm2596s-instelbare-step-down-4-40v-125-37v-met-onb.html)

### Level shifter

Pin connections for 3.3V to 5V:

- **AVCC**:5V
- **ASCL**: SCL/TX pin of 5V system
- **ASDA**: SDA/RX pin of 5V system
- **AGND**: GND of 5V system

- **BVCC**: no connection
- **BSCL**: SCL/TX pin of 3.3V system
- **BSDA**: SDA/RX pin of 3.3V system
- **BGND**: GND of 5V system

Pin connections are on the bottom of the component.

Link to component [otronic.nl](https://www.otronic.nl/nl/i2c-uart-bi-directionele-logic-level-converter-5v.html)

### Prototype printplate

Info about component:

- **Length**:7cm
- **Width**:9cm
- **Heigth**:0,03cm
- **Diameter holes**: 1mm
- **Distance holes**: 2,54mm

Link to component: [otronic.nl](https://www.otronic.nl/nl/experimenteer-prototyping-printplaat-7x9cm-groen.html)

### Cable box

Info about component:

- **Length**: 125mm
- **width**: 86mm
- **Heigth**: 41mm
- **amount of inputs**: 14
- **Cable diameter**: 7-12mm
- **Degree of protection**: IP55

IP55 protects against non-corrosive substances and water jets sprayed from various locations.

Link to component: [allekabels.be](https://www.allekabels.be/lasdoos/22371/3914218/aansluitdoos.html?mc=nl-be&gad_source=4&gclid=CjwKCAiAivGuBhBEEiwAWiFmYfwxxcCCo7jKSgO8jgDI1kcRSnMjFWVOvQXYugo6C8fBlBvdbIoQIxoCPRkQAvD_BwE)

### Power supply

Info about component:

- **Input voltage**: 170-250V
- **Output voltage**: 24V
- **Ouput power**: 600W
- **Output strength**: 25A
- **Length**: 240mm
- **Width**: 125mm
- **Heigth**: 65mm

Link to component: [Ledstripkoning.be](https://www.ledstripkoning.be/accessoires/adapters-12-en-24-volt/600w-24v-25a-professionele-voeding-voor-led-strips?gad_source=1&gclid=CjwKCAiAivGuBhBEEiwAWiFmYTggibyc4zfjcq7FT6RLFWak3v8JL1AJRPUxQzaCdWfI0lQoOlbzJBoCOJAQAvD_BwE)

### Block terminal

Info about component:

- **nr of contacts**: 6
- **pitch spacing**: 5mm
- **Wire size AWG max**: 12AWG
- **wire size AWG min**: 30AWG

Link to component: [Farnell.com](https://nl.farnell.com/camdenboss/ctb0100-6/pcb-terminal-5mm-6p/dp/3378876)

### Fuse holder

This component is a holder for auto fuses.

Info about component:

- **Cable length**: 300 mm

Link to this component: [Autodoc.be](https://www.autodoc.be/amio/16367482?utm_medium=cpc&utm_source=google&tb_prm=18590516782&gshp=1&gad_source=1&gclid=CjwKCAiAivGuBhBEEiwAWiFmYYLitsvhD21WdmLsKnJnQUWo_0YfcfnNMd4S2Azxjulj9yzA3oOltRoCirAQAvD_BwE)

### Autofuse set

Info about this product:

- **Amount of fuses**: 80
- **Type of fuses**: 3A, 5A, 7.5A, 10A, 15A, 20A, 25A and 30A

There are 10 fuses for each type.

Link to component: [allekabels.be](https://www.allekabels.be/zekeringen/1615/1077363/standaard-autozekering-set.html?lang=nl-be)

### cables

Info about this component:

- **Length**: 100m
- **cablediameter**: 2,5mm
- **Cable material**: CCA

Link to this component: [allekabels.be](https://www.allekabels.be/luidspreker-kabel/4479/1168/luidspreker-kabel-op-rol.html?mc=nl-be&gad_source=1&gclid=CjwKCAiAivGuBhBEEiwAWiFmYTnWu7l2dCoVfE0ADEY48N5h08rge23VWNhhXEt18r1cmNe1lxfJ3xoCM4UQAvD_BwE)

### Female pin header set

This component is used to prevent soldering of ESP to a breadbord.

This set contains 12 pin headers and 16 pin headers.

Link to the component: [kiwi-electronics.com](https://www.kiwi-electronics.com/nl/feather-stacking-headers-12-pin-16-pin-female-headers-2192?search=female%20pin%20header)

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

### Software architecture diagram

<picture>
  <source
    srcset="./exports/SoftwareArchitectureDiagram_dark.svg"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="./exports/SoftwareArchitectureDiagram_light.svg"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img alt="Architecture diagram" />
</picture>

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
    srcset="./exports/InteractiveCorridor_Wiring_dark.drawio.svg"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="./exports/InteractiveCorridor_Wiring_light.drawio.svg"
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
