function SubHeading1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Sub heading 1">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-600 text-nowrap tracking-[0.32px] whitespace-pre">Data type</p>
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
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] text-nowrap whitespace-pre">Data type display label</p>
      <Tag1 />
    </div>
  );
}

export default function HeaderWrapper1() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Header wrapper">
      <SubHeaderGroup />
      <HeaderWrapper />
    </div>
  );
}