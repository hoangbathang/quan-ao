import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { BaseConfig } from 'src/config/common';

export class TypeormDatabaseConfig extends BaseConfig {
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue('DB_TYPE') as any,
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      entities: [join(__dirname, '../../..', 'modules/**/*.entity.{ts,js}')],
      migrationsTableName: 'migration',
      migrations: [join(__dirname, '../../..', 'migration/*.{ts,js}')],
      synchronize: true,
    };
  }
}

export const typeormConfig = new TypeormDatabaseConfig(
  process.env,
).ensureValues([
  'DB_TYPE',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
]);
