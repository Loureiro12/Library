import mongoose from "mongoose";

mongoose.connect('mongodb+srv://contatoloureiro1:1234@cluster0.vdbxjqg.mongodb.net/alura-node')

let db = mongoose.connection

export default db 