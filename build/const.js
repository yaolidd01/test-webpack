const constants = {
  NODE_ENV: process.env.NODE_ENV === "prod" ? "prod" : "dev",
  Bool: (env) => {
    if (env === 'prod') {
      return false
    }
    return true
  }
};

module.exports = constants;
