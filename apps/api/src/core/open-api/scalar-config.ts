import type { OpenAPIObject } from "@nestjs/swagger";

export function createScalarConfig(mergedDocument: OpenAPIObject) {
  return {
    spec: mergedDocument,
    title: "API Documentation",
    description: "API documentation for your application",
    logo: "https://example.com/logo.png",
    theme: "dark",
    content: mergedDocument,
    auth: {
      name: "Authorization",
      schema: {
        type: "http",
        scheme: "bearer",
      },
    },
    navigation: {
      sections: [
        {
          title: "Introduction",
          items: [
            {
              title: "Getting Started",
              content: "Welcome to the API documentation.",
            },
          ],
        },
        {
          title: "Authentication",
          items: [
            {
              title: "Overview",
              content:
                "Learn how to authenticate with the API using JWT tokens.",
            },
          ],
        },
      ],
    },
  };
}
