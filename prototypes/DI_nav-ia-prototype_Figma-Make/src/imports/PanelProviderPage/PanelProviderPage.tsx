import svgPaths from "./svg-24p6mbw5cr";

function TextOverflow() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[18px] items-start min-w-px overflow-clip relative" data-name="Text Overflow">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] min-w-px not-italic overflow-hidden relative text-[14px] text-ellipsis text-white tracking-[0.16px] whitespace-nowrap">Test cases</p>
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[18px] items-start min-w-px overflow-clip relative" data-name="Text Overflow">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">Test runs</p>
    </div>
  );
}

function PageTabs() {
  return (
    <div className="relative shrink-0 w-full" data-name="Page tabs">
      <div className="content-stretch flex items-start p-[16px] relative size-full">
        <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative rounded-[4px]" data-name="Content switcher">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none rounded-[4px]" />
          <div aria-hidden="true" className="absolute border border-[#161616] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <div className="bg-[#161616] flex-[1_0_0] min-w-px relative rounded-[4px]" data-name="_Content switcher text item">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-start px-[16px] py-[7px] relative size-full">
                <TextOverflow />
              </div>
            </div>
          </div>
          <div className="flex-[1_0_0] min-w-px relative rounded-br-[4px] rounded-tr-[4px]" data-name="_Content switcher text item">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-start px-[16px] py-[7px] relative size-full">
                <TextOverflow1 />
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#161616] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="content-stretch flex items-center justify-center p-[12px] relative shrink-0" data-name="Search icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Search">
        <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.14%_9.37%_9.37%_6.14%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5177 13.5177">
            <path d={svgPaths.p23d74400} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HideTextOverflow() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[18px] items-start min-w-px overflow-clip relative" data-name="Hide text overflow">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] min-w-px not-italic relative text-[#a8a8a8] text-[14px] text-left tracking-[0.16px]">Find an artifact</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Filter">
        <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p32e016c0} fill="var(--fill-0, #161616)" id="Vector" />
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

function PopoverOverflow() {
  return <div className="content-stretch flex flex-col items-start relative shrink-0 size-[0.001px]" data-name="Popover overflow" />;
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Add">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-1/4" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p22ea8600} fill="var(--fill-0, #161616)" id="Vector" />
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

function TextOverflow2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Overview</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Report--data">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_15.63%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <g id="Vector">
              <path d="M6 9H5V11H6V9Z" fill="#525252" />
              <path d="M8.5 8H7.5V11H8.5V8Z" fill="#525252" />
              <path d="M3.5 6H2.5V11H3.5V6Z" fill="#525252" />
              <path d={svgPaths.p28731300} fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
      <TextOverflow2 />
    </div>
  );
}

function CaretIcon() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Caret + Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret--down">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[31.25%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d="M8 0L4 5L0 0H8Z" fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Folder">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
            <path d={svgPaths.pf5ce500} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Task model name</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <CaretIcon />
      <TextOverflow3 />
    </div>
  );
}

function CaretIcon1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Caret + Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret--down">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[31.25%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d="M8 0L4 5L0 0H8Z" fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Folder">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
            <path d={svgPaths.pf5ce500} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Function 1</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <CaretIcon1 />
      <TextOverflow4 />
    </div>
  );
}

function TextOverflow5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Test Case 1-A</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Function--2">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p94a2b00} fill="var(--fill-0, #161616)" id="Vector" />
          </svg>
        </div>
      </div>
      <TextOverflow5 />
    </div>
  );
}

function TextOverflow6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Test Case 1-B</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Document">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
            <g id="Vector">
              <path d={svgPaths.pe6f1e00} fill="#525252" />
              <path d="M8 10H2V11H8V10Z" fill="#525252" />
              <path d="M8 7H2V8H8V7Z" fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
      <TextOverflow6 />
    </div>
  );
}

function CaretIcon2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Caret + Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret--down">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[31.25%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d="M8 0L4 5L0 0H8Z" fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Folder">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
            <path d={svgPaths.pf5ce500} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Function 2</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <CaretIcon2 />
      <TextOverflow7 />
    </div>
  );
}

