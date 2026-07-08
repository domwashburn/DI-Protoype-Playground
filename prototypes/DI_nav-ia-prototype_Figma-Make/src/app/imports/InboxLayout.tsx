import svgPaths from "./svg-sfbclimxdr";

function HeaderWrapper() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-nowrap whitespace-pre">Decision services</p>
    </div>
  );
}

function HeaderWrapper1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Header wrapper">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[28px] items-start relative w-full">
        <HeaderWrapper />
      </div>
    </div>
  );
}

function PanelHeader() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Panel Header">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[10px] relative w-full">
          <HeaderWrapper1 />
        </div>
      </div>
    </div>
  );
}

function AddIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="AddIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="AddIcon">
          <path d={svgPaths.p349d7700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[14px] text-nowrap text-white top-[-0.5px] tracking-[0.16px] whitespace-pre">New decision service</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-[#0f62fe] grow h-[32px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[16px] py-0 relative w-full">
          <AddIcon />
          <Text />
        </div>
      </div>
    </div>
  );
}

function PanelAction() {
  return (
    <div className="relative shrink-0 w-full" data-name="Panel Action">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-start pb-[8px] pt-0 px-[8px] relative w-full">
          <Button />
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Search">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p154b5b00} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[12px] relative shrink-0" data-name="Search icon">
      <Search />
    </div>
  );
}

function HideTextOverflow() {
  return (
    <div className="basis-0 content-stretch flex grow h-[18px] items-start min-h-px min-w-px overflow-clip relative shrink-0" data-name="Hide text overflow">
      <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic relative shrink-0 text-[#a8a8a8] text-[14px] tracking-[0.16px]">Find a decision service</p>
    </div>
  );
}

function SearchDefault() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-center justify-center min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="Search - Default">
      <SearchIcon />
      <HideTextOverflow />
    </div>
  );
}

function Filter() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Filter">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p282f5d00} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <Filter />
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[12px] relative w-full">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent1 />
    </div>
  );
}

function PopoverOverflow() {
  return <div className="content-stretch flex flex-col items-start shrink-0 size-[0.001px]" data-name="Popover overflow" />;
}

function PopoverTabTip() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start mix-blend-multiply relative shrink-0" data-name="Popover - Tab tip">
      <Button2 />
      <PopoverOverflow />
    </div>
  );
}

function Toolbar() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Toolbar">
      <SearchDefault />
      <PopoverTabTip />
    </div>
  );
}

function CircleDash() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash />
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon />
    </div>
  );
}

function ListItemHeaderGroup() {
  return (
    <div className="content-stretch flex h-[18px] items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px]">Service 01</p>
    </div>
  );
}

function ListItemDetailsWrapper() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 1</p>
      <p className="[white-space-collapse:collapse] h-[16px] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup />
      <ListItemDetailsWrapper />
    </div>
  );
}

function ListItemContentWrapper() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative size-full">
          <Icon4 />
          <ListItemContent />
        </div>
      </div>
    </div>
  );
}

function ListItem() {
  return (
    <div className="basis-0 bg-[rgba(141,141,141,0.2)] content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="List item">
      <div aria-hidden="true" className="absolute border-[#0f62fe] border-[0px_0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <ListItemContentWrapper />
      <div className="absolute inset-0 pointer-events-none shadow-[4px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem() {
  return (
    <div className="max-h-[86px] relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash1() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash1 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon1 />
    </div>
  );
}

function ListItemHeaderGroup1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 02</p>
    </div>
  );
}

function ListItemDetailsWrapper1() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 1</p>
      <p className="[white-space-collapse:collapse] h-[16px] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup1 />
      <ListItemDetailsWrapper1 />
    </div>
  );
}

function ListItemContentWrapper1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <Icon5 />
          <ListItemContent1 />
        </div>
      </div>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="basis-0 bg-[rgba(141,141,141,0.32)] content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="List item">
      <div aria-hidden="true" className="absolute border-[#0f62fe] border-[0px_0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <ListItemContentWrapper1 />
      <div className="absolute inset-0 pointer-events-none shadow-[4px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem1() {
  return (
    <div className="max-h-[86px] relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash2() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash2 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon2 />
    </div>
  );
}

function ListItemHeaderGroup2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 03</p>
    </div>
  );
}

function ListItemDetailsWrapper2() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 1</p>
      <p className="[white-space-collapse:collapse] h-[16px] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup2 />
      <ListItemDetailsWrapper2 />
    </div>
  );
}

function ListItemContentWrapper2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <Icon6 />
          <ListItemContent2 />
        </div>
      </div>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="basis-0 bg-[rgba(141,141,141,0.12)] content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper2 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem2() {
  return (
    <div className="max-h-[86px] relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash3() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash3 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon3 />
    </div>
  );
}

