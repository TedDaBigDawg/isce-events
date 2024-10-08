/*
  Warnings:

  - A unique constraint covering the columns `[event_id,title]` on the table `Price` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_event_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Price_event_id_title_key" ON "Price"("event_id", "title");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
