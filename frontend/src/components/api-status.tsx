"use client";

import { RefreshCw } from "lucide-react";
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
    if (error instanceof DOMException && error.name === "AbortError") return null;
    return "unavailable";
  }
}

export function ApiStatus() {
  const [state, setState] = useState<ApiState>("checking");

  useEffect(() => {
    const controller = new AbortController();
    void resolveApiState(controller.signal).then((nextState) => {
      if (nextState !== null) setState(nextState);
    });
    return () => controller.abort();
  }, []);

  function retry() {
    setState("checking");
    void resolveApiState().then((nextState) => {
      if (nextState !== null) setState(nextState);
    });
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Local API</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full status-${state}`} />
            <span aria-live="polite" className="text-xs font-medium text-slate-300">{statusCopy[state]}</span>
          </div>
        </div>
        {state === "unavailable" ? <button type="button" onClick={retry} className="rounded-md p-2 text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400" aria-label="Retry local API health check"><RefreshCw aria-hidden="true" size={14} /></button> : null}
      </div>
    </div>
  );
}