function ListItemHeaderGroup3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 04</p>
    </div>
  );
}

function ListItemDetailsWrapper3() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 1</p>
      <p className="[white-space-collapse:collapse] h-[16px] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup3 />
      <ListItemDetailsWrapper3 />
    </div>
  );
}

function ListItemContentWrapper3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <Icon7 />
          <ListItemContent3 />
        </div>
      </div>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper3 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[86px] mix-blend-multiply relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash4() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash4 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon4 />
    </div>
  );
}

function ListItemHeaderGroup4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 05</p>
    </div>
  );
}

function ListItemDetailsWrapper4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] h-[16px] leading-[16px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup4 />
      <ListItemDetailsWrapper4 />
    </div>
  );
}

function ListItemContentWrapper4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <Icon8 />
          <ListItemContent4 />
        </div>
      </div>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper4 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[86px] mix-blend-multiply relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem4 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash5() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash5 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon5 />
    </div>
  );
}

function ListItemHeaderGroup5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 06</p>
    </div>
  );
}

function ListItemDetailsWrapper5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full">Detail slot 1</p>
    </div>
  );
}

function ListItemContent5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup5 />
      <ListItemDetailsWrapper5 />
    </div>
  );
}

function ListItemContentWrapper5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <Icon9 />
          <ListItemContent5 />
        </div>
      </div>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper5 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[86px] mix-blend-multiply relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem5 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash6() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash6 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon6 />
    </div>
  );
}

function ListItemHeaderGroup6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 07</p>
    </div>
  );
}

function ListItemDetailsWrapper6() {
  return <div className="content-stretch flex flex-col items-start overflow-clip shrink-0 w-full" data-name="list item details wrapper" />;
}

function ListItemContent6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup6 />
      <ListItemDetailsWrapper6 />
    </div>
  );
}

function ListItemContentWrapper6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <Icon10 />
          <ListItemContent6 />
        </div>
      </div>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper6 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[86px] mix-blend-multiply relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem6 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Circle-dash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Circle-dash">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p54db600} fill="#161616" />
            <path d={svgPaths.p136a6280} fill="#161616" />
            <path d={svgPaths.p1df8f200} fill="#161616" />
            <path d={svgPaths.p3511c200} fill="#161616" />
            <path d={svgPaths.p3b1beae0} fill="#161616" />
            <path d={svgPaths.pc006f00} fill="#161616" />
            <path d={svgPaths.p10619200} fill="#161616" />
            <path d={svgPaths.p1cc00140} fill="#161616" />
            <path d={svgPaths.p2584dc80} fill="#161616" />
            <path d={svgPaths.p38c15470} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon12() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <CircleDash8 />
    </div>
  );
}

function ButtonContent4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[8px] relative w-full">
          <Icon12 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent4 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <Button3 />
    </div>
  );
}

function Overflow() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply right-[-16px] top-[-8px]" data-name="Overflow">
      <Button4 />
    </div>
  );
}

function ListItemHeaderGroup7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 08</p>
      <Overflow />
    </div>
  );
}

function ListItemDetailsWrapper7() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 1</p>
      <p className="[white-space-collapse:collapse] h-[16px] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent7() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup7 />
      <ListItemDetailsWrapper7 />
    </div>
  );
}

function ListItemContentWrapper7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <ListItemContent7 />
        </div>
      </div>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper7 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[86px] mix-blend-multiply relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem7 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ListItemHeaderGroup8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 09</p>
    </div>
  );
}

function ListItemDetailsWrapper8() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 1</p>
      <p className="[white-space-collapse:collapse] h-[16px] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent8() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup8 />
      <ListItemDetailsWrapper8 />
    </div>
  );
}

function ListItemContentWrapper8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <ListItemContent8 />
        </div>
      </div>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper8 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem8() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[86px] mix-blend-multiply relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem8 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash10() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon9() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash10 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon9 />
    </div>
  );
}

function CircleDash11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Circle-dash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Circle-dash">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p54db600} fill="#161616" />
            <path d={svgPaths.p136a6280} fill="#161616" />
            <path d={svgPaths.p1df8f200} fill="#161616" />
            <path d={svgPaths.p3511c200} fill="#161616" />
            <path d={svgPaths.p3b1beae0} fill="#161616" />
            <path d={svgPaths.pc006f00} fill="#161616" />
            <path d={svgPaths.p10619200} fill="#161616" />
            <path d={svgPaths.p1cc00140} fill="#161616" />
            <path d={svgPaths.p2584dc80} fill="#161616" />
            <path d={svgPaths.p38c15470} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon15() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <CircleDash11 />
    </div>
  );
}

