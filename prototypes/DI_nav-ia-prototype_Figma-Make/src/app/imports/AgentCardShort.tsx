import svgPaths from "./svg-764ter8l8r";

function AiLayerBackground() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow isolate items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="AI layer - Background">
      <div className="absolute bg-gradient-to-b bottom-0 from-[rgba(255,255,255,0)] left-0 right-0 to-[rgba(69,137,255,0.1)] top-1/2 z-[3]" data-name="Aura - Light themes">
        <div className="absolute inset-0 pointer-events-none shadow-[0px_-80px_70px_-65px_inset_rgba(15,98,254,0.1)]" />
      </div>
      <div className="absolute bg-white inset-0 z-[1]" data-name="Background" />
    </div>
  );
}

function AiBackgroundLayerWrapper() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start" data-name="AI background layer wrapper">
      <AiLayerBackground />
    </div>
  );
}

function AiLayerBorder() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply" data-name="AI layer - Border">
      <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function AiLayerShadow() {
  return <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px mix-blend-multiply shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)] shrink-0 w-full" data-name="AI layer - Shadow" />;
}

function AiShadowWrapper() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start" data-name="AI shadow wrapper">
      <AiLayerShadow />
    </div>
  );
}

function Frame12343699() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start justify-center not-italic relative shrink-0 text-nowrap w-full">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] w-full">Decision Automation Label</p>
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] tracking-[0.32px] w-full">Deployed</p>
    </div>
  );
}

function Frame12343653() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[48px] items-start justify-center min-h-px min-w-px relative shrink-0">
      <Frame12343699 />
    </div>
  );
}

function RightSide() {
  return (
    <div className="basis-0 content-stretch flex gap-[9px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Right side">
      <Frame12343653 />
    </div>
  );
}

function OverflowMenuVertical() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Overflow-menu--vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Overflow-menu--vertical">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p3bcaf400} fill="#161616" />
            <path d={svgPaths.p3af0dbf2} fill="#161616" />
            <path d={svgPaths.p2dfee680} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <OverflowMenuVertical />
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex isolate items-center p-[8px] relative w-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <Button />
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="basis-0 content-stretch flex grow isolate items-center min-h-px min-w-px overflow-clip relative shrink-0 z-[2]" data-name="Text overflow">
      <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] z-[1]">Menu item</p>
    </div>
  );
}

function TextOverflowMenuStyle() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow isolate items-center min-h-px min-w-px overflow-clip relative shrink-0 z-[1]" data-name="Text overflow + Menu style">
      <TextOverflow />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <TextOverflowMenuStyle />
        </div>
      </div>
    </div>
  );
}

function MenuListItem() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start justify-center max-w-[288px] min-w-[160px] relative shrink-0 w-full" data-name="_Menu list item">
      <div className="bg-[rgba(255,255,255,0)] h-[4px] mix-blend-multiply shrink-0 w-full" data-name="Top spacer" />
      <Content />
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="basis-0 content-stretch flex grow isolate items-center min-h-px min-w-px overflow-clip relative shrink-0 z-[2]" data-name="Text overflow">
      <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] z-[1]">Menu item</p>
    </div>
  );
}

function TextOverflowMenuStyle1() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow isolate items-center min-h-px min-w-px overflow-clip relative shrink-0 z-[1]" data-name="Text overflow + Menu style">
      <TextOverflow1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <TextOverflowMenuStyle1 />
        </div>
      </div>
    </div>
  );
}

function MenuListItem1() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start justify-center max-w-[288px] min-w-[160px] relative shrink-0 w-full" data-name="_Menu list item">
      <Content1 />
    </div>
  );
}

function TextOverflow4() {
  return (
    <div className="basis-0 content-stretch flex grow isolate items-center min-h-px min-w-px overflow-clip relative shrink-0 z-[2]" data-name="Text overflow">
      <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] z-[1]">Delete</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p15c4b980} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function KeyboardShortcut() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 z-[1]" data-name="Keyboard shortcut">
      <Icon1 />
    </div>
  );
}

function TextOverflowMenuStyle4() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow isolate items-center min-h-px min-w-px overflow-clip relative shrink-0 z-[1]" data-name="Text overflow + Menu style">
      <TextOverflow4 />
      <KeyboardShortcut />
    </div>
  );
}

function Content4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <TextOverflowMenuStyle4 />
        </div>
      </div>
    </div>
  );
}

