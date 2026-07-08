import svgPaths from "./svg-o432ayq384";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 9.375H15V10.625H5V9.375Z" fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ToolButton() {
  return (
    <div className="relative rounded-[18px] shrink-0 size-[36px]" data-name="ToolButton">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function OutputCurrentZoom() {
  return (
    <div className="h-[18px] min-w-[52px] relative shrink-0 w-[52px]" data-name="Output - Current zoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] left-[26.41px] not-italic text-[#161616] text-[14px] text-center top-[-0.5px] whitespace-nowrap">111%</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3c4bd700} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ToolButton1() {
  return (
    <div className="relative rounded-[18px] shrink-0 size-[36px]" data-name="ToolButton">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p24a11dc0} fill="var(--fill-0, #525252)" id="Vector" />
          <path d={svgPaths.p29242680} fill="var(--fill-0, #525252)" id="Vector_2" />
          <path d={svgPaths.p3c766580} fill="var(--fill-0, #525252)" id="Vector_3" />
          <path d={svgPaths.p3543e480} fill="var(--fill-0, #525252)" id="Vector_4" />
          <path d={svgPaths.p34b9180} fill="var(--fill-0, #525252)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function ToolButton2() {
  return (
    <div className="bg-white relative rounded-[18px] shrink-0 size-[36px]" data-name="ToolButton">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1ebed400} fill="var(--fill-0, #0F62FE)" id="Vector" />
          <path d={svgPaths.p21c59b00} fill="var(--fill-0, #0F62FE)" id="Vector_2" />
          <path d={svgPaths.p15f70e00} fill="var(--fill-0, #0F62FE)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function ToolButton3() {
  return (
    <div className="relative rounded-[18px] shrink-0 size-[36px]" data-name="ToolButton">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

export default function ToolbarCanvasViewControls() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex gap-[2px] items-center px-[2px] py-px relative rounded-[24px] size-full" data-name="Toolbar - Canvas view controls">
      <div aria-hidden className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <ToolButton />
      <OutputCurrentZoom />
      <ToolButton1 />
      <ToolButton2 />
      <ToolButton3 />
    </div>
  );
}