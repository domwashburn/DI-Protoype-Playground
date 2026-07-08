import svgPaths from "./svg-jon3mbttas";

function TitleType() {
  return (
    <div className="content-stretch flex font-['IBM_Plex_Sans:Light',_sans-serif] gap-[16px] items-center justify-center not-italic relative shrink-0 text-nowrap whitespace-pre" data-name="Title + Type">
      <p className="leading-[50px] relative shrink-0 text-[#161616] text-[42px]">{`Grid & Spacing`}</p>
      <p className="leading-[64px] relative shrink-0 text-[#6f6f6f] text-[54px]">&nbsp;</p>
    </div>
  );
}

function SourceTitleType() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Source + Title + Type">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[22px] not-italic relative shrink-0 text-[#0f62fe] text-[16px] text-nowrap whitespace-pre">Home page • Header section</p>
      <TitleType />
    </div>
  );
}

function ArtboardHeaderIbmDocumentationLibrary() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Artboard header | IBM® Documentation Library">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[48px] pt-[96px] px-[96px] relative w-full">
          <SourceTitleType />
        </div>
      </div>
    </div>
  );
}

function Frame630841() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] items-start not-italic overflow-clip relative shrink-0 text-black w-[200px]">
      <p className="leading-[28px] relative shrink-0 text-[20px] w-full">Spacing tokens</p>
      <div className="leading-[0] relative shrink-0 text-[0px] tracking-[0.16px] w-full">
        <p className="font-['IBM_Plex_Sans:Bold',_sans-serif] leading-[18px] mb-0 not-italic text-[14px]">Container inner (Padding):</p>
        <p className="leading-[18px] text-[14px]">
          <span>{`Unless otherwise noted, the margin `}</span>
          <span className="font-['IBM_Plex_Sans:Italic',_sans-serif] italic tracking-[0.16px]">inside</span>
          <span>{` containers is inherited from the grid — 16px / 1rem (spacing-05). This applies to padding top, bottom, left, and right.`}</span>
        </p>
      </div>
    </div>
  );
}

function WelcomeHeaderWrapper() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[32px] pt-[40px] px-0 relative shrink-0 w-full z-[4]" data-name="Welcome header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[#161616] text-[28px] w-[304px]">Welcome, First name</p>
    </div>
  );
}

function SettingsAdjust() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Settings--adjust">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Settings--adjust">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p2acbe800} fill="#0F62FE" />
            <path d={svgPaths.pb1a8400} fill="#0F62FE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <SettingsAdjust />
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Display settings</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent />
    </div>
  );
}

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron--up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron--up">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p23aae480} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <ChevronUp />
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Collapse</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function ExpandCollapseTrigger() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="expand collapse trigger">
      <ButtonContent1 />
    </div>
  );
}

function HeaderActionGroup() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start right-0 z-[3]" data-name="header action group">
      <Button />
      <ExpandCollapseTrigger />
    </div>
  );
}

function Frame630202() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[288px] min-w-[224px] relative shrink-0 w-[288px]">
      <p className="-webkit-box css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] max-w-[352px] min-w-[288px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-full">Accelerate decision making at scale with Decision Intelligence</p>
    </div>
  );
}

function Frame630260() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0">
      <Frame630202 />
    </div>
  );
}

function WelcomeTextWrapper() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow h-full items-start max-w-[288px] min-h-px min-w-[224px] relative shrink-0" data-name="Welcome text wrapper">
      <Frame630260 />
    </div>
  );
}

function DecisionTree() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree />
    </div>
  );
}

function TaskTile01() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 01">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon2 />
          <p className="-webkit-box basis-0 css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] w-full">Create a new decision project to get started with decision automation</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionProject() {
  return (
    <div className="[grid-area:1_/_7_/_auto_/_span_3] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision project">
      <TaskTile01 />
    </div>
  );
}

function Gradient() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start" data-name="Gradient">
      <div className="basis-0 bg-gradient-to-b from-[rgba(255,255,255,0)] grow min-h-px min-w-px pointer-events-none relative shrink-0 to-[rgba(69,137,255,0.05)] w-full" data-name="Gradient - Gray 100 Theme">
        <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0" />
        <div className="absolute inset-0 shadow-[0px_-80px_70px_-65px_inset_rgba(15,98,254,0.1)]" />
      </div>
    </div>
  );
}

function AiLayer() {
  return (
    <div className="absolute box-border content-stretch flex flex-col inset-0 items-start pb-[172px] pt-0 px-0" data-name="AI Layer">
      <div className="absolute bg-[#f4f4f4] inset-0 shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" data-name="Background layer" />
      <Gradient />
    </div>
  );
}

function Term() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Term">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Term">
          <rect fill="white" fillOpacity="0.01" height="24" style={{ mixBlendMode: "multiply" }} width="24" />
          <g id="Vector">
            <path d={svgPaths.p37817100} fill="#525252" />
            <path d={svgPaths.p1a73cc80} fill="#525252" />
            <path d={svgPaths.p11e47970} fill="#525252" />
            <path d={svgPaths.p36b58080} fill="#525252" />
            <path d={svgPaths.p1697b400} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame630381() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0">
      <Term />
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
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#005d5d] text-[12px] text-nowrap tracking-[0.32px] whitespace-pre">Beta</p>
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

function TagReadOnly() {
  return (
    <div className="bg-[#9ef0f0] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="Tag - Read-only">
      <TagContent />
    </div>
  );
}

function BetaTagCustom() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Beta Tag CUSTOM">
      <TagReadOnly />
    </div>
  );
}

function Slug() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Slug">
      <div className="absolute inset-0" data-name="base">
        <div aria-hidden="true" className="absolute border border-[#161616] border-solid inset-0 pointer-events-none" />
      </div>
      <p className="absolute bottom-[6.25%] font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[14px] left-[8px] not-italic text-[#161616] text-[9px] text-center top-[6.25%] translate-x-[-50%] w-[14px]">AI</p>
    </div>
  );
}

function AiTileBeta() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="AI Tile beta">
      <BetaTagCustom />
      <Slug />
    </div>
  );
}

function Frame630382() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame630381 />
      <AiTileBeta />
    </div>
  );
}

function Send() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Send">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p19571780} fill="var(--fill-0, #161616)" fillOpacity="0.25" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Icon">
      <Send />
    </div>
  );
}

function ChatPromptLineTypeaheadListItemCarbonForAi() {
  return (
    <div className="basis-0 bg-[#f4f4f4] grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="Chat prompt line typeahead list item | Carbon for AI">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[7px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#a8a8a8] text-[14px] text-nowrap tracking-[0.16px]">Start chatting...</p>
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function ChatPromptLine() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Chat prompt line">
      <ChatPromptLineTypeaheadListItemCarbonForAi />
    </div>
  );
}

function ButtonContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Open decision assistant</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent2 />
    </div>
  );
}

function Frame630403() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-full">
      <Button1 />
    </div>
  );
}

function Frame630398() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ChatPromptLine />
      <Frame630403 />
    </div>
  );
}

function Frame630400() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-nowrap w-full">Chat and build decision services</p>
      <Frame630398 />
    </div>
  );
}

function Frame630383() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame630382 />
      <Frame630400 />
    </div>
  );
}

function Frame630384() {
  return (
    <div className="h-[172px] relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[172px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Frame630383 />
        </div>
      </div>
    </div>
  );
}

function HeaderChatTile() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_6] bg-[rgba(255,255,255,0)] min-h-[172px] mix-blend-multiply relative shrink-0" data-name="Header - Chat Tile">
      <div className="content-stretch flex flex-col items-start min-h-inherit overflow-clip relative rounded-[inherit] size-full">
        <AiLayer />
        <Frame630384 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0 pointer-events-none shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" />
    </div>
  );
}

function DecisionTree1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree1 />
    </div>
  );
}

function TaskTile02() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 02">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon4 />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[16px] w-full">Create a decision service in a new or existing project</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionService() {
  return (
    <div className="[grid-area:1_/_10_/_auto_/_span_3] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision service">
      <TaskTile02 />
    </div>
  );
}

function ComponentsTaskSets() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[172px] h-[172px] relative shrink-0 w-full" data-name="components / _task sets">
      <NewDecisionProject />
      <HeaderChatTile />
      <NewDecisionService />
    </div>
  );
}

