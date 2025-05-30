# Real-time Chat Application 💬

A **full-stack real-time chat application** built with **React**, **NestJS**, and **GraphQL**, featuring real-time messaging, file sharing, and modern UI components.

## 🔍 Description

This project is a modern chat application that supports real-time messaging, file uploads, and user authentication. It's built with a robust tech stack and follows best practices for scalability and maintainability. The project is split into two main parts:

- **Client**: Built with **React**, **Vite**, and **Mantine UI**
- **Server**: Built with **NestJS** and **GraphQL**

## 📁 Project Structure

```
.
├── client/   # React frontend (Vite)
└── server/   # NestJS backend
```

## 🚀 Features

- **Real-time messaging** with GraphQL Subscriptions
- **File uploads** with drag-and-drop support
- **Modern UI** with Mantine UI components
- **Type-safe** with TypeScript
- **Authentication** with JWT
- **Database** with Prisma ORM
- **GraphQL API** with Apollo Server

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **Vite 6**
- **Mantine UI 6**
- **Apollo Client**
- **GraphQL**
- **Zustand** (state management)
- **React Router DOM 7**
- **TypeScript**

### Backend

- **NestJS 11**
- **GraphQL** with Apollo Server
- **Prisma** (database ORM)
- **JWT** for authentication
- **WebSocket** for real-time features
- **TypeScript**

## ⚙️ Installation

### 1. Clone the Repo

```bash
git clone https://github.com/andrew-dev-p/nest-react-graphql-chat-app
cd nest-react-graphql-chat-app
```

### 2. Setup Client

```bash
cd client
npm install
```

### 3. Setup Server

```bash
cd ../server
npm install
```

## 🧪 Running Locally

### Client

```bash
cd client
npm run dev
```

### Server

```bash
cd server
npm run start:dev
```

## 🔐 Environment Variables

### 🔧 Server (`server/.env`)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/chat_db"
REFRESH_TOKEN_SECRET=refresh-token-secret
ACCESS_TOKEN_SECRET=access-token-secret
API_URL=http://localhost:3000
IMAGE_PATH=/images
```
