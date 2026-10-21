export type StatisticsCell = number | string | null;

export type StatisticsRow = {
  label: string;
  period: string;
  group: string;
  values: StatisticsCell[];
  unit?: string;
};

export type StatisticsColumn = { label: string; unit: string };

export type StatisticsSheet = {
  id: string;
  title: string;
  topic: string;
  kind: "numeric" | "categorical" | "directory" | "glossary" | "withheld";
  unit: string;
  columns: StatisticsColumn[];
  rows: StatisticsRow[];
  sources: string[];
  notes: string[];
  periods: string[];
};

export type StatisticsWorkbook = {
  workbook: string;
  sha256: string;
  district: string;
  sheets: StatisticsSheet[];
};

export type StatisticsChartModel = {
  title: string;
  labels: string[];
  series: { name: string; values: (number | null)[] }[];
  unit: string;
  missing: number;
  kind?: StatisticsChartKind;
  matrix?: { columns: string[]; categories: string[]; values: [number, number, number][] };
  totalValues?: number;
};

export type StatisticsChartKind = "bar" | "column" | "donut" | "line" | "heatmap";
export type StatisticsPresentation = {
  chart: StatisticsChartKind;
  width: "wide" | "narrow" | "half" | "full";
};

export type StatisticsSheetProps = { sheet: StatisticsSheet };
export type StatisticsChartProps = { model: StatisticsChartModel; colorToken?: string };
