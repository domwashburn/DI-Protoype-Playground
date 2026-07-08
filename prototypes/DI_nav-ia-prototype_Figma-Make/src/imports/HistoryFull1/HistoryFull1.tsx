import svgPaths from "./svg-hhl2raijnw";
import { imgChatContentScrollArea, imgGradientWrapper, imgGradientStop1, imgGradientFeather, imgGradientStop2 } from "./svg-gtnlw";

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

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-center min-w-[240px] pr-[48px] relative shrink-0" data-name="Product name/ Product name">
        <div aria-hidden="true" className="absolute bg-[#161616] inset-0 pointer-events-none" />
        <div className="relative shrink-0 size-[48px]" data-name="Utility/ Utility">
          <div aria-hidden="true" className="absolute bg-[#161616] inset-0 pointer-events-none" />
          <div className="absolute bg-[rgba(255,255,255,0)] left-[14px] overflow-clip size-[20px] top-[14px]" data-name="Menu">
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 12.5">
                <g id="Vector">
                  <path d="M15 0H0V1.25H15V0Z" fill="#F4F4F4" />
                  <path d="M15 11.25H0V12.5H15V11.25Z" fill="#F4F4F4" />
                  <path d="M15 3.75H0V5H15V3.75Z" fill="#F4F4F4" />
                  <path d="M15 7.5H0V8.75H15V7.5Z" fill="#F4F4F4" />
                </g>
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#393939]" />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f4f4f4] text-[14px] text-center tracking-[0.16px] whitespace-nowrap">
          <p className="leading-[18px] whitespace-pre">{`IBM  `}</p>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f4f4f4] text-[14px] tracking-[0.16px] whitespace-nowrap">
          <p className="leading-[18px]">Decision Intelligence</p>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#393939]" />
      </div>
    </div>
  );
}

function Initials() {
  return (
    <div className="bg-[#198038] content-stretch flex items-center justify-center relative rounded-[1000px] shrink-0 size-[32px]" data-name="Initials">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.16px] whitespace-nowrap">DW</p>
    </div>
  );
}

function AiBackgroundLayerWrapper() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0_-56px_0] items-start pb-[56px]" data-name="AI background layer wrapper">
      <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px overflow-clip relative w-full" data-name="AI layer - Background">
        <div className="absolute bottom-0 left-0 pointer-events-none right-0 top-1/2 z-[3]" data-name="Aura - Light themes">
          <div aria-hidden="true" className="absolute bg-gradient-to-b from-[rgba(255,255,255,0)] inset-0 to-[rgba(69,137,255,0.1)]" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_-80px_70px_-65px_rgba(15,98,254,0.1)]" />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
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

function ButtonContent5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[12px] relative size-full">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[40px]" data-name="Button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent5 />
      </div>
    </div>
  );
}

function LeftActions() {
  return (
    <div className="absolute content-stretch flex items-start left-[-40px] opacity-0 top-0" data-name="Left Actions">
      <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <Button1 />
      </div>
    </div>
  );
}

function PanelTitle() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Panel Title">
      <div className="content-stretch flex gap-[4px] items-center max-w-[312px] min-w-[40px] relative shrink-0 w-[123px]" data-name="Custom chat header">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[18px] max-w-[280px] min-w-px not-italic overflow-hidden relative text-[14px] text-black text-ellipsis tracking-[0.16px] whitespace-nowrap">Decision Assistant</p>
      </div>
    </div>
  );
}

function PanelTitleWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Panel Title Wrapper">
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

function ChatTitle1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Chat title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <PanelHeaderGroup />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
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

function ButtonContent6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[12px] relative size-full">
          <Icon6 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
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

function ButtonContent7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[12px] relative size-full">
          <Icon7 />
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
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Panel Actions">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[40px]" data-name="Chat settings">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent6 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-[40px]" data-name="Assets & Artifacts">
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[40px]" data-name="Button">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ButtonContent7 />
        </div>
        <TooltipBodyItem />
      </div>
    </div>
  );
}

