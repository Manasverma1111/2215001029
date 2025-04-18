const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(cors());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
