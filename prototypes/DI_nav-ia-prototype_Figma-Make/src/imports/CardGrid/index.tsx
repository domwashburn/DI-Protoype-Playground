import svgPaths from "./svg-2hpkzxh7gk";

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

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon1() {
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

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent1 />
      </div>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame1 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function CardBody1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type1() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter1() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider1 />
        <Type1 />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader1 />
      <CardBody1 />
      <CardFooter1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon2() {
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

function ButtonContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent2 />
      </div>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame2 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function CardBody2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider2() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type2() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter2() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider2 />
        <Type2 />
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader2 />
      <CardBody2 />
      <CardFooter2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon3() {
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

function ButtonContent3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent3 />
      </div>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame3 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function CardBody3() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider3() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type3() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter3() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider3 />
        <Type3 />
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader3 />
      <CardBody3 />
      <CardFooter3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon4() {
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

function ButtonContent4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent4 />
      </div>
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame4 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function CardBody4() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider4() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type4() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter4() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider4 />
        <Type4 />
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader4 />
      <CardBody4 />
      <CardFooter4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon5() {
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

function ButtonContent5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent5 />
      </div>
    </div>
  );
}

function CardHeader5() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame5 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function CardBody5() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider5() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type5() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter5() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider5 />
        <Type5 />
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader5 />
      <CardBody5 />
      <CardFooter5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-ellipsis w-full">Resource name</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#a8a8a8] text-[12px] text-ellipsis tracking-[0.32px] w-full">Resource type</p>
    </div>
  );
}

function Icon6() {
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

function ButtonContent6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[4px] relative size-full">
          <Icon6 />
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[24px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent6 />
      </div>
    </div>
  );
}

function CardHeader6() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Card Header">
      <div className="content-stretch flex gap-[4px] items-start pb-[8px] pt-[16px] px-[16px] relative size-full">
        <Frame6 />
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Overflow">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function CardBody6() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[5]" data-name="Card Body">
      <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#161616] text-[12px] text-ellipsis tracking-[0.32px]">This is a brief description of the resource, including key information about what it is and the use case/scenario it can be used in...</p>
      </div>
    </div>
  );
}

function Provider6() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Provider">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Provider</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">IBM</p>
    </div>
  );
}

function Type6() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] h-[48px] items-start justify-self-stretch min-w-[48px] relative row-1 shrink-0" data-name="Type">
      <p className="h-[16px] leading-[16px] overflow-hidden relative shrink-0 text-[12px] text-ellipsis tracking-[0.32px] w-full">Type</p>
      <p className="h-[20px] leading-[20px] overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[0.16px] w-full">Provided</p>
    </div>
  );
}

function CardFooter6() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Card Footer">
      <div className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] gap-x-[16px] gap-y-[16px] grid grid-cols-[__56px_minmax(0,3fr)] grid-rows-[repeat(1,fit-content(100%))] not-italic px-[16px] py-[8px] relative size-full text-[#525252] whitespace-nowrap">
        <Provider6 />
        <Type6 />
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px relative w-full z-[1]" data-name="Content">
      <CardHeader6 />
      <CardBody6 />
      <CardFooter6 />
    </div>
  );
}

export default function CardGrid() {
  return (
    <div className="gap-x-px gap-y-px grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(4,fit-content(100%))] relative size-full" data-name="_Card Grid">
      <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-1 shrink-0" data-name="Resoruce Hub Card">
        <Content />
      </div>
      <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-1 shrink-0" data-name="Resoruce Hub Card">
        <Content1 />
      </div>
      <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-2 shrink-0" data-name="Resoruce Hub Card">
        <Content2 />
      </div>
      <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-2 shrink-0" data-name="Resoruce Hub Card">
        <Content3 />
      </div>
      <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-3 shrink-0" data-name="Resoruce Hub Card">
        <Content4 />
      </div>
      <div className="bg-white col-2 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-3 shrink-0" data-name="Resoruce Hub Card">
        <Content5 />
      </div>
      <div className="bg-white col-1 content-stretch flex flex-col h-[216px] isolate items-start justify-self-stretch relative row-4 shrink-0" data-name="Resoruce Hub Card">
        <Content6 />
      </div>
    </div>
  );
}