function ComponentsSectionTileGroup() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[8px] grow items-start max-w-[1136px] min-h-px min-w-px overflow-clip pb-0 pt-[40px] px-0 relative shrink-0" data-name="components / _section tile group">
      <ComponentsTaskSets />
    </div>
  );
}

function HeaderContent() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[2]" data-name="Header content">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <WelcomeTextWrapper />
      </div>
      <ComponentsSectionTileGroup />
    </div>
  );
}

function ComponentsHeroImage() {
  return (
    <div className="absolute h-[376px] opacity-40 right-0 top-0 w-[720px] z-[1]" data-name="components / Hero image">
      <div className="absolute bg-[#d0e2ff] inset-0" data-name="hero-corner-light 2" />
      <p className="absolute bottom-[336px] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] left-[calc(50%-150px)] not-italic text-[#7a9cd3] text-[28px] text-nowrap translate-y-[100%] whitespace-pre">Hero image placeholder</p>
    </div>
  );
}

function HomePageHeader() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#ffffff] isolate items-start left-0 pb-[52px] pt-0 px-[32px] to-[#e0e0e0] top-0 w-[1312px]" data-name="Home page header">
      <WelcomeHeaderWrapper />
      <HeaderActionGroup />
      <HeaderContent />
      <ComponentsHeroImage />
    </div>
  );
}

function TagContainer() {
  return (
    <div className="absolute bg-[#ffd6e8] box-border content-stretch flex gap-[8px] items-start px-[8px] py-[2px] right-[8px] rounded-[2px] top-1/2 translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#ff7eb6] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#510224] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$08</p>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center right-[-2px] top-1/2 translate-y-[-50%] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "4", "--transform-inner-height": "2" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(255, 126, 182, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #FF7EB6)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-0 size-0 top-1/2 translate-y-[-50%]" data-name="_Tag base">
      <TagContainer />
    </div>
  );
}

function Fill() {
  return <div className="absolute bg-[#ffd6e8] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingTop() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[40px] left-0 mix-blend-multiply right-0 top-0" data-name="Padding top">
      <TagBase />
      <Fill />
    </div>
  );
}

function TagContainer1() {
  return (
    <div className="absolute bg-[#9ef0f0] box-border content-stretch flex gap-[8px] items-start px-[8px] py-[2px] right-[8px] rounded-[2px] top-1/2 translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#08bdba] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#022b30] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$07</p>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center right-[-2px] top-1/2 translate-y-[-50%] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "4", "--transform-inner-height": "2" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(8, 189, 186, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #08BDBA)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase1() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-0 size-0 top-1/2 translate-y-[-50%]" data-name="_Tag base">
      <TagContainer1 />
    </div>
  );
}

function Fill1() {
  return <div className="absolute bg-[#9ef0f0] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingTop1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 h-[32px] left-0 mix-blend-multiply right-0" data-name="Padding top">
      <TagBase1 />
      <Fill1 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute h-[108px] right-[32px] top-0 w-[1264px]" data-name="Section 1">
      <div aria-hidden="true" className="absolute border border-[red] border-solid inset-[-0.5px] pointer-events-none" />
      <PaddingTop />
      <PaddingTop1 />
    </div>
  );
}

function TagContainer2() {
  return (
    <div className="absolute bg-[#ffd6e8] box-border content-stretch flex gap-[8px] items-start px-[8px] py-[2px] right-[8px] rounded-[2px] top-1/2 translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#ff7eb6] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#510224] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$08</p>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center right-[-2px] top-1/2 translate-y-[-50%] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "4", "--transform-inner-height": "2" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(255, 126, 182, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #FF7EB6)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase2() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-0 size-0 top-1/2 translate-y-[-50%]" data-name="_Tag base">
      <TagContainer2 />
    </div>
  );
}

function Fill2() {
  return <div className="absolute bg-[#ffd6e8] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingTop2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[40px] left-0 mix-blend-multiply top-0 w-[944px]" data-name="Padding top">
      <TagBase2 />
      <Fill2 />
    </div>
  );
}

function Frame630842() {
  return (
    <div className="absolute h-[212px] right-[32px] top-[108px] w-[944px]">
      <div aria-hidden="true" className="absolute border border-[red] border-solid inset-[-0.5px] pointer-events-none" />
      <PaddingTop2 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute h-[212px] right-[992px] top-[108px] w-[304px]" data-name="Section 2">
      <div aria-hidden="true" className="absolute border border-[red] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function SpecDocumentation() {
  return (
    <div className="absolute bottom-[-756px] left-0 top-0 w-[1312px]" data-name="Spec & Documentation">
      <Section1 />
      <Frame630842 />
      <Section2 />
    </div>
  );
}

function DesignAnnotations() {
  return (
    <div className="h-[376px] relative shrink-0 w-[1312px]" data-name="Design Annotations">
      <HomePageHeader />
      <SpecDocumentation />
    </div>
  );
}

function Content() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[64px] items-start p-[96px] relative w-full">
          <Frame630841 />
          <DesignAnnotations />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f4f4f4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame630844() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] items-start not-italic overflow-clip relative shrink-0 text-black w-[200px]">
      <p className="leading-[28px] relative shrink-0 text-[20px] w-full">{`Grid & Columns`}</p>
      <div className="leading-[18px] relative shrink-0 text-[0px] text-[14px] tracking-[0.16px] w-full">
        <p className="mb-0">
          <span>{`unless otherwise noted, the grid column mode used for these designs is the `}</span>
          <span className="font-['IBM_Plex_Sans:Bold',_sans-serif] not-italic tracking-[0.16px]">narrow column mode</span>
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['IBM_Plex_Sans:Bold',_sans-serif] mb-0 not-italic">Container spacing (Margins):</p>
        <p>The margin between containers is inherited from the grid — 16px / 1rem (spacing-05).</p>
      </div>
    </div>
  );
}

function WelcomeHeaderWrapper1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[32px] pt-[40px] px-0 relative shrink-0 w-full z-[4]" data-name="Welcome header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[#161616] text-[28px] w-[304px]">Welcome, First name</p>
    </div>
  );
}

function SettingsAdjust1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Settings--adjust">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Settings--adjust">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p2acbe800} fill="#0F62FE" />
            <path d={svgPaths.pb1a8400} fill="#0F62FE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <SettingsAdjust1 />
    </div>
  );
}

function ButtonContent3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Display settings</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent3 />
    </div>
  );
}

function ChevronUp1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron--up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron--up">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p23aae480} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <ChevronUp1 />
    </div>
  );
}

function ButtonContent4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Collapse</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon6 />
        </div>
      </div>
    </div>
  );
}

function ExpandCollapseTrigger1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="expand collapse trigger">
      <ButtonContent4 />
    </div>
  );
}

function HeaderActionGroup1() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start right-0 z-[3]" data-name="header action group">
      <Button2 />
      <ExpandCollapseTrigger1 />
    </div>
  );
}

function Frame630203() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[288px] min-w-[224px] relative shrink-0 w-[288px]">
      <p className="-webkit-box css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] max-w-[352px] min-w-[288px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-full">Accelerate decision making at scale with Decision Intelligence</p>
    </div>
  );
}

function Frame630261() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0">
      <Frame630203 />
    </div>
  );
}

function WelcomeTextWrapper1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow h-full items-start max-w-[288px] min-h-px min-w-[224px] relative shrink-0" data-name="Welcome text wrapper">
      <Frame630261 />
    </div>
  );
}

function DecisionTree2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree2 />
    </div>
  );
}

function TaskTile2() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 01">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon7 />
          <p className="-webkit-box basis-0 css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] w-full">Create a new decision project to get started with decision automation</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionProject1() {
  return (
    <div className="[grid-area:1_/_7_/_auto_/_span_3] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision project">
      <TaskTile2 />
    </div>
  );
}

function Gradient1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start" data-name="Gradient">
      <div className="basis-0 bg-gradient-to-b from-[rgba(255,255,255,0)] grow min-h-px min-w-px pointer-events-none relative shrink-0 to-[rgba(69,137,255,0.05)] w-full" data-name="Gradient - Gray 100 Theme">
        <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0" />
        <div className="absolute inset-0 shadow-[0px_-80px_70px_-65px_inset_rgba(15,98,254,0.1)]" />
      </div>
    </div>
  );
}

