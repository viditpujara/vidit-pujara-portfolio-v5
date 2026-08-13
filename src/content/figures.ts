export type FlowTone =
  | "source"
  | "process"
  | "oic"
  | "target"
  | "support"
  | "error";

export type FlowStage = {
  index: string;
  title: string;
  detail: string;
  tone: FlowTone;
  /** Label written on the arrow leaving this stage. */
  connector?: string;
};

export type FlowBranch = {
  /** One based stage number this branch leaves from. */
  afterStage: number;
  label: string;
  kind: "exit" | "routes";
  items: { title: string; detail?: string; tone: FlowTone }[];
};

export type FlowReturn = {
  label: string;
  from: string;
  to: string;
  detail: string;
};

export type FlowFigureData = {
  id: string;
  number: string;
  label: string;
  caption: string;
  stages: FlowStage[];
  branches?: FlowBranch[];
  returnPath?: FlowReturn;
  /** Complete text alternative, read in logical order. */
  alt: string[];
};

export const figWorkingShape: FlowFigureData = {
  id: "fig-00-working-shape",
  number: "Fig. 00",
  label: "Working shape",
  caption:
    "Source systems deliver files, events and REST calls. Oracle Integration Cloud validates, stages, compares and transforms. Oracle Fusion HCM and Financials receive the result, and errors return for reconciliation.",
  stages: [
    {
      index: "01",
      title: "Source systems",
      detail: "Files, events and REST calls",
      tone: "source",
      connector: "Deliver",
    },
    {
      index: "02",
      title: "Oracle Integration Cloud",
      detail: "Validate, stage, compare, transform",
      tone: "oic",
      connector: "Apply",
    },
    {
      index: "03",
      title: "Oracle Fusion HCM and Financials",
      detail: "Receive the result",
      tone: "target",
    },
  ],
  returnPath: {
    label: "Errors return",
    from: "Oracle Fusion and processing errors",
    to: "Reconciliation",
    detail: "Failures map back to the record that caused them",
  },
  alt: [
    "Stage 1: Source systems deliver files, events and REST calls into the integration layer.",
    "Stage 2: Oracle Integration Cloud validates the data, stages it, compares it against the current Oracle Fusion picture and transforms it.",
    "Stage 3: Oracle Fusion HCM and Financials receive the result.",
    "Return path: errors from Oracle Fusion and from processing return to reconciliation, where each failure is mapped back to the record that caused it.",
  ],
};

export const figRetirementFlow: FlowFigureData = {
  id: "fig-01-retirement-contribution-flow",
  number: "Fig. 01",
  label: "Source to target",
  caption:
    "Source to target flow for the retirement contribution synchronization. Names of external systems are omitted.",
  stages: [
    {
      index: "01",
      title: "External provider file",
      detail: "Pipe delimited file delivered through SFTP",
      tone: "source",
      connector: "Read",
    },
    {
      index: "02",
      title: "Database staging",
      detail: "Load, validate and retain for reprocessing",
      tone: "process",
      connector: "Validated rows",
    },
    {
      index: "03",
      title: "Compare and route",
      detail: "BI Publisher extract and PL/SQL comparison",
      tone: "support",
      connector: "Create or update",
    },
    {
      index: "04",
      title: "HDL generation",
      detail: "Multiple business object levels in one file",
      tone: "oic",
      connector: "Submit",
    },
    {
      index: "05",
      title: "Oracle Fusion HCM",
      detail: "Submitted through OIC",
      tone: "target",
      connector: "Errors",
    },
    {
      index: "06",
      title: "Exception output",
      detail: "Errors mapped to source rows and notification sent",
      tone: "error",
    },
  ],
  alt: [
    "Stage 1: External provider file. A pipe delimited file delivered through SFTP. Connects to the next stage by read.",
    "Stage 2: Database staging. Load, validate and retain for reprocessing. Connects to the next stage by validated rows.",
    "Stage 3: Compare and route. BI Publisher extract and PL/SQL comparison. Connects to the next stage by create or update.",
    "Stage 4: HDL generation. Multiple business object levels in one file. Connects to the next stage by submit.",
    "Stage 5: Oracle Fusion HCM. Submitted through OIC. Connects to the next stage by errors.",
    "Stage 6: Exception output. Errors mapped to source rows and notification sent.",
  ],
};

