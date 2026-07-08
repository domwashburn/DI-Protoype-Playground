import svgPaths from "./svg-libt8sdyhq";

function Text() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] whitespace-nowrap">Resource hub</p>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Breadcrumb">
      <Text />
    </div>
  );
}

function BreadcrumbWrapper() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Breadcrumb wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[32px] relative size-full">
          <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0" data-name="Breadcrumb">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="_Breadcrumb item">
              <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <Breadcrumb />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
      <BreadcrumbWrapper />
    </div>
  );
}

function ActionBarPiecesIconButtonsBackground() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="action-bar / pieces / icon-buttons / background">
      <div className="absolute left-0 size-[48px] top-0" data-name="button / 04 ghost / small / 03 icon / 01 enabled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Icon">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d={svgPaths.p32e016c0} fill="var(--fill-0, #161616)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionsOperationsFilter() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Actions / Operations / filter / 24">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Actions / Operations / filter / 24">
          <g id="Fill" />
        </g>
      </svg>
    </div>
  );
}

function ActionBarPiecesIconButtonsBackground1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="action-bar / pieces / icon-buttons / background">
      <div className="absolute left-0 size-[48px] top-0" data-name="button / 04 ghost / small / 03 icon / 01 enabled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Icon">
          <div className="absolute inset-[6.14%_9.37%_9.37%_6.14%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5177 13.5177">
              <path d={svgPaths.p23d74400} fill="var(--fill-0, #161616)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionsOperationsFilter1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Actions / Operations / filter / 24">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Actions / Operations / filter / 24">
          <g id="Fill" />
        </g>
      </svg>
    </div>
  );
}

function ResourcePageFindFilter() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center relative shrink-0" data-name="Resource Page Find & Filter">
      <div className="relative shrink-0 size-[48px]" data-name="components / table-header / pieces / filter-button / 01-enabled">
        <ActionBarPiecesIconButtonsBackground />
        <ActionsOperationsFilter />
      </div>
      <div className="bg-[#e0e0e0] h-[24px] relative shrink-0 w-px" data-name="Divider" />
      <div className="relative shrink-0 size-[48px]" data-name="components / table-header / pieces / filter-button / 01-enabled">
        <ActionBarPiecesIconButtonsBackground1 />
        <ActionsOperationsFilter1 />
      </div>
      <div className="bg-[#e0e0e0] h-[24px] relative shrink-0 w-px" data-name="Divider" />
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] whitespace-nowrap">Sample assets</p>
    </div>
  );
}

function TextIcon() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text + Icon">
      <TextOverflow />
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#525252] text-[14px] tracking-[0.16px] whitespace-nowrap">Sample policies</p>
    </div>
  );
}

function TextIcon1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text + Icon">
      <TextOverflow1 />
    </div>
  );
}

function TextOverflow2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#525252] text-[14px] tracking-[0.16px] whitespace-nowrap">Sample prompts</p>
    </div>
  );
}

function TextIcon2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text + Icon">
      <TextOverflow2 />
    </div>
  );
}

function TextOverflow3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#525252] text-[14px] tracking-[0.16px] whitespace-nowrap">Sample dashboards</p>
    </div>
  );
}

function TextIcon3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text + Icon">
      <TextOverflow3 />
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-name="Tabs">
      <div className="bg-white relative shrink-0" data-name="_Horizontal tabs items">
        <div className="content-stretch flex flex-col items-start overflow-clip px-[16px] py-[15px] relative rounded-[inherit] size-full">
          <TextIcon />
        </div>
        <div aria-hidden className="absolute border-[#0f62fe] border-solid border-t-2 inset-0 pointer-events-none" />
      </div>
      <div className="bg-[#e0e0e0] content-stretch flex flex-col items-start overflow-clip px-[16px] py-[15px] relative shrink-0" data-name="_Horizontal tabs items">
        <TextIcon1 />
        <div className="absolute bottom-0 flex items-center justify-center right-px top-0 w-0" style={{ containerType: "size" }}>
          <div className="flex-none h-[46216800cqw] rotate-90 w-[100cqh]">
            <div className="relative size-full" data-name="Divider">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 1">
                  <line id="Divider" stroke="var(--stroke-0, #8D8D8D)" x2="48" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#e0e0e0] content-stretch flex flex-col items-start overflow-clip px-[16px] py-[15px] relative shrink-0" data-name="_Horizontal tabs items">
        <TextIcon2 />
        <div className="absolute bottom-0 flex items-center justify-center right-px top-0 w-0" style={{ containerType: "size" }}>
          <div className="flex-none h-[46216800cqw] rotate-90 w-[100cqh]">
            <div className="relative size-full" data-name="Divider">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 1">
                  <line id="Divider" stroke="var(--stroke-0, #8D8D8D)" x2="48" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#e0e0e0] content-stretch flex flex-col items-start overflow-clip px-[16px] py-[15px] relative shrink-0" data-name="_Horizontal tabs items">
        <TextIcon3 />
      </div>
    </div>
  );
}

