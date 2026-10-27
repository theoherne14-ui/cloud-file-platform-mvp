import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { AuthGuard } from "../common/guards/auth.guard";

@Controller("settings")
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return this.settingsService.getSettingsForUser("demo-user");
  }

  @Post("provider")
  async saveProviderSetting(@Body() body: { userId: string; tenantId: string; providerName: string; connectionType: string; config: Record<string, any> }) {
    return this.settingsService.saveProviderSetting(body.userId, body.tenantId, body.providerName, body.connectionType, body.config);
  }
}