function AiLayer1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col inset-0 items-start pb-[172px] pt-0 px-0" data-name="AI Layer">
      <div className="absolute bg-[#f4f4f4] inset-0 shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" data-name="Background layer" />
      <Gradient1 />
    </div>
  );
}

function Term1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Term">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Term">
          <rect fill="white" fillOpacity="0.01" height="24" style={{ mixBlendMode: "multiply" }} width="24" />
          <g id="Vector">
            <path d={svgPaths.p37817100} fill="#525252" />
            <path d={svgPaths.p1a73cc80} fill="#525252" />
            <path d={svgPaths.p11e47970} fill="#525252" />
            <path d={svgPaths.p36b58080} fill="#525252" />
            <path d={svgPaths.p1697b400} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame630385() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0">
      <Term1 />
    </div>
  );
}

function Start1() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End1() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start1 />
      <End1 />
    </div>
  );
}

function Label1() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#005d5d] text-[12px] text-nowrap tracking-[0.32px] whitespace-pre">Beta</p>
      <Resizer1 />
    </div>
  );
}

function TagContent1() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[4px] py-0 relative rounded-[24px] shrink-0" data-name="Tag content">
      <Label1 />
    </div>
  );
}

function TagReadOnly1() {
  return (
    <div className="bg-[#9ef0f0] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="Tag - Read-only">
      <TagContent1 />
    </div>
  );
}

function BetaTagCustom1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Beta Tag CUSTOM">
      <TagReadOnly1 />
    </div>
  );
}

function Slug1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Slug">
      <div className="absolute inset-0" data-name="base">
        <div aria-hidden="true" className="absolute border border-[#161616] border-solid inset-0 pointer-events-none" />
      </div>
      <p className="absolute bottom-[6.25%] font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[14px] left-[8px] not-italic text-[#161616] text-[9px] text-center top-[6.25%] translate-x-[-50%] w-[14px]">AI</p>
    </div>
  );
}

function AiTileBeta1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="AI Tile beta">
      <BetaTagCustom1 />
      <Slug1 />
    </div>
  );
}

function Frame630386() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame630385 />
      <AiTileBeta1 />
    </div>
  );
}

function Send1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Send">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p19571780} fill="var(--fill-0, #161616)" fillOpacity="0.25" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Icon">
      <Send1 />
    </div>
  );
}

function ChatPromptLineTypeaheadListItemCarbonForAi1() {
  return (
    <div className="basis-0 bg-[#f4f4f4] grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="Chat prompt line typeahead list item | Carbon for AI">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[7px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#a8a8a8] text-[14px] text-nowrap tracking-[0.16px]">Start chatting...</p>
          <Icon8 />
        </div>
      </div>
    </div>
  );
}

function ChatPromptLine1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Chat prompt line">
      <ChatPromptLineTypeaheadListItemCarbonForAi1 />
    </div>
  );
}

function ButtonContent5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Open decision assistant</p>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent5 />
    </div>
  );
}

function Frame630404() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-full">
      <Button3 />
    </div>
  );
}

function Frame630399() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ChatPromptLine1 />
      <Frame630404 />
    </div>
  );
}

function Frame630401() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-nowrap w-full">Chat and build decision services</p>
      <Frame630399 />
    </div>
  );
}

function Frame630387() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame630386 />
      <Frame630401 />
    </div>
  );
}

function Frame630388() {
  return (
    <div className="h-[172px] relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[172px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Frame630387 />
        </div>
      </div>
    </div>
  );
}

function HeaderChatTile1() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_6] bg-[rgba(255,255,255,0)] min-h-[172px] mix-blend-multiply relative shrink-0" data-name="Header - Chat Tile">
      <div className="content-stretch flex flex-col items-start min-h-inherit overflow-clip relative rounded-[inherit] size-full">
        <AiLayer1 />
        <Frame630388 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0 pointer-events-none shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" />
    </div>
  );
}

function DecisionTree3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon9() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree3 />
    </div>
  );
}

function TaskTile3() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 02">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon9 />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[16px] w-full">Create a decision service in a new or existing project</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionService1() {
  return (
    <div className="[grid-area:1_/_10_/_auto_/_span_3] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision service">
      <TaskTile3 />
    </div>
  );
}

function ComponentsTaskSets1() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[172px] h-[172px] relative shrink-0 w-full" data-name="components / _task sets">
      <NewDecisionProject1 />
      <HeaderChatTile1 />
      <NewDecisionService1 />
    </div>
  );
}

function ComponentsSectionTileGroup1() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[8px] grow items-start max-w-[1136px] min-h-px min-w-px overflow-clip pb-0 pt-[40px] px-0 relative shrink-0" data-name="components / _section tile group">
      <ComponentsTaskSets1 />
    </div>
  );
}

function HeaderContent1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[2]" data-name="Header content">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <WelcomeTextWrapper1 />
      </div>
      <ComponentsSectionTileGroup1 />
    </div>
  );
}

function ComponentsHeroImage1() {
  return (
    <div className="absolute h-[376px] opacity-40 right-0 top-0 w-[720px] z-[1]" data-name="components / Hero image">
      <div className="absolute bg-[#d0e2ff] inset-0" data-name="hero-corner-light 2" />
      <p className="absolute bottom-[336px] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] left-[calc(50%-150px)] not-italic text-[#7a9cd3] text-[28px] text-nowrap translate-y-[100%] whitespace-pre">Hero image placeholder</p>
    </div>
  );
}

function HomePageHeader1() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#ffffff] isolate items-start left-0 pb-[52px] pt-0 px-[32px] to-[#e0e0e0] top-0 w-[1312px]" data-name="Home page header">
      <WelcomeHeaderWrapper1 />
      <HeaderActionGroup1 />
      <HeaderContent1 />
      <ComponentsHeroImage1 />
    </div>
  );
}

function ColumnBase() {
  return <div className="basis-0 bg-[#3ddbd9] grow h-full min-h-px min-w-px opacity-10 shrink-0" data-name="_Column base" />;
}

function LayoutGrid() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[32px] inset-0 items-start mix-blend-multiply px-[32px] py-0" data-name="Layout grid">
      {[...Array(16).keys()].map((_, i) => (
        <ColumnBase key={i} />
      ))}
    </div>
  );
}

function TagContainer3() {
  return (
    <div className="absolute bg-[#e8daff] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[calc(50%-18px)] translate-x-[-50%] translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#be95ff] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#31135e] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$05</p>
      <div className="absolute bottom-[-2px] flex h-[2px] items-center justify-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[4px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(190, 149, 255, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #BE95FF)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase3() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer3 />
    </div>
  );
}

function Fill3() {
  return <div className="absolute bg-[#e8daff] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingRight() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 mix-blend-multiply top-0 w-[16px]" data-name="Padding right">
      <TagBase3 />
      <Fill3 />
    </div>
  );
}

function TagContainer4() {
  return (
    <div className="absolute bg-[#9ef0f0] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[calc(50%-18px)] translate-x-[-50%] translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#08bdba] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#022b30] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$07</p>
      <div className="absolute bottom-[-2px] flex h-[2px] items-center justify-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[4px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(8, 189, 186, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #08BDBA)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase4() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer4 />
    </div>
  );
}

function Fill4() {
  return <div className="absolute bg-[#9ef0f0] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingLeft() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 mix-blend-multiply right-0 top-0 w-[32px]" data-name="Padding left">
      <TagBase4 />
      <Fill4 />
    </div>
  );
}

function GridOverlay() {
  return (
    <div className="absolute inset-0 opacity-70" data-name="Grid overlay">
      <LayoutGrid />
      <PaddingRight />
      <PaddingLeft />
    </div>
  );
}

function ColumnContent() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer5() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">4 col</p>
    </div>
  );
}

function ColumnSpan() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.33%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 302 16">
            <path d={svgPaths.p1dcd9c00} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.33%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 302 16">
            <path d={svgPaths.p1dcd9c00} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer5 />
    </div>
  );
}

function GridItemGutterModeAnnotation() {
  return (
    <div className="absolute h-[212px] left-[16px] top-[108px] w-[320px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan />
    </div>
  );
}

function ColumnContent1() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer6() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">16 col</p>
    </div>
  );
}

function ColumnSpan1() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.08%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1262 16">
            <path d={svgPaths.p3b1ef700} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.08%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1262 16">
            <path d={svgPaths.p3b1ef700} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer6 />
    </div>
  );
}

