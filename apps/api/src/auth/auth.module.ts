import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuthGuard } from "../common/guards/auth.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
