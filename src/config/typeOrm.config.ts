import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'pam_system',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  timezone: 'UTC',
};

const myDataSource = new DataSource(typeOrmConfig as DataSourceOptions);

export default myDataSource;
