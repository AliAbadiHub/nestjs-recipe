import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DB_NAME: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  @IsBoolean()
  DB_LOGGING: boolean;

  @IsNotEmpty()
  @IsBoolean()
  DB_SYNCHRONIZATION;
}

export function validate(config: Record<string, unknown>) {
  const transformedConfig = Object.entries(config).reduce(
    (acc, [key, value]) => {
      if (value === 'true') {
        acc[key] = true;
      } else if (value === 'false') {
        acc[key] = false;
      } else if (!isNaN(Number(value))) {
        acc[key] = Number(value);
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );

  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    transformedConfig,
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
