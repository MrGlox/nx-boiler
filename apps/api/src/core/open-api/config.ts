import { DocumentBuilder } from "@nestjs/swagger";

export function createOpenApiConfig(port: number) {
  return new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("The API description")
    .setVersion("0.0.1")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "Enter JWT token",
        in: "header",
      },
      "access-token",
    )
    .addServer(`http://localhost:${port}`, "Local environment")
    .build();
}
