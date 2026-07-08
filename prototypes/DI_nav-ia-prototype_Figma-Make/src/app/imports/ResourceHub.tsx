import svgPaths from "./svg-9lpj1v6mzo";

function CarouselHorizontal() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Carousel--horizontal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Carousel--horizontal">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p1d8feb80} fill="#525252" />
            <path d={svgPaths.p2b20400} fill="#525252" />
            <path d={svgPaths.pe7cf80} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LinkIcon() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Link + Icon">
      <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">Resource hub</p>
    </div>
  );
}

export default function ResourceHub() {
  return (
    <div className="bg-[rgba(255,255,255,0)] mix-blend-multiply relative size-full" data-name="Resource hub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[24px] items-center px-[16px] py-[7px] relative size-full">
          <CarouselHorizontal />
          <LinkIcon />
        </div>
      </div>
    </div>
  );
}