import svgPaths from "./svg-hqiqe1zin4";

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

function Match360L1Nav() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col items-start left-0 top-0 z-[3]" data-name="Match 360 L1 nav">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <NavHeader />
      <NavItems />
    </div>
  );
}

function SubHeading1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Sub heading 1">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] whitespace-pre">Data type</p>
    </div>
  );
}

function SubHeaderGroup() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Sub-header group">
      <SubHeading1 />
    </div>
  );
}

function Start() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start />
      <End />
    </div>
  );
}

function Label() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0043ce] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">published</p>
      <Resizer />
    </div>
  );
}

function TagContent() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[4px] py-0 relative rounded-[24px] shrink-0" data-name="Tag content">
      <Label />
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#d0e2ff] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="tag">
      <TagContent />
    </div>
  );
}

function Tag1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag />
    </div>
  );
}

function HeaderWrapper() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-nowrap whitespace-pre">Data type display label</p>
      <Tag1 />
    </div>
  );
}

function HeaderWrapper1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header wrapper">
      <SubHeaderGroup />
      <HeaderWrapper />
    </div>
  );
}

function HeaderGroupLargeHeaderGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Header group / Large header group">
      <HeaderWrapper1 />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Add">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p349d7700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <Add />
    </div>
  );
}

function ButtonContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center pl-[16px] pr-[64px] py-[11px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[2]">Run matching</p>
          <Icon12 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative">
        <ButtonContent2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#0f62fe] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow h-[40px] items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Header actions">
      <Button1 />
    </div>
  );
}

function HeaderWrapper2() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="header wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-start pb-[8px] pl-[32px] pr-[16px] pt-[16px] relative w-full">
          <HeaderGroupLargeHeaderGroup />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Overview</p>
    </div>
  );
}

function TabsItems() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#0f62fe] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow />
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Attributes and fields</p>
    </div>
  );
}

function TabsItems1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow1 />
    </div>
  );
}

function TextOverflow2() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Display settings</p>
    </div>
  );
}

function TabsItems2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow2 />
    </div>
  );
}

function TextOverflow3() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Match settings</p>
    </div>
  );
}

function TabsItems3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow3 />
    </div>
  );
}

function TextOverflow4() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Tasks</p>
    </div>
  );
}

function TabsItems4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow4 />
    </div>
  );
}

function Tabs() {
  return (
    <div className="basis-0 content-stretch flex gap-px grow items-start min-h-px min-w-px overflow-clip relative shrink-0" data-name="Tabs">
      <TabsItems />
      <TabsItems1 />
      <TabsItems2 />
      <TabsItems3 />
      <TabsItems4 />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p1aa0f580} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon14() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <ChevronRight />
    </div>
  );
}

function ButtonContent4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[12px] relative w-full">
          <Icon14 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent4 />
    </div>
  );
}

function TabsButtonItem1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="_Tabs button item">
      <Button3 />
    </div>
  );
}

function Tabs1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 z-[1]" data-name="Tabs">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-px items-start pl-[16px] pr-0 py-0 relative w-full">
          <Tabs />
          <TabsButtonItem1 />
        </div>
      </div>
    </div>
  );
}

function TabWrapper() {
  return (
    <div className="content-stretch flex isolate items-start relative shrink-0 w-full z-[1]" data-name="tab wrapper">
      <Tabs1 />
    </div>
  );
}

function DataTypeDetailsHeader() {
  return (
    <div className="bg-white relative shrink-0 w-full z-[2]" data-name="Data type details header">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip relative w-full">
        <HeaderWrapper2 />
        <TabWrapper />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ErrorFilled() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g id="Error--filled">
        <rect fill="white" fillOpacity="0.01" height="20" style={{ mixBlendMode: "multiply" }} width="20" />
        <path d={svgPaths.p25572c00} fill="var(--fill-0, #DA1E28)" id="Vector" />
      </g>
    </svg>
  );
}

function StatusIcon() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[20px]" data-name="Status icon">
      <div className="absolute bg-white inset-1/4" data-name="Fill" />
      <ErrorFilled />
    </div>
  );
}

function IconMargin() {
  return (
    <div className="box-border content-stretch flex items-start pb-0 pt-[14px] px-0 relative self-stretch shrink-0" data-name="Icon margin">
      <StatusIcon />
    </div>
  );
}

function TitleMessage() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[4px] grow items-start leading-[18px] min-h-px min-w-px not-italic px-0 py-[15px] relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]" data-name="Title + Message">
      <p className="font-['IBM_Plex_Sans:SemiBold',_sans-serif] relative shrink-0 w-full">Sample notification banner</p>
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] relative shrink-0 w-full">{`Sample `}</p>
    </div>
  );
}

function Notification() {
  return (
    <div className="bg-[#fff1f1] content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Notification">
      <div aria-hidden="true" className="absolute border border-[rgba(218,30,40,0.3)] border-solid inset-0 pointer-events-none" />
      <div className="flex items-center justify-center relative self-stretch shrink-0" style={{ "--transform-inner-width": "70", "--transform-inner-height": "70", width: "calc(1px * ((var(--transform-inner-height) * 1) + (var(--transform-inner-width) * 0)))" } as React.CSSProperties}>
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[70px]" data-name="Border">
            <div className="absolute bottom-0 left-0 right-0 top-[-3px]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 3">
                <line id="Border" stroke="var(--stroke-0, #DA1E28)" strokeWidth="3" x2="70" y1="1.5" y2="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <IconMargin />
      <TitleMessage />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start not-italic relative shrink-0 text-[#6929c4] w-full" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[20px] w-full">Page content placeholder</p>
      <p className="leading-[18px] relative shrink-0 text-[14px] tracking-[0.16px] w-full">Page content goes here</p>
    </div>
  );
}

function PageContent() {
  return (
    <div className="basis-0 bg-[#e8daff] grow min-h-px min-w-px relative shrink-0 w-full" data-name="Page content">
      <div aria-hidden="true" className="absolute border border-[#6929c4] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function PageContent1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0 z-[1]" data-name="page content">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-0 pl-[24px] pr-[40px] pt-[16px] relative size-full">
          <Notification />
          <PageContent />
        </div>
      </div>
    </div>
  );
}

function PageContainer() {
  return (
    <div className="basis-0 bg-[#f4f4f4] content-stretch flex grow isolate items-start min-h-px min-w-px relative shrink-0 w-full z-[1]" data-name="Page container">
      <PageContent1 />
    </div>
  );
}

function PageContent2() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0 z-[2]" data-name="Page Content">
      <div className="overflow-x-clip overflow-y-auto size-full">
        <div className="box-border content-stretch flex flex-col isolate items-start pl-[48px] pr-0 py-0 relative size-full">
          <DataTypeDetailsHeader />
          <PageContainer />
        </div>
      </div>
    </div>
  );
}

export default function ApplicationContent() {
  return (
    <div className="content-stretch flex isolate items-start relative size-full" data-name="Application Content">
      <Match360L1Nav />
      <PageContent2 />
    </div>
  );
}