function MenuListItem4() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start justify-center max-w-[288px] min-w-[160px] relative shrink-0 w-full" data-name="_Menu list item">
      <div className="bg-[rgba(255,255,255,0)] h-[4px] mix-blend-multiply shrink-0 w-full" data-name="Top spacer" />
      <div className="absolute flex h-0 items-center justify-center left-0 right-0 top-0">
        <div className="flex-none">
          <div className="relative size-full" data-name="Divider">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(198, 198, 198, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 1">
                <line id="Divider" stroke="var(--stroke-0, #C6C6C6)" x2="160" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Content4 />
      <div className="h-[4px] shrink-0 w-full" data-name="Bottom spacer" />
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
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start />
      <End />
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[160px] relative shrink-0" data-name="Menu">
      <MenuListItem />
      {[...Array(3).keys()].map((_, i) => (
        <MenuListItem1 key={i} />
      ))}
      <MenuListItem4 />
      <Resizer />
    </div>
  );
}

function ListOverflow() {
  return (
    <div className="content-stretch flex flex-col h-[0.001px] items-start relative shrink-0 w-[32px]" data-name="List overflow">
      <Menu />
    </div>
  );
}

function Overflow() {
  return (
    <div className="bg-[#f4f4f4] box-border content-stretch flex flex-col items-start relative shadow-[0px_2px_6px_0px_rgba(0,0,0,0.3)] shrink-0" data-name="Overflow">
      <Button1 />
      <ListOverflow />
    </div>
  );
}

function TopLevelIcons() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Top level icons">
      <Overflow />
    </div>
  );
}

function Frame12343754() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-[256px] top-[16px]">
      <TopLevelIcons />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[78px] relative shrink-0 w-full z-[4]" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[44px] h-[78px] items-center p-[16px] relative w-full">
          <RightSide />
          <Frame12343754 />
        </div>
      </div>
    </div>
  );
}

function Frame12343745() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full z-[3]">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center p-[16px] relative size-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-full leading-[16px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px]">Description text</p>
        </div>
      </div>
    </div>
  );
}

function Frame12343734() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] grow h-[48px] items-start min-h-px min-w-px not-italic relative shrink-0 text-neutral-600 text-nowrap">
      <p className="[white-space-collapse:collapse] h-[16px] leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] tracking-[0.32px] w-full">Last updated date</p>
      <p className="[white-space-collapse:collapse] h-[20px] leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] tracking-[0.16px] w-full">{`YYYY-MM-DD `}</p>
    </div>
  );
}

function Frame12343735() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] grow h-[48px] items-start min-h-px min-w-px not-italic relative shrink-0 text-neutral-600 text-nowrap">
      <p className="[white-space-collapse:collapse] h-[16px] leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] tracking-[0.32px] w-full">Last updated by</p>
      <p className="[white-space-collapse:collapse] h-[20px] leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] tracking-[0.16px] w-full">User name</p>
    </div>
  );
}

function ProviderMetaData() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Provider Meta data">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <Frame12343734 />
          <Frame12343735 />
        </div>
      </div>
    </div>
  );
}

function Start1() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End1() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start1 />
      <End1 />
    </div>
  );
}

function Label() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0043ce] text-[12px] text-nowrap tracking-[0.32px] whitespace-pre">Review updates</p>
      <Resizer1 />
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

function TagReadOnly() {
  return (
    <div className="bg-[#d0e2ff] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="Tag - Read-only">
      <TagContent />
    </div>
  );
}

function Start2() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End2() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start2 />
      <End2 />
    </div>
  );
}

function Label1() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0043ce] text-[12px] text-nowrap tracking-[0.32px] whitespace-pre">tag</p>
      <Resizer2 />
    </div>
  );
}

function TagContent1() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[4px] py-0 relative rounded-[24px] shrink-0" data-name="Tag content">
      <Label1 />
    </div>
  );
}

function TagReadOnly1() {
  return (
    <div className="bg-[#d0e2ff] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="Tag - Read-only">
      <TagContent1 />
    </div>
  );
}

function Frame12343747() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <TagReadOnly />
      {[...Array(2).keys()].map((_, i) => (
        <TagReadOnly1 key={i} />
      ))}
    </div>
  );
}

function BottomMetricsTagsDisabled() {
  return (
    <div className="box-border content-stretch flex h-[48px] items-center pl-[8px] pr-0 py-0 relative shrink-0" data-name="Bottom metrics/Tags/Disabled">
      <Frame12343747 />
    </div>
  );
}

function Frame12343760() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
      <BottomMetricsTagsDisabled />
    </div>
  );
}

function BottomMetricsCards() {
  return (
    <div className="content-stretch flex flex-col h-[49px] items-start relative shrink-0 w-full z-[1]" data-name="Bottom metrics cards">
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(166, 200, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 304 1">
            <line id="Divider" stroke="var(--stroke-0, #A6C8FF)" strokeOpacity="0.64" x2="304" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame12343760 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col h-[256px] isolate items-start relative shrink-0 w-full" data-name="Content">
      <Header />
      <Frame12343745 />
      <ProviderMetaData />
      <BottomMetricsCards />
    </div>
  );
}

export default function AgentCardShort() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Agent card- Short">
      <AiBackgroundLayerWrapper />
      <AiLayerBorder />
      <AiShadowWrapper />
      <Content5 />
    </div>
  );
}