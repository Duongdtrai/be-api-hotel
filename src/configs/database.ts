const mongoose = require('mongoose');
export default async function connect() {
    try {
        await mongoose.connect(process.env.API_MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true,
            // useCreateIndex: true,
        });
        console.log('Connection successful !!!');
    } catch (error) {
        console.log('Connection failed !!!');
    }
}