const SchemaError = function (field, message) {
  this.field = field;
  this.message = message;
};

function validator(schema) {
  return function (req, res, next) {
    const errors = [];
    for (const schemaField of schema) {
      const field = req.body[schemaField.name];
      if (!field) {
        if (schemaField.required) {
          errors.push(
            new SchemaError(
              schemaField.name,
              `${schemaField.name} is required.`
            )
          );
        }
        continue;
      }
      if (!!schemaField.enum) {
        if (!schemaField.enum.includes(field)) {
          errors.push(
            new SchemaError(
              schemaField.name,
              `${schemaField.name} should be ${schemaField.enum.join(" or ")}.`
            )
          );
        }
      }
      if (!!schemaField.minLength) {
        if (field.length < schemaField.minLength[0]) {
          errors.push(
            new SchemaError(schemaField.name, schemaField.minLength[1])
          );
        }
      }
      if (!!schemaField.maxLength) {
        if (field.length > schemaField.maxLength[0]) {
          errors.push(
            new SchemaError(schemaField.name, schemaField.maxLength[1])
          );
        }
      }
      if (!!schemaField.pattern) {
        const regexPattern = new RegExp(schemaField.pattern[0]);
        if (!regexPattern.test(field)) {
          errors.push(
            new SchemaError(schemaField.name, schemaField.pattern[1])
          );
        }
      }
    }
    if (errors.length !== 0) {
      return res.status(400).send({ errors });
    }
    next();
  };
}

module.exports = { validator, SchemaError };
