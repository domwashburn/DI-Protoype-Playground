import svgPaths from "./svg-mkmz6395hr";

function Home() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Home">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p1dc70500} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LinkIcon() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Home</p>
      </div>
    </div>
  );
}

function Home1() {
  return (
    <div className="bg-[rgba(141,141,141,0.24)] box-border content-stretch flex gap-[24px] h-[32px] items-center px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Home">
      <Home />
      <LinkIcon />
      <div className="absolute inset-0 pointer-events-none shadow-[3px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function ChatBot() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chat-bot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chat-bot">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p3babe700} fill="#525252" />
            <path d={svgPaths.p66f8400} fill="#525252" />
            <path d={svgPaths.p2c68df00} fill="#525252" />
            <path d={svgPaths.p2bc1ee00} fill="#525252" />
          </g>
        </g>
      </svg>
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
    <div className="bg-white content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start />
      <End />
    </div>
  );
}

function Label() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <div className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9ef0f0] text-[12px] text-nowrap tracking-[0.32px]">
        <p className="leading-[16px] whitespace-pre">Beta</p>
      </div>
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

function TagReadOnly() {
  return (
    <div className="bg-[#005d5d] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="Tag - Read-only">
      <TagContent />
    </div>
  );
}

function BetaTagCustom() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Beta Tag CUSTOM">
      <TagReadOnly />
    </div>
  );
}

function LinkIcon1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Decision assistant</p>
      </div>
      <BetaTagCustom />
    </div>
  );
}

function DecisionIntelligenceAssistant() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Decision Intelligence Assistant">
      <ChatBot />
      <LinkIcon1 />
    </div>
  );
}

function DecisionTree() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p20ff0e80} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LinkIcon2() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Decision automations</p>
      </div>
    </div>
  );
}

function DecisionAutomations() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Decision automations">
      <DecisionTree />
      <LinkIcon2 />
    </div>
  );
}

function Rule() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Rule">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Rule">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d="M11 8H5V9H11V8Z" fill="#525252" />
            <path d="M11 5H5V6H11V5Z" fill="#525252" />
            <path d={svgPaths.p16878b90} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LinkIcon3() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Rules and policies</p>
      </div>
    </div>
  );
}

function RulesAndPolicies() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Rules and policies">
      <Rule />
      <LinkIcon3 />
    </div>
  );
}

function BusinessMetrics() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Business-metrics">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Business-metrics">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p21099980} fill="var(--fill-0, #525252)" />
            <path d={svgPaths.pf56c280} fill="var(--fill-0, #525252)" />
            <path d={svgPaths.p14d7e980} fill="var(--fill-0, #525252)" />
            <path d={svgPaths.p677c280} fill="var(--fill-0, #525252)" />
            <path d={svgPaths.p4e37b00} fill="var(--fill-0, #525252)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LinkIcon4() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Dashboards</p>
      </div>
    </div>
  );
}

function Dashboards() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Dashboards">
      <BusinessMetrics />
      <LinkIcon4 />
    </div>
  );
}

function Trophy() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Trophy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Trophy">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p2d07bdf0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LinkIcon5() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Objectives and goals</p>
      </div>
    </div>
  );
}

function ObjectivesAndGoals() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Objectives and goals">
      <Trophy />
      <LinkIcon5 />
    </div>
  );
}

function Settings() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Settings">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p15159b00} fill="#525252" />
            <path d={svgPaths.p17d2f500} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p23aae480} fill="var(--fill-0, #C6C6C6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LinkIcon6() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Settings</p>
      </div>
      <Chevron />
    </div>
  );
}

function Settings1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Settings">
      <Settings />
      <LinkIcon6 />
    </div>
  );
}

function LinkIcon7() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Configurations and settings</p>
      </div>
    </div>
  );
}

function ConfigurationsAndSettings() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Configurations and settings">
      <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply shrink-0 size-[16px]" data-name="Spacer" />
      <LinkIcon7 />
    </div>
  );
}

function Help() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Help">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Help">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p2d246af0} fill="#525252" />
            <path d={svgPaths.p374bb70} fill="#525252" />
            <path d={svgPaths.p6cf2d00} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p23aae480} fill="var(--fill-0, #C6C6C6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LinkIcon8() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Support</p>
      </div>
      <Chevron1 />
    </div>
  );
}

function SupportSubMenu() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Support (sub-menu)">
      <Help />
      <LinkIcon8 />
    </div>
  );
}

function Launch() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Launch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Launch">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p36702d80} fill="#525252" />
            <path d={svgPaths.p36cc8580} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LinkIcon9() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Documentation</p>
      </div>
      <Launch />
    </div>
  );
}

function Documentation() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Documentation">
      <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply shrink-0 size-[16px]" data-name="Spacer" />
      <LinkIcon9 />
    </div>
  );
}

function Launch1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Launch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Launch">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p36702d80} fill="#525252" />
            <path d={svgPaths.p36cc8580} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LinkIcon10() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <div className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#c6c6c6] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Give feedback</p>
      </div>
      <Launch1 />
    </div>
  );
}

function OpenATicket() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[24px] h-[32px] items-center mix-blend-multiply px-[16px] py-[7px] relative shrink-0 w-[256px]" data-name="Open a ticket">
      <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply shrink-0 size-[16px]" data-name="Spacer" />
      <LinkIcon10 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[16px] px-0 relative shrink-0">
      <Home1 />
      <DecisionIntelligenceAssistant />
      <DecisionAutomations />
      <RulesAndPolicies />
      <Dashboards />
      <ObjectivesAndGoals />
      <Settings1 />
      <ConfigurationsAndSettings />
      <SupportSubMenu />
      <Documentation />
      <OpenATicket />
    </div>
  );
}

export default function GlobalNavigationL1Navigation() {
  return (
    <div className="bg-[#161616] content-stretch flex flex-col items-start relative size-full" data-name="Global navigation (L1 Navigation)">
      <Frame2 />
    </div>
  );
}