function GridItemGutterModeAnnotation1() {
  return (
    <div className="absolute h-[108px] left-[16px] top-0 w-[1280px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent1 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan1 />
    </div>
  );
}

function ColumnContent2() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer7() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">12 col</p>
    </div>
  );
}

function ColumnSpan2() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.11%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 946 16">
            <path d={svgPaths.p1eb93d00} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.11%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 946 16">
            <path d={svgPaths.p1eb93d00} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer7 />
    </div>
  );
}

function GridItemGutterModeAnnotation2() {
  return (
    <div className="absolute h-[212px] right-[16px] top-[108px] w-[964px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent2 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan2 />
    </div>
  );
}

function SpecDocumentation1() {
  return (
    <div className="absolute inset-0" data-name="Spec & Documentation">
      <GridItemGutterModeAnnotation />
      <GridItemGutterModeAnnotation1 />
      <GridItemGutterModeAnnotation2 />
    </div>
  );
}

function DesignAnnotations1() {
  return (
    <div className="h-[372px] relative shrink-0 w-[1312px]" data-name="Design Annotations">
      <HomePageHeader1 />
      <GridOverlay />
      <SpecDocumentation1 />
    </div>
  );
}

function WelcomeHeaderWrapper2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[32px] pt-[40px] px-0 relative shrink-0 w-full z-[4]" data-name="Welcome header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[#161616] text-[28px] w-[304px]">Welcome, First name</p>
    </div>
  );
}

function SettingsAdjust2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Settings--adjust">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Settings--adjust">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p2acbe800} fill="#0F62FE" />
            <path d={svgPaths.pb1a8400} fill="#0F62FE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <SettingsAdjust2 />
    </div>
  );
}

function ButtonContent6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Display settings</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon10 />
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent6 />
    </div>
  );
}

function ChevronUp2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron--up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron--up">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p23aae480} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <ChevronUp2 />
    </div>
  );
}

function ButtonContent7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Collapse</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon11 />
        </div>
      </div>
    </div>
  );
}

function ExpandCollapseTrigger2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="expand collapse trigger">
      <ButtonContent7 />
    </div>
  );
}

function HeaderActionGroup2() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start right-0 z-[3]" data-name="header action group">
      <Button4 />
      <ExpandCollapseTrigger2 />
    </div>
  );
}

function Frame630204() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[288px] min-w-[224px] relative shrink-0 w-[288px]">
      <p className="-webkit-box css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] max-w-[352px] min-w-[288px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-full">Accelerate decision making at scale with Decision Intelligence</p>
    </div>
  );
}

function Frame630262() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0">
      <Frame630204 />
    </div>
  );
}

function WelcomeTextWrapper2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow h-full items-start max-w-[288px] min-h-px min-w-[224px] relative shrink-0" data-name="Welcome text wrapper">
      <Frame630262 />
    </div>
  );
}

function DecisionTree4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon12() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree4 />
    </div>
  );
}

function TaskTile4() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 01">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon12 />
          <p className="-webkit-box basis-0 css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] w-full">Create a new decision project to get started with decision automation</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionProject2() {
  return (
    <div className="[grid-area:1_/_7_/_auto_/_span_3] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision project">
      <TaskTile4 />
    </div>
  );
}

function Gradient2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start" data-name="Gradient">
      <div className="basis-0 bg-gradient-to-b from-[rgba(255,255,255,0)] grow min-h-px min-w-px pointer-events-none relative shrink-0 to-[rgba(69,137,255,0.05)] w-full" data-name="Gradient - Gray 100 Theme">
        <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0" />
        <div className="absolute inset-0 shadow-[0px_-80px_70px_-65px_inset_rgba(15,98,254,0.1)]" />
      </div>
    </div>
  );
}

function AiLayer2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col inset-0 items-start pb-[172px] pt-0 px-0" data-name="AI Layer">
      <div className="absolute bg-[#f4f4f4] inset-0 shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" data-name="Background layer" />
      <Gradient2 />
    </div>
  );
}

function Term2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Term">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Term">
          <rect fill="white" fillOpacity="0.01" height="24" style={{ mixBlendMode: "multiply" }} width="24" />
          <g id="Vector">
            <path d={svgPaths.p37817100} fill="#525252" />
            <path d={svgPaths.p1a73cc80} fill="#525252" />
            <path d={svgPaths.p11e47970} fill="#525252" />
            <path d={svgPaths.p36b58080} fill="#525252" />
            <path d={svgPaths.p1697b400} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame630389() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0">
      <Term2 />
    </div>
  );
}

function Start2() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End2() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start2 />
      <End2 />
    </div>
  );
}

function Label2() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#005d5d] text-[12px] text-nowrap tracking-[0.32px] whitespace-pre">Beta</p>
      <Resizer2 />
    </div>
  );
}

function TagContent2() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[4px] py-0 relative rounded-[24px] shrink-0" data-name="Tag content">
      <Label2 />
    </div>
  );
}

function TagReadOnly2() {
  return (
    <div className="bg-[#9ef0f0] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="Tag - Read-only">
      <TagContent2 />
    </div>
  );
}

function BetaTagCustom2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Beta Tag CUSTOM">
      <TagReadOnly2 />
    </div>
  );
}

function Slug2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Slug">
      <div className="absolute inset-0" data-name="base">
        <div aria-hidden="true" className="absolute border border-[#161616] border-solid inset-0 pointer-events-none" />
      </div>
      <p className="absolute bottom-[6.25%] font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[14px] left-[8px] not-italic text-[#161616] text-[9px] text-center top-[6.25%] translate-x-[-50%] w-[14px]">AI</p>
    </div>
  );
}

function AiTileBeta2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="AI Tile beta">
      <BetaTagCustom2 />
      <Slug2 />
    </div>
  );
}

function Frame630390() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame630389 />
      <AiTileBeta2 />
    </div>
  );
}

function Send2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Send">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p19571780} fill="var(--fill-0, #161616)" fillOpacity="0.25" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon13() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Icon">
      <Send2 />
    </div>
  );
}

function ChatPromptLineTypeaheadListItemCarbonForAi2() {
  return (
    <div className="basis-0 bg-[#f4f4f4] grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="Chat prompt line typeahead list item | Carbon for AI">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[7px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#a8a8a8] text-[14px] text-nowrap tracking-[0.16px]">Start chatting...</p>
          <Icon13 />
        </div>
      </div>
    </div>
  );
}

function ChatPromptLine2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Chat prompt line">
      <ChatPromptLineTypeaheadListItemCarbonForAi2 />
    </div>
  );
}

function ButtonContent8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Open decision assistant</p>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent8 />
    </div>
  );
}

function Frame630405() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-full">
      <Button5 />
    </div>
  );
}

function Frame630402() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ChatPromptLine2 />
      <Frame630405 />
    </div>
  );
}

function Frame630406() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-nowrap w-full">Chat and build decision services</p>
      <Frame630402 />
    </div>
  );
}

function Frame630391() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame630390 />
      <Frame630406 />
    </div>
  );
}

function Frame630392() {
  return (
    <div className="h-[172px] relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[172px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Frame630391 />
        </div>
      </div>
    </div>
  );
}

function HeaderChatTile2() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_6] bg-[rgba(255,255,255,0)] min-h-[172px] mix-blend-multiply relative shrink-0" data-name="Header - Chat Tile">
      <div className="content-stretch flex flex-col items-start min-h-inherit overflow-clip relative rounded-[inherit] size-full">
        <AiLayer2 />
        <Frame630392 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0 pointer-events-none shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" />
    </div>
  );
}

function DecisionTree5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon14() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree5 />
    </div>
  );
}

function TaskTile5() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 02">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon14 />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[16px] w-full">Create a decision service in a new or existing project</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionService2() {
  return (
    <div className="[grid-area:1_/_10_/_auto_/_span_3] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision service">
      <TaskTile5 />
    </div>
  );
}

function ComponentsTaskSets2() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[172px] h-[172px] relative shrink-0 w-full" data-name="components / _task sets">
      <NewDecisionProject2 />
      <HeaderChatTile2 />
      <NewDecisionService2 />
    </div>
  );
}

function ComponentsSectionTileGroup2() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[8px] grow items-start max-w-[1136px] min-h-px min-w-px overflow-clip pb-0 pt-[40px] px-0 relative shrink-0" data-name="components / _section tile group">
      <ComponentsTaskSets2 />
    </div>
  );
}

