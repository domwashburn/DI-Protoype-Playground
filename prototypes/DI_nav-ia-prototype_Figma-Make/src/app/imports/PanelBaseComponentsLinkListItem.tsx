import svgPaths from "./svg-c9dqvgqujd";

function LeftIconWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
            <g id="Vector">
              <path d={svgPaths.pb113690} fill="#161616" />
              <path d="M9 3H5V4H9V3Z" fill="#161616" />
              <path d="M9 6.5H5V7.5H9V6.5Z" fill="#161616" />
              <path d="M9 10H5V11H9V10Z" fill="#161616" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Content">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Link text</p>
    </div>
  );
}

function RightIconWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Vector">
              <path d={svgPaths.p28279c00} fill="#161616" />
              <path d={svgPaths.p315f1d80} fill="#161616" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function PanelBaseComponentsLinkListItem() {
  return (
    <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[6px] relative size-full" data-name="Panel Base Components / Link List Item">
      <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
      <LeftIconWrapper />
      <Content />
      <RightIconWrapper />
    </div>
  );
}