import { Body, Controller, Get, Post } from "@nestjs/common";
import { WorkspacesService } from "./workspaces.service";

@Controller("workspaces")
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  async createWorkspace(@Body() body: { name: string }) {
    return this.workspacesService.createWorkspace(body.name);
  }

  @Get()
  async getWorkspaces() {
    return this.workspacesService.getWorkspaces();
  }

  @Post("assign")
  async assignUserToWorkspace(@Body() body: { userId: string; tenantId: string; roleId: string }) {
    return this.workspacesService.assignUserToWorkspace(body.userId, body.tenantId, body.roleId);
  }
}
