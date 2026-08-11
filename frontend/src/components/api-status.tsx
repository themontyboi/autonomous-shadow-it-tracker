"use client";

import { useEffect, useState } from "react";

import { getHealth } from "@/lib/api";

type ApiState = "checking" | "connected" | "unavailable";

const statusCopy: Record<ApiState, string> = {
  checking: "Checking",
  connected: "Connected",
  unavailable: "Unavailable",
};

async function resolveApiState(signal?: AbortSignal): Promise<ApiState | null> {
  try {
    await getHealth(signal);
    return "connected";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return null;
    }
    return "unavailable";
  }
}

export function ApiStatus() {
  const [state, setState] = useState<ApiState>("checking");

  useEffect(() => {
    const controller = new AbortController();
    void resolveApiState(controller.signal).then((nextState) => {
      if (nextState !== null) {
        setState(nextState);
      }
    });
    return () => controller.abort();
  }, []);

  return (
    <div className="flex items-center justify-between gap-6 border-t border-slate-200 py-5">
      <div>
        <p className="font-medium text-slate-950">Backend API</p>
        <p className="mt-1 text-sm text-slate-500">FastAPI health endpoint</p>
      </div>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`h-2.5 w-2.5 rounded-full status-${state}`}
        />
        <span aria-live="polite" className="text-sm font-semibold text-slate-700">
          {statusCopy[state]}
        </span>
        {state === "unavailable" ? (
          <button
            className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            onClick={() => {
              setState("checking");
              void resolveApiState().then((nextState) => {
                if (nextState !== null) {
                  setState(nextState);
                }
              });
            }}
            type="button"
          >
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}