function PageTabs() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Page tabs">
      <ResourcePageFindFilter />
      <div className="content-stretch flex items-start relative shrink-0" data-name="Tabs">
        <Tabs />
      </div>
    </div>
  );
}

function FilterPanel() {
  return (
    <div className="bg-white flex-[1_0_0] h-[1036px] min-w-px overflow-clip relative" data-name="Filter Panel">
      <div className="[word-break:break-word] absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[0] left-[59px] text-[12px] text-black top-[239px] whitespace-nowrap">
        <p className="leading-[normal] mb-0">Filter panel contents</p>
        <p className="leading-[normal]">TBD</p>
      </div>
    </div>
  );
}

function LeftFilterPanelWrapper() {
  return (
    <div className="content-stretch flex items-start justify-end overflow-clip relative shrink-0 w-[256px]" data-name="Left Filter Panel Wrapper">
      <FilterPanel />
    </div>
  );
}

function CardSectionHeaderGroup() {
  return (
    <div className="relative shrink-0" data-name="Card Section Header Group">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start not-italic relative size-full whitespace-nowrap">
        <p className="leading-[28px] overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-ellipsis w-[112px]">Section Title</p>
        <p className="leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-[124px]">Section description</p>
      </div>
    </div>
  );
}

function CardSectionHeaderWrapper() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Card Section Header Wrapper">
      <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
        <CardSectionHeaderGroup />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent />
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button />
        </div>
      </div>
    </div>
  );
}

function CardBody() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider />
        <Type />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader />
      <CardBody />
      <CardFooter />
    </div>
  );
}

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent1 />
      </div>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame1 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function CardBody1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type1() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter1() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider1 />
        <Type1 />
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader1 />
      <CardBody1 />
      <CardFooter1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent2 />
      </div>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame2 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function CardBody2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider2() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type2() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter2() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider2 />
        <Type2 />
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader2 />
      <CardBody2 />
      <CardFooter2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent3 />
      </div>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame3 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function CardBody3() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider3() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type3() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter3() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider3 />
        <Type3 />
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader3 />
      <CardBody3 />
      <CardFooter3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent4 />
      </div>
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame4 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function CardBody4() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider4() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type4() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter4() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider4 />
        <Type4 />
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader4 />
      <CardBody4 />
      <CardFooter4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent5 />
      </div>
    </div>
  );
}

function CardHeader5() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame5 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function CardBody5() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider5() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type5() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter5() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider5 />
        <Type5 />
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader5 />
      <CardBody5 />
      <CardFooter5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon6 />
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent6 />
      </div>
    </div>
  );
}

function CardHeader6() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame6 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function CardBody6() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider6() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type6() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter6() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider6 />
        <Type6 />
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader6 />
      <CardBody6 />
      <CardFooter6 />
    </div>
  );
}

function CardSection() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start overflow-clip relative shrink-0 w-full" data-name="Card Section">
      <CardSectionHeaderWrapper />
      <div className="gap-x-px gap-y-px grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(4,fit-content(100%))] max-w-[1055px] min-w-[672px] overflow-clip relative shrink-0 w-full" data-name="_Card Grid">
        <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-1 shrink-0" data-name="Resoruce Hub Card">
          <Content1 />
        </div>
        <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-1 shrink-0" data-name="Resoruce Hub Card">
          <Content2 />
        </div>
        <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-2 shrink-0" data-name="Resoruce Hub Card">
          <Content3 />
        </div>
        <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-2 shrink-0" data-name="Resoruce Hub Card">
          <Content4 />
        </div>
        <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-3 shrink-0" data-name="Resoruce Hub Card">
          <Content5 />
        </div>
        <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-3 shrink-0" data-name="Resoruce Hub Card">
          <Content6 />
        </div>
        <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-4 shrink-0" data-name="Resoruce Hub Card">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function CardSectionHeaderGroup1() {
  return (
    <div className="relative shrink-0" data-name="Card Section Header Group">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start not-italic relative size-full whitespace-nowrap">
        <p className="leading-[28px] overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-ellipsis w-[112px]">Section Title</p>
        <p className="leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-[124px]">Section description</p>
      </div>
    </div>
  );
}