function RightActionGroup() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0" data-name="Right Action Group">
      <PanelActions />
    </div>
  );
}

function GradientStop() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full" data-name="Gradient stop 1">
      <div className="bg-[#0f62fe] flex-[1_0_0] h-full mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[32px_32px] min-w-px relative" style={{ maskImage: `url('${imgGradientStop1}')` }} data-name="Gradient stop 1" />
    </div>
  );
}

function GradientWrapper() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1px_1px] mask-size-[30.01px_30.03px]" style={{ maskImage: `url('${imgGradientWrapper}')` }} data-name="Gradient wrapper">
      <div className="absolute content-stretch flex flex-col inset-0 isolate items-center justify-center overflow-clip" data-name="Gradient">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative w-full z-[2]">
          <div className="-scale-y-100 flex-none size-full">
            <GradientStop />
          </div>
        </div>
        <div className="absolute bg-[#a56eff] inset-0 z-[1]" data-name="Gradient stop 2" />
      </div>
    </div>
  );
}

function AppIconWrapper() {
  return (
    <div className="absolute inset-[6.25%] z-[2]" data-name="App icon wrapper">
      <div className="absolute inset-0 overflow-clip" data-name="watsonx | IBM App Icons">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <GradientWrapper />
        <div className="absolute bottom-3/4 left-[12.5%] right-3/4 top-[12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
            <path d={svgPaths.p33077f0} fill="var(--fill-0, #001D6C)" id="Vector" />
          </svg>
        </div>
        <div className="absolute bottom-[12.5%] left-3/4 right-[12.5%] top-3/4" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
            <path d={svgPaths.p33077f0} fill="var(--fill-0, #001D6C)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[65.63%_34.38%_3.13%_34.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
            <path d={svgPaths.p40b900} fill="var(--fill-0, #001D6C)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AvatarMargin() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Avatar margin">
      <div className="content-stretch flex flex-col isolate items-start relative shrink-0" data-name="Avatar">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <AppIconWrapper />
        <div className="opacity-0 relative shrink-0 size-[32px] z-[1]" data-name="Spacer" />
      </div>
    </div>
  );
}

function SourceTimestamp() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] gap-[4px] items-center leading-[0] min-w-px not-italic py-[8px] relative text-[#525252] text-[12px] text-right tracking-[0.32px] whitespace-nowrap" data-name="Source + Timestamp">
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-ellipsis">
        <p className="leading-[16px] overflow-hidden text-ellipsis">watsonx</p>
      </div>
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-ellipsis">
        <p className="leading-[16px] overflow-hidden text-ellipsis">12:46</p>
      </div>
    </div>
  );
}

function SourceTimestampHistory() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Source + Timestamp + History">
      <SourceTimestamp />
    </div>
  );
}

function Message1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Message">
      <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic pr-[16px] relative size-full text-[#161616]">
        <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[16px] w-full">{`Hello, << First name >>`}</p>
        <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[28px] relative shrink-0 text-[20px] w-full">I’m your Decision Assistant. I can help you manage decision automations and services. To get started, choose an option below or enter your own prompt.</p>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Main content">
      <SourceTimestampHistory />
      <div className="h-[4px] opacity-0 relative shrink-0 w-full" data-name="Spacer" />
      <Message1 />
    </div>
  );
}

function Message() {
  return (
    <div className="relative shrink-0 w-full" data-name="Message">
      <div className="content-stretch flex gap-[8px] items-start pl-[16px] relative size-full">
        <AvatarMargin />
        <MainContent />
      </div>
    </div>
  );
}

function Content18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="[word-break:break-word] content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[2px] items-start not-italic pb-[48px] pt-[16px] px-[16px] relative size-full">
        <p className="leading-[18px] overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full">Create a new decision service</p>
        <p className="leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-full">Use Build mode to accelerate the process of building a decision service. Creates a custom Policy, Data mode, t model, and decision rules.</p>
      </div>
    </div>
  );
}