export const figExpenseFlow: FlowFigureData = {
  id: "fig-02-expense-report-automation-flow",
  number: "Fig. 02",
  label: "Source to target",
  caption:
    "Incremental extraction and nested payload construction for expense report automation.",
  stages: [
    {
      index: "01",
      title: "Approved authorizations",
      detail: "Selected after the preceding run",
      tone: "source",
      connector: "Query",
    },
    {
      index: "02",
      title: "BI Publisher extraction",
      detail: "Header, multiple lines and zero to many attachments",
      tone: "support",
      connector: "XML",
    },
    {
      index: "03",
      title: "XML data",
      detail: "Structured source returned to OIC",
      tone: "process",
      connector: "Build",
    },
    {
      index: "04",
      title: "Payload construction",
      detail: "Nested header, lines and attachments assembled in OIC",
      tone: "oic",
      connector: "REST",
    },
    {
      index: "05",
      title: "Oracle Expenses REST API",
      detail: "Expense report created",
      tone: "target",
    },
  ],
  alt: [
    "Stage 1: Approved authorizations. Selected after the preceding run. Connects to the next stage by query.",
    "Stage 2: BI Publisher extraction. Header, multiple lines and zero to many attachments. Connects to the next stage by XML.",
    "Stage 3: XML data. Structured source returned to Oracle Integration Cloud. Connects to the next stage by build.",
    "Stage 4: Payload construction. Nested header, lines and attachments assembled in Oracle Integration Cloud. Connects to the next stage by REST.",
    "Stage 5: Oracle Expenses REST API. The expense report is created.",
  ],
};

export const figLifecycleFlow: FlowFigureData = {
  id: "fig-03-employee-lifecycle-flow",
  number: "Fig. 03",
  label: "Source to target",
  caption:
    "Event driven lifecycle routing. The external HR platform is described by function only.",
  stages: [
    {
      index: "01",
      title: "Source system event",
      detail: "External HR platform, event driven",
      tone: "source",
      connector: "Trigger",
    },
    {
      index: "02",
      title: "Retrieve full employee detail",
      detail: "Source API call for the full record",
      tone: "process",
      connector: "Employee detail",
    },
    {
      index: "03",
      title: "Scenario detection",
      detail: "Create, update, terminate or rehire",
      tone: "support",
      connector: "Existence check",
    },
    {
      index: "04",
      title: "Field level comparison",
      detail: "Only mismatched fields are written",
      tone: "process",
      connector: "Delta generation",
    },
    {
      index: "05",
      title: "Oracle Worker REST operation",
      detail: "Conditional routing to the right operation",
      tone: "target",
    },
  ],
  branches: [
    {
      afterStage: 5,
      label: "Conditional routes",
      kind: "routes",
      items: [
        { title: "Create", detail: "New worker", tone: "target" },
        { title: "Update", detail: "Changed fields only", tone: "target" },
        { title: "Terminate", detail: "Leaver processing", tone: "target" },
        { title: "Rehire", detail: "Returning worker", tone: "target" },
      ],
    },
  ],
  alt: [
    "Stage 1: Source system event. External HR platform, event driven. Connects to the next stage by trigger.",
    "Stage 2: Retrieve full employee detail through a source API call. Connects to the next stage by employee detail.",
    "Stage 3: Scenario detection establishes whether the event is a create, update, terminate or rehire. Connects to the next stage by existence check.",
    "Stage 4: Field level comparison writes only mismatched fields, producing a delta.",
    "Stage 5: The delta is routed to the correct Oracle Worker REST operation.",
    "Four conditional routes leave stage 5: create a worker, update changed fields only, process a termination, or process a rehire.",
  ],
};