function ButtonContent5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[8px] relative w-full">
          <Icon15 />
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <Button5 />
    </div>
  );
}

function Overflow1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply right-[-16px] top-[-8px]" data-name="Overflow">
      <Button6 />
    </div>
  );
}

function ListItemHeaderGroup9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 10</p>
      <Overflow1 />
    </div>
  );
}

function ListItemDetailsWrapper9() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 1</p>
      <p className="[white-space-collapse:collapse] h-[16px] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent9() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup9 />
      <ListItemDetailsWrapper9 />
    </div>
  );
}

function ListItemContentWrapper9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <Icon14 />
          <ListItemContent9 />
        </div>
      </div>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper9 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem9() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[86px] mix-blend-multiply relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem9 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CircleDash12() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Circle-dash">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p54db600} fill="#161616" />
          <path d={svgPaths.p136a6280} fill="#161616" />
          <path d={svgPaths.p1df8f200} fill="#161616" />
          <path d={svgPaths.p3511c200} fill="#161616" />
          <path d={svgPaths.p3b1beae0} fill="#161616" />
          <path d={svgPaths.pc006f00} fill="#161616" />
          <path d={svgPaths.p10619200} fill="#161616" />
          <path d={svgPaths.p1cc00140} fill="#161616" />
          <path d={svgPaths.p2584dc80} fill="#161616" />
          <path d={svgPaths.p38c15470} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function PlaceholderIcon10() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0 size-[16px]" data-name="placeholder icon">
      <CircleDash12 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center relative shrink-0" data-name="Icon">
      <PlaceholderIcon10 />
    </div>
  );
}

function CircleDash13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Circle-dash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Circle-dash">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p54db600} fill="#161616" />
            <path d={svgPaths.p136a6280} fill="#161616" />
            <path d={svgPaths.p1df8f200} fill="#161616" />
            <path d={svgPaths.p3511c200} fill="#161616" />
            <path d={svgPaths.p3b1beae0} fill="#161616" />
            <path d={svgPaths.pc006f00} fill="#161616" />
            <path d={svgPaths.p10619200} fill="#161616" />
            <path d={svgPaths.p1cc00140} fill="#161616" />
            <path d={svgPaths.p2584dc80} fill="#161616" />
            <path d={svgPaths.p38c15470} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon17() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <CircleDash13 />
    </div>
  );
}

function ButtonContent6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[8px] relative w-full">
          <Icon17 />
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent6 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <Button7 />
    </div>
  );
}

function Overflow2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply right-[-16px] top-[-8px]" data-name="Overflow">
      <Button8 />
    </div>
  );
}

function ListItemHeaderGroup10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="List item header group">
      <p className="-webkit-box basis-0 css-6wd9gb font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Service 11</p>
      <Overflow2 />
    </div>
  );
}

function ListItemDetailsWrapper10() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] w-full" data-name="list item details wrapper">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 1</p>
      <p className="[white-space-collapse:collapse] h-[16px] overflow-ellipsis overflow-hidden relative shrink-0 w-full">Detail slot 2</p>
    </div>
  );
}

function ListItemContent10() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="List Item content">
      <ListItemHeaderGroup10 />
      <ListItemDetailsWrapper10 />
    </div>
  );
}

function ListItemContentWrapper10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="list item content wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative w-full">
          <Icon16 />
          <ListItemContent10 />
        </div>
      </div>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px mix-blend-multiply relative shrink-0" data-name="List item">
      <ListItemContentWrapper10 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_#0f62fe]" />
    </div>
  );
}

function LargeListItem10() {
  return (
    <div className="bg-[rgba(255,255,255,0)] max-h-[86px] mix-blend-multiply relative shrink-0 w-[320px]" data-name="Large list item">
      <div className="content-stretch flex items-center max-h-inherit overflow-clip relative w-[320px]">
        <ListItem10 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PanelContents() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Panel Contents">
      <LargeListItem />
      <LargeListItem1 />
      <LargeListItem2 />
      <LargeListItem3 />
      <LargeListItem4 />
      <LargeListItem5 />
      <LargeListItem6 />
      <LargeListItem7 />
      <LargeListItem8 />
      <LargeListItem9 />
      <LargeListItem10 />
    </div>
  );
}

function RightHandPanel() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[320px] z-[2]" data-name="Right Hand Panel">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <PanelHeader />
      <PanelAction />
      <Toolbar />
      <PanelContents />
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
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start />
      <End />
    </div>
  );
}

function Label() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0043ce] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">published</p>
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

