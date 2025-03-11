import dotenv from "dotenv";
dotenv.config();

import connectdb from "./src/db/connectdb.js";
import app from "./app.js";

const PORT = process.env.PORT || 7000;

try {
    await connectdb();
    app.listen(PORT, () => {
        console.log(`server up and running on PORT: ${PORT}`);
    });

} catch {
    (error) => {
        console.error(`Mongodb connection failed: ${error}`);
    }
}