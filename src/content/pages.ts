import { identity } from "./site";

export const home = {
  categoryLine: "Oracle Integration Cloud (OIC) · Oracle Fusion HCM and Financials",
  name: "Vidit Pujara",
  title: identity.publicTitle,
  positioning:
    "I build Oracle Integration Cloud integrations and BI Publisher reports for Oracle Fusion HCM and Financials, using REST and SOAP services, HDL, FBDI and Oracle SQL, with validation and reconciliation built into every run.",
  direction:
    "I am expanding this enterprise integration foundation through deeper solution design, Oracle VBCS extensions and AI enabled automation.",
  experienceLabel: `${identity.officialDesignation} at ${identity.employer}, since July 2024`,
  deliveryRecordHeading: "Delivery record",
  positioningEyebrow: "Positioning",
  positioningStatement:
    "Enterprise integration is mostly about what happens when the data is wrong.",
  positioningBody: [
    "Most of the value in an integration sits outside the happy path: validating before you load, staging so a run can be inspected, comparing against what Oracle Fusion already holds, and mapping every failure back to the record that caused it.",
    "That is the work described across the case studies on this site. Each one covers a real integration built at Mastek, written up as architecture and technique with client and vendor detail removed.",
  ],
  capabilitiesEyebrow: "Capabilities",
  capabilitiesHeading: "Core Oracle capabilities",
  capabilitiesIntro:
    "Applied on live delivery work across Oracle Fusion HCM and Oracle Fusion Financials.",
  capabilities: [
    {
      index: "01",
      title: "Oracle Integration Cloud",
      body: "Scheduled, event driven and file based integrations across Oracle Fusion, including orchestration, error handling and reprocessing design.",
    },
    {
      index: "02",
      title: "Oracle Fusion HCM and Financials",
      body: "Worker, absence adjacent and expense flows on the HCM side, expenses, suppliers and general ledger on the Financials side.",
    },
    {
      index: "03",
      title: "BI Publisher",
      body: "Reports built to feed integrations with the current Oracle Fusion picture, plus standalone reporting delivered independently.",
    },
    {
      index: "04",
      title: "HDL, FBDI and REST",
      body: "Bulk loading through HDL and FBDI where volume demands it, Oracle Fusion REST APIs where the operation needs to be transactional.",
    },
    {
      index: "05",
      title: "Database driven processing",
      body: "Staging tables and stored procedures for validation, comparison and routing, so runs stay auditable and reprocessable.",
    },
    {
      index: "06",
      title: "Reconciliation and support",
      body: "Error retrieval mapped back to source records, exception output and notification, then ongoing support after go live.",
    },
  ],
  caseStudiesEyebrow: "Enterprise work",
  caseStudiesHeading: "Selected enterprise case studies",
  caseStudiesIntro:
    "Four integrations built at Mastek, described without client, vendor or system names.",
  projectsEyebrow: "Independent work",
  projectsHeading: "Featured product projects",
  projectsIntro:
    "Software built outside enterprise delivery, documented from the public repositories.",
  experienceEyebrow: "Experience",
  experienceHeading: "Mastek, since July 2024",
  experienceRole: identity.officialDesignation,
  experienceBody:
    "First full time role after graduation. Assigned integration modules across Oracle Fusion HCM and Oracle Fusion Financials, working from design through post go live support under the mentorship of technical leads.",
  experiencePoints: [
    "Three implementation projects delivered from start to finish",
    "Concurrent OIC production support across multiple client environments",
    "Oracle ADF application support alongside OIC delivery",
    "Work promoted across Development, Test, UAT and Production",
    "Delivery teams of approximately 15 to 20 members",
  ],
  directionEyebrow: "Direction",
  directionHeading: "Next: deeper solution design and AI enabled automation",
  directionIntro:
    "The near term focus stays on Oracle Integration Cloud delivery. The longer term direction builds on that foundation rather than replacing it.",
  credentialsEyebrow: "Credentials",
  credentialsHeading: "Selected certifications",
  contactEyebrow: "Contact",
  contactHeading: "Open to Oracle Fusion and Oracle Integration Cloud roles",
  contactBody:
    "Email is the fastest route. Case study detail beyond what is published here can be discussed within the limits of client confidentiality.",
};

