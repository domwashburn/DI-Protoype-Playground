import svgPaths from "./svg-oemt85t2u3";

function TaskAdd() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Task--add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Task--add">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p1f5a100} fill="#0F62FE" />
            <path d={svgPaths.p1b07b80} fill="#0F62FE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <TaskAdd />
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[11px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Create tasks</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon />
        </div>
      </div>
    </div>
  );
}

export default function Action01() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative size-full" data-name="Action 01">
      <ButtonContent />
    </div>
  );
}