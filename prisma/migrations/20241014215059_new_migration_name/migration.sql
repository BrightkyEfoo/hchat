-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "socketId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "status" TEXT,
    "seenAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recievedAt" TIMESTAMP(3),
    "senderId" INTEGER,
    "recieverId" INTEGER,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_socketId_key" ON "User"("socketId");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
