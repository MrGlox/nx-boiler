import { registerAs } from '@nestjs/config';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { validateConfig } from '@repo/shared/utils';

class EnvironmentVariablesValidator {
  @IsEmail()
  @IsOptional()
  MAIL_FROM!: string;

  @IsString()
  @IsOptional()
  MAIL_HOST!: string;

  @IsString()
  @IsOptional()
  MAIL_PORT!: string;

  @IsString()
  @IsOptional()
  MAIL_USER!: string;

  @IsString()
  @IsOptional()
  MAIL_PASSWORD!: string;
}

export interface MailerConfig {
  from: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export default registerAs('mailer', (): MailerConfig => {
  const validatedConfig = validateConfig(
    process.env,
    EnvironmentVariablesValidator
  );

  return {
    from: validatedConfig.MAIL_FROM || 'noreply@example.com',
    host: validatedConfig.MAIL_HOST || 'smtp.example.com',
    port: validatedConfig.MAIL_PORT ? parseInt(validatedConfig.MAIL_PORT, 10) : 587,
    user: validatedConfig.MAIL_USER || '',
    password: validatedConfig.MAIL_PASSWORD || '',
  };
});