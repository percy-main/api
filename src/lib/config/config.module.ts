import { DynamicModule, Global } from "@nestjs/common";

export const CONFIG = Symbol("CONFIG");

@Global()
export class ConfigModule {
  static forConfig<T, U extends (env: Record<string, string | undefined>) => T>(
    configBuilder: U,
    provide: symbol,
    env = process.env,
  ): DynamicModule {
    try {
      const config = configBuilder(env);
      return {
        module: ConfigModule,
        providers: [
          {
            provide,
            useValue: config,
          },
        ],
        exports: [
          {
            provide,
            useValue: config,
          },
        ],
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
