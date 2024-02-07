# Interactive Corridor

This proof-of-concept project transforms hallways into interactive light corridors. Users control lights via a website, creating a personalized, immersive experience. The system uses WLED, ESP32s, a Python server, and MQTT for real-time interaction. It's all about creating captivating, customizable entertainment for all ages.

## Table of contents

- [Interactive Corridor](#interactive-corridor)
  - [Table of contents](#table-of-contents)
  - [The idea](#the-idea)
    - [Interface](#interface)
    - [Server](#server)
    - [Led strips](#led-strips)
    - [Corridor manager](#corridor-manager)
    - [Construction](#construction)

## The idea

### Interface

- ~~App~~ of **website**
  - Google home display?
  - Tablet?
  - Laptop?

### Server

The server has 2 docker containers:

- **MQTT** server for communication.
- **Web server** to serve the website.

### Led strips

- 5V or 24V, tests will show which is best. 5V would be easiest because the ESP32 works with 5V.
- Length: Measured in [docs](./docs/README.md).
- Adapter

### Corridor manager

- ESP32-C3

### Construction

- Attach to the wall in the B hallway
