const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");
const dbConnect = require("./database/index");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { app, server } = require("./socket/socket");

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:5173"],
};

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));

app.use("/api/v1", authRoutes);
app.use("/api/v1", messageRoutes);
app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    server.listen(PORT, console.log(`server is running at port:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
