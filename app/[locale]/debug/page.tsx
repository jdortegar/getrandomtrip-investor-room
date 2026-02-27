'use client';

import { useCallback, useState } from 'react';

/**
 * Auth debug page for production when you have no server logs.
 * Visit /en/debug or /es/debug after attempting login to see session + hints.
 * Remove or protect this page once debugging is done.
 */
export default function DebugAuthPage() {
  const [sessionResult, setSessionResult] = useState<string | null>(null);
  const [debugResult, setDebugResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(async () => {
    setLoading(true);
    setSessionResult(null);
    setDebugResult(null);
    try {
      const [sessionRes, debugRes] = await Promise.all([
        fetch('/api/auth/session'),
        fetch('/api/debug-auth'),
      ]);
      const sessionJson = await sessionRes.json();
      const debugJson = await debugRes.json();
      setSessionResult(JSON.stringify(sessionJson, null, 2));
      setDebugResult(JSON.stringify(debugJson, null, 2));
    } catch (e) {
      setSessionResult(String(e));
      setDebugResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-8 font-mono text-sm">
      <h1 className="text-xl font-bold">Auth debug (no server logs)</h1>
      <p className="text-muted-foreground">
        Run this after attempting admin login. Check session (empty = problem) and hints below.
      </p>
      <button
        className="rounded bg-primary px-4 py-2 text-primary-foreground"
        disabled={loading}
        onClick={run}
        type="button"
      >
        {loading ? 'Loading…' : 'Fetch session + debug hints'}
      </button>
      {sessionResult !== null && (
        <div className="space-y-2">
          <h2 className="font-semibold">GET /api/auth/session</h2>
          <pre className="overflow-auto rounded border bg-muted p-4">
            {sessionResult}
          </pre>
          {sessionResult.trim() === '{}' ? (
            <p className="text-destructive">Session is empty — cookie not set or not sent.</p>
          ) : (
            <p className="text-green-600">Session present.</p>
          )}
        </div>
      )}
      {debugResult !== null && (
        <div className="space-y-2">
          <h2 className="font-semibold">GET /api/debug-auth (hints)</h2>
          <pre className="overflow-auto rounded border bg-muted p-4">
            {debugResult}
          </pre>
        </div>
      )}
    </div>
  );
}
