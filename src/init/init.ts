import Generator from './db-generator';
import db from '@back/models';

(async () => {
    console.log('INITIALIZATING DATABASE BY DEFAULT VALUES...');
    db.mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

    await Generator.init(db);

    db.mongoose.connection.close();
    console.log('INITIALIZATION IS SUCCESS...');
})()