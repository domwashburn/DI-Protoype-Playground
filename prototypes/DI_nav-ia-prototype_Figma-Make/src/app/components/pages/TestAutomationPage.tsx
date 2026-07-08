import { useState } from "react";
import {
  TreeView,
  TreeNode as CarbonTreeNode,
  ContentSwitcher,
  Switch,
  Tile,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from "@carbon/react";
import {
  Play,
  Folder,
  Document,
  Function_2,
  ReportData,
  Filter,
  Add,
  Search,
  TrashCan,
  Edit,
  CheckmarkFilled,
  WarningFilled,
  OverflowMenuVertical,
} from "@carbon/icons-react";
import { InsetLayout } from "../SidePanel";
import styles from "./TestAutomationPage.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestAutomationPageProps {
  automationId?: string;
}

type IconKind = "folder" | "document" | "function" | "report";

interface TreeItem {
  id: string;
  label: string;
  icon: IconKind;
  children?: TreeItem[];
}

// ─── Stable icon wrappers (required by Carbon TreeNode renderIcon) ────────────

const FolderIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Folder size={16} {...(p as any)} />
);
const DocumentIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Document size={16} {...(p as any)} />
);
const FunctionIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Function_2 size={16} {...(p as any)} />
);
const ReportIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <ReportData size={16} {...(p as any)} />
);

function getIconComponent(kind: IconKind) {
  switch (kind) {
    case "folder":
      return FolderIcon;
    case "function":
      return FunctionIcon;
    case "report":
      return ReportIcon;
    default:
      return DocumentIcon;
  }
}

// ─── Mock tree data matching the Figma design ─────────────────────────────────

const TREE_DATA: TreeItem[] = [
  { id: "overview", label: "Overview", icon: "report" },
  {
    id: "task-model-1",
    label: "Task model name",
    icon: "folder",
    children: [
      {
        id: "tm1-func1",
        label: "Function 1",
        icon: "folder",
        children: [
          {
            id: "tm1-f1-tc1a",
            label: "Test Case 1-A",
            icon: "function",
          },
          {
            id: "tm1-f1-tc1b",
            label: "Test Case 1-B",
            icon: "document",
          },
        ],
      },
      {
        id: "tm1-func2",
        label: "Function 2",
        icon: "folder",
        children: [
          {
            id: "tm1-f2-tc2a",
            label: "Test Case 2-A",
            icon: "document",
          },
          {
            id: "tm1-f2-tc2b",
            label: "Test Case 2-B",
            icon: "document",
          },
        ],
      },
    ],
  },
  {
    id: "task-model-2",
    label: "Task model name",
    icon: "folder",
    children: [
      {
        id: "tm2-func1",
        label: "Function 1",
        icon: "folder",
        children: [
          {
            id: "tm2-f1-tc1a",
            label: "Test Case 1-A",
            icon: "document",
          },
          {
            id: "tm2-f1-tc1b",
            label: "Test Case 1-B",
            icon: "document",
          },
        ],
      },
    ],
  },
  {
    id: "decision-model-1",
    label: "Decision model name",
    icon: "folder",
    children: [
      {
        id: "dm1-tc1a",
        label: "Test Case 1-A",
        icon: "function",
      },
      {
        id: "dm1-tc1b",
        label: "Test Case 1-B",
        icon: "document",
      },
    ],
  },
];

// ─── Mock assertion data ──────────────────────────────────────────────────────

interface Assertion {
  id: string;
  title: string;
  status: "pass" | "fail";
  field: string;
  expected: string;
  actual: string;
}

const MOCK_ASSERTIONS: Assertion[] = [
  {
    id: "a1",
    title: "Input: applicant age",
    status: "pass",
    field: "applicant.age",
    expected: "≥ 18",
    actual: "25",
  },
  {
    id: "a2",
    title: "Output: risk level",
    status: "fail",
    field: "result.riskLevel",
    expected: '"low"',
    actual: '"medium"',
  },
  {
    id: "a3",
    title: "Output: premium amount",
    status: "pass",
    field: "result.premium",
    expected: "$120.00",
    actual: "$120.00",
  },
];

