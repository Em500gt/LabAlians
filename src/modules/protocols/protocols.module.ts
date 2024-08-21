import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Protocols } from './entities/protocols.entitiy';
import { ProtocolFiles } from './entities/protocol.files.entity';
import { ProtocolStatus } from './entities/protocol.status.entity';
import { ReasonType } from './entities/reason.type.entity';
import { WorkType } from './entities/work.type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Protocols, ProtocolFiles, ProtocolStatus, ReasonType, WorkType])],
})
export class ProtocolsModule { }
