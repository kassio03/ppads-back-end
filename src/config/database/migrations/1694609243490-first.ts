import { MigrationInterface, QueryRunner } from 'typeorm';

export class First1694609243490 implements MigrationInterface {
  name = 'First1694609243490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventId" uuid NOT NULL, "userId" uuid NOT NULL, "qrCode" character varying NOT NULL, "alreadyUsed" boolean NOT NULL DEFAULT false, "usedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "remainingTickets" integer NOT NULL, "totalTickets" integer NOT NULL, "startsAt" TIMESTAMP NOT NULL DEFAULT now(), "finishAt" TIMESTAMP NOT NULL DEFAULT now(), "price" double precision NOT NULL, "poster" character varying NOT NULL, "addressId" uuid NOT NULL, "authorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "complement" character varying, "houseNumber" character varying NOT NULL, "cep" character varying NOT NULL, "cityId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "uf" character varying NOT NULL, CONSTRAINT "UQ_b2c4aef5929860729007ac32f6f" UNIQUE ("name"), CONSTRAINT "UQ_5c5dcf2d3a6675ddbc6cd3afd55" UNIQUE ("uf"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "stateId" uuid NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_cb22a51617991265571be41b74f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_84f0d238c7276f4776446b1d82b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_c180b5b1724f7dd9f6d50915c79" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_3624b3085165071df70276a4000" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_e99de556ee56afe72154f3ed04a" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_e99de556ee56afe72154f3ed04a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_3624b3085165071df70276a4000"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_c180b5b1724f7dd9f6d50915c79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_84f0d238c7276f4776446b1d82b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_cb22a51617991265571be41b74f"`,
    );
    await queryRunner.query(`DROP TABLE "city"`);
    await queryRunner.query(`DROP TABLE "state"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
