// flattenJSON is already here if needed

export const flattenJSON = (data, prefix = '') => {
    const result = {};
    for (const key in data) {
      const value = data[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenJSON(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
    return result;
  };
  
  // NEW: Unflatten keys like "address.city" to nested object
  export const unflattenJSON = (data) => {
    const result = {};
  
    for (const flatKey in data) {
      const keys = flatKey.split('.');
      keys.reduce((acc, key, i) => {
        if (i === keys.length - 1) {
          acc[key] = data[flatKey];
        } else {
          if (!acc[key]) acc[key] = {};
        }
        return acc[key];
      }, result);
    }
  
    return result;
  };
  