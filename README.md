# Interactive Corridor

## Inhoud

- [Interactive Corridor](#interactive-corridor)
  - [Inhoud](#inhoud)
  - [Ideeën](#ideeën)
    - [Interface](#interface)
    - [Server](#server)
    - [Ledstrips](#ledstrips)
    - [Aansturing](#aansturing)
    - [Constructie](#constructie)

## Ideeën

### Interface

- ~~App~~ of **website**
  - Google home display?
  - Tablet?
  - Laptop?

### Server

Server bevat 2 docker containers:

- **MQTT** server voor communicatie.
- **Webserver** met de website om de corridor aan te sturen.

### Ledstrips

- 5V of 24V, testen zullen uitwijzen welke het best is. 5V is het makkelijkst want de ESP32 werkt ook op 5V.
- Lengte: Gemeten in [docs](./docs/README.md).
- Adapter

### Aansturing

- ESP32-C3

### Constructie

- Bevestigen aan de muur in de B gang
