# 🚀 MployCraft

MployCraft is an AI-powered platform designed to streamline your job application process. Say goodbye to the tedious aspects of job hunting and hello to efficiency!

## ✨ Features

- 📝 **AI-Generated Cover Letters & Resumes** - Tailored specifically to match job descriptions
- 📊 **Job Application Tracker** - Stay organized throughout your job search 
- 📧 **Smart Cold Emailing** - Generate personalized outreach based on job descriptions and company profiles
- 🔄 **Real-time Updates** - Track your application status as it progresses

## 🌐 Live Demo

Check out the live application: [MployCraft](https://mploycraft.vercel.app/)

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth
- **AI Integration**: Gemini API
- **Caching**: Redis
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB account
- Gemini API key
- Redis instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pratyush2374/MployCraft.git
   cd MployCraft
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="your_mongodb_connection_string"
   NODE_ENV="development"
   EMAIL_USER="your_email_for_sending_notifications"
   EMAIL_PASS="your_email_password_or_app_password"
   GEMINI_API_KEY="your_gemini_api_key"
   REDIS_HOST="your_redis_host"
   REDIS_PASSWORD="your_redis_password"
   REDIS_USERNAME="your_redis_username"
   NEXT_PUBLIC_AES_SECRET="your_encryption_secret"
   NEXTAUTH_SECRET="your_nextauth_secret_key"
   URL="http://localhost:3000"  # Frontend URL for local development
   NEXT_URL="http://localhost:3000"  # Frontend URL for local development
   ```

4. Set up Prisma:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔄 Database Migrations

When you make changes to the Prisma schema:

```bash
# Generate migration
npx prisma migrate dev --name your_migration_name

# Apply migration
npx prisma migrate deploy

# Reset database (caution: this will delete all data)
npx prisma migrate reset
```

## 🧪 Testing

```bash
# Run tests
npm test
# or
yarn test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 📞 Contact

Pratyush - [Portfolio](https://pratyush2374.vercel.app)

Project Link: [https://github.com/pratyush2374/MployCraft](https://github.com/pratyush2374/MployCraft)