export const figBankAccountFlow: FlowFigureData = {
  id: "fig-04-bank-account-synchronization-flow",
  number: "Fig. 04",
  label: "Source to target",
  caption:
    "Daily full load reconciliation. Unchanged records exit the flow before any Oracle Fusion write.",
  stages: [
    {
      index: "01",
      title: "Daily full load file",
      detail: "External source, all accounts",
      tone: "source",
      connector: "Load",
    },
    {
      index: "02",
      title: "Staging tables",
      detail: "Loaded for whole population comparison",
      tone: "process",
      connector: "Compare",
    },
    {
      index: "03",
      title: "Existing Fusion data",
      detail: "BI Publisher extract for the same population",
      tone: "support",
      connector: "Comparison set",
    },
    {
      index: "04",
      title: "Classification",
      detail: "Unchanged, changed or new",
      tone: "process",
      connector: "Changed and new",
    },
    {
      index: "05",
      title: "Bank and branch resolution",
      detail: "Created when missing",
      tone: "support",
      connector: "Create",
    },
    {
      index: "06",
      title: "External account creation",
      detail: "Accounts created in Oracle Fusion",
      tone: "target",
      connector: "Associate",
    },
    {
      index: "07",
      title: "Employee association",
      detail: "Each account linked to the correct employee",
      tone: "target",
      connector: "Replace",
    },
    {
      index: "08",
      title: "HDL deactivation",
      detail: "Applied to replaced accounts",
      tone: "oic",
      connector: "Log",
    },
    {
      index: "09",
      title: "Error logging and notification",
      detail: "Run logs, exception output and email",
      tone: "error",
    },
  ],
  branches: [
    {
      afterStage: 4,
      label: "Exit before any Oracle Fusion write",
      kind: "exit",
      items: [
        {
          title: "Unchanged",
          detail: "Skipped, no Oracle Fusion activity",
          tone: "support",
        },
      ],
    },
  ],
  alt: [
    "Stage 1: Daily full load file from an external source containing all accounts. Connects to the next stage by load.",
    "Stage 2: Staging tables hold the file so the whole population can be compared in one pass. Connects to the next stage by compare.",
    "Stage 3: Existing Oracle Fusion data is retrieved through a BI Publisher extract for the same population, giving the comparison set.",
    "Stage 4: Classification marks every record as unchanged, changed or new.",
    "Branch from stage 4: unchanged records exit here and are skipped, before any Oracle Fusion write takes place.",
    "Stage 5: Bank and branch resolution creates the bank or branch when it is missing.",
    "Stage 6: External bank accounts are created in Oracle Fusion.",
    "Stage 7: Each account is associated with the correct employee.",
    "Stage 8: HDL deactivation is applied to accounts that were replaced.",
    "Stage 9: Errors are logged, exception output is produced and notification email is sent.",
  ],
};

export const figEnvironmentProgression = {
  id: "fig-05-environment-progression",
  number: "Fig. 05",
  label: "Environment progression",
  caption:
    "Work is promoted and validated through four environments before production support begins.",
  stages: [
    { index: "01", name: "Development", stage: "Build" },
    { index: "02", name: "Test", stage: "Validate" },
    { index: "03", name: "UAT", stage: "Business acceptance" },
    { index: "04", name: "Production", stage: "Production release and support" },
  ],
  alt: [
    "Stage 1: Development, where the integration is built.",
    "Stage 2: Test, where the integration is validated.",
    "Stage 3: UAT, where the business accepts the behaviour.",
    "Stage 4: Production, covering release and ongoing support.",
  ],
};

export const figCareerDirection = {
  id: "fig-06-career-direction",
  number: "Fig. 06",
  label: "Career direction",
  caption:
    "The final stage is a stated direction supported by study in progress, not a current job title.",
  stages: [
    {
      index: "01",
      heading: "Now",
      period: "2024 to 2026",
      body: "Deepen Oracle Integration Cloud delivery across Oracle Fusion HCM and Financials. Broaden coverage of BI Publisher, HDL, FBDI, Oracle SQL and Oracle Fusion REST APIs.",
      isDirection: false,
    },
    {
      index: "02",
      heading: "Next",
      period: "2026 to 2027",
      body: "Extend into Oracle VBCS, Oracle Cloud Infrastructure and solution level integration design. Continue independent product engineering to keep full stack skills current.",
      isDirection: false,
    },
    {
      index: "03",
      heading: "Direction",
      period: "By 2028",
      body: "Move toward AI Integration Architecture: applying vector search, language models and Oracle AI services to enterprise integration problems. This is a stated direction supported by study in progress, not a current job title.",
      isDirection: true,
    },
  ],
  alt: [
    "Now, 2024 to 2026: deepen Oracle Integration Cloud delivery across Oracle Fusion HCM and Financials.",
    "Next, 2026 to 2027: extend into Oracle VBCS, Oracle Cloud Infrastructure and solution level integration design.",
    "Direction, by 2028: move toward AI Integration Architecture. This is a career direction, not a current title.",
  ],
};
