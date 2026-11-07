export type DeliveryMetric = {
  value: string;
  label: string;
  note: string;
};

/**
 * Every figure here is taken from the verified delivery record.
 * Ranges are published as ranges. Nothing is rounded up into a single total.
 */
export const deliveryMetrics: DeliveryMetric[] = [
  {
    value: "20 to 25",
    label: "Oracle integrations built and deployed",
    note: "Approximate count across Oracle Fusion HCM and Financials",
  },
  {
    value: "10 to 15",
    label: "BI Publisher reports developed",
    note: "Supporting integrations and standalone reporting",
  },
  {
    value: "5,000",
    label: "Records processed in a run for several integrations",
    note: "Approximate volume for a routine run",
  },
  {
    value: "10,000",
    label: "Records in the largest documented file",
    note: "Processed once per day",
  },
  {
    value: "300",
    label: "Employees supported by one automated expense workflow",
    note: "One client environment",
  },
  {
    value: "700",
    label: "Suppliers covered by supplier processing on a separate project",
    note: "A different project to the expense workflow above",
  },
  {
    value: "3",
    label: "Implementation projects delivered start to finish",
    note: "Design through go live",
  },
  {
    value: "15 to 20",
    label: "Team size Vidit worked within on delivery projects",
    note: "Approximate delivery team size",
  },
];

export const homeMetrics: DeliveryMetric[] = [
  {
    value: "20 to 25",
    label: "Oracle integrations built",
    note: "Across Oracle Fusion HCM and Financials",
  },
  {
    value: "10 to 15",
    label: "BI Publisher reports developed",
    note: "Supporting integrations and standalone reporting",
  },
  {
    value: "10,000",
    label: "Records in one daily run",
    note: "Highest documented single file volume",
  },
  {
    value: "3",
    label: "End to end implementations",
    note: "Completed from design through go live",
  },
  {
    value: "DEV to PROD",
    label: "Environment coverage",
    note: "Development, Test, UAT and Production",
  },
];

export const eliminationNotes = [
  "Manual expense report creation was eliminated for one automated workflow.",
  "Manual employee bank account creation was eliminated for one automated workflow.",
];

/* Graph 01: delivery scope, shown as ranges. */
export const graphDeliveryScope = {
  id: "graph-delivery-scope",
  title: "Delivery scope",
  caption:
    "Both figures are approximate ranges rather than exact totals, so the full range is shown.",
  axisMax: 30,
  unit: "items",
  rows: [
    { label: "Oracle integrations", min: 20, max: 25, display: "20 to 25" },
    { label: "BI Publisher reports", min: 10, max: 15, display: "10 to 15" },
  ],
  summary:
    "Approximately 20 to 25 Oracle integrations were built and deployed, and approximately 10 to 15 BI Publisher reports were developed. Both values are ranges, not exact totals.",
};

/* Graph 02: documented processing volume. */
export const graphProcessingVolume = {
  id: "graph-processing-volume",
  title: "Documented processing volume",
  caption:
    "The largest documented file contained approximately 10,000 records and was processed once per day.",
  axisMax: 10000,
  unit: "records",
  rows: [
    {
      label: "Several integration runs",
      value: 5000,
      display: "Approximately 5,000",
    },
    {
      label: "Largest documented daily file",
      value: 10000,
      display: "Approximately 10,000",
    },
  ],
  summary:
    "Several integrations processed approximately 5,000 records in a run. The largest documented file contained approximately 10,000 records and ran once per day. These volumes are not claimed for every integration.",
};

/* Graph 03: implementation and support coverage. */
export const graphCoverage = {
  id: "graph-coverage",
  title: "Implementation coverage",
  caption:
    "Implementation projects were delivered from design through go live. OIC production support spans multiple client environments; no numeric support count is claimed.",
  axisMax: 4,
  unit: "projects",
  rows: [
    { label: "End to end implementation projects", value: 3, display: "3" },
  ],
  summary:
    "Three implementation projects included assigned integrations from design through go live. Multiple client environments received concurrent OIC production support, alongside Oracle ADF application support.",
};

/* Graph 04: selected project populations. */
export const graphPopulations = {
  id: "graph-populations",
  title: "Selected project populations",
  caption: "These figures relate to separate projects and should not be combined.",
  axisMax: 800,
  unit: "records",
  rows: [
    {
      label: "Employees supported by one automated expense workflow",
      value: 300,
      display: "Approximately 300",
    },
    {
      label: "Suppliers covered by one separate supplier project",
      value: 700,
      display: "Approximately 700",
    },
  ],
  summary:
    "One automated expense workflow supported approximately 300 employees. A separate supplier project covered approximately 700 suppliers. These figures relate to separate projects and should not be combined.",
};
