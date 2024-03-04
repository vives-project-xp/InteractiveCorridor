async function fetchLedStrip(url) {
  try {
    const response = await fetch(url, {
    });
    return response;
  } catch {
    return { ok: false };
  }
}

const getLeds = async (req, res) => {
  const promises = [];
  for (let i = 1; i <= 16; i++) {
    promises.push(fetchLedStrip(`http://ic${i}.local/json/live`));
  }
  Promise.all(promises).then((responses) => {
    console.log(responses);
    const ledcount = responses.reduce((acc, response) => {
      if (response.ok) {
        return acc + 1;
      }
      return acc;
    }, 0);
    res.send(ledcount.toString());
  });
};

module.exports = { getLeds };
