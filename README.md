# Pixslash Wallpaper Platform

Pixslash is a full-stack wallpaper community built with Next.js. Visitors can browse public wallpapers and categories, while registered users can upload wallpapers, manage their profile, like posts, save posts, and review their own activity from a protected dashboard.

## Features

* Public wallpaper browsing with responsive masonry-style cards.
* Category-based wallpaper discovery and individual wallpaper pages.
* Credential authentication and Google/Facebook OAuth through Better Auth.
* Protected user dashboard with overview, uploads, saved wallpapers, likes, downloads, and profile management pages.
* Wallpaper uploads with title and category validation, a 10 MB limit, and PNG, JPEG, and WebP validation through Sharp.
* Wallpaper metadata including dimensions, file size, format, creator, and creation date.
* Like and save actions for authenticated users.
* Profile picture uploads with resizing, a 5 MB limit, and PNG, JPEG, and WebP validation.
* Dark theme support using `next-themes`.

## Tech Stack

* Next.js 16.2 with the App Router and Turbopack
* React 19.2 and TypeScript
* Tailwind CSS v4 and shadcn/ui components using Base UI primitives
* Prisma 7 with the `@prisma/adapter-libsql` SQLite adapter
* Better Auth for sessions, credentials, OAuth, and account administration
* Zod and React Hook Form for form validation
* Sharp for server-side image metadata and processing
* Bun as the primary package manager

## Requirements

* Node.js 24 or newer
* npm 11 or newer, or Bun
* Google and Facebook OAuth application credentials

The project uses a file-backed SQLite database and local filesystem storage. Uploaded wallpapers are written to `public/wallpapers/`, and profile pictures are written to `public/user/profilepicture/`.

This is convenient for local development, but production deployments should use persistent storage or an object-storage integration.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/MrAbhijitSaha/pixslash-wallpaper-platform.git
cd pixslash-wallpaper-platform
```

### 2. Install dependencies

```bash
bun install
```

The package manifest also supports npm, but Bun is the documented and tested workflow for this repository.

### 3. Configure environment variables

Create a local environment file from the committed template:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Update `.env` with real values.

Server-side variables are validated by the `serverEnv` schema, while `NEXT_PUBLIC_BETTER_AUTH_URL` is validated by the `clientEnv` schema.

| Variable                      | Purpose                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| `DATABASE_URL`                | SQLite URL; it must start with `file:./`                       |
| `BETTER_AUTH_SECRET`          | At least 32 characters; used to sign auth data                 |
| `BETTER_AUTH_URL`             | Server URL, such as `http://localhost:3000`                    |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Optional client-side auth base URL                             |
| `GOOGLE_CLIENT_ID`            | Google OAuth client ID ending in `.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET`        | Google OAuth client secret                                     |
| `FACEBOOK_CLIENT_ID`          | Facebook OAuth client ID                                       |
| `FACEBOOK_CLIENT_SECRET`      | Facebook OAuth client secret                                   |
| `PASSWORD_HASH_SECRET`        | At least 32 characters for password hashing                    |
| `CHECKPOINT_DISABLE`          | Optional Prisma telemetry setting; use `1` to disable          |
| `BETTER_AUTH_TELEMETRY`       | Optional Better Auth telemetry setting; use `0` to disable     |

For local development, the default database value is:

```env
DATABASE_URL=file:./prisma/dev.db
```

The Google and Facebook variables are required by the environment schema even when OAuth is not being actively tested. Use valid development credentials or the values expected by your local auth configuration.

### 4. Prepare and seed the database

Run the Prisma migration and seed commands:

```bash
bun migrate
bun seed
```

`bun migrate` runs Prisma migrations and regenerates the Prisma client.

`bun seed` creates the default categories:

* Nature
* Technology
* Gaming
* Cars
* Anime
* Space
* Architecture
* Abstract
* Minimal
* Animals

### 5. Start the development server

```bash
bun dev
```

Open http://localhost:3000 in a browser.

## Useful Commands

| Command         | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| `bun dev`       | Start the Next.js development server                        |
| `bun lint`      | Run ESLint                                                  |
| `bun run build` | Generate the Prisma client and create a production build    |
| `bun start`     | Start a previously built production server                  |
| `bun migrate`   | Run Prisma development migrations and regenerate the client |
| `bun seed`      | Seed the default wallpaper categories                       |
| `bun studio`    | Start Prisma Studio without opening a browser               |
| `bun prod`      | Run Prisma generation, linting, build, and production start |

There is no separate test framework or `typecheck` script in the repository. TypeScript errors are surfaced during `bun run build`.

## Routes

### Public Routes

Public routes are available without authentication:

* `/wallpapers` — browse public wallpapers
* `/categories` — browse categories
* `/photo/[slug]` — view one public wallpaper
* `/login` — authentication page
* `/register` — account registration page

### Authenticated Routes

The following routes require an authenticated user:

* `/overview` — account activity and statistics
* `/myposts` — the current user's wallpapers
* `/upload` — upload a wallpaper
* `/saved` — saved wallpapers
* `/likes` — liked wallpapers
* `/downloads` — download activity view
* `/profile/[userId]` — profile management

Unauthenticated access to the private route group redirects to `/login`.

## Project Structure

```text
prisma/                   Prisma schema, migrations, and seed script
public/wallpapers/        Uploaded wallpaper files
public/user/              Uploaded profile pictures
src/app/(public)/         Public App Router pages
src/app/(private)/        Authenticated App Router pages
src/app/api/auth/         Better Auth API handler
src/components/           UI, forms, cards, headers, and dashboard components
src/lib/                  Auth, database, environment, validation, and types
src/server/               Server actions for uploads, profiles, likes, and saves
```

## Storage

Pixslash currently uses local filesystem storage for uploaded images.

Wallpaper files are stored in:

```text
public/wallpapers/
```

Profile pictures are stored in:

```text
public/user/profilepicture/
```

This approach is suitable for local development and environments with persistent disk storage.

For production deployments using ephemeral filesystems, uploaded files should be moved to persistent storage or an object-storage service.

## Image Upload Validation

Wallpaper uploads are validated on the server using Sharp.

Supported formats:

* PNG
* JPEG
* WebP

Maximum wallpaper file size:

```text
10 MB
```

Wallpaper metadata includes:

* Dimensions
* File size
* Image format
* Creator
* Creation date

Profile picture uploads are also processed server-side.

Supported profile picture formats:

* PNG
* JPEG
* WebP

Maximum profile picture file size:

```text
5 MB
```

Profile pictures are resized before being stored.

## Authentication

Pixslash uses Better Auth for authentication and account management.

Supported authentication methods include:

* Email/password credentials
* Google OAuth
* Facebook OAuth

Authenticated users can access the protected dashboard and perform actions such as:

* Uploading wallpapers
* Managing their profile
* Liking wallpapers
* Saving wallpapers
* Viewing their uploads
* Reviewing saved wallpapers
* Reviewing liked wallpapers
* Reviewing download activity

## Notes

* The SQLite URL is configured in `prisma.config.ts`; it is intentionally not declared in `prisma/schema.prisma`.
* Do not edit files under `generated/` by hand. They are generated by Prisma.
* Do not commit `.env` or uploaded user files.
* Secrets belong only in local or deployment environment configuration.
* Wallpaper and profile image paths are local filesystem paths, so persistence must be considered before deploying to an ephemeral hosting environment.
* `bun run build` should be used to execute the project's `build` script rather than Bun's native `bun build` bundler command.

## Licence

This project is licensed under the MIT licence. See [LICENSE](LICENSE).
