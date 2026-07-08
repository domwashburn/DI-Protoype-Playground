import svgPaths from "./svg-khym6ozayq";

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-[161.844px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#f4f4f4] text-[20px] top-0 whitespace-nowrap">Get help</p>
      </div>
    </div>
  );
}

function Icon() {
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
        <Icon />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[287px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Heading />
        <Button />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-[287px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] left-0 not-italic text-[#c6c6c6] text-[14px] top-[-0.5px] tracking-[0.16px] w-[260px]">Get help and learn more about Decision Intelligence</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#161616] content-stretch flex flex-col gap-[8px] h-[109px] items-start pb-[17px] pl-[16px] pt-[16px] relative shrink-0 w-[319px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#393939] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
      <Paragraph />
    </div>
  );
}

function SectionTitleWrapper() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[5px] items-start min-w-px relative" data-name="Section title wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">Relevant tours</p>
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

function RightContentWrapper() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pl-[8px] pr-[16px] relative shrink-0 z-[1]" data-name="Right content wrapper">
      <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-[45px]" data-name="Link">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Welcome to IBM Decision Intelligence</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
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

function SectionTitleWrapper1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[5px] items-start min-w-px relative" data-name="Section title wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">Relevant articles</p>
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

function RightContentWrapper1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pl-[8px] pr-[16px] relative shrink-0 z-[1]" data-name="Right content wrapper">
      <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-[45px]" data-name="Link">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full">Introducing Decision Intelligence</p>
      <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] w-full">Learn more about Decision Intelligence</p>
    </div>
  );
}

function RightIconWrapper() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full">Decision Assistant for Decision Services</p>
      <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] w-full">Build and update decision services with AI</p>
    </div>
  );
}

function RightIconWrapper1() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full">Decision Designer for Decision Services</p>
      <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] w-full">Build and update decision services manually</p>
    </div>
  );
}

function RightIconWrapper2() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full">Deploying decision services</p>
      <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] w-full">Learn how to deploy decision services</p>
    </div>
  );
}

function RightIconWrapper3() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full">Executing decision services</p>
      <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] w-full">Learn how to run decision services</p>
    </div>
  );
}

function RightIconWrapper4() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="h-[64px] relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
                <Content1 />
                <RightIconWrapper />
              </div>
            </div>
            <div className="h-[64px] relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
                <Content2 />
                <RightIconWrapper1 />
              </div>
            </div>
            <div className="h-[64px] relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
                <Content3 />
                <RightIconWrapper2 />
              </div>
            </div>
            <div className="h-[64px] relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
                <Content4 />
                <RightIconWrapper3 />
              </div>
            </div>
            <div className="h-[64px] relative shrink-0 w-full" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[#262626] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
                <Content5 />
                <RightIconWrapper4 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitleWrapper2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[5px] items-start min-w-px relative" data-name="Section title wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#c6c6c6] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">More resources</p>
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

function RightContentWrapper2() {
  return <div className="content-stretch flex flex-col h-[16px] items-start overflow-clip pl-[8px] pr-[16px] shrink-0 w-[69px] z-[1]" data-name="Right content wrapper" />;
}

function LeftIconWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_12.5%_12.68%_16%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4402 12.9707">
            <g id="Vector">
              <path d={svgPaths.p376f3600} fill="#F4F4F4" />
              <path d={svgPaths.p3d1d5780} fill="#F4F4F4" />
              <path d={svgPaths.p38f5c00} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Quick start guide</p>
    </div>
  );
}

function RightIconWrapper5() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIconWrapper1() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_18.75%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 12">
            <path d={svgPaths.p2d8fe100} fill="var(--fill-0, #F4F4F4)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Video tutorials</p>
    </div>
  );
}

function RightIconWrapper6() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIconWrapper2() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[3.12%_6.25%_6.25%_0]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.5">
            <g id="Vector">
              <path d={svgPaths.p8a03c00} fill="#F4F4F4" />
              <path d={svgPaths.p3f167b00} fill="#F4F4F4" />
              <path d={svgPaths.p1cadd370} fill="#F4F4F4" />
              <path d={svgPaths.p26bdb400} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Contact support</p>
    </div>
  );
}

function RightIconWrapper7() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIconWrapper3() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p3d35e200} fill="var(--fill-0, #F4F4F4)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Community forum</p>
    </div>
  );
}

function RightIconWrapper8() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIconWrapper4() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0001 10">
            <path d={svgPaths.p1df1d480} fill="var(--fill-0, #F4F4F4)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Release notes</p>
    </div>
  );
}

