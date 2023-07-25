# Free Auth API Documentation

## Description

Welcome to the API documentation for this simple auth api project. This API allows you to interact with user data and perform various CRUD operations (for now, is just login and register). All endpoints follow RESTful conventions and return data in JSON format.

## Base URL

The base URL for the API is [http://localhost:4040](http://localhost:3000).

## Authentication

To access protected endpoints, you need to include a Bearer token in the Authorization header. Obtain the token by sending a POST request to the /login endpoint with valid credentials. The token will expire after 5 hours.

## Endpoints

### User Registration

Create a new user by sending a POST request to `/register`.

**Request:**

```http
POST /register
Content-Type: application/json

{
  "name": "Micheal Ben",
  "email":"michealben@google.com",
  "phone": "07063964065",
  "password":"11111111"
}
```

**Response:**

```json
{
	"response_code": "201",
	"response_message": "Resgistration successful",
	"data": {
		"user": {
			"name": "Micheal Ben",
			"email": "michealben@google.com",
			"phone": "07063964065",
			"password": "$2b$10$6tRcQ1zKgQoSWISkJraFQuw1fiy/AfPNOZkLBWBWofFR6HMKI0Tpa",
			"_id": "64bfa22d47a0aab6466806b0",
			"createdAt": "2023-07-25T10:21:33.821Z",
			"updatedAt": "2023-07-25T10:21:33.821Z",
			"__v": 0
		},
		"token": "eyJhbvciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhMjJkNDdhMGFhYjY0NjY4MDZiMCIsImlhdCI6MTY5MDI4MDQ5MywiZXhwIjoxNjkwMjk4NDkzfQ.l6pJzjYyj5DKKHfj1LnKy7K3Y1yGToWlp91Y3-VtXKg"
	}
}
```

### User login

Authenticate and get a JWT token by sending a POST request to `/login`.

**Request:**

```http
POST /login
Content-Type: application/json

{
  "email":"michealben@google.com",
  "password":"11111111"
}
```

**Response:**

```json
{
	"response_code": "200",
	"response_message": "Login successful",
	"data": {
		"user": {
			"_id": "64bf9ebc13b03c1eaed0285c",
			"name": "Micheal Ben",
			"email": "michealben@google.com",
			"phone": "07063964065",
			"password": "$2b$10$0pfSGmIufqFW05UsTFqTne/kgaEW6s.O0Bt12tq2Xh5nipCN5dade",
			"createdAt": "2023-07-25T10:06:52.628Z",
			"updatedAt": "2023-07-25T10:06:52.628Z",
			"__v": 0
		},
		"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmY5ZWJjMTNiMDNjMWVhZWQwMjg1YyIsImlhdCI6MTY5MDI4MDQ0NiwiZXhwIjoxNjkwMjk4NDQ2fQ.lZI-CDnj9hH6u3m1UpbOpq4ccwu8J56f4Gp09IyxeP8"
	}
}
```

### Get all Users

Get the profile of ALL registered users by sending a GET request to `/users`.

**Request:**

```http
GET /users
Authorization: Bearer <your_jwt_token>
```

**Response:**

```json
{
	"response_code": "200",
	"response_message": "User found",
	"data": [
		{
			"_id": "64bf0a0e65594e8e36e67a89",
			"name": "Cletus Kisngdom",
			"email": "ceisgdo@sle.cso",
			"phone": "07063964065",
			"password": "$2b$10$HgcLlrvHxDshH4EIQ1YgPulS3L/n5azEmllzKM5tvhh7QYI5CCQgG",
			"createdAt": "2023-07-24T23:32:30.425Z",
			"updatedAt": "2023-07-24T23:32:30.425Z",
			"__v": 0
		},
		{
			"_id": "64bf98b536474aca383b8e5c",
			"name": "Cletus Kingdom",
			"email": "test@test.com",
			"phone": "07063964065",
			"password": "$2b$10$5wQ2AzQb9OLItUDhj7KSau2cu7qdOgLIjJGbI28OI3SkHKSiNSiT6",
			"createdAt": "2023-07-25T09:41:09.109Z",
			"updatedAt": "2023-07-25T09:41:09.109Z",
			"__v": 0
		},
		{
			"_id": "64bf9ebc13b03c1eaed0285c",
			"name": "Cletus Kingdom",
			"email": "test2@test.com",
			"phone": "07063964065",
			"password": "$2b$10$0pfSGmIufqFW05UsTFqTne/kgaEW6s.O0Bt12tq2Xh5nipCN5dade",
			"createdAt": "2023-07-25T10:06:52.628Z",
			"updatedAt": "2023-07-25T10:06:52.628Z",
			"__v": 0
		},
		{
			"_id": "64bfa22d47a0aab6466806b0",
			"name": "Cletus Kingdom",
			"email": "test3@test.com",
			"phone": "07063964065",
			"password": "$2b$10$6tRcQ1zKgQoSWISkJraFQuw1fiy/AfPNOZkLBWBWofFR6HMKI0Tpa",
			"createdAt": "2023-07-25T10:21:33.821Z",
			"updatedAt": "2023-07-25T10:21:33.821Z",
			"__v": 0
		},
		{
			"_id": "64bfb860596add66bdd52be5",
			"name": "Uzoma Chinwendu",
			"email": "uzomachi42@google.com",
			"phone": "07065426214",
			"password": "$2b$10$1okeMSPzPh9uuDlxrchlWulQFMOZf6JxQNAhrA9ehPVtU0BXe.B8y",
			"createdAt": "2023-07-25T11:56:16.097Z",
			"updatedAt": "2023-07-25T11:56:16.098Z",
			"__v": 0
		}
	]
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of any issues. Refer to the responses to determine the success of each request and handle errors accordingly.

### Some of the error responses

**Response1:**

```json
{
	"response_code": "401",
	"response_message": "Invalid token."
}
```

**Response2:**

```json
{
	"response_code": "401",
	"response_message": "No token provided."
}
```