function LinkWrapper() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-end left-0 pb-[16px] px-[16px] right-0" data-name="Link wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow--right">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
            <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #0F62FE)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="[word-break:break-word] content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[2px] items-start not-italic pb-[48px] pt-[16px] px-[16px] relative size-full">
        <p className="leading-[18px] overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full">Explain a decision service</p>
        <p className="leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-full">Get a simple and easy to understand explanation of what a Decision Service does. Get an explanation of what it is, what it’s for, and how it works.</p>
      </div>
    </div>
  );
}

function LinkWrapper1() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-end left-0 pb-[16px] px-[16px] right-0" data-name="Link wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow--right">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
            <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #0F62FE)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="[word-break:break-word] content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[2px] items-start not-italic pb-[48px] pt-[16px] px-[16px] relative size-full">
        <p className="leading-[18px] overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full">Update an existing decision service</p>
        <p className="leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-full">Make changes to any data model, decision model, decision rules, and more through natural language.</p>
      </div>
    </div>
  );
}

function LinkWrapper2() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-end left-0 pb-[16px] px-[16px] right-0" data-name="Link wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow--right">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
            <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #0F62FE)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SlotWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot wrapper">
      <div className="content-stretch flex flex-col gap-[12px] items-start pr-[16px] pt-[16px] relative size-full">
        <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Chat content card - Source card | Carbon for AI">
          <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <Content18 />
          <LinkWrapper />
        </div>
        <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Chat content card - Source card | Carbon for AI">
          <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <Content19 />
          <LinkWrapper1 />
        </div>
        <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Chat content card - Source card | Carbon for AI">
          <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <Content20 />
          <LinkWrapper2 />
        </div>
      </div>
    </div>
  );
}

function MainContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Main content">
      <SlotWrapper />
    </div>
  );
}

function Message2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Message">
      <div className="content-stretch flex items-start pl-[56px] relative size-full">
        <MainContent1 />
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[4px] pt-[12px] relative shrink-0 w-full" data-name="Content">
      <Message2 />
    </div>
  );
}

function Divider() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Divider">
      <div className="relative size-full" />
    </div>
  );
}

function Start() {
  return <div className="relative shrink-0 size-[0.001px]" data-name="Start" />;
}

function End() {
  return <div className="relative shrink-0 size-[0.001px]" data-name="End" />;
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[2px] px-[8px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#161616] text-[12px] tracking-[0.32px] whitespace-nowrap">Build</p>
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Resizer">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <Start />
        <End />
      </div>
    </div>
  );
}

function TagContent() {
  return (
    <div className="content-stretch flex items-center relative rounded-[24px] shrink-0" data-name="Tag content">
      <Label />
    </div>
  );
}

function ChatContent() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[28px] pt-[4px] relative shrink-0 w-full" data-name="Chat content">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Chat section | Carbon for AI">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="content-stretch flex flex-col gap-[8px] items-start py-[4px] relative shrink-0 w-full" data-name="Welcome message | Carbon for AI">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <div className="h-[16px] opacity-0 relative shrink-0 w-full" data-name="Spacer" />
          <Message />
          <Content17 />
          <Divider />
        </div>
      </div>
      <div className="absolute bg-[#e0e0e0] content-stretch flex items-start left-[272.5px] rounded-[9px] top-[229px]" data-name="Tag - Read-only">
        <TagContent />
      </div>
    </div>
  );
}

function ChatContentScrollArea() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[672px_668px] min-h-px relative w-full" style={{ maskImage: `url('${imgChatContentScrollArea}')` }} data-name="Chat content scroll area">
      <ChatContent />
    </div>
  );
}

function ChatContentMask() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px relative w-full" data-name="Chat content mask">
      <ChatContentScrollArea />
    </div>
  );
}

function BackToBottomStopGenerating() {
  return <div className="absolute bottom-0 content-stretch flex flex-col gap-[16px] h-[48px] items-center justify-end left-0 pb-[16px] px-[16px] right-0" data-name="Back to bottom + Stop generating" />;
}

function BackToTopWrapper() {
  return <div className="absolute content-stretch flex flex-col h-[48px] items-center left-0 pt-[16px] px-[16px] right-0 top-0" data-name="Back to top wrapper" />;
}

