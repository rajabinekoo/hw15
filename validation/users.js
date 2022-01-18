const createUserSchema = [
  {
    name: "username",
    required: true,
    minLength: [4, "username should be greater then 4 character."],
    maxLength: [20, "username should be less then 20 character."],
  },
  {
    name: "password",
    required: true,
    pattern: [
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.",
    ],
  },
  {
    name: "gender",
    enum: ["male", "female"],
  },
  {
    name: "firstname",
    required: true,
    minLength: [3, "firstname should be greater then 3 character."],
    maxLength: [20, "firstname should be less then 20 character."],
  },
  {
    name: "lastname",
    required: true,
    minLength: [3, "lastname should be greater then 3 character."],
    maxLength: [20, "lastname should be less then 20 character."],
  },
];

const loginSchema = [
  {
    name: "username",
    required: true,
    minLength: [4, "username should be greater then 4 character."],
    maxLength: [20, "username should be less then 20 character."],
  },
  {
    name: "password",
    required: true,
    pattern: [
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.",
    ],
  },
];

module.exports = {
  createUserSchema,
  loginSchema,
};