function CardSectionHeaderWrapper1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Card Section Header Wrapper">
      <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
        <CardSectionHeaderGroup1 />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent7 />
      </div>
    </div>
  );
}

function CardHeader7() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame7 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function CardBody7() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider7() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type7() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter7() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider7 />
        <Type7 />
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader7 />
      <CardBody7 />
      <CardFooter7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon8 />
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent8 />
      </div>
    </div>
  );
}

function CardHeader8() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame8 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button8 />
        </div>
      </div>
    </div>
  );
}

function CardBody8() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider8() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type8() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter8() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider8 />
        <Type8 />
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader8 />
      <CardBody8 />
      <CardFooter8 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon9 />
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent9 />
      </div>
    </div>
  );
}

function CardHeader9() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame9 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function CardBody9() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider9() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type9() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter9() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider9 />
        <Type9 />
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader9 />
      <CardBody9 />
      <CardFooter9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon10 />
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent10 />
      </div>
    </div>
  );
}

function CardHeader10() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame10 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button10 />
        </div>
      </div>
    </div>
  );
}

function CardBody10() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider10() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type10() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter10() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider10 />
        <Type10 />
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader10 />
      <CardBody10 />
      <CardFooter10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon11 />
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent11 />
      </div>
    </div>
  );
}

function CardHeader11() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame11 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button11 />
        </div>
      </div>
    </div>
  );
}

function CardBody11() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider11() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type11() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter11() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider11 />
        <Type11 />
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader11 />
      <CardBody11 />
      <CardFooter11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon12 />
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent12 />
      </div>
    </div>
  );
}

function CardHeader12() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame12 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button12 />
        </div>
      </div>
    </div>
  );
}

function CardBody12() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider12() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type12() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter12() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider12 />
        <Type12 />
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader12 />
      <CardBody12 />
      <CardFooter12 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
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

function ButtonContent13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon13 />
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent13 />
      </div>
    </div>
  );
}

function CardHeader13() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame13 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button13 />
        </div>
      </div>
    </div>
  );
}

function CardBody13() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider13() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type13() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter13() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider13 />
        <Type13 />
      </div>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader13 />
      <CardBody13 />
      <CardFooter13 />
    </div>
  );
}

function CardSection1() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start overflow-clip relative shrink-0 w-full" data-name="Card Section">
      <CardSectionHeaderWrapper1 />
      <div className="bg-white gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(4,fit-content(100%))] max-w-[1055px] min-w-[672px] overflow-clip relative shrink-0 w-full" data-name="_Card Grid">
        <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-1 shrink-0" data-name="Resoruce Hub Card">
          <Content8 />
        </div>
        <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-1 shrink-0" data-name="Resoruce Hub Card">
          <Content9 />
        </div>
        <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-2 shrink-0" data-name="Resoruce Hub Card">
          <Content10 />
        </div>
        <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-2 shrink-0" data-name="Resoruce Hub Card">
          <Content11 />
        </div>
        <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-3 shrink-0" data-name="Resoruce Hub Card">
          <Content12 />
        </div>
        <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-3 shrink-0" data-name="Resoruce Hub Card">
          <Content13 />
        </div>
        <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-4 shrink-0" data-name="Resoruce Hub Card">
          <Content14 />
        </div>
      </div>
    </div>
  );
}

function ResourceList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-px h-[1036px] items-start min-w-px relative" data-name="Resource List">
      <CardSection />
      <CardSection1 />
    </div>
  );
}

function ResourcePageContent() {
  return (
    <div className="content-stretch flex gap-px items-center relative shrink-0 w-full" data-name="Resource Page Content">
      <LeftFilterPanelWrapper />
      <ResourceList />
    </div>
  );
}

function PageContentWrapper() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Page Content Wrapper">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-px items-start pt-[16px] px-[16px] relative size-full">
          <PageTabs />
          <ResourcePageContent />
        </div>
      </div>
    </div>
  );
}

function PanelProviderPage() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px relative w-full z-[1]" data-name="Panel Provider: Page">
      <PageContentWrapper />
    </div>
  );
}

export default function AppContentWrapper() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col isolate items-start relative size-full" data-name="App Content Wrapper">
      <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]" data-name="Breadcrumbs & Action Bar">
        <Content />
      </div>
      <PanelProviderPage />
    </div>
  );
}