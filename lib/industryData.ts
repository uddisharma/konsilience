export type ChallengeItem = {
  title: string;
  text: string;
};

export type IndustryFaq = {
  q: string;
  a: string;
};

export type IndustryDetailData = {
  challenges: ChallengeItem[];
  faqs: IndustryFaq[];
  solutionsDescription?: Record<string, string>;
};

export const industryData: Record<string, IndustryDetailData> = {
  healthcare: {
    challenges: [
      { title: "HIPAA & Data Privacy", text: "Strict regulatory requirements mandating end-to-end PHI encryption, audit logging, and signed BAAs." },
      { title: "EHR / EMR Fragmentation", text: "Legacy clinical systems operating on incompatible data silos without native FHIR or HL7 interfaces." },
      { title: "Provider Workflow Burden", text: "Clinicians spending excessive time on repetitive charting rather than direct patient consultation." },
      { title: "Patient Engagement Friction", text: "Complex portals and low telehealth adoption due to unintuitive mobile interfaces." },
    ],
    faqs: [
      {
        q: "How do you ensure HIPAA compliance in healthcare applications?",
        a: "We sign Business Associate Agreements (BAAs), implement AES-256 encryption at rest and TLS 1.3 in transit, mandate granular role-based access controls, and log immutable access audit trails for all Protected Health Information (PHI).",
      },
      {
        q: "Can you integrate with existing EHR systems like Epic, Cerner, and Athenahealth?",
        a: "Yes. We engineer integrations using modern HL7 FHIR APIs, SMART on FHIR protocols, and custom HL7 v2 interface engines for legacy systems.",
      },
      {
        q: "What security measures protect telehealth video consultations?",
        a: "We implement peer-to-peer WebRTC video streams with end-to-end SRTP encryption, zero media recording without explicit patient consent, and secure tokenized waiting rooms.",
      },
      {
        q: "Do you build Remote Patient Monitoring (RPM) companion apps?",
        a: "Yes. We build Bluetooth Low Energy (BLE) companion apps that ingest vitals from FDA-cleared blood pressure cuffs, glucometers, and pulse oximeters, alerting care teams to out-of-range readings.",
      },
    ],
  },
  finance: {
    challenges: [
      { title: "Stringent Compliance Mandates", text: "Navigating strict regulatory landscapes including PCI-DSS Level 1, SOC 2 Type II, KYC/AML, and GLBA." },
      { title: "Real-Time Fraud & Abuse", text: "Sophisticated credential stuffing, synthetic identity theft, and account takeover attacks." },
      { title: "Legacy Core Banking Anchors", text: "Outdated mainframe cores that struggle to support sub-second mobile payment rails." },
      { title: "Consumer Expectation of Immediacy", text: "Demands for instant peer-to-peer transfers, biometric logins, and intuitive portfolio analytics." },
    ],
    faqs: [
      {
        q: "How do you manage PCI-DSS compliance in FinTech platforms?",
        a: "We employ tokenization gateways and hosted fields (via Stripe, Adyen, or Plaid) so raw payment card numbers never touch your application servers or persistent databases.",
      },
      {
        q: "How do you prevent transaction fraud in real-time banking apps?",
        a: "We integrate sub-second fraud detection pipelines analyzing device fingerprints, IP velocity, behavioral biometrics, and machine learning risk scoring before authorizing withdrawals.",
      },
      {
        q: "Can you connect with Open Banking APIs and Core Banking engines?",
        a: "Yes. We interface with Plaid, MX, and Yodlee for account aggregation, and integrate with cloud-native banking cores such as Mambu and Thought Machine.",
      },
      {
        q: "How is financial ledger data protected against accidental loss or tampering?",
        a: "We use immutable, double-entry ledger architectures with strict cryptographic hashing and idempotency keys to ensure mathematical consistency and zero ledger drift.",
      },
    ],
  },
  "retail-and-ecommerce": {
    challenges: [
      { title: "Inventory Desynchronization", text: "Discrepancies between physical warehouse stock, store shelves, and online checkout systems leading to overselling." },
      { title: "Peak Traffic Flash Spikes", text: "Black Friday and promotional traffic surges crashing checkout funnels and database connections." },
      { title: "Rising Customer Acquisition Costs", text: "Difficulty in retaining shoppers without hyper-personalized recommendations and frictionless loyalty rewards." },
      { title: "Headless Architecture Complexity", text: "Integrating disparate CMS, PIM, ERP, and payment systems into one cohesive customer experience." },
    ],
    faqs: [
      {
        q: "Why should we migrate to a Headless Commerce architecture?",
        a: "Headless commerce decouples your frontend customer experience from backend commerce engines (Shopify Plus, commercetools). This unlocks sub-second page loads, limitless design flexibility, and unified checkout across web, mobile, and in-store kiosks.",
      },
      {
        q: "How do you handle flash sales and Black Friday traffic spikes?",
        a: "We utilize serverless edge computing, static asset pre-rendering, distributed Redis caching, and asynchronous queue workers for order placement to absorb massive traffic surges without degradation.",
      },
      {
        q: "Can you synchronize inventory in real time across multiple warehouses?",
        a: "Yes. We build event-driven inventory synchronization layers that reserve stock atomically during checkout and update POS, ERP, and warehouse management systems via webhooks.",
      },
      {
        q: "How do personalized AI recommendation engines work on your platforms?",
        a: "We train collaborative filtering and vector-based embedding models on browsing and order histories, displaying contextual cross-sells and personalized bundles that increase Average Order Value (AOV).",
      },
    ],
  },
  logistics: {
    challenges: [
      { title: "Unoptimized Fleet Routing", text: "Excessive fuel waste and driver overtime caused by static routes that ignore real-time traffic and delivery windows." },
      { title: "Blind Spots in Freight Visibility", text: "Shippers and end customers left without real-time GPS tracking or proactive delay notifications." },
      { title: "Paper-Heavy Warehouse Operations", text: "Manual pen-and-paper pick-and-pack workflows creating high picking error rates and sluggish order turnaround." },
      { title: "ELD & Cold-Chain Compliance", text: "Stringent electronic logging device (ELD) mandates and temperature monitoring requirements for perishable cargo." },
    ],
    faqs: [
      {
        q: "How does your route optimization software reduce fleet mileage?",
        a: "We implement dynamic vehicle routing problem (VRP) algorithms that factor in real-time traffic, delivery time windows, vehicle cargo capacities, and driver hours-of-service, typically cutting total fleet mileage by 15% to 25%.",
      },
      {
        q: "Can your logistics platforms integrate with onboard telematics and GPS hardware?",
        a: "Yes. We ingest high-frequency telemetry via MQTT from Geotab, Samsara, and OBD-II hardware, giving dispatchers live vehicle status, engine diagnostics, and driver safety scoring.",
      },
      {
        q: "How do you automate warehouse picking and inventory management?",
        a: "We develop barcode and RFID-scanning mobile companion apps with wave picking logic, optimal path navigation, and real-time ERP inventory reconciliation.",
      },
      {
        q: "Do your platforms support Electronic Proof of Delivery (ePOD)?",
        a: "Yes. Drivers capture digital signatures, geofenced timestamps, photo evidence of package placement, and barcoded delivery confirmation directly from their mobile devices.",
      },
    ],
  },
  education: {
    challenges: [
      { title: "Low Learner Completion Rates", text: "Static video lectures and passive reading materials resulting in disengaged students and high drop-out rates." },
      { title: "Institutional LMS Silos", text: "Inflexible legacy Learning Management Systems (LMS) that resist third-party tool integration." },
      { title: "Scalability During Assessment Spikes", text: "System crashes when thousands of students submit synchronized online exams simultaneously." },
      { title: "Student Privacy (FERPA / COPPA)", text: "Strict legal penalties for improper handling of student academic records and minor data." },
    ],
    faqs: [
      {
        q: "Are your educational platforms compliant with FERPA and COPPA?",
        a: "Yes. We implement strict role-based data partitioning, student consent workflows, automated PII redaction, and certified compliance controls required by school districts and universities.",
      },
      {
        q: "Do you support Learning Tools Interoperability (LTI) standards?",
        a: "Yes. We engineer LTI 1.3 and LTI Advantage compliant tools that plug directly into Canvas, Blackboard, Moodle, and Schoology without custom institutional configuration.",
      },
      {
        q: "How do you architect online exam systems to prevent cheating?",
        a: "We integrate automated browser lockdown APIs, AI-assisted proctoring checks (gaze tracking, tab-switching detection), and randomized question pools with randomized variable constraints.",
      },
      {
        q: "Can you incorporate adaptive AI learning pathways?",
        a: "Yes. We build knowledge-tracing engines that evaluate student quiz responses in real time, dynamically serving remediation exercises for weak concepts or accelerating advanced learners.",
      },
    ],
  },
  "real-estate": {
    challenges: [
      { title: "Stale Property Listings", text: "Inaccurate availability and delayed price adjustments caused by fragmented MLS feeds and manual broker updates." },
      { title: "Tedious Tenant Onboarding", text: "Paper applications, manual credit checks, and cumbersome lease signing delaying occupancy." },
      { title: "Fragmented Maintenance Communication", text: "Tenants and landlords exchanging chaotic emails and phone calls regarding urgent repairs." },
      { title: "High-Friction Property Inspections", text: "Inability of remote buyers or prospective tenants to assess properties without physically visiting." },
    ],
    faqs: [
      {
        q: "How do you connect with Multiple Listing Service (MLS) feeds?",
        a: "We build automated RESO Web API and RETS ingestion pipelines that normalize listing photos, property characteristics, and status updates every few minutes with zero data drift.",
      },
      {
        q: "Can you automate tenant background checks and lease signing?",
        a: "Yes. We integrate TransUnion/Experian APIs for instant credit and criminal history screening, paired with DocuSign/HelloSign APIs for automated electronic lease execution.",
      },
      {
        q: "Do your platforms support virtual 3D property tours?",
        a: "Yes. We embed Matterport 3D tours, interactive WebXR floor plans, and high-definition video walkthroughs optimized for mobile browsers.",
      },
      {
        q: "How do you streamline rent collection and landlord payouts?",
        a: "We implement recurring ACH rent payments, automated late fee rules, split disbursements to property owners, and automated expense reconciliation.",
      },
    ],
  },
  emobility: {
    challenges: [
      { title: "Charger Interoperability & Uptime", text: "EV drivers encountering broken charge points or protocol incompatibilities across different hardware vendors." },
      { title: "Grid Capacity & High Demand Charges", text: "Simultaneous high-power EV charging triggering punishing utility peak demand penalties." },
      { title: "Fragmented Roaming & Payment Apps", text: "Drivers forced to download dozens of separate regional charging apps to complete a road trip." },
      { title: "Battery Degradation Monitoring", text: "Fleet operators lacking predictive analytics on commercial EV battery health and range degradation." },
    ],
    faqs: [
      {
        q: "Which EV charging protocols do your platforms support?",
        a: "We build Charge Point Management Systems (CPMS) compliant with OCPP 1.6J and OCPP 2.0.1, as well as OCPI for seamless cross-network roaming.",
      },
      {
        q: "How does smart charging prevent grid overload and high utility fees?",
        a: "We implement dynamic load balancing algorithms that adjust charging station kilowatt output based on building peak consumption, time-of-use tariffs, and vehicle departure schedules.",
      },
      {
        q: "Can drivers initiate charging sessions via Apple Pay and Plug & Charge?",
        a: "Yes. We support ISO 15118 Plug & Charge authentication, RFID card scanning, in-app QR code initiation, and frictionless mobile wallet checkout.",
      },
      {
        q: "Do you build software for commercial EV fleet electrification?",
        a: "Yes. We develop fleet telematics dashboards tracking state-of-charge (SoC), scheduled departure pre-conditioning, depot charging queues, and route-based energy forecasts.",
      },
    ],
  },
  wearables: {
    challenges: [
      { title: "Bluetooth Connection Instability", text: "Intermittent BLE disconnections and packet drops during mobile background syncing." },
      { title: "Severe Battery Constraints", text: "Excessive background polling draining smartphone and wearable battery within hours." },
      { title: "Noisy Sensor Artifacts", text: "Accelerometer and optical PPG noise distorting heart rate, SpO2, and step count calculations." },
      { title: "Complex Apple Health & Health Connect Sync", text: "Navigating strict permission frameworks and rate limits when syncing biometrics with mobile OS stores." },
    ],
    faqs: [
      {
        q: "How do you maintain reliable Bluetooth Low Energy (BLE) syncing in the background?",
        a: "We design resilient BLE state machines with exponential backoff reconnections, compact binary packet serialization (Protocol Buffers), and batch sync queues triggered on OS wakeup events.",
      },
      {
        q: "How do you integrate with Apple HealthKit and Google Health Connect?",
        a: "We implement bidirectional data synchronization with granular permission models, ensuring compliance with Apple and Google strict health data privacy policies.",
      },
      {
        q: "Can you assist with Over-The-Air (OTA) firmware update architecture?",
        a: "Yes. We engineer secure BLE OTA update pipelines with cryptographic hash verifications, resume capabilities for interrupted transfers, and dual-bank rollback safety.",
      },
      {
        q: "How do you filter raw sensor data on companion mobile apps?",
        a: "We implement digital signal processing (DSP) filters—such as Kalman and Butterworth filters—to remove motion artifacts before calculating user health scores.",
      },
    ],
  },
  energy: {
    challenges: [
      { title: "Intermittent Renewable Generation", text: "Solar and wind output fluctuations requiring rapid grid balancing and battery energy storage dispatch." },
      { title: "Aging SCADA & Grid Infrastructure", text: "Substations running legacy industrial protocols isolated from cloud analytical tools." },
      { title: "Complex Dynamic Energy Tariffs", text: "Consumers unable to understand variable hourly energy pricing without automated home optimization tools." },
      { title: "Strict Utility Cyber Regulations", text: "Meeting NERC-CIP cybersecurity standards protecting critical national infrastructure from state-sponsored attacks." },
    ],
    faqs: [
      {
        q: "How do you collect data from industrial utility meters and SCADA systems?",
        a: "We deploy secure edge gateways supporting industrial protocols like Modbus, DNP3, and IEC 61850, streaming telemetry securely into cloud analytics pipelines.",
      },
      {
        q: "Can you build predictive models for solar and wind generation?",
        a: "Yes. We train machine learning models combining historical generation logs, real-time satellite solar irradiance, and hyper-local weather forecasts to predict 24-hour generation curves.",
      },
      {
        q: "Do you design consumer-facing energy management portals?",
        a: "Yes. We build responsive web and mobile portals showing hourly consumption breakdowns, solar self-consumption ratios, and automated savings recommendations.",
      },
      {
        q: "How do you ensure NERC-CIP cybersecurity compliance?",
        a: "We architect air-gapped zones, unidirection data diodes, multi-factor authentication for all SCADA control points, and automated intrusion detection monitoring.",
      },
    ],
  },
  agriculture: {
    challenges: [
      { title: "Severe Rural Connectivity Gaps", text: "Farm management software failing in remote fields lacking reliable 4G or 5G mobile coverage." },
      { title: "Late Pest & Disease Detection", text: "Crop infestations identified too late, resulting in significant yield loss and excessive chemical spraying." },
      { title: "Opaque Agricultural Supply Chains", text: "Farmers losing margins to middlemen due to lack of direct transparent pricing and logistics coordination." },
      { title: "Extreme Weather Volatility", text: "Unpredictable drought and frost events threatening seasonal harvest viability." },
    ],
    faqs: [
      {
        q: "How do your agriculture apps function in fields without mobile internet?",
        a: "Our field scouting and tractor apps are built offline-first using local embedded databases. Scouting notes, GPS coordinates, and crop photos sync automatically once connectivity is restored.",
      },
      {
        q: "How does AI computer vision detect crop diseases?",
        a: "Farmers snap a photo of damaged leaves; on-device neural networks analyze visual patterns to classify diseases, identify pest types, and recommend targeted pesticide dosages.",
      },
      {
        q: "Can your platforms interface with John Deere and tractor telemetry?",
        a: "Yes. We integrate with John Deere Operations Center and ISO 11783 (ISOBUS) APIs to ingest planting maps, yield logs, and fuel telemetry.",
      },
      {
        q: "Do you build agricultural marketplaces and commodity trading portals?",
        a: "Yes. We create B2B marketplaces connecting growers directly with grain buyers, incorporating real-time commodity pricing, automated contracts, and escrow payments.",
      },
    ],
  },
  gaming: {
    challenges: [
      { title: "Global Latency & Jitter", text: "Multiplayer sync lag ruining competitive fairness for players across different continents." },
      { title: "High-Throughput Matchmaking", text: "Matchmakers collapsing under peak player concurrency during global updates or tournaments." },
      { title: "Cheating & Exploitation", text: "Memory manipulation and bot scripts eroding player trust and destroying virtual game economies." },
      { title: "Complex Live-Ops Orchestration", text: "Game studios struggling to release events, battle passes, and balance patches without app store redeployments." },
    ],
    faqs: [
      {
        q: "What backend technologies do you use for real-time multiplayer games?",
        a: "We architect scalable game backends on Agones (Kubernetes for dedicated game servers), Nakama, and WebSocket/gRPC streaming clusters deployed across edge cloud regions.",
      },
      {
        q: "How do you prevent player latency mismatches?",
        a: "We build skill and latency-aware matchmaking algorithms that group players into regional edge server instances, maintaining under 30ms round-trip latency.",
      },
      {
        q: "How do you protect game economies against client-side exploitation?",
        a: "We enforce authoritative server validation for all virtual currency transactions, loot box drops, and inventory changes, preventing client-side memory tampering.",
      },
      {
        q: "Can you build live-ops dashboards for remote configuration?",
        a: "Yes. We develop internal studio dashboards allowing designers to tune drop rates, launch seasonal events, schedule store rotations, and ban toxic players in real time without client app rebuilds.",
      },
    ],
  },
  "ott-and-media": {
    challenges: [
      { title: "Buffering & Multi-Bitrate Inefficiencies", text: "Poor video startup times and buffering on low-bandwidth mobile connections causing viewer abandonment." },
      { title: "Device Ecosystem Fragmentation", text: "Maintaining consistent video playback across Apple TV, Android TV, FireStick, Roku, and Smart TVs." },
      { title: "Content Piracy & DRM Enforcement", text: "Protecting premium licensed video assets against unauthorized screen capture and stream ripping." },
      { title: "Ad Insertion Buffering", text: "Clunky client-side ad switches introducing black screens and audio glitches during live events." },
    ],
    faqs: [
      {
        q: "How do you achieve buffer-free video streaming across varying network speeds?",
        a: "We implement Adaptive Bitrate Streaming (HLS and MPEG-DASH) encoded across multiple rendition ladders with global multi-CDN edge delivery (Cloudflare, Fastly).",
      },
      {
        q: "Which DRM systems do you integrate to protect video content?",
        a: "We engineer multi-DRM architectures supporting Apple FairPlay, Google Widevine Modular, and Microsoft PlayReady to secure 4K and live broadcast streams.",
      },
      {
        q: "How do you monetize streaming platforms with video ads?",
        a: "We deploy Server-Side Ad Insertion (SSAI) with VAST/VMAP compliance, stitching personalized video ads directly into the media stream on the server to prevent ad-blockers and eliminate playback buffering.",
      },
      {
        q: "Do you develop dedicated Smart TV applications?",
        a: "Yes. We build native and React Native TV applications tailored for Apple tvOS, Android TV, Samsung Tizen, LG webOS, and Roku.",
      },
    ],
  },
  "on-demand": {
    challenges: [
      { title: "Marketplace Cold-Start Problem", text: "Balancing local supply and customer demand in new geographic markets to prevent long wait times." },
      { title: "High Real-Time Tracking Battery Drain", text: "Continuous GPS polling exhausting service provider smartphone batteries during active jobs." },
      { title: "Dispute Resolution & Unreliable Service", text: "Customer complaints and billing chargebacks arising from inconsistent provider quality." },
      { title: "Automated Payout Complexities", text: "Navigating 1099 compliance, instant contractor payouts, and split commission fee structures." },
    ],
    faqs: [
      {
        q: "How do your platforms pair customers with nearby service providers in real time?",
        a: "We use geospatial indexing (Uber H3 or Google S2 geometry) combined with real-time WebSocket dispatch algorithms that rank providers by proximity, rating, and acceptance speed.",
      },
      {
        q: "How do you handle split payments and contractor payouts?",
        a: "We integrate Stripe Connect or Adyen for Platforms, automatically deducting your marketplace commission fee while disbursing instant or weekly payouts to provider bank accounts.",
      },
      {
        q: "Can customers track their service provider on a live interactive map?",
        a: "Yes. We build real-time GPS tracking interfaces using Mapbox and Google Maps SDKs with smooth vehicle interpolation and dynamic estimated arrival times (ETA).",
      },
      {
        q: "What security measures protect customer privacy in on-demand apps?",
        a: "We implement phone number masking (via Twilio or Vonage) and geofenced in-app messaging so customers and providers never see each other's personal contact details.",
      },
    ],
  },
  "food-delivery": {
    challenges: [
      { title: "Lunch & Dinner Peak Volume Surges", text: "Order intake volume multiplying 10x during lunch and dinner windows, overwhelming restaurant kitchen printers." },
      { title: "Food Quality & Transit Cold-Time", text: "Cooked food waiting cold on counters because delivery drivers arrive too late or too early." },
      { title: "Menu & Pricing Desynchronization", text: "Customers ordering out-of-stock items due to disconnected restaurant POS systems." },
      { title: "Delivery Rider Multi-Apping", text: "Couriers taking overlapping orders on competing platforms, causing unpredictable delays." },
    ],
    faqs: [
      {
        q: "How do you synchronize kitchen prep times with driver arrivals?",
        a: "We build smart dispatch algorithms that calculate food preparation duration based on kitchen load, dispatching the driver only when the order is 5 minutes from being packed.",
      },
      {
        q: "Can your food platforms connect directly with restaurant POS systems?",
        a: "Yes. We integrate with Toast, Square, Clover, and NCR Aloha POS systems to auto-sync 86'd (out-of-stock) items and inject online orders straight to the kitchen display.",
      },
      {
        q: "How do you manage peak rush ordering without crashing?",
        a: "We decouple checkout with Redis message queues and use edge caching for restaurant menus, ensuring checkout remains instant even during major sports events or holiday rushes.",
      },
      {
        q: "Do you build dedicated Kitchen Display Systems (KDS) for restaurant staff?",
        a: "Yes. We build durable tablet KDS apps with audio order chimes, item customization modifiers, and one-tap order ready notifications.",
      },
    ],
  },
  travel: {
    challenges: [
      { title: "Global GDS Search Latency", text: "Calling Global Distribution Systems (Amadeus, Sabre) taking 8–15 seconds to return flight availability." },
      { title: "Volatile Dynamic Pricing Changes", text: "Flight and hotel rates changing mid-checkout, creating customer checkout drop-offs." },
      { title: "Complex Multi-Leg Cancellations", text: "Handling disrupted flights, hotel refunds, and insurance claims across multiple independent vendors." },
      { title: "Multi-Currency & International Taxes", text: "Managing local tourism taxes, VAT regulations, and fluctuating foreign exchange rates." },
    ],
    faqs: [
      {
        q: "How do you speed up flight and hotel search queries?",
        a: "We implement intelligent caching layers using Redis and asynchronous streaming responses, displaying preliminary options in under 1 second while deeper vendor queries complete.",
      },
      {
        q: "Which travel APIs and Global Distribution Systems (GDS) do you work with?",
        a: "We connect with Amadeus, Sabre, Travelport, Duffel, Expedia Partner Solutions, and Hotelbeds via modern NDC and REST/JSON interfaces.",
      },
      {
        q: "How do you manage currency exchange and international payments?",
        a: "We integrate multi-currency payment processors with real-time FX rate locks during checkout, supporting local payment methods like iDEAL, Alipay, and Klarna.",
      },
      {
        q: "Can you build offline mobile itinerary apps for travelers?",
        a: "Yes. We develop mobile companion apps that save boarding passes, hotel vouchers, and offline maps, sending push notifications for gate changes or flight delays.",
      },
    ],
  },
  aviation: {
    challenges: [
      { title: "Strict FAA & EASA Regulatory Standards", text: "Aviation software requiring uncompromising audit trails, data integrity, and safety compliance." },
      { title: "Crew Scheduling & Rest Rule Complexity", text: "FAA Part 117 flight time limitations and union collective bargaining agreements complicating crew rosters." },
      { title: "Aircraft On Ground (AOG) Downtime", text: "Unscheduled maintenance and missing spare parts grounding aircraft at costs of thousands of dollars per hour." },
      { title: "Irregular Operations (IROPS) Recovery", text: "Severe weather stranding aircraft and crews, requiring rapid re-accommodation of thousands of passengers." },
    ],
    faqs: [
      {
        q: "How do you ensure aviation software adheres to strict flight regulations?",
        a: "We design software following DO-178C and DO-254 software safety principles, with role-based cryptographic verification and immutable flight logs.",
      },
      {
        q: "Can you build software for airline Maintenance, Repair, and Overhaul (MRO)?",
        a: "Yes. We develop MRO tracking platforms managing serialized aircraft parts, scheduled maintenance checks (A/B/C/D), and digital mechanic sign-offs.",
      },
      {
        q: "How does your software handle crew pairing and roster optimization?",
        a: "We build constraint-satisfaction scheduling engines that ensure 100% compliance with FAA rest rules, pilot aircraft type ratings, and seniority preferences.",
      },
      {
        q: "Do you develop passenger mobile apps with gate and baggage tracking?",
        a: "Yes. We engineer airline mobile apps featuring biometric boarding passes, interactive airport indoor navigation, and real-time RFID baggage location updates.",
      },
    ],
  },
  telecom: {
    challenges: [
      { title: "Monolithic OSS/BSS Legacy Stacks", text: "Decades-old billing and provisioning software preventing rapid rollout of new 5G customer plans." },
      { title: "Massive CDR Data Volumes", text: "Billions of Call Detail Records (CDRs) and data sessions needing real-time rating and billing." },
      { title: "High Customer Churn Rates", text: "Subscribers switching carriers due to unhelpful customer support and opaque bill surprise charges." },
      { title: "eSIM Activation & Provisioning Friction", text: "Complex carrier profile downloads and remote SIM provisioning (RSP) security protocols." },
    ],
    faqs: [
      {
        q: "How do you modernize legacy OSS/BSS telecom architectures?",
        a: "We build microservice mediation layers compliant with TM Forum Open Digital Architecture (ODA) and Open APIs, enabling rapid plan provisioning without altering legacy billing engines.",
      },
      {
        q: "Can you develop instant digital eSIM activation apps?",
        a: "Yes. We build mobile customer onboarding apps that verify customer IDs with eKYC, generate GSMA-compliant eSIM profiles, and activate cellular service in under 3 minutes.",
      },
      {
        q: "How do your platforms process billions of Call Detail Records (CDRs)?",
        a: "We engineer stream processing pipelines on Apache Kafka and Apache Flink that rate, aggregate, and deduct data allowances in real time with zero packet loss.",
      },
      {
        q: "How do you reduce customer churn with AI analytics?",
        a: "We train churn prediction models analyzing network signal drops, billing dispute frequency, and customer care sentiment, triggering personalized retention offers before contracts expire.",
      },
    ],
  },
  startups: {
    challenges: [
      { title: "Aggressive Runway Constraints", text: "Burn rate dictating a tight 8–12 week window to launch an MVP before capital dries up." },
      { title: "Unvalidated Product Hypotheses", text: "Spending engineering months building features that customers are not actually willing to pay for." },
      { title: "Technical Debt vs. Speed Tradeoff", text: "Hasty early codebases collapsing under early user growth and requiring an immediate total rewrite." },
      { title: "Investor Technical Due Diligence", text: "Series A and B investors scrutinizing code architecture, IP ownership, and security posture." },
    ],
    faqs: [
      {
        q: "How fast can you take a startup concept from idea to live MVP?",
        a: "Our typical MVP delivery sprint is 6 to 10 weeks. We focus strictly on the core value proposition, using modern battle-tested stacks (Next.js, Node/Go, PostgreSQL) to launch quickly without accumulating toxic technical debt.",
      },
      {
        q: "Who owns the code and intellectual property for our startup?",
        a: "You own 100% of all intellectual property, source code, designs, and database schemas from day one. We sign NDAs before initial discovery calls.",
      },
      {
        q: "How do you help startups survive investor technical due diligence?",
        a: "We build with clean architecture, strict TypeScript types, automated CI/CD, SOC 2-ready cloud configurations, and clear documentation that passes investor audits with flying colors.",
      },
      {
        q: "Can your team scale with us as we raise our next funding round?",
        a: "Yes. We can act as your founding engineering team, transition to fractional CTO support, and assist you in hiring and onboarding your in-house engineers as you scale.",
      },
    ],
  },
};
