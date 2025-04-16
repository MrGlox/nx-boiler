import { Inject, Injectable } from "@nestjs/common";
import { BetterAuthOptions } from "better-auth";

@Injectable()
export class BetterAuthService {
  constructor(
    @Inject("AUTH_CONFIG") public readonly config: BetterAuthOptions,
    @Inject("BETTER_AUTH") public readonly auth: any,
  ) {}

  getConfig() {
    return this.config;
  }

  getAuth() {
    return this.auth;
  }
}
