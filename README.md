# AI Content Generator

A Next.js application that generates AI-powered content using Google's Gemini AI model with Supabase authentication and Drizzle ORM for database management.

## Features

- 🤖 **AI Content Generation** - Powered by Google Gemini AI
- 🔐 **Authentication** - Secure user authentication with Supabase
- 📝 **Template System** - Multiple content templates for different use cases
- 📊 **History Tracking** - View and manage your generated content history
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS and Framer Motion
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔒 **Protected Routes** - Secure dashboard with middleware protection

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL with Drizzle ORM
- **AI Model**: Google Gemini AI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Typography**: Outfit font family

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account
- A Google AI API key (for Gemini)
- A PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-content-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Copy `.env.example` to `.env.local` and fill in your credentials:
```env
# Database
NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_database_url_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Model (Google Gemini)
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
```

4. **Set up Supabase**
   - Create a new Supabase project
   - Configure authentication settings
   - Run the database setup SQL (see Migration Guide)

5. **Push database schema**
```bash
npm run db:push
```

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
ai-content-generator/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── content/         # Content generation pages
│   │   └── _components/     # Dashboard components
│   ├── (data)/             # Static data and templates
│   └── layout.tsx          # Root layout with AuthProvider
├── components/
│   └── ui/                 # Reusable UI components
├── lib/                    # Library configurations
│   ├── auth-context.tsx    # Authentication context
│   ├── supabase.ts         # Supabase client config
│   ├── supabase-server.ts  # Server-side Supabase
│   └── supabase-browser.ts # Browser-side Supabase
├── utils/                  # Utility functions
│   ├── db.tsx             # Database connection
│   ├── schema.tsx         # Database schema
│   └── AiModel.tsx        # AI model configuration
└── middleware.ts          # Route protection middleware
```

## Authentication

This application uses Supabase for authentication with the following features:

- Email/password authentication
- Email confirmation for new users
- Protected routes with middleware
- Automatic session management
- Custom sign-in/sign-up forms

### Migration from Clerk

If you're migrating from Clerk authentication, see the `MIGRATION_README.md` file for detailed instructions.

## Database Schema

The application uses two main tables:

- **users**: Stores user profile information
- **aiOutput**: Stores generated AI content with user associations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please create an issue in the repository or contact the development team.
