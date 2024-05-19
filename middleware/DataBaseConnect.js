import mongoose from "mongoose";

const ConnectDB=async()=>{
try {
    await mongoose.connect(process.env.MONGODBURL, {
        ssl: true
    });

    console.log(`Mongoose DataBase Connected`)



} catch (error) {
    console.log(`Mongoose DataBase Not Connect`)
}
}

mongoose.connection.on("error", (err) => {
    console.log(err?.message)
})
mongoose.connection.on("connected", (err) => {
    console.log("Monogose db Connected")
})
mongoose.connection.on("disconnected", (err) => {
    console.log("Mongo db Disconnected")
})
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Close Mongoose Db");
        process.exit(0);
    }
    )
})

export default ConnectDB;