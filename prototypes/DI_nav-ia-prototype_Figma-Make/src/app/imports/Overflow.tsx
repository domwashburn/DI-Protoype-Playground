import svgPaths from "./svg-euoyy9aapc";

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
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[12px] relative w-full">
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
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[11px] relative w-full">
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
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[11px] relative w-full">
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
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[11px] relative w-full">
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
    <div className="content-stretch flex flex-col h-[0.001px] items-end relative shrink-0 w-[40px]" data-name="List overflow">
      <Menu />
    </div>
  );
}

export default function Overflow() {
  return (
    <div className="bg-[#f4f4f4] box-border content-stretch flex flex-col items-end relative shadow-[0px_2px_6px_0px_rgba(0,0,0,0.3)] size-full" data-name="Overflow">
      <Button1 />
      <ListOverflow />
    </div>
  );
}