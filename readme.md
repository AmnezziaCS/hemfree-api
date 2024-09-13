# Hemfree-api

This repository contains the backend for the Hemfree project. It is a RESTful API built with Node.js and Express.js. It is used to manage the data of the Hemfree project.

## Setup

Clone the repository and run the following commands:

```bash
git clone https://github.com/AmnezziaCS/hemfree-api.git
npm install
npm run dev
```

### Environment Variables

The following environment variables are required:

- `DATABASE_HOST`: The host of the database
- `DATABASE_USER`: The user of the database
- `DATABASE_PASSWORD`: The password of the database
- `DATABASE_NAME`: The name of the database
- `JWT_SECRET`: You can use this node code to generate it :

```javascript
require('crypto').randomBytes(64).toString('hex')
```
