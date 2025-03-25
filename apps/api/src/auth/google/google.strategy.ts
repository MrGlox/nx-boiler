// import crypto from 'node:crypto';

// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-google-oauth20';
// import { hashWithSalt } from '@repo/shared/utils';

// import type { ConfigService } from '@nestjs/config';
// import type { DatabaseService, User } from '@repo/database';
// import type {
//   VerifyCallback,
//   Profile,
//   StrategyOptions,
// } from 'passport-google-oauth20';
// import type { AllConfigType } from '../../core/config/config.type';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor(
//     private config: ConfigService<AllConfigType>,
//     private readonly prisma: DatabaseService,
//   ) {
//     super({
//       clientID: config.get('google.clientID', { infer: true }),
//       clientSecret: config.get('google.clientSecret', { infer: true }),
//       callbackURL: config.get('google.callbackURL', { infer: true }),
//       // accessType: 'offline',
//       // display: 'page',
//       // prompt: 'consent',
//       scope: ['email', 'profile'],
//     } as StrategyOptions);
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: VerifyCallback,
//   ): Promise<User> {
//     const { id, emails } = profile;
//     const email = emails[0].value;

//     let user = await this.prisma.user.findUnique({ where: { email } });

//     const { hash, salt } = await hashWithSalt(
//       crypto.randomBytes(16).toString('hex'),
//     );

//     if (!user) {
//       user = await this.prisma.user.create({
//         data: {
//           email,
//           password: `user_${salt}.${hash}`, // Google users don't have a password so we generate a random one
//           googleId: id,
//         },
//       });
//     }

//     await this.prisma.token.create({
//       data: {
//         userId: user.id,
//         token: accessToken,
//         type: 'ACCESS',
//         expiresAt: new Date(Date.now() + 2),
//       },
//     });

//     done(null, user);
//     return user;
//   }
// }
