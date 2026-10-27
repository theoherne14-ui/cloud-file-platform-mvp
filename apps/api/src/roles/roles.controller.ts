import { Body, Controller, Get, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post("seed")
  async seedRoles() {
    return this.rolesService.seedRoles();
  }

  @Get()
  async getRoles() {
    return this.rolesService.getRoles();
  }
}
