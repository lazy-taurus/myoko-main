const jwt = require("jsonwebtoken");

const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, process.env.TOKEN);

    return decodedToken.id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

module.exports = getDataFromToken;
