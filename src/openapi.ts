import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupOpenApi = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Percy Main Match Fees API")
    .setDescription("")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("openapi", app, document);
};
