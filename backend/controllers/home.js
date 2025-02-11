//Made for samuel chacon
const name = { name: 'TEAM2 - SENIOR PROJECT BACKEND' };

const justHome = async (req, res) => {
  //#swagger.tags=['Home']
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(name.name);
};

module.exports = { justHome };