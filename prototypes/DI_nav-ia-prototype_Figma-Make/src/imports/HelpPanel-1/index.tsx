import svgPaths from "./svg-csf3e3soh4";

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow--left">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
            <path d={svgPaths.p12b6ff80} fill="var(--fill-0, #F4F4F4)" id="Vector" />
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
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-[161.844px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#f4f4f4] text-[20px] top-0 whitespace-nowrap">Tours and demos</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M15 5L5 15" id="Vector" stroke="var(--stroke-0, #F4F4F4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M5 5L15 15" id="Vector_2" stroke="var(--stroke-0, #F4F4F4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[28px] items-center justify-between min-w-px relative" data-name="Container">
      <Heading />
      <Button />
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-[24px]" data-name="Button">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ButtonContent />
        </div>
        <Container1 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[40px] relative shrink-0 w-[287px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] left-0 not-italic text-[#c6c6c6] text-[14px] top-[-0.5px] tracking-[0.16px] w-[260px]">Explore tours and interactive demos</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#161616] h-[109px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#393939] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative size-full">
        <Frame19 />
        <Paragraph />
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="content-stretch flex items-center justify-center p-[16px] relative shrink-0" data-name="Search icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Search">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.14%_9.37%_9.37%_6.14%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5177 13.5177">
            <path d={svgPaths.p23d74400} fill="var(--fill-0, #C6C6C6)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HideTextOverflow() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[18px] items-start min-w-px overflow-clip relative" data-name="Hide text overflow">
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] h-[18px] leading-[18px] min-w-px not-italic relative text-[#6f6f6f] text-[14px] text-left tracking-[0.16px]">{`Find a tour or demo `}</p>
    </div>
  );
}

function SectionTitleWrapper() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[5px] items-start min-w-px relative" data-name="Section title wrapper">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">Demo Category</p>
    </div>
  );
}

function LeftContentWrapper() {
  return (
    <div className="flex-[1_0_0] min-w-px relative z-[2]" data-name="Left content wrapper">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <SectionTitleWrapper />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Unlocking Data-Driven Decisions</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full z-[8]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Navigating Complex Business Challenges</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full z-[7]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content1 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Optimizing Operations with AI</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full z-[6]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Enhancing Customer Experiences</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full z-[5]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content3 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Predictive Analytics for Better Outcomes</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full z-[4]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content4 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Leveraging Insights for Strategic Planning</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 w-full z-[3]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content5 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Automating Routine Tasks with Intelligence</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full z-[2]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content6 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Streamlining Workflows with AI Solutions</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content7 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelModulesList() {
  return (
    <div className="content-stretch flex flex-col gap-px isolate items-start min-w-[320px] pb-[16px] relative shrink-0 w-[320px]" data-name="Panel Modules / List">
      <div className="bg-[#161616] content-stretch flex h-[32px] isolate items-center shrink-0 sticky top-0 w-full z-[9]" data-name="Panel Base Components / Section title">
        <LeftContentWrapper />
      </div>
      <Frame5 />
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame8 />
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function SectionTitleWrapper1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[5px] items-start min-w-px relative" data-name="Section title wrapper">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">Demo Category</p>
    </div>
  );
}

function LeftContentWrapper1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative z-[2]" data-name="Left content wrapper">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <SectionTitleWrapper1 />
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Improving Risk Management Tactics</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 w-full z-[4]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content8 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Boosting Productivity through Decision Support</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full z-[3]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content9 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Using AI to Transform Business Models</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full z-[2]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content10 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Integrating Data for Holistic Views</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content11 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelModulesList1() {
  return (
    <div className="content-stretch flex flex-col gap-px isolate items-start min-w-[320px] pb-[16px] relative shrink-0 w-[320px]" data-name="Panel Modules / List">
      <div className="bg-[#161616] content-stretch flex h-[32px] isolate items-center shrink-0 sticky top-0 w-full z-[5]" data-name="Panel Base Components / Section title">
        <LeftContentWrapper1 />
      </div>
      <Frame9 />
      <Frame10 />
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function SectionTitleWrapper2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[5px] items-start min-w-px relative" data-name="Section title wrapper">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">Demo Category</p>
    </div>
  );
}

function LeftContentWrapper2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative z-[2]" data-name="Left content wrapper">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <SectionTitleWrapper2 />
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Creating Real-Time Business Insights</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content12 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelModulesList2() {
  return (
    <div className="content-stretch flex flex-col gap-px isolate items-start min-w-[320px] pb-[16px] relative shrink-0 w-[320px]" data-name="Panel Modules / List">
      <div className="bg-[#161616] content-stretch flex h-[32px] isolate items-center shrink-0 sticky top-0 w-full z-[2]" data-name="Panel Base Components / Section title">
        <LeftContentWrapper2 />
      </div>
      <Frame13 />
    </div>
  );
}

function SectionTitleWrapper3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[5px] items-start min-w-px relative" data-name="Section title wrapper">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">Demo Category</p>
    </div>
  );
}

function LeftContentWrapper3() {
  return (
    <div className="flex-[1_0_0] min-w-px relative z-[2]" data-name="Left content wrapper">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <SectionTitleWrapper3 />
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Driving Innovation with Intelligent Solutions</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full z-[6]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content13 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Mastering Change with Decision Intelligence</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 w-full z-[5]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content14 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Building Resilient Strategies with Data</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 w-full z-[4]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content15 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Empowering Teams with AI-Driven Analysis</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 w-full z-[3]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content16 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Achieving Sustainability Goals with Intelligence</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 w-full z-[2]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content17 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Cultivating a Data-First Culture</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <Content18 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelModulesList3() {
  return (
    <div className="content-stretch flex flex-col gap-px isolate items-start min-w-[320px] pb-[16px] relative shrink-0 w-[320px]" data-name="Panel Modules / List">
      <div className="bg-[#161616] content-stretch flex h-[32px] isolate items-center shrink-0 sticky top-0 w-full z-[7]" data-name="Panel Base Components / Section title">
        <LeftContentWrapper3 />
      </div>
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
      <Frame20 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative">
      <button className="bg-[#161616] content-stretch cursor-pointer flex h-[48px] items-center relative shrink-0 w-full" data-name="Search - Default">
        <div aria-hidden className="absolute border-[#525252] border-b border-solid inset-0 pointer-events-none" />
        <SearchIcon />
        <HideTextOverflow />
      </button>
      <PanelModulesList />
      <PanelModulesList1 />
      <PanelModulesList2 />
      <PanelModulesList3 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic relative text-[#c6c6c6] text-[12px] text-center tracking-[0.32px]">IBM Decision Intelligence v0.0.0</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#161616] content-stretch flex flex-col h-[49px] items-start pt-[17px] px-[16px] relative shrink-0 w-[319px]" data-name="Container">
      <div aria-hidden className="absolute border-[#393939] border-solid border-t inset-0 pointer-events-none" />
      <Paragraph1 />
    </div>
  );
}

export default function HelpPanel() {
  return (
    <div className="bg-[#161616] content-stretch flex flex-col items-start justify-center relative size-full" data-name="Help Panel">
      <Container />
      <Frame />
      <Container2 />
    </div>
  );
}