export const about = {
  eyebrow: "About",
  title: "Oracle integration work, and the route into it",
  intro:
    "A short, factual account of the current role, the background behind it, and the direction it is moving in.",
  facts: [
    { label: "Official designation", value: `${identity.officialDesignation}, ${identity.employer}` },
    { label: "Focus", value: "Oracle Integration Cloud" },
    { label: "Since", value: "July 2024" },
    { label: "Based in", value: "Ahmedabad, Gujarat, India" },
  ],
  pullQuote:
    "I build the integrations that move data into Oracle Fusion, and the reconciliation that tells someone what happened when it did not arrive cleanly.",
  narrative: [
    {
      index: "01",
      title: "Where the work sits now",
      body: `${identity.officialDesignation} at ${identity.employer} since July 2024, specialising in Oracle Integration Cloud. Day to day that means owning assigned integration modules on Oracle Fusion HCM and Oracle Fusion Financials, from design through deployment and post go live support.`,
    },
    {
      index: "02",
      title: "The technical foundation underneath it",
      body: "A Diploma in Computer Engineering followed by a B.Tech in Computer Science and Engineering. Before Oracle, the work was Java, Python, JavaScript, Android and relational database design, built out through projects rather than coursework alone.",
    },
    {
      index: "03",
      title: "Moving from computer science into Oracle ERP",
      body: "Mastek was the first full time role after graduation, starting 15 July 2024. Coming from a general software background, the shift was less about learning to build and more about learning what enterprise data actually demands: validation before load, reconciliation after it, and a clear answer for every record that fails.",
    },
    {
      index: "04",
      title: "What enterprise integration turned out to be",
      body: "Around twenty to twenty five integrations later, the pattern is consistent. Read from a source that will not always behave, stage it so a run can be inspected, compare it against what Oracle Fusion already holds, apply only what changed, then map every error back to the record that caused it.",
    },
    {
      index: "05",
      title: "Still building products",
      body: "Independent product work continues alongside the Oracle role: a group trip planner with a Supabase backend and an AI itinerary parser, a three application home services product built solo in Java and PHP, and a marketing site delivered end to end. This keeps the full stack skills current rather than historical.",
    },
    {
      index: "06",
      title: "Finance as supporting context",
      body: "An MBA in Finance at NMIMS is currently in progress, expected 2028. It is not a technical credential. It is there because Oracle Fusion Financials work goes better when the person building the integration understands what the finance team is actually trying to close.",
    },
    {
      index: "07",
      title: "Where this is heading",
      body: "Next is deeper solution design across Oracle Fusion integrations, Oracle VBCS extensions and AI enabled automation. Concretely that means Oracle AI Foundations, vector search and language models applied to integration problems, built on top of the OIC foundation rather than instead of it. It is a direction supported by study in progress, not a current title.",
    },
  ],
  principlesHeading: "How the work is described here",
  principlesIntro: "Everything on this site is written to be checkable.",
  principles: [
    {
      title: "Scope is stated honestly",
      body: "Case studies describe Vidit's own assigned modules and contributions, not the output of the wider delivery team.",
    },
    {
      title: "Client detail is removed",
      body: "Enterprise client and system identities are omitted. Integrations are described by architecture and technique only.",
    },
    {
      title: "Projects are read from source",
      body: "Every project page is written from the public repository. Where something could not be verified or run, the page says so.",
    },
  ],
};

