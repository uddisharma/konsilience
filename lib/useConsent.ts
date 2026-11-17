"use client";

import { useSyncExternalStore } from "react";
import { getConsentState, getServerConsentState, subscribeConsent, type ConsentState } from "./consent";

/** Current consent state; re-renders when the visitor changes their choice. */
export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribeConsent, getConsentState, getServerConsentState);
}
