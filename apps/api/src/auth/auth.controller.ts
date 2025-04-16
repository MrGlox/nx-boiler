import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { BetterGuard } from "./guards/auth.guard";
import { BetterAuthService } from "./better-auth.service";

@ApiTags("Auth")
@Controller("users")
export class AuthController {
  constructor(private readonly authService: BetterAuthService) {}

  @Get("me")
  @UseGuards(BetterGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user profile" })
  async getProfile(@Request() req) {
    const auth = this.authService.getAuth();
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    return {
      user: session?.user || null,
      message: "Protected route",
    };
  }
}
