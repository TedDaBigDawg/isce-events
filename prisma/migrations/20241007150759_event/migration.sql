/*
  Warnings:

  - You are about to drop the column `user_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_user_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "User";
