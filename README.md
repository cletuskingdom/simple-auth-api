# Free Auth API Documentation

## Description

Welcome to the API documentation for this simple auth api project. This API allows you to interact with user data and perform various CRUD operations (for now, is just login and register). All endpoints follow RESTful conventions and return data in JSON format.

## Base URL

The base URL for the API is [http://localhost:4040](http://localhost:3000).

## Authentication

To access protected endpoints, you need to include a Bearer token in the Authorization header. Obtain the token by sending a POST request to the /login endpoint with valid credentials. The token will expire after 5 hours.

## Endpoints

### User Registration

Create a new user by sending a POST request to `/users/register`.

**Request:**

```http
POST /users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secretpassword"
}
```

**Response:**

```json
{
	"success": true,
	"message": "User registered successfully.",
	"user": {
		"id": "user_id",
		"username": "john_doe",
		"email": "john@example.com"
	}
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of any issues. Refer to the responses to determine the success of each request and handle errors accordingly.
