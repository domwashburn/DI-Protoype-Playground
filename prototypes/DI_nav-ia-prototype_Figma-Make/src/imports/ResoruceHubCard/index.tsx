import svgPaths from "./svg-f4e1sd8601";

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

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader />
      <CardBody />
      <CardFooter />
    </div>
  );
}

export default function ResoruceHubCard() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start relative size-full" data-name="Resoruce Hub Card">
      <Content />
    </div>
  );
}