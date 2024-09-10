import { MigrationInterface, QueryRunner } from "typeorm";
const bcrypt = require('bcryptjs');
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
        const saltRounds = parseInt(process.env.PASSWORD_SALT as string, 10);
        const plainPassword = process.env.PASSWORD_ADMIN;

        if(!saltRounds || !plainPassword){
            throw new Error('Missing environment variables for password hashing')
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        await queryRunner.query(`
            INSERT INTO "accounts" ("login", "password", "staffGroupID", "staffID")
            VALUES
            ('${process.env.LOGIN_ADMIN}', '${hashedPassword}', ${staffGroupID[0]?.id}, ${staffID[0]?.id})
            `)
        
        await queryRunner.query(`
            INSERT INTO "customer_types" ("type")
            VALUES('Legal entity'), ('Individual') 
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
