import svgPaths from "./svg-3dvu6d1z7j";

function LabelTitle() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Label  + Title">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start not-italic pl-0 pr-[76px] py-0 relative w-full">
          <p className="leading-[16px] relative shrink-0 text-[12px] text-neutral-600 tracking-[0.32px] w-full">Display settings</p>
          <p className="leading-[28px] relative shrink-0 text-[#161616] text-[20px] w-full">Home page display settings</p>
        </div>
      </div>
    </div>
  );
}

function HeaderSpacer() {
  return (
    <div className="opacity-0 relative shrink-0 w-full" data-name="Header spacer">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
          <LabelTitle />
        </div>
      </div>
    </div>
  );
}

function Frame630971() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#6f6f6f] text-[14px] text-nowrap text-right tracking-[0.16px] whitespace-pre">0 of 4 pinned items</p>
    </div>
  );
}

function Frame630970() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <p className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Pinned projects</p>
      <Frame630971 />
    </div>
  );
}

function DescriptionPadding() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Description padding">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-full">Pin projects to pin to your home screen for quick access by clicking the pin icon. Drag and drop to change the order the projects are displayed.</p>
    </div>
  );
}

function ProgressIndicatorDescription() {
  return (
    <div className="relative shrink-0 w-full" data-name="Progress indicator + Description">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[16px] py-0 relative w-full">
          <Frame630970 />
          <DescriptionPadding />
        </div>
      </div>
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="basis-0 content-stretch flex grow h-[18px] items-start min-h-px min-w-px overflow-clip relative shrink-0" data-name="Text Overflow">
      <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.16px]">All</p>
    </div>
  );
}

function ContentSwitcherTextItem() {
  return (
    <div className="basis-0 bg-[#161616] grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="_Content switcher text item">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-start px-[16px] py-[7px] relative w-full">
          <TextOverflow />
        </div>
      </div>
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="basis-0 content-stretch flex grow h-[18px] items-start min-h-px min-w-px overflow-clip relative shrink-0" data-name="Text Overflow">
      <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">Pinned</p>
    </div>
  );
}

function ContentSwitcherTextItem1() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px mix-blend-multiply relative rounded-br-[4px] rounded-tr-[4px] shrink-0" data-name="_Content switcher text item">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[14px] items-start px-[16px] py-[7px] relative w-full">
          <TextOverflow1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#161616] border-[1px_1px_1px_0px] border-solid inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function ContentSwitcher() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start mix-blend-multiply relative rounded-[4px] shrink-0 w-full" data-name="Content switcher">
      <div aria-hidden="true" className="absolute border border-[#161616] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ContentSwitcherTextItem />
      <ContentSwitcherTextItem1 />
    </div>
  );
}

function Frame630968() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">
          <ContentSwitcher />
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
          <rect fill="white" fillOpacity="0.01" height="16" width="16" />
          <path d={svgPaths.p154b5b00} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CloseOutline() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Close--outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Close--outline">
          <rect fill="white" fillOpacity="0.01" height="16" width="16" />
          <g id="Vector">
            <path d={svgPaths.p35e68500} fill="#161616" />
            <path d={svgPaths.p35a89700} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function DraggableListItem() {
  return (
    <div className="bg-[#f4f4f4] h-[40px] relative shrink-0 w-full" data-name="Draggable list item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-0 relative w-full">
          <Search />
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#a8a8a8] text-[16px] text-nowrap">Find a decision project</p>
          <CloseOutline />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Draggable() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Draggable">
        <rect fill="white" fillOpacity="0.01" height="16" width="16" />
        <g id="Vector">
          <path d="M7 3H5V5H7V3Z" fill="#161616" />
          <path d="M11 3H9V5H11V3Z" fill="#161616" />
          <path d="M7 7H5V9H7V7Z" fill="#161616" />
          <path d="M11 7H9V9H11V7Z" fill="#161616" />
          <path d="M7 11H5V13H7V11Z" fill="#161616" />
          <path d="M11 11H9V13H11V11Z" fill="#161616" />
        </g>
      </g>
    </svg>
  );
}

function DraggableItemIndicator() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Draggable item indicator">
      <Draggable />
    </div>
  );
}

function Pin() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Pin">
        <rect fill="white" fillOpacity="0.01" height="16" width="16" />
        <path d={svgPaths.p1057a580} fill="var(--fill-0, #161616)" id="Vector" />
      </g>
    </svg>
  );
}

function PinnedItemIndicator() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Pinned Item Indicator">
      <Pin />
    </div>
  );
}

function DraggableListItem1() {
  return (
    <div className="bg-[#f4f4f4] h-[40px] relative shrink-0 w-full" data-name="Draggable list item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-0 relative w-full">
          <DraggableItemIndicator />
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-nowrap">Content</p>
          <PinnedItemIndicator />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_0px_inset_rgba(15,98,254,0)]" />
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame630969() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full">
      {[...Array(12).keys()].map((_, i) => (
        <DraggableListItem1 key={i} />
      ))}
    </div>
  );
}

function Slot() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Slot">
      <Frame630968 />
      <DraggableListItem />
      <Frame630969 />
    </div>
  );
}

function Slot1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[367.998px] items-start relative shrink-0 w-full" data-name="Slot">
      <Slot />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <ProgressIndicatorDescription />
      <Slot1 />
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
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[640px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start />
      <End />
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex isolate items-start pb-[30px] pl-[16px] pr-[64px] pt-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.16px] whitespace-pre z-[2]">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="basis-0 bg-[#393939] content-stretch flex flex-col grow h-full items-start min-h-px min-w-px overflow-clip relative shrink-0 z-[3]" data-name="2">
      <ButtonContent1 />
    </div>
  );
}

function ButtonContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex isolate items-start pb-[30px] pl-[16px] pr-[64px] pt-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.16px] whitespace-pre z-[2]">Apply</p>
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="basis-0 bg-[#0f62fe] content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-clip relative shrink-0 z-[2]" data-name="1">
      <ButtonContent2 />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-px h-[64px] isolate items-start relative shrink-0 w-[671.002px]" data-name="Actions">
      <Component2 />
      <Component1 />
      <div className="absolute bg-[#f4f4f4] inset-0 z-[1]" data-name="Background" />
    </div>
  );
}

function LabelTitle1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Label  + Title">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start not-italic pl-0 pr-[76px] py-0 relative w-full">
          <p className="leading-[16px] relative shrink-0 text-[12px] text-neutral-600 tracking-[0.32px] w-full">Display settings</p>
          <p className="leading-[28px] relative shrink-0 text-[#161616] text-[20px] w-full">Home page display settings</p>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute box-border content-stretch flex gap-[16px] items-start left-0 p-[16px] top-0 w-[671px]" data-name="Header">
      <LabelTitle1 />
    </div>
  );
}

export default function Modal() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start relative size-full" data-name="Modal">
      <HeaderSpacer />
      <Content />
      <Resizer />
      <Actions />
      <Header />
    </div>
  );
}