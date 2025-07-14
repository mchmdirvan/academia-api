/*
  Warnings:

  - You are about to drop the column `provincyId` on the `School` table. All the data in the column will be lost.
  - Added the required column `provinceId` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_provincyId_fkey";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "provincyId",
ADD COLUMN     "provinceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provincy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
