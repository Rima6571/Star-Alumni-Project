# Alumni Portal Backend API Examples

## Base URL

`http://localhost:5000`

## Auth

### Register

`POST /api/auth/register`

Request body:

```json
{
  "name": "Aarav Kulkarni",
  "email": "aarav@example.com",
  "password": "Pass@1234",
  "role": "student",
  "branch": "Computer Engineering",
  "graduationYear": 2027,
  "skills": ["React", "Node.js"]
}
```

Success response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "<jwt-token>",
  "user": {
    "_id": "65f12a...",
    "name": "Aarav Kulkarni",
    "email": "aarav@example.com",
    "role": "student",
    "createdAt": "2026-03-17T10:10:10.000Z"
  }
}
```

### Login

`POST /api/auth/login`

Request body:

```json
{
  "email": "aarav@example.com",
  "password": "Pass@1234"
}
```

Success response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<jwt-token>",
  "user": {
    "_id": "65f12a...",
    "name": "Aarav Kulkarni",
    "email": "aarav@example.com",
    "role": "student"
  }
}
```

### Get Current User

`GET /api/auth/me`

Header:

`Authorization: Bearer <jwt-token>`

Success response:

```json
{
  "success": true,
  "user": {
    "_id": "65f12a...",
    "name": "Aarav Kulkarni",
    "email": "aarav@example.com",
    "role": "student"
  }
}
```

## Admin

### Get Students

`GET /api/admin/students`

Success response:

```json
{
  "success": true,
  "count": 24,
  "students": []
}
```

### Approve Job

`PUT /api/admin/jobs/approve/:id`

Success response:

```json
{
  "success": true,
  "message": "Job approved successfully",
  "job": {
    "_id": "65f301...",
    "approvedByAdmin": true
  }
}
```

## Alumni

### Post Job

`POST /api/jobs`

Request body:

```json
{
  "title": "Frontend Developer",
  "company": "TCS",
  "location": "Pune",
  "salary": "8-10 LPA",
  "description": "React and API integration role",
  "skillsRequired": ["React", "JavaScript", "REST"]
}
```

Success response:

```json
{
  "success": true,
  "message": "Job created and sent for admin approval",
  "job": {
    "_id": "65f301...",
    "approvedByAdmin": false
  }
}
```

### Create Event

`POST /api/events`

Request body:

```json
{
  "title": "Career Guidance Session",
  "description": "Roadmap for placement prep",
  "date": "2026-04-10T14:00:00.000Z",
  "location": "Online",
  "eventType": "webinar"
}
```

Success response:

```json
{
  "success": true,
  "message": "Event created and sent for admin approval",
  "event": {
    "_id": "65f401...",
    "approvedByAdmin": false
  }
}
```

## Student

### Get Approved Jobs

`GET /api/jobs`

Success response:

```json
{
  "success": true,
  "count": 8,
  "jobs": []
}
```

### Apply for Job

`POST /api/jobs/apply`

Request body:

```json
{
  "jobId": "65f301...",
  "resume": "https://example.com/resume.pdf"
}
```

Success response:

```json
{
  "success": true,
  "message": "Job application submitted successfully",
  "application": {
    "_id": "65f501...",
    "status": "pending"
  }
}
```

### Register for Event

`POST /api/events/register`

Request body:

```json
{
  "eventId": "65f401..."
}
```

Success response:

```json
{
  "success": true,
  "message": "Event registration successful",
  "event": {
    "_id": "65f401..."
  }
}
```

### Request Mentorship

`POST /api/mentorship/request`

Request body:

```json
{
  "alumniId": "65f777...",
  "message": "Can you guide me for backend interviews?"
}
```

Success response:

```json
{
  "success": true,
  "message": "Mentorship request sent successfully",
  "mentorship": {
    "_id": "65f601...",
    "status": "pending"
  }
}
```

## Messages

### Send Message

`POST /api/messages/send`

Request body:

```json
{
  "receiverId": "65f777...",
  "message": "Hello sir, I wanted to discuss roadmap."
}
```

Success response:

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "_id": "65f701...",
    "sender": "65f12a...",
    "receiver": "65f777...",
    "message": "Hello sir, I wanted to discuss roadmap.",
    "timestamp": "2026-03-17T11:30:00.000Z"
  }
}
```

### Get Conversation

`GET /api/messages/:userId`

Success response:

```json
{
  "success": true,
  "count": 12,
  "messages": []
}
```

## Common Error Format

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```
