import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home() {
    return "home";
  }

  @Get("/hello")
  sayHello(): string {
    return this.appService.getBye();
  }
}
