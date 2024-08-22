import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow('DB_HOST'),
                port: Number(configService.getOrThrow('DB_PORT')) || 5432,
                username: configService.getOrThrow('DB_USERNAME'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_DATABASE'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
            }),
            inject: [ConfigService]
        }),
    ],
})

export class DatabaseModule { }
