class Queries {
  public UserByEmail = `query ($email: String) {
    users(where: {email: {_eq: $email}}) {
      id
      name
      email
      password
      created_at
      updated_at
    }
  }`;
  public User = `query me {
    users {
      id
      name
      email
      created_at
      updated_at
    }
  }`;
}

export default new Queries();
