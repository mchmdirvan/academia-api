/*
  Warnings:

  - Changed the type of `npsn` on the `School` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "School" DROP COLUMN "npsn",
ADD COLUMN     "npsn" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "School_npsn_key" ON "School"("npsn");
