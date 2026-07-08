import svgPaths from "./svg-5ifbkvmkvh";

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

function Icon() {
  return (
    <div className="box-border content-stretch flex h-[18px] items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Icon">
      <DataConsumptionSearchMasterData />
    </div>
  );
}

function NavItemContent() {
  return (
    <div className="basis-0 bg-[rgba(141,141,141,0.12)] box-border content-stretch flex flex-col gap-[10px] grow h-full items-center min-h-px min-w-px mix-blend-multiply px-0 py-[7px] relative shrink-0" data-name="Nav item content">
      <Icon />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function TooltipCaretItem() {
  return (
    <div className="h-[4px] relative w-[16px]" data-name="_Tooltip caret item">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 4">
        <g id="_Tooltip caret item">
          <rect fill="white" fillOpacity="0.01" height="4" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d="M4 0L8 4L12 0H4Z" fill="var(--fill-0, #393939)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TooltipContent() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Tooltip content">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col isolate items-start px-[16px] py-[2px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] max-w-[176px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.16px] whitespace-pre z-[2]">Search master data</p>
          <div className="absolute bg-[#393939] inset-0 rounded-[2px] z-[1]" data-name="Background" />
        </div>
      </div>
    </div>
  );
}

function MinWidth() {
  return <div className="h-[0.001px] shrink-0 w-[64px] z-[1]" data-name="Min-width" />;
}

function Body() {
  return (
    <div className="content-stretch flex flex-col isolate items-start max-w-[208px] relative rounded-[2px] shrink-0 z-[1]" data-name="Body">
      <TooltipContent />
      <MinWidth />
    </div>
  );
}

function Tooltip() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex isolate items-center left-[51px] mix-blend-multiply top-1/2 translate-y-[-50%]" data-name="Tooltip">
      <div className="flex h-[16px] items-center justify-center relative shrink-0 w-[4px] z-[2]">
        <div className="flex-none rotate-[270deg] scale-y-[-100%]">
          <TooltipCaretItem />
        </div>
      </div>
      <Body />
    </div>
  );
}

export default function SearchMasterData() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="Search master data">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <NavItemContent />
      </div>
      <Tooltip />
    </div>
  );
}