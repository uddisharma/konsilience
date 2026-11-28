---
status: draft
site: konsilience
cluster: "Cluster 2: AI-built app rescue"
order: 3
title: "What breaks when an AI-built app meets real users"
intent: "Pillar: problems"
cta: "Get a free app review"
cta_link: "/contact#book"
target_page: "/it-solutions"
blocked_by: "Before publishing: [VERIFY] items below, and the Phase 3 checks"
---
# What breaks when an AI-built app meets real users

Tools like Lovable, Bolt and Cursor can turn an idea into a working AI-built app in a day. That speed is real. The app usually fails in the same four places once real people use it: logins, payments, data access and secrets. This post is for founders and small teams who have an AI-built app with invited or paying users, or who are about to launch one.

## Why the demo looked fine

A demo runs one user, in one browser, with the test data the builder typed in. Nothing fails because the demo only follows the happy path. Real users sign up twice, share a computer, pay with a card that declines, and open URLs the interface never linked to. The gap between a demo and production is the gap between the happy path and everything else.

## Sessions break when the second user arrives

Generated code often keeps the login token in browser storage and trusts it without checking it on the server. [VERIFY: which generators do this by default, and in which versions]. Two things go wrong. Anyone who copies the token can act as that user. And logging out does not really log out, because the server still accepts the old token.

The fix is to keep sessions in httpOnly cookies that the server sets, and to check the user on every request that reads or changes data. The tradeoff: cookie sessions need more setup, especially when the frontend and the API run on different domains.

You can test this without any tools. Log in on two browsers. Log out in one of them, then refresh the other and try a page that loads your data. If the second browser still shows the data, sessions are not checked on the server. Next, copy the session token from the first browser's storage after logout and send it with a request. A request that still works means the old token is valid.

## Payments break at the webhook, not the button

The checkout button works. The failure happens after the payment. The customer pays, but the app never marks the order as paid. Or it marks the order paid twice, because the payment provider retried a request the app did not expect.

Generated code often confirms a payment when the browser returns to the site. That redirect can be skipped, faked or delayed. The reliable signal is the webhook the payment provider sends to your server. Your handler should verify the webhook signature before it changes anything, and it should handle the same event twice without side effects. Stripe documents both signature checks and retries [CHECK CURRENT: the current steps].

The tradeoff: webhooks need a public endpoint and a handler that can run more than once. That is more code than a redirect. It is also the code that protects your revenue.

## Data access is open by default

The problem we see most often is data that any logged-in user can read. A table has no row-level rules, so the database returns every row. Or an API route takes an ID from the URL and returns the record without checking who owns it. [VERIFY: how often we have found this in rescue work, and how many apps. Replace with our numbers or remove.]

The OWASP Top 10 lists broken access control as its top category [CHECK CURRENT: the current edition and its ranking]. You can test for it in ten minutes. Log in as user A and note the ID of one of A's records. Log in as user B and request that record by ID. If the request returns data, you have the problem.

Enforcing rules in the database, for example with row-level security in a Postgres-based platform, protects every route at once. It takes time to write and test, and it is easy to get subtly wrong, so test it with two real accounts.

## Secrets end up in the browser

Frontend code runs on the user's device, so anything in it is public. In Next.js, environment variables that start with `NEXT_PUBLIC_` are included in the browser bundle [CHECK CURRENT: confirm for the Next.js version you run]. Generated code often uses that prefix for keys that must stay private, such as a service-role database key or a payment secret key.

Check before launch. Search the built JavaScript for the value of every private key. If you find one, rotate the key, because it has already been public.

## What to check before real users arrive

This list is a checklist. Run the steps in order.

- Log in as two users. Confirm each sees only their own records, including when you change the ID in the URL or in the request.
- Log out, then reuse the old session token. The request should fail.
- Trigger a successful test payment and a failed one. Check the order status in the database after each. Replay the same webhook event and confirm nothing is charged or counted twice.
- Search the built frontend for every secret and service key. There should be none.
- Trigger an error on purpose. Users should see a plain message, not a stack trace or a database query.

## Fix it or rebuild it?

If the data model is sound and the problems sit in the login and payment layers, fix them in place. If records have no clear owner, or the app puts its business logic inside the page, rebuilding the backend usually costs less than patching every route. I think that is the right default, but the answer depends on the code, so a short review is the fastest way to decide.

The tradeoff: a rebuild takes longer and can change what users see. A fix keeps the interface but can leave the structure you will have to change again soon.

## The takeaway

Before launch, test the four places a demo never reaches: sessions, payments, data access and secrets. If one of them fails, fix it before you add users or traffic. [INTERNAL LINK: our app review or custom software service page]

---

## Sources to add

- OWASP Top 10: broken access control as the top category. Link the current edition.
- Stripe documentation: webhook signature verification, and how retries work. Link the page.
- Next.js documentation: `NEXT_PUBLIC_` environment variables are exposed to the browser. Link the page for the version we run.
- Any claim about default behaviour of Lovable, Bolt or Cursor. The draft describes this as a pattern, not a product fact.
- Our rescue experience: "the problem we see most often" needs our own numbers, or the sentence should be cut.

## [VERIFY] and [CHECK CURRENT] items

- [VERIFY] Which generators store login tokens in browser storage by default, and in which versions.
- [VERIFY] How often we have found open data access in rescue work. Replace with our figures or remove the sentence.
- [CHECK CURRENT] Stripe webhook steps.
- [CHECK CURRENT] The current OWASP Top 10 edition and ranking.
- [CHECK CURRENT] `NEXT_PUBLIC_` behaviour for the Next.js version we use.

## Meta description

AI-built apps usually fail in four places once real users arrive: logins, payments, data access and secrets. Here is what to test before launch.

(Count: 147 characters, under 155.)

## URL slug

`/blog/ai-built-app-breaks-with-real-users`

## Alternative titles

1. Why your AI-built app breaks when real users arrive
2. Logins, payments, data and secrets: what AI-built apps get wrong
3. Before launch: what an AI-built app gets wrong with real users

## Internal link spots

- `[INTERNAL LINK: custom software service page]` in the "Fix it or rebuild it?" section: `/services/saas-and-mvp-development`.
- `[INTERNAL LINK: security checklist for AI-generated apps]` in the secrets section.
- `[INTERNAL LINK: booking]` at the end, pointing to `/contact#book`.
