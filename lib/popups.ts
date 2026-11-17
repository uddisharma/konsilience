// Coordination between the home page's timed contact modal and the booking/chat widgets:
// once a visitor has opened the booking popup or started a chat, the modal stays closed.

export const CONTACT_MODAL_DISMISSED_KEY = "contact_modal_dismissed";

/** Stop the timed contact modal from opening for the rest of this browser session. */
export function suppressContactModal(): void {
  try {
    sessionStorage.setItem(CONTACT_MODAL_DISMISSED_KEY, "true");
  } catch {
    // Storage can be blocked (private mode, strict settings); the modal then behaves as before.
  }
}

/** True when the modal was dismissed, or a booking/chat already happened, this session. */
export function isContactModalSuppressed(): boolean {
  try {
    return sessionStorage.getItem(CONTACT_MODAL_DISMISSED_KEY) !== null;
  } catch {
    return false;
  }
}
