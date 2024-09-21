import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Protocols } from './entities/protocols.entity';
import { ProtocolFiles } from './entities/protocol.files.entity';
import { ProtocolStatus } from './entities/protocol.status.entity';
import { ReasonType } from './entities/reason.type.entity';
import { WorkType } from './entities/work.type.entity';
import { WorkTypeController } from './controllers/worktype.controller';
import { ReasonTypeController } from './controllers/reasontype.controller';
import { WorkTypeService } from './services/worktype.service';
import { ReasonTypeService } from './services/reasontype.service';
import { ProtocolFilesController } from './controllers/protocolfiles.controller';
import { ProtocolFilesService } from './services/protocolfiles.service';
import { ProtocolController } from './controllers/protocol.controller';
import { ProtocolService } from './services/protocol.service';
import { ProtocolStatusController } from './controllers/protocolstatus.controller';
import { ProtocolStatusService } from './services/protocolstatus.services';
import { CustomersModule } from 'modules/customers/customers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Protocols, ProtocolFiles, ProtocolStatus, ReasonType, WorkType]),
        CustomersModule
    ],
    controllers: [WorkTypeController, ReasonTypeController, ProtocolFilesController, ProtocolController, ProtocolStatusController],
    providers: [WorkTypeService, ReasonTypeService, ProtocolFilesService, ProtocolService, ProtocolStatusService]
})
export class ProtocolsModule { }