function Tag() {
  return (
    <div className="bg-[#d0e2ff] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="tag">
      <TagContent />
    </div>
  );
}

function Tag1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag />
    </div>
  );
}

function HeaderWrapper2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-nowrap whitespace-pre">{`{Decision Service Name}`}</p>
      <Tag1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center relative">
        <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">create...</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[18px] py-[2px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#0f62fe] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Text1 />
    </div>
  );
}

function HeaderWrapper3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-between pl-[32px] pr-[8px] py-[8px] relative w-full">
          <HeaderWrapper2 />
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Models</p>
    </div>
  );
}

function TabsItems() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#0f62fe] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow />
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Data</p>
    </div>
  );
}

function TabsItems1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow1 />
    </div>
  );
}

function TextOverflow2() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Decision operations</p>
    </div>
  );
}

function TabsItems2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow2 />
    </div>
  );
}

function TextOverflow3() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Decision service settings</p>
    </div>
  );
}

function TabsItems3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow3 />
    </div>
  );
}

function Tabs() {
  return (
    <div className="basis-0 content-stretch flex gap-px grow items-start min-h-px min-w-px overflow-clip relative shrink-0" data-name="Tabs">
      <TabsItems />
      <TabsItems1 />
      <TabsItems2 />
      <TabsItems3 />
    </div>
  );
}

function Tabs1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 z-[2]" data-name="Tabs">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-px items-start pl-[16px] pr-0 py-0 relative w-full">
          <Tabs />
        </div>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3a607b80} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.p15fb9780} fill="var(--fill-0, #161616)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Button">
      <Icon19 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p18788d00} fill="var(--fill-0, #161616)" id="Vector" />
          <path d={svgPaths.pb98f00} fill="var(--fill-0, #161616)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[40px] size-[40px] top-0" data-name="Button">
      <Icon20 />
    </div>
  );
}

function Information() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Information">
        <rect fill="white" fillOpacity="0.01" height="16" width="16" />
        <g id="Vector">
          <path d={svgPaths.p5fc9300} fill="#161616" />
          <path d={svgPaths.p98e4880} fill="#161616" />
          <path d={svgPaths.p7105d00} fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative size-[16px]">
        <Information />
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[80px] size-[40px] top-0" data-name="Button">
      <Icon21 />
    </div>
  );
}

function PanelTriggers() {
  return (
    <div className="h-[40px] relative shrink-0 w-[120px] z-[1]" data-name="PanelTriggers">
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function TabWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="tab wrapper">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex isolate items-start relative w-full">
        <Tabs1 />
        <PanelTriggers />
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Page Header">
      <HeaderWrapper3 />
      <TabWrapper />
    </div>
  );
}

function Container() {
  return <div className="absolute h-[74px] left-px top-px w-[4px]" data-name="Container" />;
}

function ErrorIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ErrorIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ErrorIcon">
          <path d={svgPaths.p25572c00} fill="var(--fill-0, #C6C6C6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute box-border content-stretch flex h-[74px] items-start left-[21px] pb-0 pl-[12px] pr-0 pt-[14px] top-px w-[32px]" data-name="Container">
      <ErrorIcon />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[20px] left-0 top-[15px] w-[1113px]" data-name="Heading 4">
      <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[20px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-0.5px] tracking-[0.16px] whitespace-pre">Sample notification banner</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[20px] left-0 top-[39px] w-[1113px]" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[20px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-0.5px] tracking-[0.16px] whitespace-pre">Sample message content here</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[74px] left-[69px] top-px w-[1129px]" data-name="Container">
      <Heading4 />
      <Paragraph />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#fff1f1] h-[76px] relative rounded-[4px] shrink-0 w-[895px]" data-name="Container">
      <div className="h-[76px] overflow-clip relative w-[895px]">
        <Container />
        <Container1 />
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(218,30,40,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[28px] left-0 top-0 w-[1165px]" data-name="Heading 2">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] left-0 not-italic text-[#6929c4] text-[20px] text-nowrap top-0 whitespace-pre">Page content placeholder</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-0 top-[32px] w-[1165px]" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[20px] left-0 not-italic text-[#6929c4] text-[14px] text-nowrap top-[-0.5px] tracking-[0.16px] whitespace-pre">Page content goes here</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Paragraph1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#e8daff] box-border content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative rounded-[4px] shrink-0 w-[895px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#6929c4] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
          <Container3 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[927px] z-[1]" data-name="Container">
      <PageHeader />
      <Container6 />
    </div>
  );
}

export default function InboxLayout() {
  return (
    <div className="content-stretch flex isolate items-start relative size-full" data-name="Inbox Layout">
      <RightHandPanel />
      <Container7 />
    </div>
  );
}