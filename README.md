# User authentication API written in express.

Project contains an API which allows user to register a new account, confirm registration process via email, restore and change password.

### Prerequisites

- Verify that your version of Git is `>=2.13.0`.

### Installation

- Clone this repository using SSH: `git clone git@github.com:Ofadiman/express-auth.git` or via HTTPS: `git clone https://github.com/Ofadiman/express-auth.git`

- Install dependencies.

  - `cd express-auth`
  - `npm i`

- Create `.env.development` file in the root project directory and specify environment variables that you want to use.

```dotenv
# Recommended port: 3000
PORT=
      
# Recommended database name: express-auth
DATABASE_NAME=
# Recommended database host: localhost
MONGODB_HOST=

# Recommended database port: 27017
MONGODB_PORT=

# Recommended email sender: noreply@express-utils.com 
EMAIL_FROM=
# Recommened email to: your-email-address@something.com
EMAIL_TO=
# An API key from mailing service
EMAIL_SERVICE_API_KEY=

# Recommended expiration time: 10m
JWT_EXPIRES_IN_ACCOUNT_ACTIVATION=
# Recommended expiration time: 90d
JWT_EXPIRES_IN_LOGIN=90d
# Recommended expiration time: 10m
JWT_EXPIRES_IN_PASSWORD_RESET=10m
# Your jwt secret: e.g. r0PWod1wY0ysFv1Juvnu449w8r19wjgkSlWTdSuL
JWT_SECRET_ACCOUNT_ACTIVATION=
# Your jwt secret: e.g. mYlhg7pujJlkYlasg587XLDsSXsuT4BOu9z8Ih4GCQ2YoU
JWT_SECRET_LOGIN=
# Your jwt secret: e.g. QzProk4T73EBCV4sFapfsudh15BFj09npFHQy4dJn8TR7mH09
JWT_SECRET_PASSWORD_RESET=

# Your client URL in development mode (probably): http://localhost:3000
CLIENT_URL=
```

- You are all set. Now you can run `npm run dev` to start the app in development mode.