function TextOverflow8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Test Case 2-A</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Document">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
            <g id="Vector">
              <path d={svgPaths.pe6f1e00} fill="#525252" />
              <path d="M8 10H2V11H8V10Z" fill="#525252" />
              <path d="M8 7H2V8H8V7Z" fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
      <TextOverflow8 />
    </div>
  );
}

function TextOverflow9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Test Case 2-B</p>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Document">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
            <g id="Vector">
              <path d={svgPaths.pe6f1e00} fill="#525252" />
              <path d="M8 10H2V11H8V10Z" fill="#525252" />
              <path d="M8 7H2V8H8V7Z" fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
      <TextOverflow9 />
    </div>
  );
}

function CaretIcon3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Caret + Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret--down">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[31.25%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d="M8 0L4 5L0 0H8Z" fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Folder">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
            <path d={svgPaths.pf5ce500} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Task model name</p>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <CaretIcon3 />
      <TextOverflow10 />
    </div>
  );
}

function CaretIcon4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Caret + Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret--down">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[31.25%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d="M8 0L4 5L0 0H8Z" fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Folder">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
            <path d={svgPaths.pf5ce500} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Function 1</p>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <CaretIcon4 />
      <TextOverflow11 />
    </div>
  );
}

function TextOverflow12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Test Case 1-A</p>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Document">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
            <g id="Vector">
              <path d={svgPaths.pe6f1e00} fill="#525252" />
              <path d="M8 10H2V11H8V10Z" fill="#525252" />
              <path d="M8 7H2V8H8V7Z" fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
      <TextOverflow12 />
    </div>
  );
}

function TextOverflow13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Test Case 1-B</p>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Document">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
            <g id="Vector">
              <path d={svgPaths.pe6f1e00} fill="#525252" />
              <path d="M8 10H2V11H8V10Z" fill="#525252" />
              <path d="M8 7H2V8H8V7Z" fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
      <TextOverflow13 />
    </div>
  );
}

function CaretIcon5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Caret + Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret--down">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[31.25%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d="M8 0L4 5L0 0H8Z" fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Folder">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
            <path d={svgPaths.pf5ce500} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Decision model name</p>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <CaretIcon5 />
      <TextOverflow14 />
    </div>
  );
}

function TextOverflow15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Test Case 1-A</p>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Function--2">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p94a2b00} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
      <TextOverflow15 />
    </div>
  );
}

function TextOverflow16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[18px] items-start min-w-px relative" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Test Case 1-B</p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Document">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
            <g id="Vector">
              <path d={svgPaths.pe6f1e00} fill="#525252" />
              <path d="M8 10H2V11H8V10Z" fill="#525252" />
              <path d="M8 7H2V8H8V7Z" fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
      <TextOverflow16 />
    </div>
  );
}

