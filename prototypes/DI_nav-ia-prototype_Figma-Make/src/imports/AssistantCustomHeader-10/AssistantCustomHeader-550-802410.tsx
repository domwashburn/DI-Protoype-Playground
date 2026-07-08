import svgPaths from "./svg-d1jk0bke7e";

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[18.75%_43.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 10">
            <g id="Vector">
              <path d={svgPaths.p39bde000} fill="#161616" />
              <path d={svgPaths.p31858b40} fill="#161616" />
              <path d={svgPaths.p6e7fd40} fill="#161616" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[12px] relative size-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[40px]" data-name="Button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent />
      </div>
    </div>
  );
}

function LeftActions() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Left Actions">
      <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <Button />
      </div>
    </div>
  );
}

function PanelTitle() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Panel Title">
      <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center max-w-[312px] min-w-[40px] relative" data-name="Custom chat header">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[18px] max-w-[280px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">Decision Assistant</p>
        <div className="-translate-y-1/2 absolute bg-[#e8e8e8] content-stretch cursor-pointer drop-shadow-[-9px_1px_3.7px_white] flex items-center p-[4px] right-0 rounded-[4px] size-[24px] top-1/2" data-name="inline icon button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Edit">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[6.25%_6.25%_12.5%_6.25%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 13">
                <g id="Vector">
                  <path d="M14 12H0V13H14V12Z" fill="#161616" />
                  <path d={svgPaths.p27b24180} fill="#161616" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelTitleWrapper() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Panel Title Wrapper">
      <PanelTitle />
    </div>
  );
}

function PanelHeaderGroup() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative" data-name="Panel header group">
      <PanelTitleWrapper />
    </div>
  );
}

function ChatTitle() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Chat title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative size-full">
          <PanelHeaderGroup />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Settings--adjust">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
            <g id="Vector">
              <path d={svgPaths.p21417800} fill="#161616" />
              <path d={svgPaths.p2a3480} fill="#161616" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[12px] relative size-full">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Document--multiple-02">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_12.5%_3.13%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.5">
            <g id="Vector">
              <path d={svgPaths.p118cc600} fill="var(--fill-0, #161616)" />
              <path d={svgPaths.p347adc00} fill="var(--fill-0, #161616)" />
              <path d="M10 7H6V8H10V7Z" fill="var(--fill-0, #161616)" />
              <path d={svgPaths.p9023a80} fill="var(--fill-0, #161616)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[12px] relative size-full">
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function TooltipContent() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Tooltip content">
      <div className="content-stretch flex flex-col isolate items-start px-[16px] py-[2px] relative size-full">
        <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] max-w-[176px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.16px] whitespace-nowrap z-[2]">Label</p>
        <div className="absolute bg-[#393939] inset-0 rounded-[2px] z-[1]" data-name="Background" />
      </div>
    </div>
  );
}

function MinWidth() {
  return <div className="h-[0.001px] relative shrink-0 w-[64px] z-[1]" data-name="Min-width" />;
}

function Body() {
  return (
    <div className="content-stretch flex flex-col isolate items-start max-w-[208px] relative rounded-[2px] shrink-0 z-[1]" data-name="Body">
      <TooltipContent />
      <MinWidth />
    </div>
  );
}

function TooltipBodyItem() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col isolate items-center justify-end left-[calc(50%-0.5px)] opacity-0 top-[40px] w-[67px]" data-name="Tooltip body item">
      <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
      <div className="flex items-center justify-center relative shrink-0 z-[2]">
        <div className="-scale-y-100 flex-none">
          <div className="content-stretch flex flex-col items-center px-[16px] relative" data-name="_Tooltip caret item">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="h-[4px] relative shrink-0 w-[8px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4">
                <path d="M0 0L4 4L8 0H0Z" fill="var(--fill-0, #393939)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Body />
    </div>
  );
}

function PanelActions() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-[40px]" data-name="Panel Actions">
      <div className="content-stretch flex flex-col items-start opacity-0 overflow-clip relative shrink-0 w-[40px]" data-name="Chat settings">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent1 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-[40px]" data-name="Assets & Artifacts">
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[40px]" data-name="Button">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ButtonContent2 />
        </div>
        <TooltipBodyItem />
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-[39.894px] relative shrink-0 w-0" data-name="Divider">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 39.894">
          <g id="Divider">
            <rect fill="white" height="39.894" transform="translate(0.5)" width="1.74383e-06" />
            <line id="Line 1" stroke="var(--stroke-0, #C6C6C6)" x1="0.500002" x2="0.5" y1="2.18557e-08" y2="39.894" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Right-panel--open">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
            <path d={svgPaths.p3bc33400} fill="var(--fill-0, #161616)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[12px] relative size-full">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Close">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-1/4" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p314604c0} fill="var(--fill-0, #161616)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[12px] relative size-full">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function OpenCloseExpandActions() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Open Close Expand Actions">
      <Divider />
      <button className="content-stretch cursor-pointer flex flex-col items-start overflow-clip relative shrink-0 w-[40px]" data-name="Expand panel button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent3 />
      </button>
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[40px]" data-name="Close panel button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent4 />
      </div>
    </div>
  );
}

function RightActionGroup() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0" data-name="Right Action Group">
      <PanelActions />
      <OpenCloseExpandActions />
    </div>
  );
}

export default function AssistantCustomHeader() {
  return (
    <div className="bg-white content-stretch flex items-start justify-end relative size-full" data-name="Assistant Custom Header">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-b border-solid inset-0 pointer-events-none" />
      <LeftActions />
      <ChatTitle />
      <RightActionGroup />
    </div>
  );
}