function ChatContentWrapper() {
  return (
    <div className="content-stretch flex flex-col h-[668px] items-center max-w-[672px] relative shrink-0 w-full z-[1]" data-name="Chat content wrapper">
      <ChatContentMask />
      <BackToBottomStopGenerating />
      <BackToTopWrapper />
    </div>
  );
}

function HeaderBody() {
  return (
    <div className="content-stretch flex flex-col h-[684px] isolate items-center relative shrink-0 w-full" data-name="Header + Body">
      <ChatContentWrapper />
    </div>
  );
}

function GradientStop1() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full" data-name="Gradient Stop 1">
      <div className="bg-[#f4f4f4] flex-[1_0_0] h-full mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[100px_100px] min-w-px relative" style={{ maskImage: `url('${imgGradientStop2}')` }} data-name="Gradient Stop 1" />
    </div>
  );
}

function Border() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="Border">
      <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
          <div className="content-stretch flex isolate items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0%] mask-size-[100%_100%] relative size-full" style={{ maskImage: `url('${imgGradientFeather}')` }} data-name="Gradient - Feather">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="flex flex-[1_0_0] h-full items-center justify-center min-w-px relative z-[1]">
              <div className="-scale-y-100 flex-none size-full">
                <GradientStop1 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
            <g id="Vector">
              <path d="M12 0H0V1H12V0Z" fill="#161616" />
              <path d="M12 9H0V10H12V9Z" fill="#161616" />
              <path d="M12 3H0V4H12V3Z" fill="#161616" />
              <path d="M12 6H0V7H12V6Z" fill="#161616" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon8 />
        </div>
      </div>
    </div>
  );
}

function ButtonWrapper() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Button wrapper">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[32px]" data-name="Menu button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent8 />
      </div>
    </div>
  );
}

function LeftAction() {
  return (
    <div className="relative self-stretch shrink-0 z-[3]" data-name="Left action">
      <div className="content-stretch flex items-start py-[12px] relative size-full">
        <button className="content-stretch cursor-pointer flex flex-col items-center justify-end relative shrink-0" data-name="Chat prompt line left actions | Carbon for AI">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ButtonWrapper />
        </button>
        <div className="flex h-full items-center justify-center relative shrink-0 w-0" style={{ containerType: "size", "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="flex-none rotate-90 w-[100cqh]">
            <div className="h-0 relative w-full" data-name="Spacer">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <g id="Spacer" opacity="0" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextMargin() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px py-[19px] relative" data-name="Text margin">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic opacity-80 overflow-hidden relative shrink-0 text-[#a8a8a8] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Type something...</p>
    </div>
  );
}

function TextScrollArea() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full z-[1]" data-name="Text scroll area">
      <TextMargin />
    </div>
  );
}

function TextGradient() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-w-px overflow-x-clip overflow-y-auto relative self-stretch z-[2]" data-name="Text gradient">
      <TextScrollArea />
    </div>
  );
}

function Icon9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Microphone">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_21.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
            <g id="Vector">
              <path d={svgPaths.p35046d80} fill="#161616" />
              <path d={svgPaths.p22099a00} fill="#161616" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon9 />
        </div>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Send">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.51%_12.52%_12.5%_12.39%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0143 11.9981">
            <path d={svgPaths.p362d8300} fill="var(--fill-0, #C6C6C6)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon10 />
        </div>
      </div>
    </div>
  );
}

function RightActions() {
  return (
    <div className="relative self-stretch shrink-0 z-[1]" data-name="Right actions">
      <div className="content-stretch flex items-start py-[12px] relative size-full">
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[32px]" data-name="Button">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ButtonContent9 />
        </div>
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[32px]" data-name="Button">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ButtonContent10 />
        </div>
      </div>
    </div>
  );
}

function PromptLine() {
  return (
    <div className="h-[56px] max-h-[182px] relative shrink-0 w-full" data-name="Prompt line">
      <div className="content-stretch flex gap-[8px] isolate items-start max-h-[inherit] px-[8px] relative size-full">
        <LeftAction />
        <TextGradient />
        <RightActions />
      </div>
    </div>
  );
}

