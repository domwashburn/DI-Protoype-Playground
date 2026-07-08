import svgPaths from "./svg-j6u5h10uy7";

function Text() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Text">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Master data</p>
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
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Data types</p>
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
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Entity types</p>
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

function Breadcrumb3() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0" data-name="Breadcrumb">
      <BreadcrumbItem />
      <BreadcrumbItem1 />
      <BreadcrumbItem2 />
    </div>
  );
}

function Breadcrumb4() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Breadcrumb">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[40px] items-center px-[16px] py-0 relative w-full">
          <Breadcrumb3 />
        </div>
      </div>
    </div>
  );
}

function CloudUpload() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Cloud--upload">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Cloud--upload">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p149b9b00} fill="#0F62FE" />
            <path d={svgPaths.p39e48300} fill="#0F62FE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <CloudUpload />
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[11px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Publish data types</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative shrink-0" data-name="Button">
      <ButtonContent />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Button group">
      <Button />
    </div>
  );
}

function SelectedInstanceName() {
  return (
    <div className="box-border content-stretch flex h-full items-center max-w-[160px] pl-[16px] pr-[8px] py-0 relative shrink-0" data-name="Selected instance name">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] max-w-[128px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px] whitespace-pre">Instance A</p>
    </div>
  );
}

function Movement() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Movement">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Movement">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p14878d00} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <Movement />
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[12px] relative w-full">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Button">
      <Button1 />
    </div>
  );
}

function Overflow() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative shrink-0" data-name="Overflow">
      <Button2 />
    </div>
  );
}

function Timer() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Timer">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Timer">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d="M8.5 5.5H7.5V10H8.5V5.5Z" fill="#161616" />
            <path d="M9.5 1H6.5V2H9.5V1Z" fill="#161616" />
            <path d={svgPaths.p3db73500} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <Timer />
    </div>
  );
}

function ButtonContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip size-full">
        <div className="box-border content-stretch flex isolate items-center p-[12px] relative w-full">
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent2 />
    </div>
  );
}

function PopoverOverflow() {
  return <div className="content-stretch flex flex-col items-end shrink-0 size-[0.001px]" data-name="Popover overflow" />;
}

function PopoverTabTip() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Popover - Tab tip">
      <Button3 />
      <PopoverOverflow />
    </div>
  );
}

function ProcessesPopOver() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Processes Pop Over">
      <PopoverTabTip />
    </div>
  );
}

function InstanceLevelItems() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Instance level items">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      <div className="flex flex-row items-center self-stretch">
        <SelectedInstanceName />
      </div>
      <Overflow />
      <ProcessesPopOver />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <rect fill="white" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p5fc9300} fill="#161616" />
            <path d={svgPaths.p98e4880} fill="#161616" />
            <path d={svgPaths.p7105d00} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="box-border content-stretch flex gap-[32px] items-center overflow-clip p-[10px] relative shrink-0" data-name="_Button base">
      <Icon3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white box-border content-stretch flex items-start mix-blend-multiply overflow-clip p-[2px] relative shrink-0" data-name="Button">
      <ButtonBase />
    </div>
  );
}

function PanelTriggerButtonNew() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Panel Trigger Button (NEW)">
      <Button4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <rect fill="white" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p18788d00} fill="#161616" />
            <path d={svgPaths.pb98f00} fill="#161616" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="box-border content-stretch flex gap-[32px] items-center overflow-clip p-[10px] relative shrink-0" data-name="_Button base">
      <Icon4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white box-border content-stretch flex items-start mix-blend-multiply overflow-clip p-[2px] relative shrink-0" data-name="Button">
      <ButtonBase1 />
    </div>
  );
}

function SnapshotPanel() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Snapshot (panel)">
      <Button5 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <rect fill="white" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.pcd98180} fill="var(--fill-0, #8D8D8D)" />
            <path d={svgPaths.pb4bd8f1} fill="var(--fill-0, #8D8D8D)" />
            <path d={svgPaths.p3441d880} fill="var(--fill-0, #8D8D8D)" />
            <path d={svgPaths.p9e6b280} fill="var(--fill-0, #8D8D8D)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonBase2() {
  return (
    <div className="box-border content-stretch flex gap-[32px] items-center overflow-clip p-[10px] relative shrink-0" data-name="_Button base">
      <Icon5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white box-border content-stretch flex items-start mix-blend-multiply overflow-clip p-[2px] relative shrink-0" data-name="Button">
      <ButtonBase2 />
    </div>
  );
}

function DataPanel() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Data (panel)">
      <Button6 />
    </div>
  );
}

function PanelTriggers() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Panel triggers">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      <PanelTriggerButtonNew />
      <SnapshotPanel />
      <DataPanel />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex h-[40.001px] items-start relative shrink-0 w-full" data-name="Content">
      <Breadcrumb4 />
      <ButtonGroup />
      <InstanceLevelItems />
      <PanelTriggers />
    </div>
  );
}

export default function BreadcrumbsActionsDomTemp() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Breadcrumbs & Actions (Dom Temp)">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid bottom-[-0.5px] left-0 pointer-events-none right-0 top-0" />
      <Content />
    </div>
  );
}