function TreeView() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[256px]" data-name="Tree view">
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="content-stretch flex h-[18px] items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="h-full relative shrink-0 w-[40px]" data-name="Spacer" />
            </div>
            <Content />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex h-full items-start relative shrink-0" data-name="_Tree view spacer - Branch node">
                <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
                <div className="h-full relative shrink-0 w-[16px]" data-name="Spacer" />
              </div>
            </div>
            <Content1 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex h-full items-start relative shrink-0" data-name="_Tree view spacer - Branch node">
                <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
                <div className="h-full relative shrink-0 w-[40px]" data-name="Spacer" />
              </div>
            </div>
            <Content2 />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(141,141,141,0.2)] relative shrink-0 w-full" data-name="Branch node item">
        <div aria-hidden="true" className="absolute border-[#0f62fe] border-l-4 border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex h-full items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
                <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
                <div className="h-full relative shrink-0 w-[88px]" data-name="Spacer" />
              </div>
            </div>
            <Content3 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="content-stretch flex h-[18px] items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="h-full relative shrink-0 w-[88px]" data-name="Spacer" />
            </div>
            <Content4 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex h-full items-start relative shrink-0" data-name="_Tree view spacer - Branch node">
                <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
                <div className="h-full relative shrink-0 w-[40px]" data-name="Spacer" />
              </div>
            </div>
            <Content5 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="content-stretch flex h-[18px] items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="h-full relative shrink-0 w-[88px]" data-name="Spacer" />
            </div>
            <Content6 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="content-stretch flex h-[18px] items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="h-full relative shrink-0 w-[88px]" data-name="Spacer" />
            </div>
            <Content7 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex h-full items-start relative shrink-0" data-name="_Tree view spacer - Branch node">
                <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
                <div className="h-full relative shrink-0 w-[16px]" data-name="Spacer" />
              </div>
            </div>
            <Content8 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex h-full items-start relative shrink-0" data-name="_Tree view spacer - Branch node">
                <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
                <div className="h-full relative shrink-0 w-[40px]" data-name="Spacer" />
              </div>
            </div>
            <Content9 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="content-stretch flex h-[18px] items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="h-full relative shrink-0 w-[88px]" data-name="Spacer" />
            </div>
            <Content10 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="content-stretch flex h-[18px] items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="h-full relative shrink-0 w-[88px]" data-name="Spacer" />
            </div>
            <Content11 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="flex flex-row items-center self-stretch">
              <div className="content-stretch flex h-full items-start relative shrink-0" data-name="_Tree view spacer - Branch node">
                <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
                <div className="h-full relative shrink-0 w-[16px]" data-name="Spacer" />
              </div>
            </div>
            <Content12 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="content-stretch flex h-[18px] items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="h-full relative shrink-0 w-[64px]" data-name="Spacer" />
            </div>
            <Content13 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Branch node item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pr-[16px] py-[7px] relative size-full">
            <div className="content-stretch flex h-[18px] items-start relative shrink-0" data-name="_Tree view spacer - Leaf node">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="h-full relative shrink-0 w-[64px]" data-name="Spacer" />
            </div>
            <Content14 />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPanel() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-h-px overflow-clip relative w-full" data-name="Filter Panel">
      <PageTabs />
      <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Toolbar">
        <button className="content-stretch cursor-pointer flex flex-[1_0_0] items-center justify-center min-w-px relative" data-name="Search - Default">
          <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
          <SearchIcon />
          <HideTextOverflow />
        </button>
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Popover - Tab tip">
          <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
          <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[48px]" data-name="Button">
            <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
            <ButtonContent />
          </div>
          <PopoverOverflow />
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu button">
          <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[40px]" data-name="Button">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <ButtonContent1 />
          </div>
        </div>
      </div>
      <TreeView />
    </div>
  );
}

function LeftFilterPanelWrapper() {
  return (
    <div className="content-stretch flex flex-col h-full items-end overflow-clip relative shrink-0 w-[256px]" data-name="Left Filter Panel Wrapper">
      <FilterPanel />
    </div>
  );
}

function CardSectionHeaderGroup() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Card Section Header Group">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pl-[16px] pr-[8px] py-[8px] relative size-full">
        <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[28px] not-italic overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-ellipsis whitespace-nowrap">Test Case 1-A</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Play">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_18.75%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 12">
            <path d={svgPaths.p2d8fe100} fill="var(--fill-0, #0F62FE)" id="Vector" />
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
        <div className="content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative size-full">
          <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] tracking-[0.16px] whitespace-nowrap z-[3]">Run test case</p>
          <div className="relative shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function HeaderWrapper() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Wrapper">
      <CardSectionHeaderGroup />
      <div className="relative shrink-0 w-[143px]" data-name="Button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] bg-clip-padding border-0 border-[transparent] border-solid inset-0 mix-blend-multiply pointer-events-none" />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
          <ButtonContent2 />
        </div>
      </div>
    </div>
  );
}

function ResourceList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-px h-full items-start min-w-px relative" data-name="Resource List">
      <HeaderWrapper />
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[70.28px] leading-[18px] not-italic relative shrink-0 text-[#ff6f6f] text-[14px] tracking-[0.16px] w-[249.176px]">{`CARDS & column go HERE`}</p>
    </div>
  );
}

function ResourcePageContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-px items-start min-h-px relative w-full" data-name="Resource Page Content">
      <LeftFilterPanelWrapper />
      <ResourceList />
    </div>
  );
}

function PageContentWrapper() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px overflow-clip relative" data-name="Page Content Wrapper">
      <ResourcePageContent />
    </div>
  );
}

function PanelProviderPage1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[1046.159px] items-start min-w-px relative" data-name="Panel Provider: Page">
      <PageContentWrapper />
    </div>
  );
}

export default function PanelProviderPage() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="Panel Provider: Page">
      <PanelProviderPage1 />
    </div>
  );
}