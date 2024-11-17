import mongoose, { Connection } from "mongoose";

export async function mongooseConnect(): Promise<Connection> {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    } else {
        const uri: string | undefined = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables")
        }
        await mongoose.connect(uri);
        return mongoose.connection;
    }
}