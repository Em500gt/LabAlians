import { ConfigService } from '@nestjs/config';

module.exports = (configService: ConfigService) => {
    if (configService.getOrThrow('NODE_ENV') === 'development') {
        return {
            type: 'postgres',
            host: configService.getOrThrow('DB_HOST_DEV'),
            port: configService.getOrThrow('DB_PORT_DEV'),
            username: configService.getOrThrow('DB_USERNAME_DEV'),
            password: configService.getOrThrow('DB_PASSWORD_DEV'),
            database: configService.getOrThrow('DB_DATABASE_DEV'),
            autoLoadEntities: true,
            synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
        }
    }
}