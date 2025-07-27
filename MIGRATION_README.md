# Migration from Clerk to Supabase Authentication

This document outlines the migration from Clerk authentication to Supabase authentication in the AI Content Generator project.

## Changes Made

### 1. Dependencies
- **Removed**: `@clerk/elements`, `@clerk/nextjs`
- **Added**: `@supabase/supabase-js`, `@supabase/ssr`

### 2. Authentication Setup

#### Supabase Configuration Files
- `lib/supabase.ts` - Main Supabase client configuration
- `lib/supabase-server.ts` - Server-side Supabase client for SSR
- `lib/supabase-browser.ts` - Browser-side Supabase client
- `lib/auth-context.tsx` - React context for authentication state management

#### Environment Variables
Update your `.env.local` file with Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Schema Updates

#### New Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    full_name VARCHAR,
    avatar_url VARCHAR,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Updated AIOutput Table
The `createdBy` field now stores the user's email address instead of Clerk's user ID.

### 4. Component Updates

#### Authentication Pages
- `app/(auth)/sign-in/page.tsx` - Custom sign-in form with Supabase
- `app/(auth)/sign-up/page.tsx` - Custom sign-up form with Supabase
- Removed Clerk's `[[...sign-in]]` and `[[...sign-up]]` dynamic routes

#### User Interface
- `components/ui/user-button.tsx` - Custom user button component replacing Clerk's UserButton
- Updated dashboard components to use `useAuth()` hook instead of `useUser()`

#### Middleware
- `middleware.ts` - Updated to use Supabase authentication for route protection

### 5. Authentication Flow

#### Before (Clerk)
```tsx
import { useUser } from '@clerk/nextjs'
const { user } = useUser()
const userEmail = user?.primaryEmailAddress?.emailAddress
```

#### After (Supabase)
```tsx
import { useAuth } from '@/lib/auth-context'
const { user } = useAuth()
const userEmail = user?.email
```

## Setup Instructions

### 1. Create Supabase Project
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API

### 2. Configure Authentication
1. In Supabase dashboard, go to Authentication > Settings
2. Configure your site URL and redirect URLs
3. Enable email authentication
4. Optionally configure other providers (Google, GitHub, etc.)

### 3. Set Up Database
1. Run the database migrations to create the users table:
```sql
-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Create trigger to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 4. Update Environment Variables
Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

### 5. Install Dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Features

### Authentication Features
- ✅ Email/Password authentication
- ✅ User registration with email confirmation
- ✅ Secure session management
- ✅ Automatic redirect on authentication state change
- ✅ Protected routes with middleware
- ✅ User profile management

### UI Features
- ✅ Custom sign-in/sign-up forms with animations
- ✅ User dropdown with profile info and sign-out
- ✅ Error handling and loading states
- ✅ Responsive design

## Migration Benefits

1. **Cost**: Supabase offers more generous free tiers compared to Clerk
2. **Control**: Full control over authentication logic and user data
3. **Integration**: Better integration with PostgreSQL database
4. **Flexibility**: Easier to customize authentication flows
5. **Open Source**: Supabase is open source and self-hostable

## Considerations

1. **Email Templates**: You may want to customize Supabase email templates
2. **Social Providers**: If you need social authentication, configure providers in Supabase
3. **User Roles**: Implement role-based access control if needed
4. **Security**: Review and configure Row Level Security policies

## Testing the Migration

1. Start the development server: `npm run dev`
2. Navigate to `/sign-up` to create a new account
3. Check your email for confirmation
4. Sign in at `/sign-in`
5. Verify protected routes work correctly
6. Test sign-out functionality

The migration is now complete! Your application should work seamlessly with Supabase authentication.