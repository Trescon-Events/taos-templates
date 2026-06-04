"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface KonfHubState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches /api/konfhub/<endpoint> and polls every `pollMs` milliseconds.
 * Cleans up the interval and aborts in-flight requests on unmount.
 */
export function useKonfHub<T = unknown>(
  endpoint: string,
  { pollMs = 30_000 }: { pollMs?: number } = {}
): KonfHubState<T> {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const abortRef              = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Abort any in-flight request before starting a new one
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`/api/konfhub/${endpoint}`, {
        signal: controller.signal,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const json: { data: T } = await res.json();
      setData(json.data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return; // unmounted — ignore
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    setLoading(true);
    fetchData();

    const interval = setInterval(fetchData, pollMs);

    return () => {
      clearInterval(interval);
      abortRef.current?.abort();
    };
  }, [fetchData, pollMs]);

  return { data, loading, error, refetch: fetchData };
}
