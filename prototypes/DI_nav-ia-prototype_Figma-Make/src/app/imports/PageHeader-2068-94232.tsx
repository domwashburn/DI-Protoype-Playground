import svgPaths from "./svg-su1e24rr1v";

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

function HeaderWrapper() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-nowrap whitespace-pre">{`{Decision Service Name}`}</p>
      <Tag1 />
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center relative">
        <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">create...</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[18px] py-[2px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#0f62fe] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Text />
    </div>
  );
}

function HeaderWrapper1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-between pl-[32px] pr-[8px] py-[8px] relative w-full">
          <HeaderWrapper />
          <Button />
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

function Icon1() {
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

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Icon2() {
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

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[40px] size-[40px] top-0" data-name="Button">
      <Icon2 />
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

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative size-[16px]">
        <Information />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[80px] size-[40px] top-0" data-name="Button">
      <Icon3 />
    </div>
  );
}

function PanelTriggers() {
  return (
    <div className="h-[40px] relative shrink-0 w-[120px] z-[1]" data-name="PanelTriggers">
      <Button2 />
      <Button3 />
      <Button4 />
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

export default function PageHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Page Header">
      <HeaderWrapper1 />
      <TabWrapper />
    </div>
  );
}