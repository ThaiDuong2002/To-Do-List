# To-do List

To-do list server application

## Table of contents

- [Local](#local)
  - [Setup database](#setup-database)
  - [Setup Project](#setup-project)
- [Docker](#docker)
- [Database Schema](#database-schema)
- [Api Information](#api-information)
  - [Task Services](#task-services)
  - [Dependency Services](#dependency-services)
  - [Notification Services](#notification-services)

## Local

### Setup database:

#### Step 01: Run docker command:

```bash
docker run -p 3306:3306 --name tododb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=tododb -d mysql:8.0
```

#### Step 02: Create Table

See [here](#database-schema).

### Setup Project

#### Step 01: Create .env file at root of project and copy these variables to it.

```bash
PORT=3000

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=tododb
MYSQL_PORT=3306

SCHEDULER_CONFIG="* * * * *"

# SCHEDULER_CONFIG="* * * * * *" // every second.
# SCHEDULER_CONFIG="* * * * *" // every minute.
# SCHEDULER_CONFIG="0 * * * *" // every hour.
# SCHEDULER_CONFIG="0 0 * * *" // every day.
```

#### Step 02: Install packages

```bash
npm install
```

#### Step 03: Build project

```bash
npm run build
```

#### Step 04: Run project

```bash
npm run start
```

## Docker

#### Step 01: Install packages

```bash
npm install
```

#### Step 02: Build project

```bash
npm run build
```

#### Step 03: Run docker compose:

```bash
docker-compose up --build
```

#### Step 04: Create database table

See [here](#database-schema).

## Database Schema

```bash
CREATE TABLE Tasks (
    TaskID CHAR(36) PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    DueDate DATE,
    Priority ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
    Status ENUM('Pending', 'In Progress', 'Completed') NOT NULL DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Dependencies (
    DependencyID CHAR(36) PRIMARY KEY,
    TaskID CHAR(36) NOT NULL,
    DependsOnTaskID CHAR(36) NOT NULL,
    FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID) ON DELETE CASCADE,
    FOREIGN KEY (DependsOnTaskID) REFERENCES Tasks(TaskID) ON DELETE CASCADE,
    UNIQUE (TaskID, DependsOnTaskID)
);

CREATE TABLE Notifications (
    NotificationID CHAR(36) PRIMARY KEY,
    TaskID CHAR(36) NOT NULL,
    NotificationType ENUM('Upcoming', 'Overdue') NOT NULL,
    Message TEXT NOT NULL,
    NotifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID) ON DELETE CASCADE
);


CREATE INDEX idx_status ON Tasks (Status);
CREATE INDEX idx_priority ON Tasks (Priority);
```

## Api Information

### Task Services

#### 1. Create Task:

```bash
# POST
http://localhost:3000/api/v1/tasks
```

```bash
title: required
description: optional
dueDate: required
priority: optional ("Low", "Medium", "High")
statusL optional ("Pending", "In Progress", "Completed")
```

```bash
# Body
{
    "title": "Task A",
    "description": "Task A description",
    "dueDate": "2025-03-22",
    "priority": "Medium",
    "status" : "Pending"
}
```

#### 2. Update Task:

```bash
# PUT
http://localhost:3000/api/v1/tasks/:id
```

```bash
title: optional
description: optional
dueDate: optional
priority: optional ("Low", "Medium", "High")
status: optional ("Pending", "In Progress", "Completed")
```

```bash
# Body
{
    "title": "Task B",
    "description": "Task B description",
    "dueDate": "2025-03-22",
    "priority": "Medium",
    "status": "Completed"
}
```

#### 3. Update Status Only

```bash
# PATCH
http://localhost:3000/api/v1/tasks/:id
```

```bash
status: required ("Pending", "In Progress", "Completed")
```

```bash
{
  "status": "Completed"
}
```

#### 4. Delete Task:

```bash
# DELETE
http://localhost:3000/api/v1/tasks/:id
```

#### 5. Get Task:

```bash
# GET
http://localhost:3000/api/v1/tasks/:id
```

#### 6. Get All Task:

```bash
limit: number
page: number
priority: 'Low', 'Medium', 'High'
status: 'Pending', 'In Progress', 'Completed'
```

```bash
# GET
http://localhost:3000/api/v1/tasks?limit=10&page=1&priority=Medium&status=Pending
```

### Dependency Services

#### 1. Create Dependency:

```bash
# GET
http://localhost:3000/api/v1/tasks/:taskId/dependencies
```

```bash
dependsOnTaskId: required
```

```bash
{
    "dependsOnTaskId": "a226cfb1-b78a-43e8-a917-e185b6b53275"
}
```

#### 2. Delete Dependency:

```bash
# DELETE
http://localhost:3000/api/v1/tasks/:taskId/dependencies/:dependsOnTaskId
```

#### 2. Get All Dependencies of Task:

```bash
# GET
http://localhost:3000/api/v1/tasks/:taskId/dependencies
```

### Notification Services

#### 1. Get Notifications

```bash
limit: number
page: number
type: "Upcoming" or "Overdue"
```

```bash
http://localhost:3000/api/v1/notifications?limit=10&page=1&type="Upcoming"
```
