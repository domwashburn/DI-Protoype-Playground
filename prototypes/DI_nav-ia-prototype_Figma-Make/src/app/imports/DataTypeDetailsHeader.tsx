import svgPaths from "./svg-nx4jc4uvwt";

function SubHeading1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Sub heading 1">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] whitespace-pre">{`{sub-title}`}</p>
    </div>
  );
}

function SubHeaderGroup() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Sub-header group">
      <SubHeading1 />
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
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0043ce] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">tag</p>
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

function HeaderWrapper() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-nowrap whitespace-pre">{`{Page title}`}</p>
      <Tag1 />
    </div>
  );
}

function HeaderWrapper1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header wrapper">
      <SubHeaderGroup />
      <HeaderWrapper />
    </div>
  );
}

function HeaderGroupLargeHeaderGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Header group / Large header group">
      <HeaderWrapper1 />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Add">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p349d7700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <Add />
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center pl-[16px] pr-[64px] py-[11px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[2]">Action</p>
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative">
        <ButtonContent1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#0f62fe] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow h-[40px] items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Header actions">
      <Button />
    </div>
  );
}

function HeaderWrapper2() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="header wrapper">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-start pb-[8px] pl-[32px] pr-[16px] pt-[16px] relative w-full">
          <HeaderGroupLargeHeaderGroup />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Tab</p>
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
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Tab</p>
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

function TextOverflow4() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Tab</p>
    </div>
  );
}

function TabsItems4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow4 />
    </div>
  );
}

function Tabs() {
  return (
    <div className="basis-0 content-stretch flex gap-px grow items-start min-h-px min-w-px overflow-clip relative shrink-0" data-name="Tabs">
      <TabsItems />
      {[...Array(3).keys()].map((_, i) => (
        <TabsItems1 key={i} />
      ))}
      <TabsItems4 />
    </div>
  );
}

function Tabs1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 z-[1]" data-name="Tabs">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-px items-start pl-[16px] pr-0 py-0 relative w-full">
          <Tabs />
        </div>
      </div>
    </div>
  );
}

function TabWrapper() {
  return (
    <div className="content-stretch flex isolate items-start relative shrink-0 w-full z-[1]" data-name="tab wrapper">
      <Tabs1 />
    </div>
  );
}

export default function DataTypeDetailsHeader() {
  return (
    <div className="bg-white relative size-full" data-name="Data type details header">
      <div className="content-stretch flex flex-col isolate items-start relative size-full">
        <HeaderWrapper2 />
        <TabWrapper />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}