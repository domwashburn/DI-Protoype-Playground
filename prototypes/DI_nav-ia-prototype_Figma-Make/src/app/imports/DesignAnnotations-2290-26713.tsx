import svgPaths from "./svg-vyevojue96";

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

function TagContainer() {
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

function TagBase() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer />
    </div>
  );
}

function Fill() {
  return <div className="absolute bg-[#e8daff] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingRight() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 mix-blend-multiply top-0 w-[16px]" data-name="Padding right">
      <TagBase />
      <Fill />
    </div>
  );
}

function TagContainer1() {
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

function TagBase1() {
  return (
    <div className="absolute backdrop-blur-[20px] backdrop-filter content-stretch flex gap-[4px] items-center justify-center left-1/2 size-0 top-0 translate-x-[-50%]" data-name="_Tag base">
      <TagContainer1 />
    </div>
  );
}

function Fill1() {
  return <div className="absolute bg-[#9ef0f0] inset-0 opacity-50" data-name="Fill" />;
}

function PaddingLeft() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 mix-blend-multiply right-0 top-0 w-[32px]" data-name="Padding left">
      <TagBase1 />
      <Fill1 />
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

function TagContainer2() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">6 col</p>
    </div>
  );
}

function ColumnSpan() {
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
      <TagContainer2 />
    </div>
  );
}

function GridItemGutterModeAnnotation() {
  return (
    <div className="absolute h-[172px] right-[496px] top-[148px] w-[480px]" data-name="_grid item gutter mode annotation">
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

function TagContainer3() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">6 col</p>
    </div>
  );
}

function ColumnSpan1() {
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
      <TagContainer3 />
    </div>
  );
}

function GridItemGutterModeAnnotation1() {
  return (
    <div className="absolute h-[40px] right-[816px] top-[39px] w-[480px]" data-name="_grid item gutter mode annotation">
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

function TagContainer4() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">3 col</p>
    </div>
  );
}

function ColumnSpan2() {
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
      <TagContainer4 />
    </div>
  );
}

function GridItemGutterModeAnnotation2() {
  return (
    <div className="absolute h-[172px] right-[256px] top-[148px] w-[240px]" data-name="_grid item gutter mode annotation">
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

function TagContainer5() {
  return (
    <div className="absolute bg-[#ffd7d9] box-border content-stretch flex gap-[8px] items-start justify-center left-1/2 px-[8px] py-[2px] rounded-[2px] top-[-8px] translate-x-[-50%]" data-name="Tag container">
      <div aria-hidden="true" className="absolute border border-[#da1e28] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['IBM_Plex_Sans:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#520408] text-[12px] text-center text-nowrap tracking-[0.32px] whitespace-pre">3 col</p>
    </div>
  );
}

function ColumnSpan3() {
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
      <TagContainer5 />
    </div>
  );
}

function GridItemGutterModeAnnotation3() {
  return (
    <div className="absolute h-[172px] right-[16px] top-[148px] w-[240px]" data-name="_grid item gutter mode annotation">
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

function SpecDocumentation() {
  return (
    <div className="absolute inset-0" data-name="Spec & Documentation">
      <GridItemGutterModeAnnotation />
      <GridItemGutterModeAnnotation1 />
      <GridItemGutterModeAnnotation2 />
      <GridItemGutterModeAnnotation3 />
    </div>
  );
}

export default function DesignAnnotations() {
  return (
    <div className="relative size-full" data-name="Design Annotations">
      <HomePageHeader />
      <GridOverlay />
      <SpecDocumentation />
    </div>
  );
}