export const experience = {
  eyebrow: "Experience",
  title: "Oracle integration delivery at Mastek",
  intro:
    "Assigned integration modules across Oracle Fusion HCM and Oracle Fusion Financials, delivered from design through post go live support.",
  company: identity.employer,
  designation: identity.officialDesignation,
  period: identity.employmentPeriod,
  startNote: "Started 15 July 2024",
  body: "First full time role after graduation. Assigned integration modules across Oracle Fusion HCM and Oracle Fusion Financials, working from design through post go live support under the mentorship of technical leads.",
  categories: [
    {
      title: "Integration delivery",
      points: [
        "Built, tested and deployed Oracle integrations using Oracle Integration Cloud.",
        "Owned assigned integration modules through the full delivery cycle.",
        "Built scheduled integrations and event driven integrations.",
        "Built REST API integrations and worked with SOAP services.",
        "Built file based integrations using SFTP as the transport layer.",
        "Built database driven integrations using staging tables and stored procedures.",
      ],
    },
    {
      title: "Oracle Fusion data and reporting",
      points: [
        "Worked across Oracle Fusion HCM and Oracle Fusion Financials.",
        "Developed BI Publisher reports required by integrations, and additional reports independently.",
        "Worked with HDL for bulk HCM data loading.",
        "Worked with FBDI for Financials file based data import.",
      ],
    },
    {
      title: "Environments and support",
      points: [
        "Promoted and validated work across Development, Test, UAT and Production.",
        "Supported live OIC integrations for multiple client environments concurrently, investigating run logs and exception reports, identifying root causes, and coordinating correction and reprocessing.",
        "Provided Oracle ADF application support for a UK local-government client alongside OIC support work.",
      ],
    },
    {
      title: "Delivery context",
      points: [
        "Contributed to three implementation projects from start to finish.",
        "Worked within delivery teams of approximately 15 to 20 members.",
      ],
    },
  ],
  scopeNote: [
    "Mastek is Vidit's first full time employer after graduation.",
    "The scope described here covers Vidit's own assigned modules and contributions, not the output of the wider project team.",
  ],
  recordEyebrow: "Record",
  recordHeading: "Delivery in numbers",
  recordIntro:
    "Figures are approximate where they were counted rather than measured, and are stated as ranges when that is the honest form.",
  additionalHeading: "Additional enterprise integrations",
  additionalEyebrow: "Supporting work",
  additionalIntro:
    "Work delivered alongside the case studies above, summarised rather than written up individually.",
  additional: [
    {
      title: "Outbound reporting integrations",
      body: "Generated reporting extracts from Oracle Fusion and delivered the resulting files to third party SFTP locations on an agreed schedule.",
    },
    {
      title: "Employee auto delegation",
      body: "Built integrations handling employee auto delegation so approval routing stayed correct during absence.",
    },
    {
      title: "Supplier rating updates",
      body: "Applied supplier rating values from an external supplier rating provider into Oracle Fusion supplier descriptive flexfields through REST APIs. Supplier processing on one project covered approximately 700 suppliers.",
    },
    {
      title: "GL journal integrations",
      body: "Received journal data from external sources, transformed it to the required structure, generated FBDI files, uploaded them into Oracle Fusion, then handled errors, reconciliation and email notification.",
    },
    {
      title: "Independent BI Publisher reports",
      body: "Developed BI Publisher reports outside integration scope where the business needed direct reporting from Oracle Fusion.",
    },
  ],
};

export type SkillBand = {
  index: string;
  title: string;
  intro: string;
  emphasis: "primary" | "secondary" | "tertiary";
  groups: { title: string; items: string[] }[];
};

