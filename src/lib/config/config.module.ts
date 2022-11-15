import { DynamicModule, Global } from "@nestjs/common";

export const CONFIG = Symbol("CONFIG");

@Global()
export class ConfigModule {
  static forConfig<T, U extends (env: Record<string, string | undefined>) => T>(
    configBuilder: U,
    env = process.env,
  ): DynamicModule {
    const config = configBuilder(env);
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG,
          useValue: config,
        },
      ],
      exports: [
        {
          provide: CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
