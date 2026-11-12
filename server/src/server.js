const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const app = require("./app");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(() => {
    // connectDB logs the reason; don't start the API without its database.
    process.exitCode = 1;
  });
