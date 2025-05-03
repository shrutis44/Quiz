const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require('./config/db');
const leaderboardRoutes = require('./routes/leaderboardRoutes');


dotenv.config();


const adminRoutes = require("./routes/adminRoutes");
const playerRoutes = require("./routes/playerRoutes");
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/player", playerRoutes);
app.use('/api', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