export const skills = {
  eyebrow: "Skills",
  title: "Grouped by depth, not by score",
  intro:
    "No percentages and no invented years per technology. Three honest bands: what is used on live delivery, what is trained or applied in project work, and what is currently being learned.",
  bands: [
    {
      index: "01",
      title: "Core and practitioner",
      intro:
        "Used on live Oracle delivery work at Mastek, or applied in production quality project work.",
      emphasis: "primary",
      groups: [
        {
          title: "Oracle integration and ERP",
          items: [
            "Oracle Integration Cloud",
            "Oracle Fusion HCM",
            "Oracle Fusion Financials",
            "BI Publisher",
            "HDL",
            "FBDI",
            "REST APIs",
            "SOAP services",
            "SFTP",
            "XSLT/XPath mapping",
            "JSON",
            "WSDL",
            "OIC adapters, connections and lookups",
            "ESS job submission",
            "UCM",
            "Technical architecture",
          ],
        },
        {
          title: "Data",
          items: ["Oracle SQL", "PL/SQL", "Oracle Database", "SQL", "MySQL"],
        },
        {
          title: "Engineering",
          items: [
            "Java",
            "Java full stack",
            "Python",
            "JavaScript",
            "HTML",
            "CSS",
            "Bootstrap",
            "Postman",
          ],
        },
      ],
    },
    {
      index: "02",
      title: "Supporting Oracle skills",
      intro:
        "VBCS training and working knowledge, alongside Oracle ADF application support. Development expertise is not implied by support exposure.",
      emphasis: "secondary",
      groups: [
        {
          title: "Oracle platform",
          items: ["Oracle VBCS (working knowledge)", "Oracle ADF (application support)", "Oracle Core Java"],
        },
      ],
    },
    {
      index: "03",
      title: "Exploring and developing",
      intro:
        "Active study supporting a move toward AI enabled automation and deeper solution design. Listed as learning in progress, not as delivery experience.",
      emphasis: "tertiary",
      groups: [
        {
          title: "Oracle and cloud",
          items: [
            "Oracle AI Foundations",
            "Oracle Vector AI",
            "Oracle Cloud Infrastructure",
            "HCM data migration",
          ],
        },
        {
          title: "AI and data science",
          items: [
            "Machine learning",
            "Language models",
            "Python for AI",
            "R",
            "TensorFlow",
            "Data science",
            "Data analysis",
            "Algorithms",
            "Anaconda",
            "Cognos",
          ],
        },
        {
          title: "Engineering and delivery",
          items: [
            "Spring Boot",
            "Apache Tomcat",
            "Business analysis",
            "Requirement gathering",
            "GitHub Copilot",
            "Microsoft Copilot",
            "IntelliJ IDEA",
          ],
        },
      ],
    },
  ] as SkillBand[],
};

export type VerificationStatus =
  | "Verified link"
  | "As supplied"
  | "Manual verification required";

export const credentials = {
  eyebrow: "Credentials",
  title: "Certifications and education",
  intro:
    "Credentials that could be read from the issuer's own verification page are marked verified. Everything else is listed as supplied, not as confirmed.",
  certificationsHeading: "Professional certifications",
  certifications: [
    {
      issuer: "Oracle",
      name: "Oracle APEX Cloud Certified Developer Professional",
      issued: "Issued 14 May 2025",
      status: "Verified link" as VerificationStatus,
      link: {
        label: "Verify with Oracle",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BF4A13A39896649534A113D27A9A16CC296F76DFFB78F02AB1B7DDED51572E25",
      },
    },
    {
      issuer: "Microsoft",
      name: "Microsoft Certified: Azure Fundamentals",
      issued: "",
      status: "Verified link" as VerificationStatus,
      link: {
        label: "Verify with Microsoft",
        url: "https://www.credly.com/badges/d4e233f3-2f21-4737-b2ef-1f7d7d4cbaba/linked_in_profile",
      },
    },
    {
      issuer: "Microsoft",
      name: "Microsoft Certified: Power Platform Fundamentals",
      issued: "",
      status: "Verified link" as VerificationStatus,
      link: {
        label: "Verify with Microsoft",
        url: "https://www.credly.com/badges/8b071826-d2f1-40cf-96f4-66e3665faa8f/linked_in_profile",
      },
    },
    {
      issuer: "Microsoft",
      name: "98-381 Introduction to Programming Using Python",
      issued: "Issued March 2022",
      status: "As supplied" as VerificationStatus,
      note: "Certification number and issue date supplied by Vidit. No public verification page is linked.",
    },
  ],
  educationHeading: "Academic background",
  education: [
    {
      qualification: "MBA, Finance",
      institution: "NMIMS",
      period: "Currently pursuing, expected 2028",
      note: "Supporting business and finance context, not a technical credential.",
    },
    {
      qualification: "B.Tech in Computer Science and Engineering",
      institution: "Parul University",
      period: "2021 to 2024",
    },
    {
      qualification: "Diploma in Computer Engineering",
      institution: "Gujarat Technological University",
      period: "2018 to 2021",
      note: "CGPA 8.86",
    },
  ],
  courseworkHeading: "Course completions",
  courseworkIntro:
    "Data and analytics coursework completed on Coursera, plus an Android development course certificate. Each Coursera entry links to the issuer's verification page.",
  coursework: [
    {
      name: "Introduction to Data Analytics",
      issuer: "IBM on Coursera",
      url: "https://www.coursera.org/account/accomplishments/certificate/JPMBKWT6RNEH",
      status: "Manual verification required" as VerificationStatus,
    },
    {
      name: "Excel Basics for Data Analysis",
      issuer: "IBM on Coursera",
      url: "https://www.coursera.org/account/accomplishments/certificate/TGCXB9CMWQ5K",
      status: "Manual verification required" as VerificationStatus,
    },
    {
      name: "Data Visualization and Dashboards with Excel and Cognos",
      issuer: "IBM on Coursera",
      url: "https://www.coursera.org/account/accomplishments/certificate/JT65LV7GHHRX",
      status: "Manual verification required" as VerificationStatus,
    },
    {
      name: "Assessment for Data Analysis and Visualization Foundations",
      issuer: "IBM on Coursera",
      url: "https://www.coursera.org/account/accomplishments/certificate/U5NABDGJC8V7",
      status: "Manual verification required" as VerificationStatus,
    },
    {
      name: "Introduction to R Programming for Data Science",
      issuer: "IBM on Coursera",
      url: "https://www.coursera.org/account/accomplishments/certificate/CCWS9KLFKMDX",
      status: "Manual verification required" as VerificationStatus,
    },
    {
      name: "Android App Development",
      issuer: "Course certificate",
      status: "As supplied" as VerificationStatus,
    },
  ],
  maintenanceHeading: "How this list is maintained",
  maintenanceBody:
    "Certification names, issuers and dates were taken from the issuer's own verification pages where those pages allow automated reading. Coursera blocks automated reading, so course titles there were supplied directly and each one links out for manual checking. Nothing is published as confirmed without a source.",
};

