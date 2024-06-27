const mongoose = require("mongoose");

const connection = { isConnected: false };

const MONGODB_URI = process.env.ATLAS_URI;

async function dbConnect() {
    if (!MONGODB_URI) return;

    /* check if we have connection to our database*/
    if (connection.isConnected) {
        return;
    }

    /* connecting to our database */

    try {
        const db = await mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });
        connection.isConnected = db.connections[0].readyState === 1;
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;