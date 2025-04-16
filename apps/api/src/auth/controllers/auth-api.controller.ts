import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
  Put,
} from "@nestjs/common";

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

import { BetterGuard } from "../guards/auth.guard";
import { BetterAuthService } from "../better-auth.service";
import { Public } from "../../common/decorators/public.decorator";

@ApiTags("Authentication")
@Controller("auth")
export class AuthApiController {
  constructor(private readonly authService: BetterAuthService) {}

  @Public()
  @Post("login")
  @ApiOperation({ summary: "Login with email and password" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
      },
      required: ["email", "password"],
    },
  })
  async login(@Body() credentials: { email: string; password: string }) {
    const auth = this.authService.getAuth();
    return auth.api.emailAndPassword.login(credentials);
  }

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
        name: { type: "string" },
      },
      required: ["email", "password"],
    },
  })
  async register(
    @Body() userData: { email: string; password: string; name?: string },
  ) {
    const auth = this.authService.getAuth();

    console.log("userDatau", userData);
    console.log("auth", auth);

    return auth.api.emailAndPassword.register(userData);
  }

  @Get("session")
  @UseGuards(BetterGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current session" })
  async getSession(@Request() req) {
    const auth = this.authService.getAuth();
    return auth.api.getSession({
      headers: req.headers,
    });
  }

  @Post("logout")
  @UseGuards(BetterGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Logout current user" })
  async logout(@Request() req) {
    const auth = this.authService.getAuth();
    return auth.api.logout({
      headers: req.headers,
    });
  }

  @Public()
  @Post("forgot-password")
  @ApiOperation({ summary: "Request password reset" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
      },
      required: ["email"],
    },
  })
  async forgotPassword(@Body() data: { email: string }) {
    const auth = this.authService.getAuth();
    return auth.api.emailAndPassword.forgotPassword(data);
  }

  @Public()
  @Post("reset-password")
  @ApiOperation({ summary: "Reset password with token" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        token: { type: "string" },
        password: { type: "string" },
      },
      required: ["token", "password"],
    },
  })
  async resetPassword(@Body() data: { token: string; password: string }) {
    const auth = this.authService.getAuth();
    return auth.api.emailAndPassword.resetPassword(data);
  }
}
