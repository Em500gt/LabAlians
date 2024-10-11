import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1728044646307 implements MigrationInterface {
    name = 'Auto1728044646307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_3f6357a8beca33d01020dc19fc" ON "protocol_status" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_44706141f7d2143ce754bd5876" ON "protocol_files" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_53ba297613465c2ce91d2a2484" ON "work_type" ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_a45b9cf18f0287c69e795aaa47" ON "reason_type" ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_641fdf11f88e144cc1378538ba" ON "customer_types" ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_133ec679a801fab5e070f73d3e" ON "customers" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2da704219d0812f0ea46ff50b" ON "customers" ("customerName") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd173ef0232e84efbddc273f4d" ON "customers" ("customerTypeID") `);
        await queryRunner.query(`CREATE INDEX "IDX_69900eec42c88582ac8affff3e" ON "protocols" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_96464ff81ab0ab40630f2c3dcc" ON "protocols" ("reasonTypeID") `);
        await queryRunner.query(`CREATE INDEX "IDX_e20db811391120810cdf934328" ON "protocols" ("workTypeID") `);
        await queryRunner.query(`CREATE INDEX "IDX_b20b5d3ccccebcdc90fb55e6cb" ON "protocols" ("protocolStatusID") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f1734535ccdc96c0636a329dc" ON "protocols" ("customerID") `);
        await queryRunner.query(`CREATE INDEX "IDX_f71e09ef62b0244c399393a376" ON "protocols" ("staffID") `);
        await queryRunner.query(`CREATE INDEX "IDX_7f4eff21cad3ba9732d4d4f4ba" ON "divisions" ("division") `);
        await queryRunner.query(`CREATE INDEX "IDX_1ad07a6f0a20c936798d440c7a" ON "positions" ("position") `);
        await queryRunner.query(`CREATE INDEX "IDX_e4ee98bb552756c180aec1e854" ON "staff" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8508e888b93f5d83b545c1aab7" ON "staff" ("tabelNum") `);
        await queryRunner.query(`CREATE INDEX "IDX_9405d75ab71eee6cd63dba1e4e" ON "staff" ("positionID") `);
        await queryRunner.query(`CREATE INDEX "IDX_4319396b7d5628bab1c8db206c" ON "staff" ("divisionID") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a7a02c20412299d198e097a8f" ON "accounts" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2b995c673f59534efe164ced42" ON "accounts" ("login") `);
        await queryRunner.query(`CREATE INDEX "IDX_0d73401a627d3f7c5cdc386c4a" ON "accounts" ("staffGroupID") `);
        await queryRunner.query(`CREATE INDEX "IDX_66a80448783fa29c78e7d3ebee" ON "accounts" ("staffID") `);
        await queryRunner.query(`CREATE INDEX "IDX_56653a5fa6c479171c4cdba7d4" ON "staff_groups" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a4ce7005279743f27731e7a41a" ON "staff_groups" ("staffGroup") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a4ce7005279743f27731e7a41a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56653a5fa6c479171c4cdba7d4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66a80448783fa29c78e7d3ebee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0d73401a627d3f7c5cdc386c4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b995c673f59534efe164ced42"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a7a02c20412299d198e097a8f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4319396b7d5628bab1c8db206c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9405d75ab71eee6cd63dba1e4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8508e888b93f5d83b545c1aab7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4ee98bb552756c180aec1e854"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ad07a6f0a20c936798d440c7a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f4eff21cad3ba9732d4d4f4ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f71e09ef62b0244c399393a376"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f1734535ccdc96c0636a329dc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b20b5d3ccccebcdc90fb55e6cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e20db811391120810cdf934328"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96464ff81ab0ab40630f2c3dcc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69900eec42c88582ac8affff3e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd173ef0232e84efbddc273f4d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2da704219d0812f0ea46ff50b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_133ec679a801fab5e070f73d3e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_641fdf11f88e144cc1378538ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a45b9cf18f0287c69e795aaa47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53ba297613465c2ce91d2a2484"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44706141f7d2143ce754bd5876"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f6357a8beca33d01020dc19fc"`);
    }

}