function HeaderContent2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[2]" data-name="Header content">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <WelcomeTextWrapper2 />
      </div>
      <ComponentsSectionTileGroup2 />
    </div>
  );
}

function ComponentsHeroImage2() {
  return (
    <div className="absolute h-[376px] opacity-40 right-0 top-0 w-[720px] z-[1]" data-name="components / Hero image">
      <div className="absolute bg-[#d0e2ff] inset-0" data-name="hero-corner-light 2" />
      <p className="absolute bottom-[336px] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] left-[calc(50%-150px)] not-italic text-[#7a9cd3] text-[28px] text-nowrap translate-y-[100%] whitespace-pre">Hero image placeholder</p>
    </div>
  );
}

function HomePageHeader2() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#ffffff] isolate items-start left-0 pb-[52px] pt-0 px-[32px] to-[#e0e0e0] top-0 w-[1312px]" data-name="Home page header">
      <WelcomeHeaderWrapper2 />
      <HeaderActionGroup2 />
      <HeaderContent2 />
      <ComponentsHeroImage2 />
    </div>
  );
}

function ColumnBase16() {
  return <div className="basis-0 bg-[#3ddbd9] grow h-full min-h-px min-w-px opacity-10 shrink-0" data-name="_Column base" />;
}

function LayoutGrid1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[32px] inset-0 items-start mix-blend-multiply px-[32px] py-0" data-name="Layout grid">
      {[...Array(16).keys()].map((_, i) => (
        <ColumnBase16 key={i} />
      ))}
    </div>
  );
}

function TagContainer8() {
  return (
    <div className="absolute bg-[#e8daff] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[calc(50%-18px)] translate-x-[-50%] translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#be95ff] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#31135e] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$05</p>
      <div className="absolute bottom-[-2px] flex h-[2px] items-center justify-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[4px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(190, 149, 255, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #BE95FF)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase5() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer8 />
    </div>
  );
}

function Fill5() {
  return <div className="absolute bg-[#e8daff] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingRight1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 mix-blend-multiply top-0 w-[16px]" data-name="Padding right">
      <TagBase5 />
      <Fill5 />
    </div>
  );
}

function TagContainer9() {
  return (
    <div className="absolute bg-[#9ef0f0] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[calc(50%-18px)] translate-x-[-50%] translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#08bdba] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#022b30] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$07</p>
      <div className="absolute bottom-[-2px] flex h-[2px] items-center justify-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[4px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(8, 189, 186, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #08BDBA)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase6() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer9 />
    </div>
  );
}

function Fill6() {
  return <div className="absolute bg-[#9ef0f0] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingLeft1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 mix-blend-multiply right-0 top-0 w-[32px]" data-name="Padding left">
      <TagBase6 />
      <Fill6 />
    </div>
  );
}

function GridOverlay1() {
  return (
    <div className="absolute inset-0 opacity-70" data-name="Grid overlay">
      <LayoutGrid1 />
      <PaddingRight1 />
      <PaddingLeft1 />
    </div>
  );
}

function ColumnContent3() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer10() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">6 col</p>
    </div>
  );
}

function ColumnSpan3() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.22%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 462 16">
            <path d={svgPaths.p2ff57700} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.22%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 462 16">
            <path d={svgPaths.p2ff57700} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer10 />
    </div>
  );
}

function GridItemGutterModeAnnotation3() {
  return (
    <div className="absolute h-[172px] right-[496px] top-[148px] w-[480px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent3 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan3 />
    </div>
  );
}

function ColumnContent4() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer11() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">6 col</p>
    </div>
  );
}

function ColumnSpan4() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.22%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 462 16">
            <path d={svgPaths.p2ff57700} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.22%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 462 16">
            <path d={svgPaths.p2ff57700} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer11 />
    </div>
  );
}

function GridItemGutterModeAnnotation4() {
  return (
    <div className="absolute h-[40px] right-[816px] top-[39px] w-[480px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent4 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan4 />
    </div>
  );
}

function ColumnContent5() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer12() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">3 col</p>
    </div>
  );
}

function ColumnSpan5() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.45%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 222 16">
            <path d={svgPaths.p1504d880} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.45%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 222 16">
            <path d={svgPaths.p1504d880} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer12 />
    </div>
  );
}

function GridItemGutterModeAnnotation5() {
  return (
    <div className="absolute h-[172px] right-[256px] top-[148px] w-[240px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent5 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan5 />
    </div>
  );
}

function ColumnContent6() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer13() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">3 col</p>
    </div>
  );
}

function ColumnSpan6() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.45%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 222 16">
            <path d={svgPaths.p1504d880} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.45%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 222 16">
            <path d={svgPaths.p1504d880} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer13 />
    </div>
  );
}

function GridItemGutterModeAnnotation6() {
  return (
    <div className="absolute h-[172px] right-[16px] top-[148px] w-[240px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent6 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan6 />
    </div>
  );
}

function SpecDocumentation2() {
  return (
    <div className="absolute inset-0" data-name="Spec & Documentation">
      <GridItemGutterModeAnnotation3 />
      <GridItemGutterModeAnnotation4 />
      <GridItemGutterModeAnnotation5 />
      <GridItemGutterModeAnnotation6 />
    </div>
  );
}

function DesignAnnotations2() {
  return (
    <div className="h-[372px] relative shrink-0 w-[1312px]" data-name="Design Annotations">
      <HomePageHeader2 />
      <GridOverlay1 />
      <SpecDocumentation2 />
    </div>
  );
}

function Frame630912() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] min-w-full not-italic relative shrink-0 text-[20px] text-black w-[min-content]">Breakpoints: XL, L</p>
      <DesignAnnotations1 />
      <DesignAnnotations2 />
    </div>
  );
}

function WelcomeHeaderWrapper3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[32px] pt-[40px] px-0 relative shrink-0 w-full z-[4]" data-name="Welcome header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[#161616] text-[28px] w-[304px]">Welcome, First name</p>
    </div>
  );
}

function WelcomeTextWrapper3() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[304px] min-w-[224px] relative shrink-0 w-full" data-name="Welcome text wrapper">
      <p className="-webkit-box css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] max-w-[352px] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-[min-content]">Accelerate decision making at scale with Decision Intelligence</p>
    </div>
  );
}

function Gradient3() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start" data-name="Gradient">
      <div className="basis-0 bg-gradient-to-b from-[rgba(255,255,255,0)] grow min-h-px min-w-px pointer-events-none relative shrink-0 to-[rgba(69,137,255,0.05)] w-full" data-name="Gradient - Gray 100 Theme">
        <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0" />
        <div className="absolute inset-0 shadow-[0px_-80px_70px_-65px_inset_rgba(15,98,254,0.1)]" />
      </div>
    </div>
  );
}

function AiLayer3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col inset-0 items-start pb-[172px] pt-0 px-0" data-name="AI Layer">
      <div className="absolute bg-[#f4f4f4] inset-0 shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" data-name="Background layer" />
      <Gradient3 />
    </div>
  );
}

function Term3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Term">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Term">
          <rect fill="white" fillOpacity="0.01" height="24" style={{ mixBlendMode: "multiply" }} width="24" />
          <g id="Vector">
            <path d={svgPaths.p37817100} fill="#525252" />
            <path d={svgPaths.p1a73cc80} fill="#525252" />
            <path d={svgPaths.p11e47970} fill="#525252" />
            <path d={svgPaths.p36b58080} fill="#525252" />
            <path d={svgPaths.p1697b400} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame630393() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0">
      <Term3 />
    </div>
  );
}

function Start3() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End3() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start3 />
      <End3 />
    </div>
  );
}

function Label3() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#005d5d] text-[12px] text-nowrap tracking-[0.32px] whitespace-pre">Beta</p>
      <Resizer3 />
    </div>
  );
}

function TagContent3() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[4px] py-0 relative rounded-[24px] shrink-0" data-name="Tag content">
      <Label3 />
    </div>
  );
}

function TagReadOnly3() {
  return (
    <div className="bg-[#9ef0f0] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="Tag - Read-only">
      <TagContent3 />
    </div>
  );
}

function BetaTagCustom3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Beta Tag CUSTOM">
      <TagReadOnly3 />
    </div>
  );
}

