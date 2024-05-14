# Interactive Corridor

Welcome to the Interactive Corridor Project! This unique corridor is designed to create depth and atmosphere through innovative lighting effects. With a variety of pre-programmed light patterns and the ability to design your own, you can transform the corridor into a dynamic and immersive space.

Controlling the effects is simple, just use the web interface hosted on a central server to customize the lighting. Whether you're aiming for subtle transitions or dramatic transformations, the Interactive Corridor Project gives you the tools to set the perfect mood. Enjoy exploring the endless possibilities!

![ExampleCorridor](img/ExampleCorridor.PNG)
The project is based on a video of the River Nights Festival (Singapore) where there was a beautiful light setup.
<https://www.youtube.com/watch?v=xEEKBbKvuMQ>

## The Team

[<img src="https://github.com/RobbeDeW.png" alt="" width="25" style="margin-bottom:-6px;"> Robbe De Wispelaere](https://github.com/RobbeDeW)

[<img src="https://github.com/imawizzard.png" alt="" width="25" style="margin-bottom:-6px;"> Aitor Vannevel](https://github.com/imawizzard)

[<img src="https://github.com/SimonStnn.png" alt="" width="25" style="margin-bottom:-6px;"> Simon Stijnen](https://github.com/SimonStnn)

[<img src="https://github.com/NielsDenoo.png" alt="" width="25" style="margin-bottom:-6px;"> Niels Denoo](https://github.com/NielsDenoo)

## The idea

- **Dynamic Light Patterns** : Create customizable lighting sequences that can change in intensity, color, and direction to generate a sense of movement and depth within the corridor.
- **User-Friendly Web Interface**: Design an intuitive web page where users can easily control and customize the corridor's lighting effects. The interface should allow for real-time adjustments, offer a library of pre-set themes, and provide options to create and save custom patterns for future use.
- **MQTT Communication**: Use MQTT (Message Queuing Telemetry Transport) to send commands from the web interface to the LED strips. This lightweight messaging protocol ensures fast and reliable communication, allowing for seamless updates to the light patterns.
- **WLED Integration**: Implement WLED, an open-source control system for LED strips, to manage the lighting effects in the corridor. WLED allows for a wide range of customization options and can be controlled remotely, making it a perfect fit for this project.

## Folder Structure

- [Website](website/README.md): All information about how the website works and how the user can interact with it.
- [Backend](Backend/README.md) All information about how the website communicates with the ledstip's.
- [Docs](docs/README.md): All information about the hardware and setup

## Corridor data flow diagram

<picture>
  <source
    srcset="docs/exports/SoftwareArchitectureDiagram_dark.svg"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="docs/exports/SoftwareArchitectureDiagram_light.svg"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img alt="Architecture diagram" />
</picture>

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

## Project document

Refer to the [project document](./project_document.pdf) for a broad explanation of what this project is about.
