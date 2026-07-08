import PageHeaderWrapper from "../PageHeaderWrapper";
import PlaceholderContent from "../PlaceholderContent";
import { InsetLayout } from "../SidePanel";
import styles from "./RulesAndPoliciesPage.module.css";

export default function RulesAndPoliciesPage() {
  const rulesAndPoliciesTabs = [
    { label: "Business rules", isActive: true },
    { label: "Policies", isActive: false },
  ];

  return (
    <div className={styles.pageContainer} data-name="Rules and Policies Page">
      <PageHeaderWrapper title="Rules and Policies" tabs={rulesAndPoliciesTabs} />

      <InsetLayout>
        {/* .pageContent is the scroll boundary — must be inside InsetLayout
            so the absolute-positioned section panel overlays visible content correctly. */}
        <div className={styles.pageContent}>
          <PlaceholderContent
            title="Rules and Policies"
            description="This section will contain rules and policies management."
            variant="section"
          />
        </div>
      </InsetLayout>
    </div>
  );
}