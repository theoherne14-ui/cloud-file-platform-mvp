import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecentActivity() {
    return this.prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
}
