import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'WRITE_DATABASE_CONNECTION',
    useFactory: (): mongoose.Connection =>
      mongoose.createConnection('WRITE_DATABASE_CONN_STRING'),
  },
  {
    provide: 'READ_DATABASE_CONNECTION',
    useFactory: (): mongoose.Connection =>
      mongoose.createConnection('READ_DATABASE_CONN_STRING'),
  },
];