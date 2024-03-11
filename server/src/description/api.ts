export const apiDescription = {
  message: 'API:',
  list: [
    {
      path: '/register/user',
      description: 'Add new User',
      throws: 'UserAlreadyExistsException',
      body: {
        username: "string",
        phone: "string",
        password: "string"
      }
    },
    {
      path: '/register/login',
      description: 'Sign In',
      throws: 'UserNotFoundException, PasswordIncorrectException',
      body: {
        username: "string",
        phone: "string",
        password: "string"
      }
    },

  ]
};