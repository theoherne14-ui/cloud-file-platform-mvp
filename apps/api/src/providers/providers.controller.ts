import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProvidersService } from "./providers.service";

@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post("connect")
  async connectProvider(@Body() body: { userId: string; provider: string; accessToken: string }) {
    return this.providersService.connectProvider(body.userId, body.provider, body.accessToken);
  }

  @Get(":userId")
  async getProviders(@Param("userId") userId: string) {
    return this.providersService.getProvidersForUser(userId);
  }
}
