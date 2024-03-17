const mqtt = require("./mqtt");

const getLeds = async (req, res) => {
  console.log("Getting LEDS");
  const strips = [];
  const keys = Object.keys(mqtt.statusList);
  const response = [];

  for (let i = 0; i < keys.length; i++) {
    const status = Object.values(mqtt.statusList)[i];
    if (status === "online") {
      // Extract numbers from the key using regular expression
      const number = keys[i].match(/\d+/)[0];
      strips.push(number);
    }
  }

  for (const strip of strips) {
    console.log(`http://ic${strip}.local/json`);
    let r;
    try {
      r = await fetch(`http://ic${strip}.local/json`).then((response) => {
        return response.json();
      });
    } catch (e) {
      continue;
    }

    // r.state is eens undefined geweest
    if (!r.state) {
      console.log("No response from IC", r);
      continue;
    }

    delete r.effects;
    delete r.palettes;

    response.push({
      strip: Number(strip),
      ...r,
    });

    console.log("seg length:", r.state?.seg.length);
  }

  console.log("strips:", strips);
  res.json(response);
};

module.exports = { getLeds };
