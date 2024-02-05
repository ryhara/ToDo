-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('COMPLETE', 'IN_PROGRESS', 'TODO');

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TodoStatus" NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
