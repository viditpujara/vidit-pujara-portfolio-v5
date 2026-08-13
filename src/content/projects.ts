export type RepoLink = { label: string; url: string };

export type Project = {
  slug: string;
  name: string;
  ownership: "Solo" | "Collaborative";
  kicker: string;
  tagline: string;
  summary: string;
  repositories: RepoLink[];
  /** What the public repository proves, grouped as it is on the live site. */
  repositoryFindings: { heading: string; points: string[] }[];
  demonstrates: string[];
  status: string;
  limitations: string[];
  ownershipNote: string;
  stack: string[];
  cardStack: string[];
};

export const projectsIntro = {
  eyebrow: "Independent work",
  title: "Projects",
  intro:
    "Software built outside enterprise delivery. Every page here is written from the public repository, and where something could not be verified or run, the page says so.",
  soloHeading: "Built independently",
  soloIntro: "Designed, built and owned end to end.",
  collaborativeHeading: "Built with a team",
  collaborativeIntro:
    "Vidit's specific contribution is stated on each project page. These are not presented as solo work.",
  repositoryNote:
    "Read directly from the public source. Nothing below is inferred from the project name or the résumé.",
};

export const projects: Project[] = [
  {
    slug: "sherbimet",
    name: "Sherbimet",
    ownership: "Solo",
    kicker: "Android and PHP product ecosystem",
    tagline: "Three part home services marketplace",
    summary:
      "A home services product built as three connected applications: a customer Android app, a worker Android app and a PHP administrative panel. The original purpose was to connect people who need home services with workers looking for work.",
    repositories: [
      {
        label: "Customer app on GitHub",
        url: "https://github.com/viditpujara/sherbimet-UserApp",
      },
      {
        label: "Worker app on GitHub",
        url: "https://github.com/viditpujara/sherbimet-WorkerApp",
      },
      {
        label: "Admin panel on GitHub",
        url: "https://github.com/viditpujara/sherbimet-AdminPanel",
      },
    ],
    repositoryFindings: [
      {
        heading: "Customer application",
        points: [
          "Package com.sherbimet.user, compileSdk 30, minSdk 21, 49 Java source files and 39 layout files in the main source set.",
          "Onboarding through splash, mobile number login, OTP verification with SMS auto read, and preferred language selection.",
          "Location narrowing through city, area and pincode selection screens, each with its own model and adapter.",
          "Service browsing through services and subservices, service request creation, packages and package detail.",
          "Bookings list, payments screen, profile, and a rating and review bottom sheet for feedback.",
          "Firebase Cloud Messaging services for push notification.",
          "String resources supplied for English, Hindi and Gujarati.",
        ],
      },
      {
        heading: "Worker application",
        points: [
          "Package com.sherbimet.worker, same SDK targets, 38 Java source files and 28 layout files in the main source set.",
          "Separate login and OTP verification path for workers.",
          "City, area, pincode and package selection screens for defining where and what a worker serves.",
          "Worker requests screen with its own model and adapter for incoming service requests.",
          "Shared session management, notification handling and localisation approach with the customer app.",
        ],
      },
      {
        heading: "Administrative panel",
        points: [
          "PHP and MySQL application built on the AdminLTE interface, with a shared class layer, a session check on every protected page and a login flow.",
          "Create, edit and list screens for workers, users, services, subservices, packages, pincodes and languages, each backed by prepared queries against its own table.",
          "Seven reporting views covering bookings, workers, users, packages, subservices, subcategories and feedback.",
          "A relational schema of fifteen tables covering admin, worker, user, city, area, pincode, service, subservice, category, subcategory, package, language, request, feedback and status reference data.",
          "Forty three PHP files are published. Eleven of them are empty placeholders, including the dashboard, the city and area screens, the booking and feedback lists, and the change and forgot password screens. Nine directories, among them the shared class, api, ajax and asset directories, each hold a single empty placeholder file rather than working code. The modules above are read from the remaining thirty two files, which do contain working source.",
        ],
      },
      {
        heading: "Shared architecture",
        points: [
          "Both Android apps talk to the same backend through a small API helper layer holding endpoint definitions, authorization handling and JSON field constants.",
          "Role separation is enforced at the application level: customer and worker are separate installable apps rather than modes inside one app.",
        ],
      },
    ],
    demonstrates: [
      "Solo ownership of a multi application product",
      "System architecture across mobile clients and a server side admin tier",
      "Native Android development in Java",
      "Backend and administrative tooling design",
      "Database driven catalogue modelling for services, packages and geography",
      "Multi role product design",
    ],
    status:
      "Complete as a portfolio project. Not published to an app store and not currently hosted.",
    limitations: [
      "The Android apps could not be built in this environment. The backend they call is not public, so no live run was possible.",
      "The admin panel repository is partially published. Thirty two PHP files contain working source, eleven are empty placeholders, and the shared class layer the working files include is present only as an empty placeholder, so the panel cannot run as published.",
      "The published PHP builds SQL by interpolating escaped strings rather than using parameter binding. This is noted as an accurate observation about early work, not presented as current practice.",
      "The historical résumé mentioned a chat interface and worker earnings visibility. The published code shows a support navigation entry rather than a messaging feature, and no earnings module was found, so neither is claimed here.",
    ],
    ownershipNote: "Built solo across three separate repositories.",
    stack: [
      "Java",
      "Android SDK",
      "Android Studio",
      "PHP",
      "REST APIs",
      "Firebase Cloud Messaging",
      "Google Play Services",
      "Glide",
      "Material Components",
    ],
    cardStack: [
      "Java",
      "Android SDK",
      "Android Studio",
      "PHP",
      "REST APIs",
      "Firebase Cloud Messaging",
    ],
  },
  {
    slug: "plezer-construction",
    name: "Plezer Construction",
    ownership: "Solo",
    kicker: "Next.js marketing site",
    tagline: "Marketing site for a residential construction business",
    summary:
      "A marketing and project showcase site for a construction business, built with Next.js and configured as a static export. The site presents the business, a residential project, a page turning brochure and location detail.",
    repositories: [
      {
        label: "View on GitHub",
        url: "https://github.com/viditpujara/plezerconstruction",
      },
    ],
    repositoryFindings: [
      {
        heading: "Page structure",
        points: [
          "Four routes in the Pages Router: home, about, contact and a dedicated residential project page.",
          "Each page composes a shared header that receives the active route as a prop for the navigation state.",
        ],
      },
      {
        heading: "Frontend architecture",
        points: [
          "Component folders for hero, about, project, slider, testimonials, brochure, count animation, footer and contact detail.",
          "Content separated into data modules for slides and testimonials rather than being hard coded into components.",
          "A page turning brochure component backed by a PDF asset, with a webpack asset rule added for PDF handling.",
          "A map component rendering the project location.",
          "Google fonts loaded through next/font, and Tailwind CSS for layout and styling.",
        ],
      },
      {
        heading: "Build and deployment",
        points: [
          "next.config.js sets output to export with unoptimized images, so the project builds to static files suitable for any static host.",
        ],
      },
    ],
    demonstrates: [
      "Independent delivery of a client facing site",
      "Component decomposition and data separation in React",
      "Static export configuration and asset handling",
      "Responsive marketing layout work",
    ],
    status:
      "Source is complete and configured for static export. No live deployment URL is published in the repository.",
    limitations: [
      "The dependency manifest includes packages for a MySQL backed authenticated area, including Express, MySQL drivers, bcrypt, JSON Web Token and NextAuth. The published source contains no server routes or database code, so no backend or database functionality is claimed.",
      "The project was not built in this environment, so no screenshots are published here.",
    ],
    ownershipNote: "Built solo.",
    stack: [
      "Next.js 14",
      "React 18",
      "JavaScript",
      "Tailwind CSS 3",
      "MUI 5",
      "Emotion",
      "Redux Toolkit",
      "react-slick",
      "react-pageflip",
      "html2pdf.js",
    ],
    cardStack: [
      "Next.js 14",
      "React 18",
      "JavaScript",
      "Tailwind CSS 3",
      "MUI 5",
      "Emotion",
    ],
  },
  {
    slug: "triptogether",
    name: "TripTogether",
    ownership: "Solo",
    kicker: "React and Supabase application",
    tagline: "Group trip planning with an automated expense ledger",
    summary:
      "A group trip planner with two roles. Organisers create trips, manage participants and paste raw itinerary text that a language model turns into structured events. Participants log expenses, and the application settles who owes whom and exports the result as PDF and spreadsheet reports.",
    repositories: [
      {
        label: "View on GitHub",
        url: "https://github.com/viditpujara/triptogether-planner",
      },
    ],
    repositoryFindings: [
      {
        heading: "Trip and participant management",
        points: [
          "Separate administrator and participant roles, enforced through an auth context and a protected route wrapper.",
          "Administrator pages for a dashboard, trip creation and trip detail. Participant pages for trip list, trip view and expense entry.",
          "Trip status is computed from the current date rather than stored, so a trip moves through upcoming, active, ended and completed on its own.",
          "Authentication supports both a username and password pair and a passphrase, with bcryptjs and hash-wasm present for credential hashing.",
        ],
      },
      {
        heading: "Itinerary parsing",
        points: [
          "Raw pasted itinerary text is sent to Google Gemini and returned as structured JSON blocks.",
          "The parser distinguishes whole group events from events belonging to named individuals and tags them accordingly.",
          "A separate non AI itinerary parser module exists alongside the model based one.",
        ],
      },
      {
        heading: "Expense ledger and reporting",
        points: [
          "Expenses are logged against a trip with a category read from the database and a record of who paid.",
          "Splitting is equal, either across the whole group or across selected members.",
          "On completion, a report generator produces settlement output as PDF through jsPDF with autotable, and as a spreadsheet through SheetJS.",
        ],
      },
      {
        heading: "Data and delivery",
        points: [
          "Supabase PostgreSQL backend with a committed schema covering application users, trips, itinerary items, expenses, expense splits and categories.",
          "Data access is centralised in one API module rather than spread across components.",
          "Vite build, Vitest unit tests and a Playwright configuration for browser testing.",
          "Deployed as a single page application, with a Vercel rewrite so client side routes survive a page refresh.",
        ],
      },
    ],
    demonstrates: [
      "Solo delivery of a full stack product with a real database",
      "Role based access control and protected routing",
      "Third party AI integration used for a concrete parsing task rather than as decoration",
      "Financial calculation and document generation",
      "A test setup at both unit and browser level",
    ],
    status:
      "Active solo project. Requires a Supabase project and a Google Gemini API key to run. No public demo URL is published in the repository.",
    limitations: [
      "The application was not run in this environment because it needs a live Supabase project and an AI API key.",
      "An environment file holding service credentials was committed to the repository early on. It has since been removed from the current tree, but credentials committed to a public repository stay reachable in history until the history itself is rewritten, so rotation is the real fix rather than deletion. This is recorded as an accurate observation about the project, not as current practice.",
    ],
    ownershipNote: "Built solo.",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "TanStack Query",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "Google Gemini",
      "jsPDF",
      "SheetJS",
      "Vitest",
      "Playwright",
    ],
    cardStack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "TanStack Query",
    ],
  },
  {
    slug: "pu-nav",
    name: "PU Nav",
    ownership: "Collaborative",
    kicker: "React and Google Maps",
    tagline: "Campus navigation and directions",
    summary:
      "A campus navigation application that routes a visitor between points using the Google Maps Directions service, with Firestore holding application data.",
    repositories: [
      { label: "View on GitHub", url: "https://github.com/viditpujara/pu-nav" },
    ],
    repositoryFindings: [
      {
        heading: "Navigation features",
        points: [
          "Origin and destination entry with a directions request and rendered route.",
          "Distance and duration read from the first leg of the returned route and shown to the user.",
          "Travel mode handling with bicycling as the initial mode, plus a bicycling layer on the map.",
          "Map click capture that opens an info window and lets the clicked point be assigned as origin or destination.",
          "Current location support using the browser geolocation API, with reverse geocoding to turn coordinates into a readable place name.",
        ],
      },
      {
        heading: "Application structure",
        points: [
          "Create React App project with a menu component and a map component written as a React class component.",
          "Firebase initialised in a dedicated module with Firestore exported for application use.",
          "Tailwind CSS configured alongside component level CSS for the map interface.",
        ],
      },
    ],
    demonstrates: [
      "Third party mapping and directions integration",
      "State handling for an interactive map interface",
      "Cloud datastore setup",
      "Architecture design within a small team",
    ],
    status:
      "College project. The repository has no deployment configuration and requires a Google Maps API key to run.",
    limitations: [
      "The project was not run in this environment because it needs a Google Maps API key and a Firebase project.",
      "A server side Firestore access sketch exists in the repository but is not wired into the application, so no backend API is claimed.",
    ],
    ownershipNote:
      "Four person college project. Vidit designed the overall project architecture and contributed to both frontend and backend work.",
    stack: [
      "React 18",
      "Create React App",
      "@react-google-maps/api",
      "Google Maps Directions",
      "Firebase Firestore",
      "Tailwind CSS 3",
    ],
    cardStack: [
      "React 18",
      "Create React App",
      "@react-google-maps/api",
      "Google Maps Directions",
      "Firebase Firestore",
      "Tailwind CSS 3",
    ],
  },
  {
    slug: "eventos",
    name: "Eventos",
    ownership: "Collaborative",
    kicker: "Java web application",
    tagline: "Event management and ticketing web application",
    summary:
      "A Java web application for event organisers and customers, covering organiser and customer registration, event publishing, event browsing and ticket types, backed by an Oracle database.",
    repositories: [
      {
        label: "View on GitHub",
        url: "https://github.com/nikhilsoni909/Eventos_Final",
      },
    ],
    repositoryFindings: [
      {
        heading: "Backend modules",
        points: [
          "Servlet controllers for customer registration, customer login, organiser registration, organiser login verification, event registration, retrieving all events and retrieving event detail.",
          "DAO interfaces with matching implementations for customers, organisers, events and ticket types, keeping data access behind an interface layer.",
          "Domain models for events, customers, organisers, bookings, payments, ticket types, categories and cities.",
        ],
      },
      {
        heading: "Database and security",
        points: [
          "Oracle JDBC connectivity through a shared connection utility.",
          "Password handling utilities for hashing, encryption and decryption, with Bouncy Castle as the cryptography provider.",
        ],
      },
      {
        heading: "Web structure and build",
        points: [
          "JSP and HTML views for the landing page, event listing, individual event detail, event editing, organiser home, and separate registration and login pages for customers and organisers.",
          "Maven build producing a WAR, compiled against Java 17, intended for deployment to a servlet container.",
        ],
      },
    ],
    demonstrates: [
      "Layered Java web architecture with a clear DAO boundary",
      "Relational data modelling for a booking domain",
      "Server side session and authentication handling",
      "Working effectively inside a team codebase",
    ],
    status:
      "Internship project. Built as a WAR for a servlet container with a local Oracle database.",
    limitations: [
      "The application could not be run in this environment. It needs an Oracle database instance and the repository does not publish a schema script.",
      "Database connection details in the repository point at a local development instance.",
    ],
    ownershipNote:
      "Collaborative Mastek internship project. The repository is owned by a collaborator. Vidit was the primary design architect and contributed to backend and database modules.",
    stack: [
      "Java 17",
      "Jakarta Servlets",
      "JSP",
      "Maven",
      "Oracle Database",
      "Oracle JDBC",
      "Bouncy Castle",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    cardStack: [
      "Java 17",
      "Jakarta Servlets",
      "JSP",
      "Maven",
      "Oracle Database",
      "Oracle JDBC",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((item) => item.slug === slug);
}

export const soloProjects = projects.filter((p) => p.ownership === "Solo");
export const collaborativeProjects = projects.filter(
  (p) => p.ownership === "Collaborative",
);
