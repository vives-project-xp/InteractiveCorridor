# Tests

## Software

A list of tests that should be performed on the software. The software should be tested for the following:

<details>
<summary>Ease of use</summary>

- [x] An enduser should be able to use the software without any prior knowledge
  - [x] An enduser should be able to look and the website and know how to controll the ledstrips
  - [x] An enduser should be able to look at the website and know how to change the settings
  - [x] An enduser should be able to look at the website and know how to change the color of the ledstrips
  - [x] An enduser should be able to look at the website and know how to change the brightness of the ledstrips
  - [x] An enduser should be able to look at the website and know how to change the speed of the ledstrips
  - [x] An enduser should be able to look at the website and know how to change the mode of the ledstrips
  - [x] An enduser should be able to look at the website and know how to change the direction of the ledstrips
  - [x] An enduser should be able to look at the website and know how to split a ledstrip in multiple segments
  - [x] An enduser should be able to look at the website and know how to change the color of a segment
  - [x] An enduser should be able to look at the website and know how to change the color of a whole ledstrip
- [x] The software should be easy to install
  - [x] An step by step installation guide should be available
  - [x] Someone with basic knowledge of computers should be able to install the software
  - [x] After setting up the config files the software should be able to start with one command
- [x] The software should be easy to configure
  - [x] A step by step configuration guide should be available with with files to edit and what to edit

</details>

<details>
<summary>Documentation</summary>

- [x] The website should have a README.md file
  - [x] The README.md file should contain a description of the software
  - [x] The README.md file should contain the technologies used
  - [x] The README.md file should contain some screenshots of the website
- [x] The backend should have a README.md file
  - [x] The README.md file should contain a description of the software
  - [x] The README.md file should contain the technologies used
  - [x] The README.md file should contain an UML diagram of the Virtual Ledstrip
  - [x] The README.md file should contain documentation of the Virtual Ledstrip
- [x] There shoud be a docs folder with a README.md file
- [x] Swagger API docs
  - [x] The API should be documented with Swagger
  - [x] The Swagger docs should have the save paramters and responses as the API

</details>

## Hardware

<details>
<summary>Components</summary>

- [x] The converter should convert the 24V input into 5V output
- [x] The level shifter should be able to make the 3.3V signal into a 5V signal
- [x] The electrical supply should be able to power all the 5 ledstrips
- [x] Test the ledstrips
  - [x] Test the max current of the ledstrips
  - [x] Check the required voltage of the ledstrips
- [x] Test if the ESP sends a signal
- [x] Test if the ledstrips are working with the signal
  - [x] Check if the signal at the end is 5V
  - [x] Check if u get the right effect on the ledstrips
- [x] Test if everything works

</details>

<details>
<summary>Documentation</summary>

- [x] The signals of the hardware should be documented with scope images
- [x] The README.md file in docs should contain info about the used components
- [x] The README.md file in docs should contain both hardware and software architecture diagram
- [x] The README.md file in docs should contain wiring diagram and how the level-shifter is made

</details>
