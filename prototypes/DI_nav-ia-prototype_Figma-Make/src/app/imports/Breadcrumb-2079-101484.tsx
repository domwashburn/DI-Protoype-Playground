function Text() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Text">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Decision Automations</p>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Breadcrumb">
      <Text />
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">/</p>
    </div>
  );
}

function BreadcrumbItem() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative shrink-0" data-name="_Breadcrumb item">
      <Breadcrumb />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Text">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">{`{Decision Automation Name}`}</p>
    </div>
  );
}

function Breadcrumb1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Breadcrumb">
      <Text1 />
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">/</p>
    </div>
  );
}

function BreadcrumbItem1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative shrink-0" data-name="_Breadcrumb item">
      <Breadcrumb1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Text">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">{`{Decision Service}`}</p>
    </div>
  );
}

function Breadcrumb2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Breadcrumb">
      <Text2 />
    </div>
  );
}

function BreadcrumbItem2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative shrink-0" data-name="_Breadcrumb item">
      <Breadcrumb2 />
    </div>
  );
}

export default function Breadcrumb3() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative size-full" data-name="Breadcrumb">
      <BreadcrumbItem />
      <BreadcrumbItem1 />
      <BreadcrumbItem2 />
    </div>
  );
}