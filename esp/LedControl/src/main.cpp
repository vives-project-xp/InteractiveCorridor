#include <Arduino.h>
#include <ArduinoJson.h>
#include <FastLED.h>

const int NUM_LEDS = 10; // Maximum number of LEDs
const int DATA_PIN = 13;

int ledArray[NUM_LEDS][3];
CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200);
FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
}

void UpdateLeds() {

  for(int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(ledArray[i][0], ledArray[i][1], ledArray[i][2]);
  }
  FastLED.show();
}

void loop() {
  if (Serial.available()) {
    // Read the JSON string from the serial input
    String jsonString = Serial.readStringUntil('\n');

    // Parse the JSON string
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, jsonString);
    Serial.println(jsonString);
    if (error) {
      Serial.print("Error parsing JSON: ");
      Serial.println(error.c_str());
      return;
    }
    for(int i = 0; i < NUM_LEDS; i++){
      ledArray[i][0] = 0;
      ledArray[i][1] = 0;
      ledArray[i][2] = 0;

    }
    // Iterate over the JSON object
    for (JsonPair pair : doc.as<JsonObject>()) {
      int ledNum = atoi(pair.key().c_str());
      JsonArray colorArray = pair.value().as<JsonArray>();
      // Check if the LED number is within the range
      if (ledNum >= 0 && ledNum < NUM_LEDS) {
        // Set the color of the LED
        ledArray[ledNum][0] = colorArray[0].as<int>();
        ledArray[ledNum][1] = colorArray[1].as<int>();
        ledArray[ledNum][2] = colorArray[2].as<int>();
        UpdateLeds();
      }
    }
  }
}