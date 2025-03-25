import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { toNodeHandler } from 'better-auth/node';
import { openAPI } from 'better-auth/plugins';
import type { Request, Response } from 'express';
import type { DatabaseService } from '@repo/database';

@Injectable()
export class AuthService {
  private auth: ReturnType<typeof betterAuth>;

  constructor(
    private readonly database: DatabaseService,
    protected readonly configService: ConfigService,
  ) {
    const googleClientId = configService.get('GOOGLE_CLIENT_ID');
    const googleClientSecret = configService.get('GOOGLE_CLIENT_SECRET');
    const baseURL = configService.get('BASE_URL');
    const secret = configService.get('AUTH_SECRET');

    this.auth = betterAuth({
      secret: secret,
      baseURL: baseURL,
      database: prismaAdapter(this.database, {
        provider: 'postgresql',
      }),
      emailAndPassword: {
        enabled: true,
        autoSignIn: true,
      },
      socialProviders: {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      },
      plugins: [openAPI()],
    });
  }

  async handler(req: Request, res: Response): Promise<void> {
    return toNodeHandler(this.auth)(req, res);
  }
}
