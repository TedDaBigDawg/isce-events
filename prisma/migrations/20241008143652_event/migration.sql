-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_event_id_fkey";

-- AlterTable
ALTER TABLE "Price" ALTER COLUMN "event_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
