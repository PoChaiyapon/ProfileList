CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);

BEGIN TRANSACTION;

CREATE TABLE "Values" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Values" PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NULL
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20210415034535_InitialCreate', '5.0.1');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "Users" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NULL,
    "PasswordHash" BLOB NULL,
    "PasswordSalt" BLOB NULL
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20210415050026_AddUserEntity', '5.0.1');

COMMIT;

BEGIN TRANSACTION;

ALTER TABLE "Users" ADD "City" TEXT NULL;

ALTER TABLE "Users" ADD "Country" TEXT NULL;

ALTER TABLE "Users" ADD "Created" TEXT NOT NULL DEFAULT '0001-01-01 00:00:00';

ALTER TABLE "Users" ADD "DateOfBirth" TEXT NOT NULL DEFAULT '0001-01-01 00:00:00';

ALTER TABLE "Users" ADD "Gender" TEXT NULL;

ALTER TABLE "Users" ADD "Interests" TEXT NULL;

ALTER TABLE "Users" ADD "Introduction" TEXT NULL;

ALTER TABLE "Users" ADD "KnownAs" TEXT NULL;

ALTER TABLE "Users" ADD "LastActive" TEXT NOT NULL DEFAULT '0001-01-01 00:00:00';

ALTER TABLE "Users" ADD "LookingFor" TEXT NULL;

CREATE TABLE "Photos" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Photos" PRIMARY KEY AUTOINCREMENT,
    "Url" TEXT NULL,
    "Description" TEXT NULL,
    "DateAdded" TEXT NOT NULL,
    "isMain" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "FK_Photos_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_Photos_UserId" ON "Photos" ("UserId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20210417132343_EditEntity', '5.0.1');

COMMIT;

BEGIN TRANSACTION;

ALTER TABLE "Photos" ADD "PublicId" TEXT NULL;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20210420085534_AddPublicId', '5.0.1');

COMMIT;

