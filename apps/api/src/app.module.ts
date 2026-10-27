import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { WorkspacesModule } from "./workspaces/workspaces.module";
import { FilesModule } from "./files/files.module";
import { ProvidersModule } from "./providers/providers.module";
import { SettingsModule } from "./settings/settings.module";
import { ActivityModule } from "./activity/activity.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    WorkspacesModule,
    FilesModule,
    ProvidersModule,
    SettingsModule,
    ActivityModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
