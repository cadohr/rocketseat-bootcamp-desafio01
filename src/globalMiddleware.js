module.exports = (req, res, next) => {
  console.count(`Request Counts`);

  next();
};