function Slug3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Slug">
      <div className="absolute inset-0" data-name="base">
        <div aria-hidden="true" className="absolute border border-[#161616] border-solid inset-0 pointer-events-none" />
      </div>
      <p className="absolute bottom-[6.25%] font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[14px] left-[8px] not-italic text-[#161616] text-[9px] text-center top-[6.25%] translate-x-[-50%] w-[14px]">AI</p>
    </div>
  );
}

function AiTileBeta3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="AI Tile beta">
      <BetaTagCustom3 />
      <Slug3 />
    </div>
  );
}

function Frame630394() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame630393 />
      <AiTileBeta3 />
    </div>
  );
}

function Send3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Send">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p19571780} fill="var(--fill-0, #161616)" fillOpacity="0.25" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon15() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Icon">
      <Send3 />
    </div>
  );
}

function ChatPromptLineTypeaheadListItemCarbonForAi3() {
  return (
    <div className="basis-0 bg-[#f4f4f4] grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="Chat prompt line typeahead list item | Carbon for AI">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[7px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#a8a8a8] text-[14px] text-nowrap tracking-[0.16px]">Start chatting...</p>
          <Icon15 />
        </div>
      </div>
    </div>
  );
}

function ChatPromptLine3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Chat prompt line">
      <ChatPromptLineTypeaheadListItemCarbonForAi3 />
    </div>
  );
}

function ButtonContent9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Open decision assistant</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent9 />
    </div>
  );
}

function Frame630407() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-full">
      <Button6 />
    </div>
  );
}

function Frame630408() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ChatPromptLine3 />
      <Frame630407 />
    </div>
  );
}

function Frame630409() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-nowrap w-full">Chat and build decision services</p>
      <Frame630408 />
    </div>
  );
}

function Frame630395() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame630394 />
      <Frame630409 />
    </div>
  );
}

function Frame630396() {
  return (
    <div className="h-[172px] relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[172px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Frame630395 />
        </div>
      </div>
    </div>
  );
}

function HeaderChatTile3() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_8] bg-[rgba(255,255,255,0)] min-h-[172px] mix-blend-multiply relative shrink-0" data-name="Header - Chat Tile">
      <div className="content-stretch flex flex-col items-start min-h-inherit overflow-clip relative rounded-[inherit] size-full">
        <AiLayer3 />
        <Frame630396 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0 pointer-events-none shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" />
    </div>
  );
}

function DecisionTree6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon16() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree6 />
    </div>
  );
}

function TaskTile6() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 01">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon16 />
          <p className="-webkit-box basis-0 css-okh5f0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] w-full">Create a new decision project to get started with decision automation</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionProject3() {
  return (
    <div className="[grid-area:2_/_1_/_auto_/_span_4] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision project">
      <TaskTile6 />
    </div>
  );
}

function DecisionTree7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon17() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree7 />
    </div>
  );
}

function TaskTile7() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 02">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon17 />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[16px] w-full">Create a decision service in a new or existing project</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionService3() {
  return (
    <div className="[grid-area:2_/_5_/_auto_/_span_4] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision service">
      <TaskTile7 />
    </div>
  );
}

function ComponentsTaskSets3() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(8,_minmax(0px,_1fr))] grid-rows-[172px_172px] h-[360px] relative shrink-0 w-full" data-name="components / _task sets">
      <HeaderChatTile3 />
      <NewDecisionProject3 />
      <NewDecisionService3 />
    </div>
  );
}

function ComponentsSectionTileGroup3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start max-w-[1136px] overflow-clip pb-0 pt-[40px] px-0 relative shrink-0 w-full" data-name="components / _section tile group">
      <ComponentsTaskSets3 />
    </div>
  );
}

function HeaderContent3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full z-[3]" data-name="Header content">
      <WelcomeTextWrapper3 />
      <ComponentsSectionTileGroup3 />
    </div>
  );
}

function SettingsAdjust3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Settings--adjust">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Settings--adjust">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p2acbe800} fill="#0F62FE" />
            <path d={svgPaths.pb1a8400} fill="#0F62FE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <SettingsAdjust3 />
    </div>
  );
}

function ButtonContent10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Display settings</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon18 />
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent10 />
    </div>
  );
}

function ChevronUp3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron--up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron--up">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p23aae480} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <ChevronUp3 />
    </div>
  );
}

function ButtonContent11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Collapse</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon19 />
        </div>
      </div>
    </div>
  );
}

function ExpandCollapseTrigger3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="expand collapse trigger">
      <ButtonContent11 />
    </div>
  );
}

function HeaderActionGroup3() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start right-0 z-[2]" data-name="header action group">
      <Button7 />
      <ExpandCollapseTrigger3 />
    </div>
  );
}

function ComponentsHeroImage3() {
  return (
    <div className="absolute h-[376px] opacity-40 right-0 top-0 w-[720px] z-[1]" data-name="components / Hero image">
      <div className="absolute bg-[#d0e2ff] inset-0" data-name="hero-corner-light 2" />
      <p className="absolute bottom-[336px] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] left-[calc(50%-150px)] not-italic text-[#7a9cd3] text-[28px] text-nowrap translate-y-[100%] whitespace-pre">Hero image placeholder</p>
    </div>
  );
}

function HomePageHeader3() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#ffffff] isolate items-start left-0 overflow-clip pb-[52px] pl-[16px] pr-[32px] pt-[20px] to-[#e0e0e0] top-0 w-[672px]" data-name="Home page header">
      <WelcomeHeaderWrapper3 />
      <HeaderContent3 />
      <HeaderActionGroup3 />
      <ComponentsHeroImage3 />
    </div>
  );
}

function ColumnBase32() {
  return <div className="basis-0 bg-[#3ddbd9] grow h-full min-h-px min-w-px opacity-10 shrink-0" data-name="_Column base" />;
}

function LayoutGrid2() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex gap-[32px] items-start left-0 mix-blend-multiply px-[32px] py-0 top-0 w-[672px]" data-name="Layout grid">
      {[...Array(8).keys()].map((_, i) => (
        <ColumnBase32 key={i} />
      ))}
    </div>
  );
}

function TagContainer14() {
  return (
    <div className="absolute bg-[#e8daff] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[calc(50%-18px)] translate-x-[-50%] translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#be95ff] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#31135e] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$05</p>
      <div className="absolute bottom-[-2px] flex h-[2px] items-center justify-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[4px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(190, 149, 255, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #BE95FF)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase7() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer14 />
    </div>
  );
}

function Fill7() {
  return <div className="absolute bg-[#e8daff] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingRight2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 mix-blend-multiply top-0 w-[16px]" data-name="Padding right">
      <TagBase7 />
      <Fill7 />
    </div>
  );
}

function TagContainer15() {
  return (
    <div className="absolute bg-[#9ef0f0] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[calc(50%-18px)] translate-x-[-50%] translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#08bdba] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#022b30] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$07</p>
      <div className="absolute bottom-[-2px] flex h-[2px] items-center justify-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[4px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(8, 189, 186, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #08BDBA)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase8() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer15 />
    </div>
  );
}

function Fill8() {
  return <div className="absolute bg-[#9ef0f0] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingLeft2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 mix-blend-multiply right-0 top-0 w-[32px]" data-name="Padding left">
      <TagBase8 />
      <Fill8 />
    </div>
  );
}

function GridOverlay2() {
  return (
    <div className="absolute inset-0 opacity-70" data-name="Grid overlay">
      <LayoutGrid2 />
      <PaddingRight2 />
      <PaddingLeft2 />
    </div>
  );
}

function ColumnContent7() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer16() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">8 col</p>
    </div>
  );
}

function ColumnSpan7() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.16%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 622 16">
            <path d={svgPaths.p1b8238f0} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.16%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 622 16">
            <path d={svgPaths.p1b8238f0} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer16 />
    </div>
  );
}

function GridItemGutterModeAnnotation7() {
  return (
    <div className="absolute h-[77px] left-[16px] top-[108px] w-[640px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent7 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan7 />
    </div>
  );
}

function ColumnContent8() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer17() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">8 col</p>
    </div>
  );
}

function ColumnSpan8() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.16%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 622 16">
            <path d={svgPaths.p1b8238f0} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.16%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 622 16">
            <path d={svgPaths.p1b8238f0} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer17 />
    </div>
  );
}

function GridItemGutterModeAnnotation8() {
  return (
    <div className="absolute h-[108px] left-[16px] top-0 w-[640px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent8 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan8 />
    </div>
  );
}

