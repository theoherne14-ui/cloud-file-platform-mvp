import { Module } from "@nestjs/common";
import { StorageController } from "./storage.controller";
import { StorageService } from "./storage.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuthGuard } from "../common/guards/auth.guard";

@Module({
  controllers: [StorageController],
  providers: [StorageService, PrismaService, AuthGuard],
})
export class StorageModule {}
