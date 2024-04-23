const mqtt = require("./mqtt");

class Segment {
  start = 0;
  end = 0;
  color = {
    r: 255,
    g: 0,
    b: 0,
  };
  effect = {
    id: 0,
    delay: 0,
    speed: 0,
    intensity: 0,
    reverse: false,
    mirror: false,
  };

  constructor(parent, start, end, color) {
    this.parent = parent;
    this.setStart(start);
    this.setEnd(end);
    this.setColor(
      color || {
        r: 255,
        g: 0,
        b: 0,
      }
    );
  }

  get length() {
    return this.end - this.start;
  }

  get index() {
    return this.parent.segments.indexOf(this);
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

  setEffect(effect) {
    this.effect = effect;
  }
}

class VirtualLedstrip {
  mqtt_enabled = true; // enforce type
  index = 0; // enforce type
  _name = ""; // enforce type
  _segments = [new Segment(this, 0, 0)]; // enforce type

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
        new Segment(this, this.length, this.length + segmentLengths[i])
      );
    }
    this.publish(JSON.stringify({ on: true }));
  }

  get name() {
    return this._name;
  }

  get topic() {
    return `IC/ic${this.index}`;
  }

  get segments() {
    return this._segments;
  }

  get length() {
    return this._segments.reduce((acc, segment) => acc + segment.length, 0);
  }

  publish(body) {
    if (this.mqtt_enabled) mqtt.publish(this.topic, body);
  }

  updateSegments() {
    const body = {
      seg: this.segments.map((segment) => ({
        start: segment.start,
        stop: segment.end,
        len: segment.length,
        grp: 0,
      })),
    };

    this.publish(JSON.stringify(body));
  }

  updateColor() {
    const body = {
      seg: this.segments.map((segment) => ({
        col: [
          [segment.color.r, segment.color.g, segment.color.b],
          [segment.color.r, segment.color.g, segment.color.b],
        ],
      })),
    };

    this.publish(JSON.stringify(body));
  }

  updateEffect() {
    const body = {
      seg: this.segments.map((segment) => ({
        fx: segment.effect.id,
        sx: segment.effect.speed,
        ix: segment.effect.intensity,
        rev: segment.effect.reverse,
        mi: segment.effect.mirror,
      })),
      tb: 0,
    };

    this.publish(JSON.stringify(body));
  }
}

module.exports = VirtualLedstrip;
