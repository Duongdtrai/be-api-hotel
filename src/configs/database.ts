const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
export default async function connect () {
    try {
        await mongoose.connect(process.env.API_HOST, {
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
