import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export default async function RoomPage() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/otp');
    }

    return (
      <main className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Investor Room</h1>
          <p className="text-gray-600">Welcome to your investor dashboard</p>
          <p className="text-sm text-gray-500 mt-4">Dashboard coming soon...</p>
        </div>
      </main>
    );
  } catch (error) {
    // If database is not set up, show a message
    console.error('Error loading room page:', error);
    return (
      <main className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Investor Room</h1>
          <p className="text-gray-600">Welcome to your investor dashboard</p>
          <p className="text-sm text-yellow-600 mt-4">
            Database not configured. Please set up your database connection.
          </p>
        </div>
      </main>
    );
  }
}

