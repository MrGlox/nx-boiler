import { DocumentBuilder } from "@nestjs/swagger";

export function createOpenApiConfig() {
  return new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("The API description")
    .setVersion("0.0.1")
    .addBasicAuth()
    .addBearerAuth()
    .addServer(
      process.env.API_URL,
      process.env.NODE_ENV === "development"
        ? "Local environment"
        : "Production environment",
    )
    .build();
}