function ColumnContent9() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer18() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">8 col</p>
    </div>
  );
}

function ColumnSpan9() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.16%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 622 16">
            <path d={svgPaths.p1b8238f0} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.16%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 622 16">
            <path d={svgPaths.p1b8238f0} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer18 />
    </div>
  );
}

function GridItemGutterModeAnnotation9() {
  return (
    <div className="absolute h-[360px] right-[16px] top-[240px] w-[640px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent9 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan9 />
    </div>
  );
}

function SpecDocumentation3() {
  return (
    <div className="absolute inset-0" data-name="Spec & Documentation">
      <GridItemGutterModeAnnotation7 />
      <GridItemGutterModeAnnotation8 />
      <GridItemGutterModeAnnotation9 />
    </div>
  );
}

function DesignAnnotations3() {
  return (
    <div className="h-[652px] relative shrink-0 w-[672px]" data-name="Design Annotations">
      <HomePageHeader3 />
      <GridOverlay2 />
      <SpecDocumentation3 />
    </div>
  );
}

function WelcomeHeaderWrapper4() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[32px] pt-[40px] px-0 relative shrink-0 w-full z-[4]" data-name="Welcome header wrapper">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[#161616] text-[28px] w-[304px]">Welcome, First name</p>
    </div>
  );
}

function WelcomeTextWrapper4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[304px] min-w-[224px] relative shrink-0 w-full" data-name="Welcome text wrapper">
      <p className="-webkit-box css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] max-w-[352px] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-[min-content]">Accelerate decision making at scale with Decision Intelligence</p>
    </div>
  );
}

function Gradient4() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start" data-name="Gradient">
      <div className="basis-0 bg-gradient-to-b from-[rgba(255,255,255,0)] grow min-h-px min-w-px pointer-events-none relative shrink-0 to-[rgba(69,137,255,0.05)] w-full" data-name="Gradient - Gray 100 Theme">
        <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0" />
        <div className="absolute inset-0 shadow-[0px_-80px_70px_-65px_inset_rgba(15,98,254,0.1)]" />
      </div>
    </div>
  );
}

function AiLayer4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col inset-0 items-start pb-[172px] pt-0 px-0" data-name="AI Layer">
      <div className="absolute bg-[#f4f4f4] inset-0 shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" data-name="Background layer" />
      <Gradient4 />
    </div>
  );
}

function Term4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Term">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Term">
          <rect fill="white" fillOpacity="0.01" height="24" style={{ mixBlendMode: "multiply" }} width="24" />
          <g id="Vector">
            <path d={svgPaths.p37817100} fill="#525252" />
            <path d={svgPaths.p1a73cc80} fill="#525252" />
            <path d={svgPaths.p11e47970} fill="#525252" />
            <path d={svgPaths.p36b58080} fill="#525252" />
            <path d={svgPaths.p1697b400} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame630397() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0">
      <Term4 />
    </div>
  );
}

function Start4() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End4() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[16px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start4 />
      <End4 />
    </div>
  );
}

function Label4() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-4px] pb-[2px] pt-0 px-[8px] relative shrink-0" data-name="Label">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#005d5d] text-[12px] text-nowrap tracking-[0.32px] whitespace-pre">Beta</p>
      <Resizer4 />
    </div>
  );
}

function TagContent4() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[4px] py-0 relative rounded-[24px] shrink-0" data-name="Tag content">
      <Label4 />
    </div>
  );
}

function TagReadOnly4() {
  return (
    <div className="bg-[#9ef0f0] content-stretch flex items-start relative rounded-[9px] shrink-0" data-name="Tag - Read-only">
      <TagContent4 />
    </div>
  );
}

function BetaTagCustom4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Beta Tag CUSTOM">
      <TagReadOnly4 />
    </div>
  );
}

function Slug4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Slug">
      <div className="absolute inset-0" data-name="base">
        <div aria-hidden="true" className="absolute border border-[#161616] border-solid inset-0 pointer-events-none" />
      </div>
      <p className="absolute bottom-[6.25%] font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[14px] left-[8px] not-italic text-[#161616] text-[9px] text-center top-[6.25%] translate-x-[-50%] w-[14px]">AI</p>
    </div>
  );
}

function AiTileBeta4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="AI Tile beta">
      <BetaTagCustom4 />
      <Slug4 />
    </div>
  );
}

function Frame630410() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame630397 />
      <AiTileBeta4 />
    </div>
  );
}

function Send4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Send">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p19571780} fill="var(--fill-0, #161616)" fillOpacity="0.25" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon20() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Icon">
      <Send4 />
    </div>
  );
}

function ChatPromptLineTypeaheadListItemCarbonForAi4() {
  return (
    <div className="basis-0 bg-[#f4f4f4] grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="Chat prompt line typeahead list item | Carbon for AI">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[7px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow h-[18px] leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#a8a8a8] text-[14px] text-nowrap tracking-[0.16px]">Start chatting...</p>
          <Icon20 />
        </div>
      </div>
    </div>
  );
}

function ChatPromptLine4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Chat prompt line">
      <ChatPromptLineTypeaheadListItemCarbonForAi4 />
    </div>
  );
}

function ButtonContent12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Open decision assistant</p>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent12 />
    </div>
  );
}

function Frame630411() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-full">
      <Button8 />
    </div>
  );
}

function Frame630412() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ChatPromptLine4 />
      <Frame630411 />
    </div>
  );
}

function Frame630413() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] text-nowrap w-full">Chat and build decision services</p>
      <Frame630412 />
    </div>
  );
}

function Frame630414() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame630410 />
      <Frame630413 />
    </div>
  );
}

function Frame630415() {
  return (
    <div className="h-[172px] relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[172px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Frame630414 />
        </div>
      </div>
    </div>
  );
}

function HeaderChatTile4() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_8] bg-[rgba(255,255,255,0)] min-h-[172px] mix-blend-multiply relative shrink-0" data-name="Header - Chat Tile">
      <div className="content-stretch flex flex-col items-start min-h-inherit overflow-clip relative rounded-[inherit] size-full">
        <AiLayer4 />
        <Frame630415 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0 pointer-events-none shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" />
    </div>
  );
}

function DecisionTree8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon21() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree8 />
    </div>
  );
}

function TaskTile8() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 01">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon21 />
          <p className="-webkit-box basis-0 css-okh5f0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] w-full">Create a new decision project to get started with decision automation</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionProject4() {
  return (
    <div className="[grid-area:2_/_1_/_auto_/_span_4] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision project">
      <TaskTile8 />
    </div>
  );
}

function DecisionTree9() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Decision-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Decision-tree">
          <rect fill="white" fillOpacity="0.01" height="24" width="24" />
          <path d={svgPaths.p2e0fc7f0} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon22() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree9 />
    </div>
  );
}

function TaskTile9() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 02">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon22 />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[16px] w-full">Create a decision service in a new or existing project</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionService4() {
  return (
    <div className="[grid-area:2_/_5_/_auto_/_span_4] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision service">
      <TaskTile9 />
    </div>
  );
}

function ComponentsTaskSets4() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(8,_minmax(0px,_1fr))] grid-rows-[172px_172px] h-[360px] relative shrink-0 w-full" data-name="components / _task sets">
      <HeaderChatTile4 />
      <NewDecisionProject4 />
      <NewDecisionService4 />
    </div>
  );
}

function ComponentsSectionTileGroup4() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start max-w-[1136px] overflow-clip pb-0 pt-[40px] px-0 relative shrink-0 w-full" data-name="components / _section tile group">
      <ComponentsTaskSets4 />
    </div>
  );
}

function HeaderContent4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full z-[3]" data-name="Header content">
      <WelcomeTextWrapper4 />
      <ComponentsSectionTileGroup4 />
    </div>
  );
}

function SettingsAdjust4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Settings--adjust">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Settings--adjust">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p2acbe800} fill="#0F62FE" />
            <path d={svgPaths.pb1a8400} fill="#0F62FE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <SettingsAdjust4 />
    </div>
  );
}

function ButtonContent13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Display settings</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon23 />
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent13 />
    </div>
  );
}

function ChevronUp4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron--up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron--up">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p23aae480} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <ChevronUp4 />
    </div>
  );
}

function ButtonContent14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Collapse</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon24 />
        </div>
      </div>
    </div>
  );
}

function ExpandCollapseTrigger4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="expand collapse trigger">
      <ButtonContent14 />
    </div>
  );
}

