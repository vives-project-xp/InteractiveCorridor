const getLeds = async (req, res) => {
  var ledcount = 0;
  while (true) {
    try {
      const response = await fetch("http://ic" + ledcount + "/json/live");
      console.log(response);
    } catch (error) {
      break;
    }
    ledcount++;
  }
  res.send(ledcount.toString());
};

module.exports = { getLeds };
