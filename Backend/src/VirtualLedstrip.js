const mqtt = require("./mqtt");

class Segment {
  start = 0;
  end = 0;
  color = {
    r: 0,
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
        r: 0,
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
    return `ic${this.index}`;
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
          [0, 0, 0],
          [0, 0, 0],
        ],
        pal: 0,
      })),
    };

    this.publish(JSON.stringify(body));
  }

  updateEffect() {
    const body = {
      seg: this.segments.map((segment) => ({
        fx: segment.effect.id || 0,
        sx: segment.effect.speed || 128,
        ix: segment.effect.intensity || 128,
        rev: segment.effect.reverse || false,
        mi: segment.effect.mirror || false,
        pal: 0,
        col: [
          [segment.color.r, segment.color.g, segment.color.b],
          [0, 0, 0],
          [0, 0, 0],
        ],
      })),
      tb: 0,
    };

    this.publish(JSON.stringify(body));
  }

  adjustSegments(segmentLengths) {
    if (!Array.isArray(segmentLengths) || segmentLengths.length === 0) {
      console.error("Segment lengths should be a non-empty array.");
      return;
    }

    for (let i = 0; i < this.segments.length; i++) {
      mqtt.publish(
        this.topic,
        JSON.stringify({ seg: [{ id: i, start: 0, stop: 0 }] })
      );
    }

    // Verwijder eerst alle bestaande segmenten
    this._segments = [];

    // Maak nieuwe segmenten op basis van de gegeven lengtes
    for (let i = 0; i < segmentLengths.length; i++) {
      const length = Math.max(segmentLengths[i], 0); // Zorg ervoor dat de lengte niet negatief is
      this._segments.push(new Segment(this, this.length, this.length + length));
    }

    // Stuur updates naar de MQTT-server
    this.updateSegments();
  }
}

module.exports = {
  Segment: Segment,
  VirtualLedstrip: VirtualLedstrip,
};
