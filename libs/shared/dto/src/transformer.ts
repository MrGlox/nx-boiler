export const transformer = {
  serialize: (value: any) => {
    // Recursively search for Date objects to convert to strings
    const serializeDate = (obj: any): any => {
      if (obj instanceof Date) {
        return obj.toISOString();
      }

      if (Array.isArray(obj)) {
        return obj.map(serializeDate);
      }

      if (typeof obj === 'object' && obj !== null) {
        const serializedObj: Record<string, any> = {};

        for (const key in obj) {
          serializedObj[key] = serializeDate(obj[key]);
        }

        return serializedObj;
      }

      return obj;
    };

    return serializeDate(value);
  },
  deserialize: (value: any) => {
    // Recursively search for stringified dates to convert back to Date objects
    const deserializeDate = (obj: any): any => {
      if (typeof obj === 'string') {
        const date = Date.parse(obj);
        if (!Number.isNaN(date)) {
          return new Date(date);
        }
      }

      if (Array.isArray(obj)) {
        return obj.map(deserializeDate);
      }

      if (typeof obj === 'object' && obj !== null) {
        const deserializedObj: Record<string, any> = {};

        for (const key in obj) {
          deserializedObj[key] = deserializeDate(obj[key]);
        }

        return deserializedObj;
      }
      return obj;
    };

    return deserializeDate(value);
  },
};
