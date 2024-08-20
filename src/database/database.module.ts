import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => (
                {
                    type: 'postgres',
                    host: configService.getOrThrow('DB_HOST_DEV'),
                    port: configService.getOrThrow('DB_PORT_DEV'),
                    username: configService.getOrThrow('DB_USERNAME_DEV'),
                    password: configService.getOrThrow('DB_PASSWORD_DEV'),
                    database: configService.getOrThrow('DB_DATABASE_DEV'),
                    autoLoadEntities: true,
                    synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
                }),
            inject: [ConfigService]
        }),
    ],
})

export class DatabaseModule { }
