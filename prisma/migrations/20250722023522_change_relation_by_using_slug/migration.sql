/*
  Warnings:

  - You are about to drop the column `provinceId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `School` table. All the data in the column will be lost.
  - Added the required column `provinceSlug` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citySlug` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citySlug` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `districtSlug` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceSlug` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_cityId_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_cityId_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_districtId_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_provinceId_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "provinceId",
ADD COLUMN     "provinceSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "District" DROP COLUMN "cityId",
ADD COLUMN     "citySlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "cityId",
DROP COLUMN "districtId",
DROP COLUMN "provinceId",
ADD COLUMN     "citySlug" TEXT NOT NULL,
ADD COLUMN     "districtSlug" TEXT NOT NULL,
ADD COLUMN     "provinceSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_provinceSlug_fkey" FOREIGN KEY ("provinceSlug") REFERENCES "Province"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_citySlug_fkey" FOREIGN KEY ("citySlug") REFERENCES "City"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_districtSlug_fkey" FOREIGN KEY ("districtSlug") REFERENCES "District"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceSlug_fkey" FOREIGN KEY ("provinceSlug") REFERENCES "Province"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_citySlug_fkey" FOREIGN KEY ("citySlug") REFERENCES "City"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
