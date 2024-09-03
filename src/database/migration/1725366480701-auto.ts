import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1725366480701 implements MigrationInterface {
    name = 'Auto1725366480701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "protocol_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_389041dc782711a0b99b0f172de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "protocol_files" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "pdfData" bytea NOT NULL, " protocolID" integer, CONSTRAINT "PK_44706141f7d2143ce754bd58768" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_3906cb061b122c41de5349c7935" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reason_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_790b68a2c3f6a72bdce1b2891f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "replace_journal" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "oldProtocolID" integer NOT NULL, "newProtocolID" integer NOT NULL, "reason" character varying NOT NULL, CONSTRAINT "PK_fc98e708fffcc12361cdf6b3e32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue_method" ("id" SERIAL NOT NULL, "method" character varying NOT NULL, CONSTRAINT "PK_23e0caef67a682a3eba921a75ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue_journal" ("id" SERIAL NOT NULL, "protocolID" integer NOT NULL, "date" TIMESTAMP NOT NULL, "note" character varying NOT NULL, "issueMethodID" integer, CONSTRAINT "PK_3dac780820ff55792d8672d7015" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_types" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_41189e434bffa8b2983bcc5bf07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "customerName" character varying NOT NULL, "address" character varying NOT NULL, "rasSch" character varying NOT NULL, "unp" integer NOT NULL, "bank" character varying NOT NULL, "bankAddress" character varying NOT NULL, "bic" integer NOT NULL, "okpo" integer NOT NULL, "passport" character varying NOT NULL, "phone" character varying NOT NULL, "fax" character varying NOT NULL, "email" character varying NOT NULL, "customerTypeID" integer, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "protocols" ("id" SERIAL NOT NULL, "isAccreditation" boolean NOT NULL, "creationDate" TIMESTAMP NOT NULL, "workDate" character varying NOT NULL, "workObject" character varying NOT NULL, "copies" integer NOT NULL, "workSheetNum" integer NOT NULL, "isLssied" integer NOT NULL, "note" character varying NOT NULL, "reasonTypeID" integer, "workTypeID" integer, "protocolStatusID" integer, "replaceJournalID" integer, "issueJournalID" integer, "customerID" integer, "staffID" integer, CONSTRAINT "PK_69900eec42c88582ac8affff3e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "divisions" ("id" SERIAL NOT NULL, "division" character varying NOT NULL, CONSTRAINT "UQ_7f4eff21cad3ba9732d4d4f4ba5" UNIQUE ("division"), CONSTRAINT "PK_c1f864477b3fd0954564108ed96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" SERIAL NOT NULL, "position" character varying NOT NULL, CONSTRAINT "UQ_1ad07a6f0a20c936798d440c7a4" UNIQUE ("position"), CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staff" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "tabelNum" integer NOT NULL, "positionID" integer, "divisionID" integer, CONSTRAINT "UQ_8508e888b93f5d83b545c1aab7c" UNIQUE ("tabelNum"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "staffGroupID" integer, "staffID" integer, CONSTRAINT "UQ_2b995c673f59534efe164ced42d" UNIQUE ("login"), CONSTRAINT "REL_66a80448783fa29c78e7d3ebee" UNIQUE ("staffID"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staff_groups" ("id" SERIAL NOT NULL, "staffGroup" character varying(50) NOT NULL, "canAddRecords" boolean NOT NULL, "canEditRecords" boolean NOT NULL, "canDeleteRecords" boolean NOT NULL, "canAccessFiles" boolean NOT NULL, CONSTRAINT "UQ_a4ce7005279743f27731e7a41a6" UNIQUE ("staffGroup"), CONSTRAINT "PK_56653a5fa6c479171c4cdba7d49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "protocol_files" ADD CONSTRAINT "FK_04b1d09bc002836f90e1df9ad95" FOREIGN KEY (" protocolID") REFERENCES "protocols"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_journal" ADD CONSTRAINT "FK_19316060c32175b5c99f1c7fb2a" FOREIGN KEY ("issueMethodID") REFERENCES "issue_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_cd173ef0232e84efbddc273f4de" FOREIGN KEY ("customerTypeID") REFERENCES "customer_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "protocols" ADD CONSTRAINT "FK_96464ff81ab0ab40630f2c3dcce" FOREIGN KEY ("reasonTypeID") REFERENCES "reason_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "protocols" ADD CONSTRAINT "FK_e20db811391120810cdf934328c" FOREIGN KEY ("workTypeID") REFERENCES "work_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "protocols" ADD CONSTRAINT "FK_b20b5d3ccccebcdc90fb55e6cb5" FOREIGN KEY ("protocolStatusID") REFERENCES "protocol_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "protocols" ADD CONSTRAINT "FK_e6d425929e0ce42ea19e6bdbd8d" FOREIGN KEY ("replaceJournalID") REFERENCES "replace_journal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "protocols" ADD CONSTRAINT "FK_c421fbe434c591427a3c1629448" FOREIGN KEY ("issueJournalID") REFERENCES "issue_journal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "protocols" ADD CONSTRAINT "FK_0f1734535ccdc96c0636a329dca" FOREIGN KEY ("customerID") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "protocols" ADD CONSTRAINT "FK_f71e09ef62b0244c399393a376a" FOREIGN KEY ("staffID") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_9405d75ab71eee6cd63dba1e4e3" FOREIGN KEY ("positionID") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_4319396b7d5628bab1c8db206c6" FOREIGN KEY ("divisionID") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_0d73401a627d3f7c5cdc386c4a6" FOREIGN KEY ("staffGroupID") REFERENCES "staff_groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_66a80448783fa29c78e7d3ebee8" FOREIGN KEY ("staffID") REFERENCES "staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_66a80448783fa29c78e7d3ebee8"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_0d73401a627d3f7c5cdc386c4a6"`);
        await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_4319396b7d5628bab1c8db206c6"`);
        await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_9405d75ab71eee6cd63dba1e4e3"`);
        await queryRunner.query(`ALTER TABLE "protocols" DROP CONSTRAINT "FK_f71e09ef62b0244c399393a376a"`);
        await queryRunner.query(`ALTER TABLE "protocols" DROP CONSTRAINT "FK_0f1734535ccdc96c0636a329dca"`);
        await queryRunner.query(`ALTER TABLE "protocols" DROP CONSTRAINT "FK_c421fbe434c591427a3c1629448"`);
        await queryRunner.query(`ALTER TABLE "protocols" DROP CONSTRAINT "FK_e6d425929e0ce42ea19e6bdbd8d"`);
        await queryRunner.query(`ALTER TABLE "protocols" DROP CONSTRAINT "FK_b20b5d3ccccebcdc90fb55e6cb5"`);
        await queryRunner.query(`ALTER TABLE "protocols" DROP CONSTRAINT "FK_e20db811391120810cdf934328c"`);
        await queryRunner.query(`ALTER TABLE "protocols" DROP CONSTRAINT "FK_96464ff81ab0ab40630f2c3dcce"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_cd173ef0232e84efbddc273f4de"`);
        await queryRunner.query(`ALTER TABLE "issue_journal" DROP CONSTRAINT "FK_19316060c32175b5c99f1c7fb2a"`);
        await queryRunner.query(`ALTER TABLE "protocol_files" DROP CONSTRAINT "FK_04b1d09bc002836f90e1df9ad95"`);
        await queryRunner.query(`DROP TABLE "staff_groups"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "staff"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "divisions"`);
        await queryRunner.query(`DROP TABLE "protocols"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "customer_types"`);
        await queryRunner.query(`DROP TABLE "issue_journal"`);
        await queryRunner.query(`DROP TABLE "issue_method"`);
        await queryRunner.query(`DROP TABLE "replace_journal"`);
        await queryRunner.query(`DROP TABLE "reason_type"`);
        await queryRunner.query(`DROP TABLE "work_type"`);
        await queryRunner.query(`DROP TABLE "protocol_files"`);
        await queryRunner.query(`DROP TABLE "protocol_status"`);
    }

}
