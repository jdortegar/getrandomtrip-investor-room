# Fix: Database Permissions Error

**Error:** `User 'user' was denied access on the database 'investor_room.public'`

This means your database user doesn't have the necessary permissions to access the database.

---

## 🔧 Quick Fix

### Option 1: Fix Database User Permissions (Recommended)

1. **Connect to your PostgreSQL database as a superuser:**
   ```bash
   psql -U postgres -d postgres
   # Or if using a different superuser:
   psql -U your_admin_user -d postgres
   ```

2. **Grant permissions to your database user:**
   ```sql
   -- Grant all privileges on the database
   GRANT ALL PRIVILEGES ON DATABASE investor_room TO your_user;
   
   -- Grant schema permissions
   \c investor_room
   GRANT ALL ON SCHEMA public TO your_user;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;
   
   -- Grant permissions on future tables
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO your_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO your_user;
   ```

3. **Exit psql:**
   ```sql
   \q
   ```

---

### Option 2: Use a Superuser in DATABASE_URL (Development Only)

**⚠️ Warning:** Only use this for local development, never in production!

Update your `.env.local`:

```env
# Use postgres superuser (development only!)
DATABASE_URL="postgresql://postgres:password@localhost:5432/investor_room"
```

---

### Option 3: Create Database and User (If Starting Fresh)

1. **Connect as superuser:**
   ```bash
   psql -U postgres
   ```

2. **Create database and user:**
   ```sql
   -- Create database
   CREATE DATABASE investor_room;
   
   -- Create user
   CREATE USER investor_user WITH PASSWORD 'your_secure_password';
   
   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE investor_room TO investor_user;
   
   -- Connect to the database
   \c investor_room
   
   -- Grant schema permissions
   GRANT ALL ON SCHEMA public TO investor_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO investor_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO investor_user;
   ```

3. **Update `.env.local`:**
   ```env
   DATABASE_URL="postgresql://investor_user:your_secure_password@localhost:5432/investor_room"
   ```

---

## 📝 Check Your Current DATABASE_URL

Your `.env.local` should look like:

```env
DATABASE_URL="postgresql://username:password@host:port/database_name"
```

**Common issues:**
- ❌ Wrong username
- ❌ Wrong password
- ❌ Database doesn't exist
- ❌ User doesn't have permissions

---

## 🗄️ Run Migrations

After fixing permissions, run Prisma migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init
```

This will create all the tables needed for NextAuth and your Investor Room models.

---

## ✅ Verify Setup

1. **Test database connection:**
   ```bash
   npx prisma db pull
   ```

2. **Open Prisma Studio to view database:**
   ```bash
   npx prisma studio
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

---

## 🔍 Troubleshooting

### Issue: "database does not exist"

**Solution:**
```sql
CREATE DATABASE investor_room;
```

### Issue: "role does not exist"

**Solution:**
```sql
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE investor_room TO your_user;
```

### Issue: "permission denied for schema public"

**Solution:**
```sql
\c investor_room
GRANT ALL ON SCHEMA public TO your_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
```

### Issue: Using Supabase/Neon/Other Cloud Database

**For Supabase:**
- Use the connection string from Supabase Dashboard
- The user should already have proper permissions
- Make sure you're using the correct connection pooler URL

**For Neon:**
- Use the connection string from Neon Dashboard
- Ensure you're using the correct branch/database

---

## 📚 Next Steps

After fixing permissions:

1. ✅ Run migrations: `npx prisma migrate dev`
2. ✅ Test authentication flow
3. ✅ Verify tables are created in Prisma Studio

---

**Last Updated:** 2025-01-XX

