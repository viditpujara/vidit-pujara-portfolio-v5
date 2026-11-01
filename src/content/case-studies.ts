import {
  figBankAccountFlow,
  figExpenseFlow,
  figLifecycleFlow,
  figRetirementFlow,
  type FlowFigureData,
} from "./figures";

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  domain: string;
  summary: string;
  metaDescription: string;
  problem: string;
  role: string;
  approach: { index: string; title: string; body: string }[];
  figure: FlowFigureData;
  outcome: string[];
  technologies: string[];
};

export const caseStudiesIntro = {
  eyebrow: "Enterprise work",
  title: "Enterprise case studies",
  intro:
    "Four integrations built at Mastek, described as architecture and technique. Client, vendor, project and system names are omitted throughout.",
  confidentiality:
    "Mastek is named as the employer. Enterprise clients, third party platforms, internal project names, schemas, identifiers, payloads and production screenshots are not published. External systems are described by function, for example an external retirement benefits provider or a source workforce system.",
};

export const caseStudyConfidentialityNote =
  "Client names, vendor names, internal project names, system identifiers and payload details are deliberately omitted. Descriptions cover architecture and technique only.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "employee-retirement-contribution-synchronization",
    number: "01",
    title: "Employee Retirement Contribution Synchronization",
    domain: "Oracle Fusion HCM",
    summary:
      "Pipe-delimited provider files received over SFTP, staged and validated in Oracle Database, compared with Oracle Fusion through BI Publisher and PL/SQL, and loaded as new or changed elections through multi-level HDL, with rejected records mapped back to source lines.",
    metaDescription:
      "Oracle Fusion retirement contributions through SFTP, database staging, BI Publisher, PL/SQL and HDL, with rejected records mapped to source lines.",
    problem:
      "An external retirement benefits provider supplied employee contribution elections in a pipe delimited text file. The records had to be validated, matched to the correct employees in Oracle Fusion, and applied as either new elections or updates to existing ones. Records that failed inside Oracle Fusion had to be traced back to the original source line so the business could correct them.",
    role: "Built as part of my assigned integration modules at Mastek, from technical design through deployment and post-go-live support. Designed and built the end to end integration, the supporting BI Publisher extract, the database comparison logic and the exception reporting.",
    approach: [
      {
        index: "01",
        title: "Collect and stage",
        body: "Read the inbound pipe delimited file from the agreed SFTP location and loaded every row into database staging tables so the run could be inspected and reprocessed without re reading the source file.",
      },
      {
        index: "02",
        title: "Validate",
        body: "Applied structural and business validation to the staged rows before any Oracle Fusion call, so malformed records failed early with a clear reason rather than failing inside the load.",
      },
      {
        index: "03",
        title: "Retrieve the Fusion picture",
        body: "Developed a BI Publisher report to return the current state of the relevant records from Oracle Fusion, giving the integration a reliable comparison set for the same population.",
      },
      {
        index: "04",
        title: "Match and route",
        body: "Matched source rows against existing Oracle Fusion records using secure identifiers, then used database procedures to compare the two sets and determine whether each row was a create or an update.",
      },
      {
        index: "05",
        title: "Transform to HDL",
        body: "Transformed the routed records into HDL format, handling multiple business object levels inside a single generated file so related data stayed together in one load.",
      },
      {
        index: "06",
        title: "Submit and monitor",
        body: "Submitted the generated HDL file to Oracle Fusion through Oracle Integration Cloud and monitored the load until processing completed.",
      },
      {
        index: "07",
        title: "Reconcile and notify",
        body: "Retrieved HDL errors, mapped each one back to the originating source record, generated an exception output the business could act on, and sent notification email to the agreed recipients.",
      },
    ],
    figure: figRetirementFlow,
    outcome: [
      "Contribution elections from an external provider are applied to Oracle Fusion without manual data entry.",
      "Every rejected record is traceable back to its original source line through the exception output.",
      "The staged design allows a run to be re examined and reprocessed without requesting a new file.",
    ],
    technologies: [
      "Oracle Integration Cloud",
      "Oracle Fusion HCM",
      "SFTP",
      "Pipe delimited files",
      "Database staging",
      "PL/SQL procedures",
      "BI Publisher",
      "HDL",
      "Scheduled orchestration",
      "Reconciliation",
      "Email notification",
    ],
  },
  {
    slug: "spend-authorization-to-expense-report-automation",
    number: "02",
    title: "Spend Authorization to Expense Report Automation",
    domain: "Oracle Fusion Financials",
    summary:
      "Approved spend authorizations converted into Oracle Expenses reports through incremental BI Publisher extraction and nested REST payloads carrying headers, lines and attachments, removing manual entry for a workflow covering about 300 employees.",
    metaDescription:
      "Oracle Expenses automation using incremental BI Publisher extracts and nested REST payloads, removing manual report entry for about 300 employees.",
    problem:
      "Approved spend authorizations had to become expense reports. Doing this by hand meant re keying header details, every expense line and any supporting attachments, for each approved authorization, on a repeating basis.",
    role: "Built as part of my assigned integration modules at Mastek, from technical design through deployment and post-go-live support. Built the extraction, the payload construction logic and the Oracle Fusion REST submission.",
    approach: [
      {
        index: "01",
        title: "Extract incrementally",
        body: "Developed a BI Publisher extraction that selected only records approved after the preceding run, so each execution handled new work rather than reprocessing the full population.",
      },
      {
        index: "02",
        title: "Retrieve the full record",
        body: "Retrieved header information, the multiple expense lines belonging to each header, and zero to many attachments, returned as structured XML source data.",
      },
      {
        index: "03",
        title: "Build the payload",
        body: "Constructed the expense report payload inside Oracle Integration Cloud, appending header data, then line data, then attachment data while maintaining the nested structure Oracle Fusion expects.",
      },
      {
        index: "04",
        title: "Submit",
        body: "Submitted the completed payload through Oracle Fusion REST APIs to create the expense report, including its lines and attachments, in one controlled operation.",
      },
    ],
    figure: figExpenseFlow,
    outcome: [
      "Manual expense report creation was eliminated for this automated workflow.",
      "The process supported approximately 300 employees in one client environment.",
      "Attachments travel with the record, so supporting documents do not need a separate manual upload step.",
    ],
    technologies: [
      "Oracle Integration Cloud",
      "Oracle Fusion Financials",
      "Oracle Expenses",
      "BI Publisher",
      "XML",
      "REST APIs",
      "Nested payload construction",
      "Attachment handling",
      "Incremental extraction",
    ],
  },
  {
    slug: "employee-lifecycle-synchronization",
    number: "03",
    title: "Employee Lifecycle Synchronization",
    domain: "Oracle Fusion HCM",
    summary:
      "An event-driven OIC integration aligning Oracle Fusion with an external HR platform across hire, update, termination and rehire, routing each event to the right Worker REST operation and applying only changed fields.",
    metaDescription:
      "Event-driven OIC worker lifecycle integration using Oracle Fusion Worker REST APIs for hire, update, termination and rehire with field-level changes.",
    problem:
      "An external HR management platform remained the system of record for employee information. Oracle Fusion had to reflect four different lifecycle events, and had to do so without overwriting fields that had not changed.",
    role: "Built as part of my assigned integration modules at Mastek, from technical design through deployment and post-go-live support. Built the event handling, the scenario detection logic, the field comparison and the conditional routing to the correct Oracle Worker REST operations.",
    approach: [
      {
        index: "01",
        title: "Receive the event",
        body: "Received lifecycle events from the source workforce system as they occurred, rather than waiting for a scheduled batch window.",
      },
      {
        index: "02",
        title: "Retrieve source detail",
        body: "Called the source system API to retrieve the full current employee detail behind the event.",
      },
      {
        index: "03",
        title: "Establish the scenario",
        body: "Checked whether the employee already existed in Oracle Fusion and identified which lifecycle scenario applied: creation, update, termination or rehire.",
      },
      {
        index: "04",
        title: "Compare field by field",
        body: "For existing workers, retrieved the current Oracle Fusion worker data and compared it field by field against the source, so only genuinely mismatched fields were updated.",
      },
      {
        index: "05",
        title: "Route to the correct operation",
        body: "Applied conditional routing to the appropriate Oracle Worker REST APIs to create a worker, update specific fields, process a termination or process a rehire.",
      },
    ],
    figure: figLifecycleFlow,
    outcome: [
      "Oracle Fusion reflects employee lifecycle changes from the source system without a manual HR data entry step.",
      "Field level comparison keeps updates narrow, so unchanged Oracle Fusion data is left untouched.",
      "All four lifecycle scenarios are handled by one integration rather than four separate ones.",
    ],
    technologies: [
      "Oracle Integration Cloud",
      "Oracle Fusion HCM",
      "External REST APIs",
      "Oracle Worker REST APIs",
      "Event driven integration",
      "Field comparison",
      "Conditional routing",
    ],
  },
  {
    slug: "employee-bank-account-synchronization",
    number: "04",
    title: "Employee Bank Account Synchronization",
    domain: "Oracle Fusion HCM and Expenses",
    summary:
      "A daily full-load bank account file reconciled against Oracle Fusion so only real changes are applied: missing banks and branches created, new accounts associated, replaced accounts deactivated through HDL, and manual account creation removed for the workflow.",
    metaDescription:
      "Daily Oracle Fusion bank-account reconciliation, bank and branch resolution, account association and HDL deactivation with error reporting.",
    problem:
      "Employee bank account information was maintained outside Oracle Fusion but was required inside it for expense reimbursement. The daily feed was a full load, so the integration had to work out which accounts had actually changed instead of rewriting every record.",
    role: "Built as part of my assigned integration modules at Mastek, from technical design through deployment and post-go-live support. Built the staging and comparison logic, the bank and branch handling, the account creation and association, the HDL based deactivation path, and the logging and exception reporting.",
    approach: [
      {
        index: "01",
        title: "Stage the daily file",
        body: "Read the daily full load file and loaded it into staging tables so the whole population could be compared in one pass.",
      },
      {
        index: "02",
        title: "Retrieve current accounts",
        body: "Developed a BI Publisher report returning existing employee bank account data from Oracle Fusion for the same population.",
      },
      {
        index: "03",
        title: "Classify every record",
        body: "Compared source against Oracle Fusion and classified each record as unchanged, changed or new. Unchanged accounts were skipped, which kept the daily run proportional to real change rather than file size.",
      },
      {
        index: "04",
        title: "Handle changes as replacement",
        body: "For changed accounts, marked the existing account for deactivation and created a replacement account, using HDL for the deactivation processing that required it.",
      },
      {
        index: "05",
        title: "Resolve banks and branches",
        body: "Checked whether the referenced bank existed and created it when missing, then applied the same check and create pattern for the branch, so account creation never failed on a missing parent record.",
      },
      {
        index: "06",
        title: "Create and associate",
        body: "Created the external bank accounts and associated each one with the correct employee.",
      },
      {
        index: "07",
        title: "Log and notify",
        body: "Retrieved processing errors, produced run logs and exception output, and sent notification email so failures were visible the same day.",
      },
    ],
    figure: figBankAccountFlow,
    outcome: [
      "Manual employee bank account creation was eliminated for this automated workflow.",
      "Skipping unchanged accounts keeps a full load file from generating unnecessary Oracle Fusion activity.",
      "Missing banks and branches are created automatically instead of blocking the run.",
    ],
    technologies: [
      "Oracle Integration Cloud",
      "Oracle Fusion HCM",
      "Oracle Expenses",
      "SFTP",
      "Database staging",
      "BI Publisher",
      "HDL",
      "REST APIs",
      "Exception reporting",
      "Email notification",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex((item) => item.slug === slug);
  const next = caseStudies.at((index + 1) % caseStudies.length);
  if (!next) throw new Error(`No case study follows ${slug}`);
  return next;
}