function ChatShellCustomSlotsCarbonForAi() {
  return (
    <div className="absolute content-stretch flex flex-col h-[852px] items-center overflow-clip right-0 shadow-[0px_23px_40px_-24px_rgba(15,98,254,0.1)] top-[48px] w-[943px]" data-name="Chat shell [custom slots] | Carbon for AI">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
      <AiBackgroundLayerWrapper />
      <div className="bg-white content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Assistant Custom Header">
        <div aria-hidden="true" className="absolute border-[#c6c6c6] border-b border-solid inset-0 pointer-events-none" />
        <LeftActions />
        <ChatTitle1 />
        <RightActionGroup />
      </div>
      <HeaderBody />
      <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-name="Prompt line">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute bg-white inset-0 rounded-[8px]" data-name="Background" />
        <Border />
        <PromptLine />
      </div>
      <div className="absolute inset-[780px_-632.5px_-836px_632.5px]" data-name="AI layer - Border">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute border border-[#78a9ff] border-solid inset-0" data-name="AI border - Light themes" />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Add-comment">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%_6.25%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 13">
            <g id="Vector">
              <path d={svgPaths.p2b2dba70} fill="#161616" />
              <path d={svgPaths.p8678000} fill="#161616" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon11 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center px-[8px] py-[4px] relative shrink-0">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[32px]" data-name="Button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center px-[16px] relative shrink-0" data-name="Icon">
      <div className="relative shrink-0 size-[16px]" data-name="placeholder icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 overflow-clip" data-name="IBM-watsonx--assistant">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-[6.25%_6.25%_3.13%_6.25%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14.5">
              <g id="Vector">
                <path d={svgPaths.p9531e80} fill="var(--fill-0, #161616)" />
                <path d={svgPaths.p1122b480} fill="var(--fill-0, #161616)" />
                <path d={svgPaths.pd3ea800} fill="var(--fill-0, #161616)" />
                <path d={svgPaths.p1e140000} fill="var(--fill-0, #161616)" />
                <path d={svgPaths.p2a5b5900} fill="var(--fill-0, #161616)" />
                <path d={svgPaths.p1c986900} fill="var(--fill-0, #161616)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItemContent() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Nav item content">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center py-[7px] relative size-full">
          <Icon12 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_#0f62fe]" />
    </div>
  );
}

function PrimaryNavItems() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="primary nav items">
      <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[48px]" data-name="Nav Item">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
          <NavItemContent />
        </div>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center px-[16px] relative shrink-0" data-name="Icon">
      <div className="relative shrink-0 size-[16px]" data-name="Admin/Instance settings">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 overflow-clip" data-name="Settings">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-[6.37%_7.51%_6.37%_7.54%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5924 13.9604">
              <g id="Vector">
                <path d={svgPaths.pe8e1900} fill="#161616" />
                <path d={svgPaths.p3811c700} fill="#161616" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItemContent1() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Nav item content">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center py-[7px] relative size-full">
          <Icon13 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_#0f62fe]" />
    </div>
  );
}

function FooterNavItems() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-end min-h-px relative" data-name="footer nav items">
      <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-[48px]" data-name="Nav Item">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
          <NavItemContent1 />
        </div>
      </div>
    </div>
  );
}

function NavItems() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px relative" data-name="nav items">
      <PrimaryNavItems />
      <FooterNavItems />
    </div>
  );
}

function TextModule() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text module">
      <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
      <div className="[word-break:break-word] content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[2px] items-start not-italic px-[8px] py-[4px] relative size-full">
        <p className="leading-[16px] relative shrink-0 text-[#525252] text-[12px] tracking-[0.32px] w-full">History</p>
        <p className="leading-[20px] relative shrink-0 text-[14px] text-black tracking-[0.16px] w-full">Select desired chat.</p>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_4px_4px_rgba(0,0,0,0.12),0px_18px_12px_rgba(0,0,0,0.12)] flex flex-col items-start p-px relative shrink-0 w-[300px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#4589ff] border-solid inset-0 pointer-events-none" />
      <div className="relative shrink-0 w-full" data-name="_Content">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] relative size-full">
          <TextModule />
        </div>
      </div>
    </div>
  );
}

