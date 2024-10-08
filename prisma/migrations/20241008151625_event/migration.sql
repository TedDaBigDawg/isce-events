/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Price` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Price_event_id_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Price_title_key" ON "Price"("title");
