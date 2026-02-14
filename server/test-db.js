const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('URI from env:', process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);

        // Define a simple schema
        const TestSchema = new mongoose.Schema({ name: String });
        const TestModel = mongoose.model('TestConnection', TestSchema);

        // Create a document
        const doc = await TestModel.create({ name: 'Connection Test ' + new Date().toISOString() });
        console.log('Created test document:', doc);

        // Read it back
        const found = await TestModel.findById(doc._id);
        console.log('Found test document:', found);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

testConnection();