export default function HistoryFull() {
  return (
    <div className="bg-white relative size-full" data-name="History: Full 1">
      <div className="absolute bg-white h-[852px] left-[48px] top-[48px] w-[320px]" data-name="Chat History">
        <div className="content-stretch flex flex-col isolate items-start overflow-clip relative rounded-[inherit] size-full">
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
      <div className="absolute bg-[#161616] content-stretch flex h-[48px] items-center left-0 top-0 w-[1312px]" data-name="Global header">
        <Frame />
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0" data-name="Link/ Link">
          <div aria-hidden="true" className="absolute bg-[#161616] inset-0 pointer-events-none" />
          <div className="[word-break:break-word] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f4f4f4] text-[16px] text-center whitespace-nowrap">
            <p className="leading-[24px]">Give feedback</p>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#393939]" />
        </div>
        <div className="relative shrink-0 size-[48px]" data-name="Utility/ Utility">
          <div aria-hidden="true" className="absolute bg-[#161616] inset-0 pointer-events-none" />
          <div className="absolute left-[14px] overflow-clip size-[20px] top-[14px]" data-name="Help">
            <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[6.25%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
                <g id="Vector">
                  <path d={svgPaths.p228bda00} fill="#F4F4F4" />
                  <path d={svgPaths.p3b7d9700} fill="#F4F4F4" />
                  <path d={svgPaths.p203ea780} fill="#F4F4F4" />
                </g>
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#393939]" />
        </div>
        <div className="relative shrink-0 size-[48px]" data-name="Utility/ Utility">
          <div aria-hidden="true" className="absolute bg-[#161616] inset-0 pointer-events-none" />
          <div className="absolute bg-[rgba(255,255,255,0)] left-[14px] overflow-clip size-[20px] top-[14px]" data-name="AI-launch">
            <div className="absolute inset-[6.25%_6.25%_3.13%_6.25%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 18.125">
                <g id="Vector">
                  <path d={svgPaths.pd706280} fill="var(--fill-0, #F4F4F4)" />
                  <path d={svgPaths.p16e03c80} fill="var(--fill-0, #F4F4F4)" />
                  <path d={svgPaths.pd708b60} fill="var(--fill-0, #F4F4F4)" />
                </g>
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#393939]" />
        </div>
        <div className="relative shrink-0 size-[48px]" data-name="User Profile/ Image">
          <div aria-hidden="true" className="absolute bg-[#161616] inset-0 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#393939]" />
          <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-1/2 top-1/2" data-name="User profile images">
            <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-multiply pointer-events-none" />
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="_User profile images base">
              <Initials />
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#393939]" />
          </div>
        </div>
      </div>
      <ChatShellCustomSlotsCarbonForAi />
      <div className="absolute bg-white content-stretch flex flex-col h-[852px] items-start left-0 top-[48px]" data-name="L2 Navigation">
        <div aria-hidden="true" className="absolute border-[#c6c6c6] border-r border-solid inset-0 pointer-events-none" />
        <button className="content-stretch cursor-pointer flex items-start relative shrink-0" data-name="Nav header">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Frame1 />
        </button>
        <NavItems />
      </div>
      <div className="absolute content-stretch flex flex-col h-[128px] items-start left-[208px] top-[396px]" data-name="Call out card | IBM documentation library">
        <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative w-[54px]" style={{ containerType: "size", "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-[100cqh]">
            <div className="content-stretch flex h-[54px] items-center relative w-full" data-name="_Pointer base">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="bg-[#4589ff] flex-[1_0_0] h-px min-w-px relative" data-name="Vector" />
              <div className="relative shrink-0 size-[6px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                  <circle cx="3" cy="3" fill="var(--fill-0, #4589FF)" id="Vector" r="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Card />
      </div>
    </div>
  );
}