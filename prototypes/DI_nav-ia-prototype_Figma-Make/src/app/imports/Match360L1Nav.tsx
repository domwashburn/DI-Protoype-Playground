import svgPaths from "./svg-w3d6iiaj86";

function SidePanelOpenFilled() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Side-panel--open--filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Side-panel--open--filled">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p10e94e00} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <SidePanelOpenFilled />
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[8px] relative w-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent />
    </div>
  );
}

function Frame630776() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center p-[8px] relative shrink-0">
      <Button />
    </div>
  );
}

function NavHeader() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Nav header">
      <Frame630776 />
    </div>
  );
}

function Dashboard() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Dashboard">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d="M13 10.5H12V13H13V10.5Z" fill="#161616" />
          <path d="M11 8H10V13H11V8Z" fill="#161616" />
          <path d={svgPaths.p287dc200} fill="#161616" />
          <path d={svgPaths.p15fb9780} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function DataConsumptionMasterDataOverview() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="Data consumption/Master Data Overview">
      <Dashboard />
    </div>
  );
}

function Icon1() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <DataConsumptionMasterDataOverview />
    </div>
  );
}

function NavItemContent() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon1 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function MasterDataOverview() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center mix-blend-multiply relative shrink-0 w-[48px]" data-name="Master data overview">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent />
      </div>
    </div>
  );
}

function Search() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Search">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <path d={svgPaths.p154b5b00} fill="var(--fill-0, #161616)" id="Vector" />
      </g>
    </svg>
  );
}

function DataConsumptionSearchMasterData() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="Data consumption/Search master data">
      <Search />
    </div>
  );
}

function Icon2() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <DataConsumptionSearchMasterData />
    </div>
  );
}

function NavItemContent1() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon2 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function SearchMasterData() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center mix-blend-multiply relative shrink-0 w-[48px]" data-name="Search master data">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent1 />
      </div>
    </div>
  );
}

function Template() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Template">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p77b7740} fill="#161616" />
          <path d={svgPaths.p2971ab00} fill="#161616" />
          <path d={svgPaths.p257faa00} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function DataConsumptionMasterDataWorkspace() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="Data consumption/Master data workspace">
      <Template />
    </div>
  );
}

function Icon3() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <DataConsumptionMasterDataWorkspace />
    </div>
  );
}

function NavItemContent2() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon3 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function MasterDataWorkspace() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center mix-blend-multiply relative shrink-0 w-[48px]" data-name="Master data workspace">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent2 />
      </div>
    </div>
  );
}

function DividerLine() {
  return <div className="bg-[#c6c6c6] h-px shrink-0 w-full" data-name="Divider line" />;
}

function ZeroHeightContainer() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow h-0 items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Zero height container">
      <DividerLine />
    </div>
  );
}

function NavItemContent3() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="Nav item content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center p-[8px] relative size-full">
          <ZeroHeightContainer />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function Divider() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[48px]" data-name="Divider">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent3 />
      </div>
    </div>
  );
}

function FileStorage() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="File-storage">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p1e0ee900} fill="#161616" />
          <path d={svgPaths.p5671c00} fill="#161616" />
          <path d={svgPaths.p16130080} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function ConfigurationAssets() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="Configuration/Assets">
      <FileStorage />
    </div>
  );
}

function Icon4() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <ConfigurationAssets />
    </div>
  );
}

function NavItemContent4() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon4 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function Assets() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center mix-blend-multiply relative shrink-0 w-[48px]" data-name="Assets">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent4 />
      </div>
    </div>
  );
}

function DataStructured() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Data--structured">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p3a8a9900} fill="#161616" />
          <path d={svgPaths.p1b6c2f00} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function ConfigurationDataTypes() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="Configuration/Data types">
      <DataStructured />
    </div>
  );
}

function Icon5() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <ConfigurationDataTypes />
    </div>
  );
}

function NavItemContent5() {
  return (
    <div className="basis-0 bg-[rgba(141,141,141,0.2)] box-border content-stretch flex grow h-full items-center min-h-px min-w-px px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <div aria-hidden="true" className="absolute border-[#0f62fe] border-[0px_0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <Icon5 />
      <div className="absolute inset-0 pointer-events-none shadow-[4px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function DataTypes() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[48px]" data-name="Data types">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent5 />
      </div>
    </div>
  );
}

function Task() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Task">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Task">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p3797480} fill="#161616" />
            <path d={svgPaths.p7568d80} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <Task />
    </div>
  );
}

function NavItemContent6() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon6 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function TaskTypes() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center mix-blend-multiply relative shrink-0 w-[48px]" data-name="Task types">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent6 />
      </div>
    </div>
  );
}

function Compare() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Compare">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <path d={svgPaths.p3bb3e700} fill="var(--fill-0, #161616)" id="Vector" />
      </g>
    </svg>
  );
}

function ConfigurationPairReview() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="Configuration/Pair review">
      <Compare />
    </div>
  );
}

function Icon7() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <ConfigurationPairReview />
    </div>
  );
}

function NavItemContent8() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon7 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function PairReview() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center mix-blend-multiply relative shrink-0 w-[48px]" data-name="Pair review">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent8 />
      </div>
    </div>
  );
}

function RunMirror() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Run--mirror">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d="M4.5 9.5V12.5L7 11L4.5 9.5Z" fill="var(--fill-0, #161616)" />
          <path d={svgPaths.p1508a380} fill="var(--fill-0, #161616)" />
          <path d={svgPaths.p3271a380} fill="var(--fill-0, #161616)" />
        </g>
      </g>
    </svg>
  );
}

function AdminJobs() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="Admin/Jobs">
      <RunMirror />
    </div>
  );
}

function Icon8() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <AdminJobs />
    </div>
  );
}

function NavItemContent9() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon8 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function Jobs() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center mix-blend-multiply relative shrink-0 w-[48px]" data-name="Jobs">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent9 />
      </div>
    </div>
  );
}

function Settings() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Settings">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p15159b00} fill="#161616" />
          <path d={svgPaths.p17d2f500} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function AdminInstanceSettings() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="Admin/Instance settings">
      <Settings />
    </div>
  );
}

function Icon9() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <AdminInstanceSettings />
    </div>
  );
}

function NavItemContent11() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon9 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function InstanceSettings() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center mix-blend-multiply relative shrink-0 w-[48px]" data-name="Instance settings">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent11 />
      </div>
    </div>
  );
}

function PrimaryNavItems() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="primary nav items">
      <MasterDataOverview />
      <SearchMasterData />
      <MasterDataWorkspace />
      <Divider />
      <Assets />
      <DataTypes />
      <TaskTypes />
      <Divider />
      <PairReview />
      <Jobs />
      <Divider />
      <InstanceSettings />
    </div>
  );
}

function FooterNavItems() {
  return <div className="content-stretch flex flex-col items-start shrink-0" data-name="footer nav items" />;
}

function NavItems() {
  return (
    <div className="content-stretch flex flex-col h-[674px] items-start justify-between relative shrink-0" data-name="nav items">
      <PrimaryNavItems />
      <FooterNavItems />
    </div>
  );
}

export default function Match360L1Nav() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Match 360 L1 nav">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <NavHeader />
      <NavItems />
    </div>
  );
}