import mongoose, { mongo } from "mongoose";
import '../global';

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = global.mongoose || {conn: null, promise:null};

async function connectDB() {
    if(cached.conn) return cached.conn;
    console.log(cached.conn);

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "authApplication",
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;