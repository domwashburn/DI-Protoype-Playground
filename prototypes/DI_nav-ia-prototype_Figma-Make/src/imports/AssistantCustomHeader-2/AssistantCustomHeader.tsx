import svgPaths from "./svg-01a1c9skdr";

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[18.75%_43.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 10">
            <g id="Vector">
              <path d={svgPaths.p39bde000} fill="#C6C6C6" />
              <path d={svgPaths.p31858b40} fill="#C6C6C6" />
              <path d={svgPaths.p6e7fd40} fill="#C6C6C6" />
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
        <div className="-translate-y-1/2 absolute bg-[#e8e8e8] content-stretch flex h-[24px] items-center right-0 rounded-[4px] top-1/2 w-[48px]" data-name="inline icon button group">
          <div className="bg-white content-stretch flex isolate items-center p-[4px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0 size-[24px]" data-name="inline icon button">
            <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-[0_-0.5px_0_0] pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
            <div className="overflow-clip relative shrink-0 size-[16px] z-[1]" data-name="Misuse--outline">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-[6.25%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g id="Vector">
                    <path d={svgPaths.p5e25980} fill="#161616" />
                    <path d={svgPaths.p1f2bcb80} fill="#161616" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex isolate items-center p-[4px] relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-[24px]" data-name="inline icon button">
            <div className="overflow-clip relative shrink-0 size-[16px] z-[1]" data-name="Checkmark--outline">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-[6.25%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g id="Vector">
                    <path d={svgPaths.p2e51ba00} fill="#161616" />
                    <path d={svgPaths.p15c6c200} fill="#161616" />
                  </g>
                </svg>
              </div>
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
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Chat title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative size-full">
          <PanelHeaderGroup />
        </div>
      </div>
    </div>
  );
}

export default function AssistantCustomHeader() {
  return (
    <div className="bg-white content-stretch flex items-start justify-end relative size-full" data-name="Assistant Custom Header">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-b border-solid inset-0 pointer-events-none" />
      <LeftActions />
      <ChatTitle />
    </div>
  );
}