-- DropIndex
DROP INDEX "public"."user_firstName_key";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "firstName" DROP NOT NULL;
