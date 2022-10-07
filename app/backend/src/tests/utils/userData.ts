export const validUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

export const userDatabase = {
  "id": 1,
  "username": "Admin",
  "role": "admin",
  "email": "admin@admin.com",
  "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
  get: () => userDatabase
}

export const invalidUser = {
  email: 'ademar@xablau.com',
  password: 'invalid_secret'
}