const MOCK_INPUT_ROWS = [
  { field: "applicant.age", type: "Integer", value: "25" },
  {
    field: "applicant.income",
    type: "Decimal",
    value: "50000",
  },
  {
    field: "applicant.creditScore",
    type: "Integer",
    value: "720",
  },
  { field: "policy.type", type: "String", value: '"standard"' },
];

const MOCK_JSON = `{
  "applicant": {
    "age": 25,
    "income": 50000,
    "creditScore": 720
  },
  "policy": {
    "type": "standard"
  }
}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function findItem(
  items: TreeItem[],
  id: string,
): TreeItem | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItem(item.children, id);
      if (found) return found;
    }
  }
}

function renderTreeNodes(nodes: TreeItem[]): React.ReactNode {
  return nodes.map((node) => (
    <CarbonTreeNode
      key={node.id}
      id={node.id}
      label={node.label}
      renderIcon={getIconComponent(node.icon)}
      isExpanded={node.icon === "folder"}
    >
      {node.children && node.children.length > 0
        ? renderTreeNodes(node.children)
        : null}
    </CarbonTreeNode>
  ));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestAutomationPage({
  automationId: _automationId,
}: TestAutomationPageProps) {
  const [activeView, setActiveView] = useState<
    "test-cases" | "test-runs"
  >("test-cases");
  const [selectedItemId, setSelectedItemId] =
    useState("tm1-f1-tc1a");
  const [activeContentTab, setActiveContentTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const selectedItem = findItem(TREE_DATA, selectedItemId);
  const isLeaf =
    selectedItem &&
    selectedItem.icon !== "folder" &&
    selectedItem.id !== "overview";

  const handleTreeSelect = (
    _e: React.MouseEvent,
    node: { id: string },
  ) => {
    setSelectedItemId(node.id);
  };

  const handleContentTabChange = ({
    index,
  }: {
    index: number;
  }) => {
    setActiveContentTab(index);
  };

  return (
    <div className={styles.pageContainer}>
      {/* ── Section content with panel influence support ── */}
      <InsetLayout>
        <div className={styles.splitLayoutWrapper}>
          <div className={styles.splitLayout}>
            {/* ── Left panel: artifact tree ── */}
            <div className={styles.leftPanel}>
              {/* ── Sub-tab bar: Test Cases | Test Runs + Play button ── */}
              <div className={styles.subTabBar}>
                <div className={styles.subTabsList}>
                  <button
                    type="button"
                    className={`${styles.subTab} ${
                      activeView === "test-cases"
                        ? styles.subTabActive
                        : styles.subTabInactive
                    }`}
                    onClick={() => setActiveView("test-cases")}
                  >
                    Test Cases
                  </button>
                  <button
                    type="button"
                    className={`${styles.subTab} ${
                      activeView === "test-runs"
                        ? styles.subTabActive
                        : styles.subTabInactive
                    }`}
                    onClick={() => setActiveView("test-runs")}
                  >
                    Test Runs
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.playButton}
                  aria-label="Run all tests"
                >
                  <Play size={16} />
                </button>
              </div>

              {/* Toolbar: search + filter + add */}
              <div className={styles.panelToolbar}>
                <div className={styles.searchWrapper}>
                  <span
                    className={styles.searchIconWrap}
                    aria-hidden="true"
                  >
                    <Search size={16} />
                  </span>
                  <input
                    type="search"
                    className={styles.searchInput}
                    placeholder="Find an artifact"
                    value={searchValue}
                    onChange={(e) =>
                      setSearchValue(e.target.value)
                    }
                    aria-label="Find an artifact"
                  />
                </div>
                <button
                  type="button"
                  className={styles.toolbarIconBtn}
                  aria-label="Filter"
                >
                  <Filter size={16} />
                </button>
                <button
                  type="button"
                  className={styles.toolbarIconBtn}
                  aria-label="Add test case"
                >
                  <Add size={16} />
                </button>
              </div>

              {/* Tree navigation */}
              <div className={styles.treeWrapper}>
                <TreeView
                  label="Test cases"
                  selected={[selectedItemId]}
                  onSelect={handleTreeSelect}
                >
                  {renderTreeNodes(TREE_DATA)}
                </TreeView>
              </div>
            </div>

            {/* ── Right content area ── */}
            <div className={styles.mainContent}>
              {isLeaf ? (
                <>
                  {/* Content header: title + content switcher + run button */}
                  <div className={styles.contentHeader}>
                    <div className={styles.contentHeaderLeft}>
                      <h2 className={styles.contentTitle}>
                        {selectedItem.label}
                      </h2>
                    </div>

                    <button
                      type="button"
                      className={styles.runTestBtn}
                      onClick={() =>
                        console.log(
                          "Run test case:",
                          selectedItem.label,
                        )
                      }
                    >
                      Run test case
                      <Play size={16} aria-hidden="true" />
                    </button>
                    <Button
                        kind="primary"
                        size="sm"
                        renderIcon={Add}
                        iconDescription="Add assertion"
                      >
                        Add assertion
                      </Button>
                  </div>

                  {/* ── Content body: two-column layout ── */}
                  <div
                    className={styles.contentBody}
                    aria-label={
                      activeContentTab === 0
                        ? "Data & Assertions"
                        : "Test Results"
                    }
                  >
                    {activeContentTab === 0 ? (
                      <>
                        {/* ── Left: main content column (Assertions) ── */}
                        <div className={styles.contentMain}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "1rem",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "1.25rem",
                                color:
                                  "var(--cds-text-primary)",
                                fontWeight: 400,
                                margin: 0,
                              }}
                            >
                              Assertions
                            </h2>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1rem",
                            }}
                          >
                            {[
                              // ── Primitive scalars ──────────────────────────
                              {
                                id: "t-int",
                                title: "Age — Integer",
                                status: "pass" as const,
                                field: "applicant.age",
                                odmType: "Integer",
                                operator: "≥",
                                expected: "18",
                                actual: "25",
                                isCode: false,
                              },
                              {
                                id: "t-dec",
                                title: "Loan Amount — Decimal",
                                status: "pass" as const,
                                field: "loan.amount",
                                odmType: "Decimal",
                                operator: "between",
                                expected: "1 000 … 500 000",
                                actual: "150 000.50",
                                isCode: false,
                              },
                              {
                                id: "t-bool",
                                title: "Employed — Boolean",
                                status: "fail" as const,
                                field: "applicant.isEmployed",
                                odmType: "Boolean",
                                operator: "is",
                                expected: "true",
                                actual: "false",
                                isCode: false,
                              },
                              {
                                id: "t-str",
                                title: "Policy Type — String",
                                status: "pass" as const,
                                field: "policy.type",
                                odmType: "String",
                                operator: "equals",
                                expected: '"standard"',
                                actual: '"standard"',
                                isCode: false,
                              },
                              // ── Temporal types ─────────────────────────────
                              {
                                id: "t-date",
                                title: "Birth Date — Date",
                                status: "pass" as const,
                                field: "applicant.birthDate",
                                odmType: "Date",
                                operator: "before",
                                expected: "2006-01-01",
                                actual: "1999-03-15",
                                isCode: false,
                              },
                              {
                                id: "t-time",
                                title:
                                  "Appointment Time — Time",
                                status: "fail" as const,
                                field:
                                  "appointment.scheduledTime",
                                odmType: "Time",
                                operator: "after",
                                expected: "09:00:00",
                                actual: "08:45:00",
                                isCode: false,
                              },
                              {
                                id: "t-datetime",
                                title:
                                  "Policy Start — DateTime",
                                status: "pass" as const,
                                field: "policy.startDate",
                                odmType: "DateTime",
                                operator: "equals",
                                expected:
                                  "2024-01-01T00:00:00Z",
                                actual: "2024-01-01T00:00:00Z",
                                isCode: false,
                              },
                              {
                                id: "t-dur",
                                title: "Loan Term — Duration",
                                status: "pass" as const,
                                field: "loan.term",
                                odmType: "Duration",
                                operator: "equals",
                                expected: "P5Y",
                                actual: "P5Y",
                                isCode: false,
                              },
                              // ── Enumeration ────────────────────────────────
                              {
                                id: "t-enum",
                                title:
                                  "Risk Level — Enumeration",
                                status: "fail" as const,
                                field: "result.riskLevel",
                                odmType: "Enumeration",
                                operator: "in",
                                expected: "[LOW, MEDIUM]",
                                actual: "HIGH",
                                isCode: false,
                              },
                              // ── List / Array types ─────────────────────────
                              {
                                id: "t-list-contains",
                                title:
                                  "Coverage Types — List contains",
                                status: "pass" as const,
                                field: "policy.coverageTypes",
                                odmType: "List<String>",
                                operator: "contains",
                                expected: '"LIFE"',
                                actual:
                                  '["LIFE","HEALTH","AUTO"]',
                                isCode: true,
                              },
                              {
                                id: "t-list-size",
                                title: "Dependents — List size",
                                status: "fail" as const,
                                field:
                                  "applicant.dependents.size()",
                                odmType: "List<Dependent>",
                                operator: "equals",
                                expected: "2",
                                actual: "3",
                                isCode: false,
                              },
                              {
                                id: "t-list-index",
                                title:
                                  "Dependents[0].age — List item",
                                status: "fail" as const,
                                field:
                                  "applicant.dependents[0].age",
                                odmType: "List<Dependent>",
                                operator: "equals",
                                expected: "5",
                                actual: "8",
                                isCode: false,
                              },
                              {
                                id: "t-list-all",
                                title:
                                  "All Premiums > 0 — for all",
                                status: "pass" as const,
                                field:
                                  "result.lineItems[*].premium",
                                odmType: "List<LineItem>",
                                operator: "for all: >",
                                expected: "0",
                                actual: "✓ min=12.00",
                                isCode: false,
                              },
                              // ── Business Object (nested) ────────────────────
                              {
                                id: "t-obj",
                                title:
                                  "Address — Business Object",
                                status: "pass" as const,
                                field: "applicant.address",
                                odmType: "Address",
                                operator: "equals",
                                expected:
                                  '{\n  city: "Chicago",\n  zip: "60601"\n}',
                                actual:
                                  '{\n  city: "Chicago",\n  zip: "60601"\n}',
                                isCode: true,
                              },
                              {
                                id: "t-obj-nested",
                                title:
                                  "Underwriting Score — nested path",
                                status: "fail" as const,
                                field:
                                  "result.underwriting.score",
                                odmType: "Decimal",
                                operator: "≥",
                                expected: "700",
                                actual: "680",
                                isCode: false,
                              },
                              // ── Map / Dictionary ────────────────────────────
                              {
                                id: "t-map",
                                title:
                                  "Premium Factor — Map lookup",
                                status: "pass" as const,
                                field:
                                  'result.premiumFactors["AGE"]',
                                odmType: "Map<String, Decimal>",
                                operator: "equals",
                                expected: "1.2",
                                actual: "1.2",
                                isCode: false,
                              },
                            ].map((assertion) => (
                              <Tile
                                key={assertion.id}
                                className={styles.assertionCard}
                              >
                                {/* Card header */}
                                <div
                                  className={
                                    styles.assertionCardHeader
                                  }
                                >
                                  <h3
                                    className={
                                      styles.assertionCardTitle
                                    }
                                  >
                                    {assertion.title}
                                  </h3>
                                  <span
                                    className={`${styles.assertionStatus} ${
                                      assertion.status ===
                                      "pass"
                                        ? styles.assertionStatusPass
                                        : styles.assertionStatusFail
                                    }`}
                                    aria-label={
                                      assertion.status ===
                                      "pass"
                                        ? "Pass"
                                        : "Fail"
                                    }
                                  >
                                    {assertion.status ===
                                    "pass" ? (
                                      <CheckmarkFilled
                                        size={16}
                                      />
                                    ) : (
                                      <WarningFilled
                                        size={16}
                                      />
                                    )}
                                    {assertion.status === "pass"
                                      ? "Pass"
                                      : "Fail"}
                                  </span>
                                  <Button
                                    kind="ghost"
                                    size="sm"
                                    renderIcon={
                                      OverflowMenuVertical
                                    }
                                    iconDescription="More options"
                                    hasIconOnly
                                  />
                                </div>

                                {/* Card body */}
                                <div
                                  className={
                                    styles.assertionCardBody
                                  }
                                >
                                  {/* Top section: Field, Type, Operator */}
                                  <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
                                    {/* Field path */}
                                    <div style={{ flex: 2 }}>
                                      <p className={styles.assertionLabel}>Field</p>
                                      <p className={styles.assertionValue} style={{ fontFamily: "monospace", fontSize: "11px" }}>
                                        {assertion.field}
                                      </p>
                                    </div>
                                    {/* ODM type */}
                                    <div style={{ flex: 1 }}>
                                      <p className={styles.assertionLabel}>Data Type</p>
                                      <p className={styles.assertionValue} style={{ fontFamily: "monospace", fontSize: "11px" }}>
                                        {assertion.odmType}
                                      </p>
                                    </div>
                                    {/* Operator */}
                                    <div style={{ flex: 1 }}>
                                      <p className={styles.assertionLabel}>Operator</p>
                                      <p className={styles.assertionValue}>{assertion.operator}</p>
                                    </div>
                                  </div>

                                  {/* 50/50 split for Expected and Actual */}
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                    {/* Expected */}
                                    <div>
                                      <p className={styles.assertionLabel}>Expected</p>
                                      {assertion.isCode ? (
                                        <pre style={{ fontFamily: "monospace", fontSize: "11px", margin: 0, color: "var(--cds-text-primary)", background: "var(--cds-layer-accent)", padding: "3px 6px", borderRadius: "2px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                                          {assertion.expected}
                                        </pre>
                                      ) : (
                                        <p className={styles.assertionValue}>{assertion.expected}</p>
                                      )}
                                    </div>
                                    {/* Actual */}
                                    <div>
                                      <p className={styles.assertionLabel}>Actual</p>
                                      {assertion.isCode ? (
                                        <pre style={{ fontFamily: "monospace", fontSize: "11px", margin: 0, color: assertion.status === "fail" ? "var(--cds-support-error)" : "var(--cds-text-primary)", background: "var(--cds-layer-accent)", padding: "3px 6px", borderRadius: "2px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                                          {assertion.actual}
                                        </pre>
                                      ) : (
                                        <p className={styles.assertionValue} style={assertion.status === "fail" ? { color: "var(--cds-support-error)" } : {}}>
                                          {assertion.actual}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Tile>
                            ))}
                          </div>
                        </div>

                        {/* ── Right: aside content column (Inputs) ── */}
                        <aside className={styles.contentAside}>
                          <Tile
                            className={styles.contentCard}
                            style={{ padding: 0 }}
                          >
                            <Tabs>
                              <div
                                className={styles.cardHeader}
                              >
                                {/* Actions — top left */}
                                <div
                                  className={
                                    styles.cardHeaderActions
                                  }
                                >
                                  <span
                                    style={{
                                      fontSize: "0.875rem",
                                      fontWeight: 600,
                                      color:
                                        "var(--cds-text-primary)",
                                      display: "flex",
                                      alignItems: "center",
                                      paddingLeft: "1rem",
                                    }}
                                  >
                                    Input Data
                                  </span>
                                </div>

                                {/* Contained tabs — top right */}
                                <div
                                  className={
                                    styles.cardHeaderTabs
                                  }
                                >
                                  <TabList
                                    aria-label="Input view"
                                    contained
                                  >
                                    <Tab>Properties</Tab>
                                    <Tab>JSON</Tab>
                                  </TabList>
                                </div>
                              </div>

                              <TabPanels>
                                {/* Properties list view */}
                                <TabPanel
                                  style={{ padding: 0 }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    {MOCK_INPUT_ROWS.map(
                                      (row, index) => {
                                        const assertion =
                                          MOCK_ASSERTIONS.find(
                                            (a) =>
                                              a.field ===
                                              row.field,
                                          );
                                        return (
                                          <div
                                            key={row.field}
                                            style={{
                                              padding:
                                                "0.75rem 1rem",
                                              borderBottom:
                                                index <
                                                MOCK_INPUT_ROWS.length -
                                                  1
                                                  ? "1px solid var(--cds-border-subtle)"
                                                  : "none",
                                              backgroundColor:
                                                "var(--cds-layer-01)",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent:
                                                  "space-between",
                                                alignItems:
                                                  "center",
                                                marginBottom:
                                                  "0.25rem",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  fontSize:
                                                    "0.75rem",
                                                  fontFamily:
                                                    "monospace",
                                                  color:
                                                    "var(--cds-text-secondary)",
                                                }}
                                              >
                                                {row.type}
                                              </span>
                                              {assertion ? (
                                                <span
                                                  className={`${styles.assertionStatus} ${
                                                    assertion.status ===
                                                    "pass"
                                                      ? styles.assertionStatusPass
                                                      : styles.assertionStatusFail
                                                  }`}
                                                  style={{
                                                    margin: 0,
                                                    padding:
                                                      "2px 6px",
                                                    fontSize:
                                                      "0.75rem",
                                                  }}
                                                  aria-label={
                                                    assertion.status ===
                                                    "pass"
                                                      ? "Pass"
                                                      : "Fail"
                                                  }
                                                >
                                                  {assertion.status ===
                                                  "pass" ? (
                                                    <CheckmarkFilled
                                                      size={12}
                                                    />
                                                  ) : (
                                                    <WarningFilled
                                                      size={12}
                                                    />
                                                  )}
                                                  {assertion.status ===
                                                  "pass"
                                                    ? "Pass"
                                                    : "Fail"}
                                                </span>
                                              ) : null}
                                            </div>
                                            <div
                                              style={{
                                                fontSize:
                                                  "0.875rem",
                                                fontWeight: 600,
                                                color:
                                                  "var(--cds-text-primary)",
                                                marginBottom:
                                                  "0.25rem",
                                                wordBreak:
                                                  "break-all",
                                              }}
                                            >
                                              {row.field}
                                            </div>
                                            <div
                                              style={{
                                                fontSize:
                                                  "0.875rem",
                                                color:
                                                  "var(--cds-text-primary)",
                                                wordBreak:
                                                  "break-all",
                                              }}
                                            >
                                              {row.value}
                                            </div>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </TabPanel>

                                {/* JSON view */}
                                <TabPanel>
                                  <div
                                    className={styles.cardBody}
                                  >
                                    <pre
                                      className={
                                        styles.jsonBlock
                                      }
                                    >
                                      {MOCK_JSON}
                                    </pre>
                                  </div>
                                </TabPanel>
                              </TabPanels>
                            </Tabs>
                          </Tile>
                        </aside>
                      </>
                    ) : (
                      /* Test Results placeholder */
                      <div className={styles.contentMain} />
                    )}
                  </div>
                </>
              ) : (
                /* Folder or Overview node selected — no detail pane */
                <div className={styles.emptyContent} />
              )}
            </div>
          </div>
        </div>
      </InsetLayout>
    </div>
  );
}