export const contact = {
  eyebrow: "Contact",
  title: "Get in touch",
  intro: "Open to Oracle Fusion and Oracle Integration Cloud roles",
  channels: [
    {
      label: "Email",
      note: "The fastest route. Expect a reply within a couple of working days.",
    },
    {
      label: "LinkedIn",
      note: "Best for recruiters and for a current view of the role at Mastek.",
    },
    {
      label: "GitHub",
      note: "Source for every project documented on this site.",
    },
  ],
  formNote:
    "Based in Ahmedabad, Gujarat, India. There is no contact form on this site because no form provider is configured, and a form that quietly fails is worse than no form at all.",
  firstMessageHeading: "Useful in a first message",
  firstMessage: [
    "The Oracle modules involved, HCM, Financials or both.",
    "Whether the work is implementation, support or both.",
    "Location, and whether the role is remote or on site.",
  ],
  detailHeading: "On case study detail",
  detailBody:
    "Technical depth beyond what is published here can be discussed in an interview, within the limits of client confidentiality. Client names, vendor names and production data stay out of the conversation.",
};

export const resume = {
  summary:
    "Oracle Fusion Technical Consultant with 2+ years at Mastek building Oracle Integration Cloud (OIC) integrations for Oracle Fusion HCM and Financials. Around twenty to twenty five integrations built, tested and deployed across Development, Test, UAT and Production, supported by BI Publisher reporting, HDL and FBDI loading, REST and SOAP interfaces, SFTP file handling and database driven processing, including mapping Oracle load errors back to source records for correction and reprocessing. Oracle APEX Cloud Certified Developer Professional.",
  metricsNote:
    "Manual expense report creation and manual employee bank account creation were each eliminated for one automated workflow. Figures are approximate where counted rather than measured.",
  coreSkills: [
    {
      label: "Oracle integration and ERP",
      value:
        "Oracle Integration Cloud, Oracle Fusion HCM, Oracle Fusion Financials, BI Publisher, HDL, FBDI, REST APIs, SOAP services, SFTP, XSLT/XPath mapping, JSON, WSDL, OIC adapters, connections and lookups, ESS job submission, UCM, Technical architecture",
    },
    { label: "Data", value: "Oracle SQL, PL/SQL, Oracle Database, SQL, MySQL" },
    {
      label: "Engineering",
      value:
        "Java, Java full stack, Python, JavaScript, HTML, CSS, Bootstrap, Postman",
    },
  ],
  printNote:
    "Use the browser print dialogue to save this page as a PDF. It is styled for print, and navigation, footer and this panel are removed from the output. You can also download the reviewed two-page PDF, with the current designation and certifications.",
};
