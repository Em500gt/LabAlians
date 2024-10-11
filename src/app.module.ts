import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StaffModule } from './modules/staff/staff.module';
import { ProtocolsModule } from './modules/protocols/protocols.module';
import { CustomersModule } from './modules/customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { JournalModule } from 'modules/journal/journal.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: 0,
        max: 100,
      }),
    }),
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    DatabaseModule,
    StaffModule,
    ProtocolsModule,
    CustomersModule,
    JournalModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }