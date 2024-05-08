# Documentation
Welcome to the documentation page! This is your go-to resource for understanding everything about our hardware system, including a detailed breakdown of the components we use. Whether you're building your own setup or simply exploring the technology, this page aims to provide all the information you need.

## Table of contents

- [Table of contents](#table-of-contents)
- [Bill of Materials](#bill-of-materials)
- [Level shifter](#level-shifter)
- [Architecture document](#architecture-document)
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

## Architecture documents

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

If we look at the datasheets of all components, we need 2 different voltages.
- 24V for the ledstip
- 5V for the data and esp

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