function RightIconWrapper9() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIconWrapper5() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.pe349080} fill="var(--fill-0, #F4F4F4)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">API documentation</p>
    </div>
  );
}

function RightIconWrapper10() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIconWrapper6() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_3.13%_3.12%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5 14.5001">
            <g id="Vector">
              <path d={svgPaths.p352a9b70} fill="#F4F4F4" />
              <path d={svgPaths.p13f94700} fill="#F4F4F4" />
              <path d={svgPaths.p2ec4900} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">MCP documentation</p>
    </div>
  );
}

function RightIconWrapper11() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIconWrapper7() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_4%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.72 14">
            <path d={svgPaths.p3b4df480} fill="var(--fill-0, #F4F4F4)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">What’s new</p>
    </div>
  );
}

function RightIconWrapper12() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIconWrapper8() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
            <g id="Vector">
              <path d={svgPaths.pe6f1e00} fill="#F4F4F4" />
              <path d="M8 10H2V11H8V10Z" fill="#F4F4F4" />
              <path d="M8 7H2V8H8V7Z" fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#f4f4f4] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Product documentation</p>
    </div>
  );
}

function RightIconWrapper13() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#F4F4F4" />
              <path d={svgPaths.p315f1d80} fill="#F4F4F4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-px isolate items-start min-w-px relative" data-name="Panel Base Components / Link List">
            <div className="relative shrink-0 w-full z-[11]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper />
                <Content6 />
                <RightIconWrapper5 />
              </div>
            </div>
            <div className="relative shrink-0 w-full z-[10]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper1 />
                <Content7 />
                <RightIconWrapper6 />
              </div>
            </div>
            <div className="relative shrink-0 w-full z-[9]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper2 />
                <Content8 />
                <RightIconWrapper7 />
              </div>
            </div>
            <div className="relative shrink-0 w-full z-[8]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper3 />
                <Content9 />
                <RightIconWrapper8 />
              </div>
            </div>
            <div className="relative shrink-0 w-full z-[7]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper4 />
                <Content10 />
                <RightIconWrapper9 />
              </div>
            </div>
            <div className="relative shrink-0 w-full z-[6]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper5 />
                <Content11 />
                <RightIconWrapper10 />
              </div>
            </div>
            <div className="relative shrink-0 w-full z-[5]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper6 />
                <Content12 />
                <RightIconWrapper11 />
              </div>
            </div>
            <div className="relative shrink-0 w-full z-[4]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper7 />
                <Content13 />
                <RightIconWrapper12 />
              </div>
            </div>
            <div className="relative shrink-0 w-full z-[3]" data-name="Panel Base Components / Link List Item">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[10px] relative size-full">
                <LeftIconWrapper8 />
                <Content14 />
                <RightIconWrapper13 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative">
      <div className="content-stretch flex flex-col isolate items-start min-w-[320px] pb-[16px] relative shrink-0 w-[320px]" data-name="Panel Modules / List">
        <div className="bg-[#161616] content-stretch flex h-[32px] isolate items-center shrink-0 sticky top-0 w-full z-[2]" data-name="Panel Base Components / Section title">
          <LeftContentWrapper />
          <RightContentWrapper />
        </div>
        <Frame1 />
      </div>
      <div className="content-stretch flex flex-col isolate items-start min-w-[320px] pb-[16px] relative shrink-0 w-[320px]" data-name="Panel Modules / List">
        <div className="bg-[#161616] content-stretch flex h-[32px] isolate items-center shrink-0 sticky top-0 w-full z-[2]" data-name="Panel Base Components / Section title">
          <LeftContentWrapper1 />
          <RightContentWrapper1 />
        </div>
        <Frame2 />
      </div>
      <div className="content-stretch flex flex-col isolate items-start min-w-[320px] pb-[16px] relative shrink-0 w-[320px]" data-name="Panel Modules / List">
        <div className="bg-[#161616] content-stretch flex h-[32px] isolate items-center shrink-0 sticky top-0 w-full z-[2]" data-name="Panel Base Components / Section title">
          <LeftContentWrapper2 />
          <RightContentWrapper2 />
        </div>
        <Frame3 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic relative text-[#c6c6c6] text-[12px] text-center tracking-[0.32px]">IBM Decision Intelligence v0.0.0</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#161616] content-stretch flex flex-col h-[49px] items-start pt-[17px] px-[16px] relative shrink-0 w-[319px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#393939] border-solid border-t inset-0 pointer-events-none" />
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