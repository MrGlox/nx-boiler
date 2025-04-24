import type { OpenAPIObject } from "@nestjs/swagger";

export function createScalarConfig(mergedDocument: OpenAPIObject) {
  // Transform the paths to set the auth category
  const paths = Object.entries(mergedDocument.paths || {}).reduce(
    (acc, [path, pathItem]) => {
      if (path.includes("/api/auth") && !path.includes("/api/auth/admin")) {
        // Add Auth tag to each auth route operation
        const operations = Object.entries(pathItem).reduce(
          (opAcc, [method, operation]: [string, any]) => {
            if (method !== "parameters") {
              opAcc[method] = {
                ...operation,
                tags: ["Auth"], // Override tags to use Auth
              };
            } else {
              opAcc[method] = operation;
            }
            return opAcc;
          },
          {} as Record<string, any>,
        );

        acc[path] = operations;
      } else {
        acc[path] = pathItem;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  const specWithPaths = {
    ...mergedDocument,
    paths,
    tags: [
      ...(mergedDocument.tags || []).filter((tag) => tag.name !== "Auth"),
      { name: "Auth", description: "Authentication endpoints" },
    ],
  };

  return {
    spec: specWithPaths,
    title: "API Documentation",
    description: "API documentation for your application",
    logo: "https://example.com/logo.png",
    theme: "dark",
    content: specWithPaths,
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
      ],
    },
  };
}
