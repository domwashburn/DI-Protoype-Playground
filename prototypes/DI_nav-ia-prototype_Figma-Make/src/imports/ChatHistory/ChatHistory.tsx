import svgPaths from "./svg-d05wi795d1";

function ChatTitle() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Chat title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[2px] pr-[8px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] h-full justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis whitespace-pre">{`   Chats`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopSection() {
  return (
    <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full" data-name="Top section">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <ChatTitle />
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="content-stretch flex items-center justify-center p-[12px] relative shrink-0" data-name="Search icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Search">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] min-w-px not-italic relative text-[#a8a8a8] text-[14px] text-left tracking-[0.16px]">Search</p>
    </div>
  );
}

function Search() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[40px] items-center min-w-px relative" data-name="Search">
      <button className="content-stretch cursor-pointer flex flex-[1_0_0] items-center min-w-px relative" data-name="Search - Default">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
        <SearchIcon />
        <HideTextOverflow />
      </button>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Content">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <Search />
    </div>
  );
}

function IconWrapper() {
  return (
    <div className="content-stretch flex h-full items-center justify-center pl-[12px] relative shrink-0" data-name="Icon wrapper">
      <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p27673900} fill="var(--fill-0, #525252)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Text overflow">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[12px] pr-[8px] py-[8px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden text-ellipsis">Pinned</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Chevron--up">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[31.25%_18.75%_33.13%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
            <path d={svgPaths.p144fc680} fill="var(--fill-0, #525252)" id="Vector" />
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
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function HistorySectionHeader() {
  return (
    <div className="h-[32px] relative shrink-0 w-full z-[2]" data-name="History section header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pr-[4px] relative size-full">
          <IconWrapper />
          <TextOverflow />
          <button className="content-stretch cursor-pointer flex flex-col items-start justify-end overflow-clip relative shrink-0 w-[32px]" data-name="Button">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <ButtonContent />
          </button>
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Here’s the onboarding doc that includes how to submit invoices</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Let’s use this as the master invoice format going</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper1() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content3() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Noticed some discrepancies between the hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper2() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content4() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Do we need a PO number on every invoice</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper3() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function HistoryItems() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full z-[1]" data-name="History items">
      <div className="relative shrink-0 w-full z-[10]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content1 />
            <ActionWrapper />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[9]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content2 />
            <ActionWrapper1 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[8]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content3 />
            <ActionWrapper2 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[7]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content4 />
            <ActionWrapper3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconWrapper1() {
  return (
    <div className="content-stretch flex h-full items-center justify-center pl-[12px] relative shrink-0" data-name="Icon wrapper">
      <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p1d03580} fill="#525252" />
              <path d={svgPaths.p192ffe00} fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Text overflow">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[12px] pr-[8px] py-[8px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden text-ellipsis">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Chevron--up">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[31.25%_18.75%_33.13%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
            <path d={svgPaths.p144fc680} fill="var(--fill-0, #525252)" id="Vector" />
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
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function HistorySectionHeader1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full z-[2]" data-name="History section header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pr-[4px] relative size-full">
          <IconWrapper1 />
          <TextOverflow1 />
          <button className="content-stretch cursor-pointer flex flex-col items-start justify-end overflow-clip relative shrink-0 w-[32px]" data-name="Button">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <ButtonContent1 />
          </button>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Create decision service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon2() {
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

function ButtonContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[32px]" data-name="Button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent2 />
      </div>
    </div>
  );
}

function ActionWrapper4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Action wrapper">
      <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <Button />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[198px] top-[15px] z-[10]">
      <div className="absolute left-[198px] size-[32px] top-[15px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" fill="var(--fill-0, #F7FF00)" id="Ellipse 1" r="16" />
        </svg>
      </div>
      <div className="absolute left-[202px] size-[24px] top-[19px]" data-name="Cursor">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[16.67%] left-[16.67%] right-1/4 top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-2.34%_-2.68%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7499 16.75">
              <path clipRule="evenodd" d={svgPaths.p11783880} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[56.25%_39.58%_31.25%_60.42%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 3.75">
              <g id="Vector">
                <path clipRule="evenodd" d="M0.375 3.375V0.375Z" fill="var(--fill-0, white)" fillRule="evenodd" />
                <path d="M0.375 3.375V0.375" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute inset-[56.25%_47.92%_31.25%_52.08%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 3.75">
              <g id="Vector">
                <path clipRule="evenodd" d="M0.375 3.375V0.375Z" fill="var(--fill-0, white)" fillRule="evenodd" />
                <path d="M0.375 3.375V0.375" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute inset-[56.25%_56.25%_31.25%_43.75%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 3.75">
              <g id="Vector">
                <path clipRule="evenodd" d="M0.375 0.375V3.375Z" fill="var(--fill-0, white)" fillRule="evenodd" />
                <path d="M0.375 0.375V3.375" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Let’s use this as the master invoice format going</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper5() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content7() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Noticed some discrepancies between the hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper6() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content8() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Do we need a PO number on every invoice</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper7() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function HistoryItems1() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full z-[1]" data-name="History items">
      <div className="bg-[rgba(141,141,141,0.12)] relative shrink-0 w-full z-[11]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content5 />
            <ActionWrapper4 />
          </div>
        </div>
      </div>
      <Group />
      <div className="relative shrink-0 w-full z-[9]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content6 />
            <ActionWrapper5 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[8]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content7 />
            <ActionWrapper6 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[7]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content8 />
            <ActionWrapper7 />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconWrapper2() {
  return (
    <div className="content-stretch flex h-full items-center justify-center pl-[12px] relative shrink-0" data-name="Icon wrapper">
      <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p1d03580} fill="#525252" />
              <path d={svgPaths.p192ffe00} fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow2() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Text overflow">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[12px] pr-[8px] py-[8px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden text-ellipsis">Yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Chevron--up">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[31.25%_18.75%_33.13%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
            <path d={svgPaths.p144fc680} fill="var(--fill-0, #525252)" id="Vector" />
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
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function HistorySectionHeader2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full z-[2]" data-name="History section header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pr-[4px] relative size-full">
          <IconWrapper2 />
          <TextOverflow2 />
          <button className="content-stretch cursor-pointer flex flex-col items-start justify-end overflow-clip relative shrink-0 w-[32px]" data-name="Button">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <ButtonContent3 />
          </button>
        </div>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">This chat outlines the invoice submission deadlines</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper8() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content10() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">We’ve agreed to add a late fee clause to all invoices starting Q2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper9() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content11() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Send this template to all new vendors. It includes tax details and invoice</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper10() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content12() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Here’s the transcript of the conversation re</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper11() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function HistoryItems2() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full z-[1]" data-name="History items">
      <div className="relative shrink-0 w-full z-[10]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content9 />
            <ActionWrapper8 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[9]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content10 />
            <ActionWrapper9 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[8]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content11 />
            <ActionWrapper10 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[7]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content12 />
            <ActionWrapper11 />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconWrapper3() {
  return (
    <div className="content-stretch flex h-full items-center justify-center pl-[12px] relative shrink-0" data-name="Icon wrapper">
      <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p1d03580} fill="#525252" />
              <path d={svgPaths.p192ffe00} fill="#525252" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextOverflow3() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Text overflow">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[12px] pr-[8px] py-[8px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden text-ellipsis">Previous 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Chevron--up">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[31.25%_18.75%_33.13%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
            <path d={svgPaths.p144fc680} fill="var(--fill-0, #525252)" id="Vector" />
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
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function HistorySectionHeader3() {
  return (
    <div className="h-[32px] relative shrink-0 w-full z-[2]" data-name="History section header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pr-[4px] relative size-full">
          <IconWrapper3 />
          <TextOverflow3 />
          <button className="content-stretch cursor-pointer flex flex-col items-start justify-end overflow-clip relative shrink-0 w-[32px]" data-name="Button">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <ButtonContent4 />
          </button>
        </div>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Here’s the onboarding doc that includes how to submit invoices</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper12() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content14() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Let’s use this as the master invoice format going</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper13() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content15() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Noticed some discrepancies between the hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper14() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function Content16() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[2px] pr-[8px] py-[11px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-[min-content] whitespace-nowrap">
            <p className="leading-[18px] overflow-hidden text-ellipsis">Do we need a PO number on every invoice</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionWrapper15() {
  return <div className="content-stretch flex items-center relative shrink-0 size-[32px]" data-name="Action wrapper" />;
}

function HistoryItems3() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full z-[1]" data-name="History items">
      <div className="relative shrink-0 w-full z-[10]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content13 />
            <ActionWrapper12 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[9]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content14 />
            <ActionWrapper13 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[8]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content15 />
            <ActionWrapper14 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-[7]" data-name="Chat history item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pl-[40px] pr-[4px] relative size-full">
            <Content16 />
            <ActionWrapper15 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatHistory() {
  return (
    <div className="bg-white relative size-full" data-name="Chat History">
      <div className="content-stretch flex flex-col isolate items-start relative size-full">
        <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]" data-name="_Chat History header">
          <TopSection />
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="_Chat history toolbar">
            <Content />
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-[320px] z-[1]" data-name="History Default">
          <div className="content-stretch flex flex-col isolate items-start justify-center py-[4px] relative shrink-0 w-full z-[4]" data-name="Chat history section">
            <HistorySectionHeader />
            <HistoryItems />
          </div>
          <div className="content-stretch flex flex-col isolate items-start justify-center py-[4px] relative shrink-0 w-full z-[3]" data-name="Chat history section">
            <HistorySectionHeader1 />
            <HistoryItems1 />
          </div>
          <div className="content-stretch flex flex-col isolate items-start justify-center py-[4px] relative shrink-0 w-full z-[2]" data-name="Chat history section">
            <HistorySectionHeader2 />
            <HistoryItems2 />
          </div>
          <div className="content-stretch flex flex-col isolate items-start justify-center py-[4px] relative shrink-0 w-full z-[1]" data-name="Chat history section">
            <HistorySectionHeader3 />
            <HistoryItems3 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#4589ff] border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}