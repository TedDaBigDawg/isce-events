/*
  Warnings:

  - A unique constraint covering the columns `[event_id,title]` on the table `Price` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Price_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Price_event_id_title_key" ON "Price"("event_id", "title");
