module.exports = {
  hexToRgb: (hex) => {
    hex = hex.replace(/^#/, "");
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  },
};
