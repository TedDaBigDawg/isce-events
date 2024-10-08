/*
  Warnings:

  - A unique constraint covering the columns `[clean_name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_clean_name_key" ON "Event"("clean_name");
