function PageTitleGroup() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-baseline min-h-px min-w-px relative shrink-0" data-name="Page title group">
      <div className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap text-right">
        <p className="leading-[28px] whitespace-pre">Page Title</p>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="bg-white box-border content-stretch flex h-[64px] items-center pb-[8px] pl-[32px] pr-[16px] pt-[16px] relative shrink-0 w-[1312px]" data-name="Page header">
      <PageTitleGroup />
    </div>
  );
}

function UtilitiesSpacerComponentHorizontalSpacing0516PxOff() {
  return (
    <div className="h-[40px] relative shrink-0 w-[16px]" data-name="utilities / spacer / component / horizontal / spacing-05 (16px) / off">
      <div className="absolute h-[32px] right-0 top-0 w-[16px]" data-name="spacer" />
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <div className="font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="leading-[18px] whitespace-pre">Tab 1</p>
      </div>
    </div>
  );
}

function TabsItems() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#0f62fe] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow />
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <div className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">
        <p className="leading-[18px] whitespace-pre">Tab 2</p>
      </div>
    </div>
  );
}

function TabsItems1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow1 />
    </div>
  );
}

function TextOverflow2() {
  return (
    <div className="content-stretch flex h-[18px] items-start overflow-clip relative shrink-0" data-name="Text overflow">
      <div className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">
        <p className="leading-[18px] whitespace-pre">Tab 3</p>
      </div>
    </div>
  );
}

function TabsItems2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] items-center mix-blend-multiply px-[16px] py-[11px] relative shrink-0" data-name="_Tabs items">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <TextOverflow2 />
    </div>
  );
}

function Tabs() {
  return (
    <div className="basis-0 content-stretch flex gap-px grow items-start min-h-px min-w-px overflow-clip relative shrink-0" data-name="Tabs">
      <TabsItems />
      <TabsItems1 />
      <TabsItems2 />
    </div>
  );
}

function Tabs1() {
  return (
    <div className="content-stretch flex gap-px items-start relative shrink-0 w-[1296px]" data-name="Tabs">
      <Tabs />
    </div>
  );
}

function PageLevelNavigationL2Tabs() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center relative shrink-0 w-full" data-name="Page level navigation (L2 Tabs)">
      <UtilitiesSpacerComponentHorizontalSpacing0516PxOff />
      <Tabs1 />
    </div>
  );
}

export default function PageHeaderWrapper() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="page header wrapper">
      <PageHeader />
      <PageLevelNavigationL2Tabs />
    </div>
  );
}