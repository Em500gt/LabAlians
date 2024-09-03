import { MigrationInterface, QueryRunner } from "typeorm";
import 'dotenv/config';

export class Insert1725366646899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const staffGroupID = await queryRunner.query(`
            INSERT INTO "staff_groups" ("staffGroup", "canAddRecords", "canEditRecords", "canDeleteRecords", "canAccessFiles")
            VALUES 
            ('Admin', true, true, true, true)
            RETURNING id
            `)
            
        const divisionID = await queryRunner.query(`
            INSERT INTO "divisions" ("division")
            VALUES 
            ('Admin')
            RETURNING id
            `)

        const positionID = await queryRunner.query(`
            INSERT INTO "positions" ("position")
            VALUES
            ('Admin')
            RETURNING id
            `)

        const staffID = await queryRunner.query(`
            INSERT INTO "staff" ("firstname", "lastname","tabelNum", "positionID", "divisionID")
            VALUES
            ('Admin', 'Admin', 1, ${positionID[0]?.id}, ${divisionID[0]?.id})
            RETURNING id
            `)
        

        await queryRunner.query(`
            INSERT INTO "accounts" ("login", "password", "staffGroupID", "staffID")
            VALUES
            ('${process.env.LOGIN_ADMIN}', '${process.env.PASSWORD_ADMIN}', ${staffGroupID[0]?.id}, ${staffID[0]?.id})
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM accounts WHERE "login" = '${process.env.LOGIN_ADMIN}'`);
        await queryRunner.query(`
            DELETE FROM staff WHERE "firstname" = 'Admin'`);
        await queryRunner.query(`
            DELETE FROM positions WHERE "position" = 'Admin'`);
        await queryRunner.query(`
            DELETE FROM divisions WHERE "division" = 'Admin'`);
        await queryRunner.query(`
            DELETE FROM staff_groups WHERE "staffGroup" = 'Admin'`);
    }
}
