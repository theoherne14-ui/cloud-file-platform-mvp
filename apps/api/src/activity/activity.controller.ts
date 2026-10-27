import { Controller, Get, UseGuards } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { AuthGuard } from "../common/guards/auth.guard";

@Controller("activity")
@UseGuards(AuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getRecentActivity() {
    return this.activityService.getRecentActivity();
  }
}
