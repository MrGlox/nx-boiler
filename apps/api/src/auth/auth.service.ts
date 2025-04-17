// import { Injectable } from "@nestjs/common";
// import { DatabaseService } from "@repo/database";
// import { betterAuth } from "better-auth";
// import { bearer, openAPI } from "better-auth/plugins";
// import { prismaAdapter } from "better-auth/adapters/prisma";

// @Injectable()
// export class AuthService {
//   private auth;

//   constructor(private readonly db: DatabaseService) {
//     this.auth = this.initAuth();
//   }

//   private initAuth() {
//     return betterAuth({
//       baseURL: `${process.env["APP_DOMAIN"]}/api/auth`,
//       trustedOrigins: [
//         process.env["APP_DOMAIN"] || "http://localhost:3000",
//         process.env["API_DOMAIN"] || "http://localhost:4200",
//       ],
//       database: prismaAdapter(this.db, {
//         provider: "postgresql",
//         // models: {
//         //   user: "User",
//         //   account: "Account",
//         //   session: "Session",
//         //   verification: "Verification",
//         // },
//       }),
//       emailAndPassword: {
//         enabled: true,
//         autoSignIn: false,
//         async onBeforeCreateUser(data) {
//           return {
//             ...data,
//             password: data.password || "", // Ensure password is never undefined
//             name: data.name || data.email.split("@")[0],
//           };
//         },
//       },
//       socialProviders: {
//         google: {
//           clientId: process.env["GOOGLE_CLIENT_ID"],
//           clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
//           mapProfileToUser: (profile) => {
//             return {
//               firstName: profile.given_name,
//               lastName: profile.family_name,
//             };
//           },
//         },
//       },
//       plugins: [
//         bearer(),
//         openAPI({
//           enabled: true,
//           path: "/api/auth/openapi.json",
//         }),
//       ],
//       user: {
//         modelName: "User",
//         additionalFields: {
//           role: {
//             type: "string",
//             required: false,
//             defaultValue: "USER",
//             input: false,
//           },
//           lang: {
//             type: "string",
//             required: false,
//             defaultValue: "en",
//           },
//         },
//       },
//       session: {
//         modelName: "Session",
//       },
//     });
//   }

//   getAuth() {
//     return this.auth;
//   }
// }
