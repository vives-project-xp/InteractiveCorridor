const mqtt = require("./mqtt");

class Segment {
  start;
  end;
  color;

  constructor(start, end, color) {
    this.start = start;
    this.end = end;
    this.color = color;
  }

  get length() {
    return this.end - this.start;
  }

  setColor(color) {
    this.color = color;
  }
}

class VirtualLedstrip {
  mqtt_enabled = true; // enforce type
  index = 0; // enforce type
  _name = ""; // enforce type
  _segments = [new Segment(0, 0)]; // enforce type

  constructor(
    name = "VirtualLedstrip",
    stripIndex,
    segmentLengths = [11, 11, 11, 11],
    mqtt_enabled = true
  ) {
    this.mqtt_enabled = mqtt_enabled;
    this._name = name;
    this.index = stripIndex;
    this._segments = [];
    for (let i = 0; i < segmentLengths.length; i++) {
      if (segmentLengths[i] < 0) {
        segmentLengths[i] = 0;
      }
      this._segments.push(
        new Segment(this.length, this.length + segmentLengths[i])
      );
    }
    if (this.mqtt_enabled)
      mqtt.publish(`IC/ic${this.index}`, JSON.stringify({ on: true }));
  }

  get name() {
    return this._name;
  }

  get segments() {
    return this._segments;
  }

  get length() {
    return this._segments.reduce((acc, segment) => acc + segment.length, 0);
  }
}

module.exports = VirtualLedstrip;
