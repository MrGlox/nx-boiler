// import { Injectable } from "@nestjs/common";

// import { DatabaseService } from "../core/database/database.service";

// @Injectable()
// export class AuthService {
//   constructor(private readonly database: DatabaseService) {
//     this.database = database;
//   }

//   async getMe(sessionToken: string) {
//     return this.database.session.findUnique({
//       where: { id: sessionToken },
//       include: { user: true },
//     });
//   }

//   async getUserByEmail(email: string) {
//     return this.database.user.findUnique({
//       where: { email },
//     });
//   }
// }
