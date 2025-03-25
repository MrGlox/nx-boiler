import { All, Controller, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import type { AuthService } from './auth.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @All('api/auth/*')
  // @ApiOperation({
  //   summary: 'Auth handler',
  // })
  // async auth(@Req() req: Request, @Res() res: Response) {
  //   return this.authService.handler(req, res);
  // }
}
