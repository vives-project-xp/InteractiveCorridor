const mqtt = require("./mqtt");

class Segment {
  start = 0;
  end = 0;
  color = {
    r: 255,
    g: 0,
    b: 0,
  };

  constructor(start, end, color) {
    this.start = start;
    this.end = end;
    this.color = color || {
      r: 255,
      g: 0,
      b: 0,
    };
  }

  get length() {
    return this.end - this.start;
  }

  getHex() {
    return `#${this.color.r.toString(16).padStart(2, "0")}${this.color.g
      .toString(16)
      .padStart(2, "0")}${this.color.b.toString(16).padStart(2, "0")}`;
  }

  setStart(start) {
    this.start = start;
  }

  setEnd(end) {
    this.end = end;
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
