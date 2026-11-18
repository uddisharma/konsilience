/* The platforms a post can be cross-posted to. Safe to import from client code: no secrets here. */

export const PLATFORMS = ["devto", "hashnode", "bluesky", "tumblr"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const PLATFORM_LABELS: Record<Platform, string> = {
  devto: "dev.to",
  hashnode: "Hashnode",
  bluesky: "Bluesky",
  tumblr: "Tumblr",
};

/** The environment variables each platform needs. A platform with any of these missing is "not configured". */
export const PLATFORM_ENV: Record<Platform, readonly string[]> = {
  devto: ["DEVTO_API_KEY"],
  hashnode: ["HASHNODE_PAT", "HASHNODE_PUBLICATION_ID"],
  bluesky: ["BLUESKY_IDENTIFIER", "BLUESKY_APP_PASSWORD"],
  tumblr: ["TUMBLR_CONSUMER_KEY", "TUMBLR_CONSUMER_SECRET", "TUMBLR_OAUTH_TOKEN", "TUMBLR_OAUTH_TOKEN_SECRET", "TUMBLR_BLOG"],
};
