# Interactive Corridor

This proof-of-concept project transforms hallways into interactive light corridors. Users control lights via a website, creating a personalized, immersive experience. The system uses WLED, ESP32s, a Python server, and MQTT for real-time interaction. It's all about creating captivating, customizable entertainment for all ages.

## Table of contents

- [Interactive Corridor](#interactive-corridor)
  - [Table of contents](#table-of-contents)
  - [The Team](#the-team)
  - [The idea](#the-idea)
    - [Interface](#interface)
    - [Server](#server)
    - [Led strips](#led-strips)
    - [Corridor manager](#corridor-manager)
    - [Construction](#construction)

## The Team

- [Mathieu Leroy](https://github.com/MathieuLeroy2) • Projectleader
- [Robbe De Wispelaere](https://github.com/RobbeDeW) • Scrum-master
- [Aitor Vannevel](https://github.com/imawizzard)
- [Simon Stijnen](https://github.com/SimonStnn)
- [Niels Denoo](https://github.com/NielsDenoo)

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

- We use an 24V LED strip
- Length: Measured in [docs](./docs/README.md).
- Adapter

### Corridor manager

- ESP32-C3

### Construction

- Attach to the wall in the B hallway