function HeaderActionGroup4() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start right-0 z-[2]" data-name="header action group">
      <Button9 />
      <ExpandCollapseTrigger4 />
    </div>
  );
}

function ComponentsHeroImage4() {
  return (
    <div className="absolute h-[376px] opacity-40 right-0 top-0 w-[720px] z-[1]" data-name="components / Hero image">
      <div className="absolute bg-[#d0e2ff] inset-0" data-name="hero-corner-light 2" />
      <p className="absolute bottom-[336px] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] left-[calc(50%-150px)] not-italic text-[#7a9cd3] text-[28px] text-nowrap translate-y-[100%] whitespace-pre">Hero image placeholder</p>
    </div>
  );
}

function HomePageHeader4() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#ffffff] isolate items-start left-0 overflow-clip pb-[52px] pl-[16px] pr-[32px] pt-[20px] to-[#e0e0e0] top-0 w-[672px]" data-name="Home page header">
      <WelcomeHeaderWrapper4 />
      <HeaderContent4 />
      <HeaderActionGroup4 />
      <ComponentsHeroImage4 />
    </div>
  );
}

function ColumnBase40() {
  return <div className="basis-0 bg-[#3ddbd9] grow h-full min-h-px min-w-px opacity-10 shrink-0" data-name="_Column base" />;
}

function LayoutGrid3() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex gap-[32px] items-start left-0 mix-blend-multiply px-[32px] py-0 top-0 w-[672px]" data-name="Layout grid">
      {[...Array(8).keys()].map((_, i) => (
        <ColumnBase40 key={i} />
      ))}
    </div>
  );
}

function TagContainer19() {
  return (
    <div className="absolute bg-[#e8daff] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[calc(50%-18px)] translate-x-[-50%] translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#be95ff] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#31135e] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$05</p>
      <div className="absolute bottom-[-2px] flex h-[2px] items-center justify-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[4px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(190, 149, 255, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #BE95FF)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase9() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer19 />
    </div>
  );
}

function Fill9() {
  return <div className="absolute bg-[#e8daff] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingRight3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 mix-blend-multiply top-0 w-[16px]" data-name="Padding right">
      <TagBase9 />
      <Fill9 />
    </div>
  );
}

function TagContainer20() {
  return (
    <div className="absolute bg-[#9ef0f0] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[calc(50%-18px)] translate-x-[-50%] translate-y-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#08bdba] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#022b30] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">$07</p>
      <div className="absolute bottom-[-2px] flex h-[2px] items-center justify-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[4px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[2px] relative w-[4px]" data-name="Pointer">
            <div className="absolute bottom-0 left-0 right-0 top-[10.36%]" style={{ "--fill-0": "rgba(8, 189, 186, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                <path d={svgPaths.p13689c40} fill="var(--fill-0, #08BDBA)" id="Pointer" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagBase10() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer20 />
    </div>
  );
}

function Fill10() {
  return <div className="absolute bg-[#9ef0f0] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingLeft3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 mix-blend-multiply right-0 top-0 w-[32px]" data-name="Padding left">
      <TagBase10 />
      <Fill10 />
    </div>
  );
}

function GridOverlay3() {
  return (
    <div className="absolute inset-0 opacity-70" data-name="Grid overlay">
      <LayoutGrid3 />
      <PaddingRight3 />
      <PaddingLeft3 />
    </div>
  );
}

function ColumnContent10() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer21() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">8 col</p>
    </div>
  );
}

function ColumnSpan10() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.16%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 622 16">
            <path d={svgPaths.p1b8238f0} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.16%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 622 16">
            <path d={svgPaths.p1b8238f0} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer21 />
    </div>
  );
}

function GridItemGutterModeAnnotation10() {
  return (
    <div className="absolute h-[172px] right-[16px] top-[240px] w-[640px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent10 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan10 />
    </div>
  );
}

function ColumnContent11() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer22() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">4 col</p>
    </div>
  );
}

function ColumnSpan11() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.33%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 302 16">
            <path d={svgPaths.p1dcd9c00} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.33%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 302 16">
            <path d={svgPaths.p1dcd9c00} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer22 />
    </div>
  );
}

function GridItemGutterModeAnnotation11() {
  return (
    <div className="absolute h-[172px] right-[336px] top-[428px] w-[320px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent11 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan11 />
    </div>
  );
}

function ColumnContent12() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer23() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">4 col</p>
    </div>
  );
}

function ColumnSpan12() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.33%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 302 16">
            <path d={svgPaths.p1dcd9c00} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.33%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 302 16">
            <path d={svgPaths.p1dcd9c00} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer23 />
    </div>
  );
}

function GridItemGutterModeAnnotation12() {
  return (
    <div className="absolute h-[172px] right-[16px] top-[428px] w-[320px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent12 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan12 />
    </div>
  );
}

function SpecDocumentation4() {
  return (
    <div className="absolute inset-0" data-name="Spec & Documentation">
      <GridItemGutterModeAnnotation10 />
      <GridItemGutterModeAnnotation11 />
      <GridItemGutterModeAnnotation12 />
    </div>
  );
}

function ColumnContent13() {
  return (
    <div className="absolute bottom-0 left-0 right-[16px] top-0" data-name="column content">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 right-0 top-0 w-[16px]" data-name="column • padding right">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_0px_0px_1px] border-dashed bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
        </div>
        <div className="absolute bottom-0 left-[16px] right-[16px] top-0" data-name="column • span" />
        <div className="absolute bg-[rgba(255,215,217,0.2)] bottom-0 left-0 top-0 w-[16px]" data-name="column • padding left">
          <div aria-hidden="true" className="absolute border-[#da1e28] border-[0px_1px_0px_0px] border-dashed bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function TagContainer24() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">6 col</p>
    </div>
  );
}

function ColumnSpan13() {
  return (
    <div className="absolute h-[4px] left-0 right-[16px] top-[16px]" data-name="_column span">
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.22%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 462 16">
            <path d={svgPaths.p2ff57700} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[2px] right-[2px] top-[2px]">
        <div className="absolute inset-[-7.36px_-0.22%]" style={{ "--stroke-0": "rgba(218, 30, 40, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 462 16">
            <path d={svgPaths.p2ff57700} fill="var(--stroke-0, #DA1E28)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#da1e28] h-[14px] left-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <div className="absolute bg-[#da1e28] h-[14px] right-[-1px] rounded-[4px] top-1/2 translate-y-[-50%] w-[2px]" />
      <TagContainer24 />
    </div>
  );
}

function GridItemGutterModeAnnotation13() {
  return (
    <div className="absolute h-[40px] right-[176px] top-[57px] w-[480px]" data-name="_grid item gutter mode annotation">
      <div className="absolute bottom-0 opacity-25 right-0 top-0 w-[16px]" data-name="column gutter • margin right">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      </div>
      <ColumnContent13 />
      <div className="absolute bottom-0 left-0 opacity-25 top-0 w-[16px]" data-name="column gutter • margin left">
        <div aria-hidden="true" className="absolute border-[#8d8d8d] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-0.5px] pointer-events-none right-0 top-0" />
      </div>
      <ColumnSpan13 />
    </div>
  );
}

function DesignAnnotations4() {
  return (
    <div className="h-[652px] relative shrink-0 w-[672px]" data-name="Design Annotations">
      <HomePageHeader4 />
      <GridOverlay3 />
      <SpecDocumentation4 />
      <GridItemGutterModeAnnotation13 />
    </div>
  );
}

function Frame630913() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] min-w-full not-italic relative shrink-0 text-[20px] text-black w-[min-content]">Breakpoints: M</p>
      <DesignAnnotations3 />
      <DesignAnnotations4 />
    </div>
  );
}

function Frame630843() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0">
      <Frame630912 />
      <Frame630913 />
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-white relative shrink-0" data-name="Content">
      <div className="box-border content-stretch flex gap-[64px] items-start overflow-clip p-[96px] relative rounded-[inherit]">
        <Frame630844 />
        <Frame630843 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f4f4f4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function HomePageHeaderSectionGridSpacing() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Home page • Header section -> Grid & Spacing">
      <div aria-hidden="true" className="absolute border border-[#8d8d8d] border-solid inset-[-1px] pointer-events-none" />
      <ArtboardHeaderIbmDocumentationLibrary />
      <Content />
      <Content1 />
    </div>
  );
}