export default (req, res) => {
  res.statusCode = 200;
  res.write("feed");
  res.end();
};
