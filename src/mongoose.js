// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import mongoose from "mongoose";

// Check URI
const uri = process.env.MONGODB_URI || "";
async function dbConnect() {
    if (!process.env.MONGODB_URI) {
        throw new Error("Please add your Mongo URI to .env.local");
    }

    // Create Connection
    let dbConnection;
    const options = {};

    if (process.env.NODE_ENV === "development") {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        if (!(global)._mongooseConnect) {
            (global)._mongooseConnect = mongoose.connect(uri, options);
        }

        dbConnection = (global)._mongooseConnect;
    } else {
        // In production mode, it's best to not use a global variable.
        dbConnection = mongoose.connect(uri, options);

    }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default dbConnect;