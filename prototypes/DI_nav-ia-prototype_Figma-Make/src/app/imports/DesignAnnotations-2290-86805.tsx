import svgPaths from "./svg-ffohjil7lw";

function ColumnBase() {
  return <div className="basis-0 bg-[#3ddbd9] grow h-full min-h-px min-w-px opacity-10 shrink-0" data-name="_Column base" />;
}

function LayoutGrid() {
  return (
    <div className="absolute bg-white bottom-[756px] box-border content-stretch flex gap-[32px] items-start mix-blend-multiply px-[32px] py-0 right-0 top-0 w-[1056px]" data-name="Layout grid">
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
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-[756px] left-0 mix-blend-multiply top-0 w-[16px]" data-name="Padding right">
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
    <div className="absolute bg-[rgba(255,255,255,0)] bottom-[756px] mix-blend-multiply right-0 top-0 w-[32px]" data-name="Padding left">
      <TagBase1 />
      <Fill1 />
    </div>
  );
}

function SpecDocumentation() {
  return (
    <div className="absolute bottom-[-756px] left-0 right-0 top-[48px] z-[2]" data-name="Spec & Documentation">
      <LayoutGrid />
      <PaddingRight />
      <PaddingLeft />
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute left-[14px] size-[20px] top-[14px]" data-name="Menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Menu">
          <rect fill="white" height="20" style={{ mixBlendMode: "multiply" }} width="20" />
          <g id="Vector">
            <path d="M17.5 3.75H2.5V5H17.5V3.75Z" fill="#F4F4F4" />
            <path d="M17.5 15H2.5V16.25H17.5V15Z" fill="#F4F4F4" />
            <path d="M17.5 7.5H2.5V8.75H17.5V7.5Z" fill="#F4F4F4" />
            <path d={svgPaths.p34014e80} fill="#F4F4F4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HeaderComponentCheckboxEnabled() {
  return (
    <div className="absolute bg-[#161616] inset-0" data-name="Header/ component/ checkbox enabled">
      <Menu />
    </div>
  );
}

function UtilityUtility() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Utility/ Utility">
      <HeaderComponentCheckboxEnabled />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#393939]" />
    </div>
  );
}

function ProductNameProductName() {
  return (
    <div className="bg-[#161616] box-border content-stretch flex gap-[4px] items-center min-w-[240px] pl-0 pr-[48px] py-0 relative shrink-0" data-name="Product name/ Product name">
      <UtilityUtility />
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f4f4f4] text-[14px] text-center text-nowrap tracking-[0.16px]">
        <p className="leading-[18px] whitespace-pre">{`IBM  `}</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f4f4f4] text-[14px] text-nowrap tracking-[0.16px]">
        <p className="leading-[18px] whitespace-pre">Decision Intelligence</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#393939]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <ProductNameProductName />
    </div>
  );
}

function LinkLink() {
  return (
    <div className="bg-[#161616] box-border content-stretch flex gap-[10px] items-center px-[16px] py-[12px] relative shrink-0" data-name="Link/ Link">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f4f4f4] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Give feedback</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#393939]" />
    </div>
  );
}

function DocumentMultiple02() {
  return (
    <div className="absolute left-[14px] size-[20px] top-[14px]" data-name="Document--multiple-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Document--multiple-02">
          <rect fill="white" fillOpacity="0.01" height="20" width="20" />
          <g id="Vector">
            <path d={svgPaths.p1bde3400} fill="var(--fill-0, #F4F4F4)" />
            <path d={svgPaths.p9ec03d2} fill="var(--fill-0, #F4F4F4)" />
            <path d="M15 10H10V11.25H15V10Z" fill="var(--fill-0, #F4F4F4)" />
            <path d={svgPaths.p496d500} fill="var(--fill-0, #F4F4F4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HeaderComponentCheckboxEnabled1() {
  return (
    <div className="absolute bg-[#161616] inset-0" data-name="Header/ component/ checkbox enabled">
      <DocumentMultiple02 />
    </div>
  );
}

function UtilityUtility1() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Utility/ Utility">
      <HeaderComponentCheckboxEnabled1 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#393939]" />
    </div>
  );
}

function Help() {
  return (
    <div className="absolute left-[14px] size-[20px] top-[14px]" data-name="Help">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Help">
          <rect fill="white" height="20" style={{ mixBlendMode: "multiply" }} width="20" />
          <g id="Vector">
            <path d={svgPaths.p2fdfac00} fill="#F4F4F4" />
            <path d={svgPaths.p337f1980} fill="#F4F4F4" />
            <path d={svgPaths.pf044400} fill="#F4F4F4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HeaderComponentCheckboxEnabled2() {
  return (
    <div className="absolute bg-[#161616] inset-0" data-name="Header/ component/ checkbox enabled">
      <Help />
    </div>
  );
}

function UtilityUtility2() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Utility/ Utility">
      <HeaderComponentCheckboxEnabled2 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#393939]" />
    </div>
  );
}

function Initials() {
  return (
    <div className="bg-[#198038] content-stretch flex items-center justify-center relative rounded-[1000px] shrink-0 size-[32px]" data-name="Initials">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[0.16px] whitespace-pre">DW</p>
    </div>
  );
}

function UserProfileImagesBase() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="_User profile images base">
      <Initials />
    </div>
  );
}

function UserProfileImages() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-1/2 mix-blend-multiply top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="User profile images">
      <UserProfileImagesBase />
    </div>
  );
}

function UserProfileImage() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="User Profile/ Image">
      <div className="absolute bg-[#161616] inset-0" data-name="Rectangle" />
      <UserProfileImages />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#393939]" />
    </div>
  );
}

function GlobalHeader() {
  return (
    <div className="bg-[#161616] content-stretch flex h-[48px] items-center relative shrink-0 w-full z-[2]" data-name="Global header">
      <Frame1 />
      <LinkLink />
      <UtilityUtility1 />
      <UtilityUtility2 />
      <UserProfileImage />
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

function WelcomeTextWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-full items-start max-w-[304px] min-w-[224px] relative shrink-0 w-[224px]" data-name="Welcome text wrapper">
      <p className="-webkit-box css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[28px] max-w-[352px] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-[min-content]">Accelerate decision making at scale with Decision Intelligence</p>
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

function Label1() {
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
      <Label1 />
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

function Icon1() {
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
          <Icon1 />
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

function ButtonContent3() {
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

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent3 />
    </div>
  );
}

function Frame630403() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-full">
      <Button />
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
    <div className="[grid-area:1_/_1_/_auto_/_span_8] bg-[rgba(255,255,255,0)] min-h-[172px] mix-blend-multiply relative shrink-0" data-name="Header - Chat Tile">
      <div className="content-stretch flex flex-col items-start min-h-inherit overflow-clip relative rounded-[inherit] size-full">
        <AiLayer />
        <Frame630384 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#78a9ff] border-solid inset-0 pointer-events-none shadow-[0px_4px_8px_0px_rgba(15,98,254,0.1)]" />
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

function TaskTile02() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 02">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon2 />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[16px] w-full">Create a decision service in a new or existing project</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionService() {
  return (
    <div className="[grid-area:2_/_1_/_auto_/_span_4] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision service">
      <TaskTile02 />
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

function Icon3() {
  return (
    <div className="content-stretch flex gap-[42px] items-center relative shrink-0" data-name="Icon">
      <DecisionTree1 />
    </div>
  );
}

function TaskTile01() {
  return (
    <div className="bg-[#f4f4f4] h-[172px] min-h-[172px] min-w-[176px] relative shrink-0 w-full" data-name="Task Tile 01">
      <div className="min-h-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[172px] items-start min-h-inherit min-w-inherit p-[16px] relative w-full">
          <Icon3 />
          <p className="-webkit-box basis-0 css-rpyp3n font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[16px] w-full">Create a new decision project to get started with decision automation</p>
        </div>
      </div>
    </div>
  );
}

function NewDecisionProject() {
  return (
    <div className="[grid-area:1_/_9_/_auto_/_span_4] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="New decision project">
      <TaskTile01 />
    </div>
  );
}

function ComponentsTaskSets() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[172px_172px] h-[172px] relative shrink-0 w-full" data-name="components / _task sets">
      <HeaderChatTile />
      <NewDecisionService />
      <NewDecisionProject />
    </div>
  );
}

function ComponentsSectionTileGroup() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[8px] grow h-[400px] items-start max-w-[944px] min-h-px min-w-[720px] overflow-clip pb-0 pt-[40px] px-0 relative shrink-0" data-name="components / _section tile group">
      <ComponentsTaskSets />
    </div>
  );
}

function HeaderContent() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[3]" data-name="Header content">
      <div className="flex flex-row items-center self-stretch">
        <WelcomeTextWrapper />
      </div>
      <ComponentsSectionTileGroup />
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

function Icon4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <SettingsAdjust />
    </div>
  );
}

function ButtonContent4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Display settings</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent4 />
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

function Icon5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <ChevronUp />
    </div>
  );
}

function ButtonContent5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">Collapse</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function ExpandCollapseTrigger() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="expand collapse trigger">
      <ButtonContent5 />
    </div>
  );
}

function HeaderActionGroup() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start right-0 z-[2]" data-name="header action group">
      <Button1 />
      <ExpandCollapseTrigger />
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
    <div className="bg-gradient-to-b from-[#ffffff] relative shrink-0 to-[#e0e0e0] w-full" data-name="Home page header">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col isolate items-center pb-[52px] pt-0 px-[32px] relative w-full">
          <WelcomeHeaderWrapper />
          <HeaderContent />
          <HeaderActionGroup />
          <ComponentsHeroImage />
        </div>
      </div>
    </div>
  );
}

function Frame630846() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] items-start not-italic relative shrink-0 w-full">
      <p className="-webkit-box css-okh5f0 leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-full">Recent decision automations</p>
      <p className="-webkit-box css-idt30j leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px] w-full">Open decision automations that you created, modified, or viewed</p>
    </div>
  );
}

function ComponentsSectionTitleGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start max-w-[304px] min-w-[224px] overflow-clip relative shrink-0 w-[224px]" data-name="components / Section title group">
      <Frame630846 />
    </div>
  );
}

function ButtonContent6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">{`View all `}</p>
        </div>
      </div>
    </div>
  );
}

function ViewAllButton() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start left-0 mix-blend-multiply overflow-clip top-0" data-name="View all button">
      <ButtonContent6 />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Add">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p349d7700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <Add />
    </div>
  );
}

function ButtonContent7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">New decision automation</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon6 />
        </div>
      </div>
    </div>
  );
}

function NewDecisionProjectButton() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip right-0 top-0" data-name="New decision project button">
      <ButtonContent7 />
    </div>
  );
}

function SectionActions() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Section actions">
      <ViewAllButton />
      <NewDecisionProjectButton />
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
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[715px] h-[532px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start1 />
      <End1 />
    </div>
  );
}

function PrimaryContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] grow items-start leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] w-full z-[3]" data-name="Primary content">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-nowrap w-full">{`{Decision automation name}`}</p>
      <p className="-webkit-box basis-0 css-8h64t1 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function ArrowRight1() {
  return (
    <div className="absolute right-0 size-[16px] top-[calc(50%+0.499px)] translate-y-[-50%]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryContent() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[24px] items-center pl-0 pr-[32px] py-0 relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">99+ decision services</p>
          <ArrowRight1 />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_4] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
      <div className="max-h-inherit min-h-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[168.001px] isolate items-start max-h-inherit min-h-inherit p-[16px] relative w-full">
          <PrimaryContent />
          <SecondaryContent />
        </div>
      </div>
    </div>
  );
}

function PrimaryContent1() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] grow items-start leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] w-full z-[3]" data-name="Primary content">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-nowrap w-full">{`{Decision automation name}`}</p>
      <p className="-webkit-box basis-0 css-8h64t1 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function ArrowRight2() {
  return (
    <div className="absolute right-0 size-[16px] top-[calc(50%+0.499px)] translate-y-[-50%]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryContent1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[24px] items-center pl-0 pr-[32px] py-0 relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">99+ decision services</p>
          <ArrowRight2 />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile1() {
  return (
    <div className="[grid-area:2_/_1_/_auto_/_span_4] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
      <div className="max-h-inherit min-h-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[168.001px] isolate items-start max-h-inherit min-h-inherit p-[16px] relative w-full">
          <PrimaryContent1 />
          <SecondaryContent1 />
        </div>
      </div>
    </div>
  );
}

function PrimaryContent2() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] grow items-start leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] w-full z-[3]" data-name="Primary content">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-nowrap w-full">{`{Decision automation name}`}</p>
      <p className="-webkit-box basis-0 css-8h64t1 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function ArrowRight3() {
  return (
    <div className="absolute right-0 size-[16px] top-[calc(50%+0.499px)] translate-y-[-50%]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryContent2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[24px] items-center pl-0 pr-[32px] py-0 relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">99+ decision services</p>
          <ArrowRight3 />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile2() {
  return (
    <div className="[grid-area:1_/_9_/_auto_/_span_4] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
      <div className="max-h-inherit min-h-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[168.001px] isolate items-start max-h-inherit min-h-inherit p-[16px] relative w-full">
          <PrimaryContent2 />
          <SecondaryContent2 />
        </div>
      </div>
    </div>
  );
}

function PrimaryContent3() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] grow items-start leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] w-full z-[3]" data-name="Primary content">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-nowrap w-full">{`{Decision automation name}`}</p>
      <p className="-webkit-box basis-0 css-8h64t1 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function ArrowRight4() {
  return (
    <div className="absolute right-0 size-[16px] top-[calc(50%+0.499px)] translate-y-[-50%]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryContent3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[24px] items-center pl-0 pr-[32px] py-0 relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">99+ decision services</p>
          <ArrowRight4 />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile3() {
  return (
    <div className="[grid-area:2_/_9_/_auto_/_span_4] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
      <div className="max-h-inherit min-h-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[168.001px] isolate items-start max-h-inherit min-h-inherit p-[16px] relative w-full">
          <PrimaryContent3 />
          <SecondaryContent3 />
        </div>
      </div>
    </div>
  );
}

function PrimaryContent4() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] grow items-start leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] w-full z-[3]" data-name="Primary content">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-nowrap w-full">{`{Decision automation name}`}</p>
      <p className="-webkit-box basis-0 css-8h64t1 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function ArrowRight5() {
  return (
    <div className="absolute right-0 size-[16px] top-[calc(50%+0.499px)] translate-y-[-50%]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryContent4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[24px] items-center pl-0 pr-[32px] py-0 relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">99+ decision services</p>
          <ArrowRight5 />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile4() {
  return (
    <div className="[grid-area:1_/_5_/_auto_/_span_4] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
      <div className="max-h-inherit min-h-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[168.001px] isolate items-start max-h-inherit min-h-inherit p-[16px] relative w-full">
          <PrimaryContent4 />
          <SecondaryContent4 />
        </div>
      </div>
    </div>
  );
}

function PrimaryContent5() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] grow items-start leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] w-full z-[3]" data-name="Primary content">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-nowrap w-full">{`{Decision automation name}`}</p>
      <p className="-webkit-box basis-0 css-8h64t1 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function ArrowRight6() {
  return (
    <div className="absolute right-0 size-[16px] top-[calc(50%+0.499px)] translate-y-[-50%]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryContent5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[24px] items-center pl-0 pr-[32px] py-0 relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">99+ decision services</p>
          <ArrowRight6 />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile5() {
  return (
    <div className="[grid-area:2_/_5_/_auto_/_span_4] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
      <div className="max-h-inherit min-h-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[168.001px] isolate items-start max-h-inherit min-h-inherit p-[16px] relative w-full">
          <PrimaryContent5 />
          <SecondaryContent5 />
        </div>
      </div>
    </div>
  );
}

function PrimaryContent6() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] grow items-start leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] w-full z-[3]" data-name="Primary content">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-nowrap w-full">{`{Decision automation name}`}</p>
      <p className="-webkit-box basis-0 css-8h64t1 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function ArrowRight7() {
  return (
    <div className="absolute right-0 size-[16px] top-[calc(50%+0.499px)] translate-y-[-50%]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryContent6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[24px] items-center pl-0 pr-[32px] py-0 relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">99+ decision services</p>
          <ArrowRight7 />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile6() {
  return (
    <div className="[grid-area:3_/_1_/_auto_/_span_4] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
      <div className="max-h-inherit min-h-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[168.001px] isolate items-start max-h-inherit min-h-inherit p-[16px] relative w-full">
          <PrimaryContent6 />
          <SecondaryContent6 />
        </div>
      </div>
    </div>
  );
}

function PrimaryContent7() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] grow items-start leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] w-full z-[3]" data-name="Primary content">
      <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-nowrap w-full">{`{Decision automation name}`}</p>
      <p className="-webkit-box basis-0 css-8h64t1 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function ArrowRight8() {
  return (
    <div className="absolute right-0 size-[16px] top-[calc(50%+0.499px)] translate-y-[-50%]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SecondaryContent7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[24px] items-center pl-0 pr-[32px] py-0 relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 text-nowrap tracking-[0.16px]">99+ decision services</p>
          <ArrowRight8 />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile7() {
  return (
    <div className="[grid-area:3_/_5_/_auto_/_span_4] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
      <div className="max-h-inherit min-h-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[168.001px] isolate items-start max-h-inherit min-h-inherit p-[16px] relative w-full">
          <PrimaryContent7 />
          <SecondaryContent7 />
        </div>
      </div>
    </div>
  );
}

function DecisionProjectsList() {
  return (
    <div className="basis-0 gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[168px_168px_168px] grow min-h-px min-w-px overflow-clip relative self-stretch shrink-0" data-name="decision projects list">
      <HomePageComponentsAssetTile />
      <HomePageComponentsAssetTile1 />
      <HomePageComponentsAssetTile2 />
      <HomePageComponentsAssetTile3 />
      <HomePageComponentsAssetTile4 />
      <HomePageComponentsAssetTile5 />
      <HomePageComponentsAssetTile6 />
      <HomePageComponentsAssetTile7 />
    </div>
  );
}

function SectionContentWrapper() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="section content wrapper">
      <Resizer1 />
      <DecisionProjectsList />
    </div>
  );
}

function HomePageRecentProjectsProjectGrid() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Home page • Recent Projects -> Project grid">
      <SectionActions />
      <SectionContentWrapper />
    </div>
  );
}

function DecisionAutomationProjectsRow() {
  return (
    <div className="bg-[#e8e8e8] relative shrink-0 w-full" data-name="Decision automation projects row">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start px-[32px] py-[64px] relative w-full">
          <ComponentsSectionTitleGroup />
          <HomePageRecentProjectsProjectGrid />
        </div>
      </div>
    </div>
  );
}

function Frame630847() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] items-start not-italic relative shrink-0 w-[224px]">
      <p className="-webkit-box css-okh5f0 leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-full">{`{Project name}`}</p>
      <p className="-webkit-box css-idt30j leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px] w-full">A short project description limited to two lines max</p>
    </div>
  );
}

function ComponentsSectionTitleGroup1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start max-w-[304px] min-w-[224px] overflow-clip relative shrink-0" data-name="components / Section title group">
      <Frame630847 />
    </div>
  );
}

function Frame630413() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center pl-[16px] pr-0 py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-nowrap whitespace-pre">Decision services</p>
        </div>
      </div>
    </div>
  );
}

function Add1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Add">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p349d7700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <Add1 />
    </div>
  );
}

function ButtonContent8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[15px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">New decision service</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent8 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0" data-name="Actions">
      <Button2 />
    </div>
  );
}

function TitleBlock() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Title Block">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame630413 />
      <Actions1 />
    </div>
  );
}

function AiSpacer() {
  return (
    <div className="relative self-stretch shrink-0 w-[2.798e_-6px]" data-name="AI spacer">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0 64">
        <g id="AI spacer">
          <g id="Spacer" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function Start10() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End10() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer10() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[156px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start10 />
      <End10 />
    </div>
  );
}

function IconMargin() {
  return (
    <div className="h-[18px] relative shrink-0 w-[6.994e_-7px]" data-name="Icon margin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0 18">
        <g id="Icon margin">
          <g id="Spacer" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start min-h-inherit pb-[14px] pl-[16px] pr-[8px] pt-[16px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px]">Name</p>
          <IconMargin />
        </div>
      </div>
    </div>
  );
}

function Col1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative self-stretch shrink-0" data-name="Col 1">
      <Resizer10 />
      <Content1 />
    </div>
  );
}

function Start11() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End11() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer11() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start11 />
      <End11 />
    </div>
  );
}

function IconMargin1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[6.994e_-7px]" data-name="Icon margin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0 18">
        <g id="Icon margin">
          <g id="Spacer" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start min-h-inherit pb-[14px] pl-[16px] pr-[8px] pt-[16px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px]">Status</p>
          <IconMargin1 />
        </div>
      </div>
    </div>
  );
}

function Col2() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Col 2">
      <Resizer11 />
      <Content2 />
    </div>
  );
}

function Start12() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End12() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer12() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start12 />
      <End12 />
    </div>
  );
}

function IconMargin2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[6.994e_-7px]" data-name="Icon margin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0 18">
        <g id="Icon margin">
          <g id="Spacer" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function Content3() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start min-h-inherit pb-[14px] pl-[16px] pr-[8px] pt-[16px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px]">Last edited by</p>
          <IconMargin2 />
        </div>
      </div>
    </div>
  );
}

function Col3() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Col 3">
      <Resizer12 />
      <Content3 />
    </div>
  );
}

function Start13() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End13() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer13() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start13 />
      <End13 />
    </div>
  );
}

function IconMargin3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[6.994e_-7px]" data-name="Icon margin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0 18">
        <g id="Icon margin">
          <g id="Spacer" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function Content4() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start min-h-inherit pb-[14px] pl-[16px] pr-[8px] pt-[16px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[18px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px]">Last edited on</p>
          <IconMargin3 />
        </div>
      </div>
    </div>
  );
}

function Col4() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Col 4">
      <Resizer13 />
      <Content4 />
    </div>
  );
}

function DataTableHeaderRowItem() {
  return (
    <div className="bg-[#e0e0e0] content-stretch flex items-start min-w-[624px] relative shrink-0 w-full z-[7]" data-name="Data table header row item">
      <AiSpacer />
      <Col1 />
      <Col2 />
      <Col3 />
      <Col4 />
    </div>
  );
}

function Start14() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End14() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer14() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start14 />
      <End14 />
    </div>
  );
}

function TextContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-nowrap" data-name="Text content">
      <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-full">Service 5</p>
      <p className="[white-space-collapse:collapse] leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-neutral-600 tracking-[0.32px] w-full">Service type • Draft</p>
    </div>
  );
}

function AiSlugText2Line() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent />
    </div>
  );
}

function Content5() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative self-stretch shrink-0 w-[156px]" data-name="Data table row cell item (CUSTOM)">
      <Resizer14 />
      <Content5 />
    </div>
  );
}

function Start15() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End15() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer15() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start15 />
      <End15 />
    </div>
  );
}

function PendingFilled() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Pending--filled">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <path d={svgPaths.p6cba200} fill="var(--fill-0, #6F6F6F)" id="Vector" />
      </g>
    </svg>
  );
}

function Icon8() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[3px] py-[4px] relative shrink-0 w-[16px]" data-name="Icon">
      {[...Array(2).keys()].map((_, i) => (
        <PendingFilled key={i} />
      ))}
    </div>
  );
}

function IconWrapper8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon wrapper">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-start mix-blend-multiply relative shrink-0" data-name="Icon">
      <IconWrapper8 />
    </div>
  );
}

function ValueMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[172px]" data-name="Value margin">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px] w-full">Not running</p>
    </div>
  );
}

function IconValue1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon +  Value">
      <Icon9 />
      <ValueMargin1 />
    </div>
  );
}

function ServiceStatus() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0 w-[124px]" data-name="Service status">
      <IconValue1 />
    </div>
  );
}

function AiSlugText2Line1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <ServiceStatus />
    </div>
  );
}

function Content6() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line1 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom1() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer15 />
      <Content6 />
    </div>
  );
}

function Start16() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End16() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer16() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start16 />
      <End16 />
    </div>
  );
}

function TextContent1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Dom W.</p>
    </div>
  );
}

function AiSlugText2Line2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent1 />
    </div>
  );
}

function Content7() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line2 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom2() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer16 />
      <Content7 />
    </div>
  );
}

function Start17() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End17() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer17() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start17 />
      <End17 />
    </div>
  );
}

function TextContent2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Mar 30, 2025</p>
    </div>
  );
}

function AiSlugText2Line3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent2 />
    </div>
  );
}

function Content8() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line3 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom3() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer17 />
      <Content8 />
    </div>
  );
}

function DataTableRow() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full z-[3]" data-name="Data table row">
      <DataTableRowCellItemCustom />
      <DataTableRowCellItemCustom1 />
      <DataTableRowCellItemCustom2 />
      <DataTableRowCellItemCustom3 />
    </div>
  );
}

function DataTableBodyRowItem() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col isolate items-start mix-blend-multiply relative shrink-0 w-full" data-name="Data table body row item">
      <DataTableRow />
      <div className="absolute bg-[#c6c6c6] h-px left-0 right-0 top-0 z-[1]" data-name="Divider" />
    </div>
  );
}

function ComponentsDecisionServicesTableRow() {
  return (
    <div className="content-stretch flex flex-col h-[64.001px] items-start min-w-[624px] relative shrink-0 w-full z-[6]" data-name="components / decision services table row">
      <DataTableBodyRowItem />
    </div>
  );
}

function Start18() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End18() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer18() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start18 />
      <End18 />
    </div>
  );
}

function TextContent3() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-nowrap" data-name="Text content">
      <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-full">Service 4</p>
      <p className="[white-space-collapse:collapse] leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-neutral-600 tracking-[0.32px] w-full">Service type • v1.0.0</p>
    </div>
  );
}

function AiSlugText2Line4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent3 />
    </div>
  );
}

function Content9() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line4 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative self-stretch shrink-0 w-[156px]" data-name="Data table row cell item (CUSTOM)">
      <Resizer18 />
      <Content9 />
    </div>
  );
}

function Start19() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End19() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer19() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start19 />
      <End19 />
    </div>
  );
}

function CheckmarkOutline() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Checkmark--outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Checkmark--outline">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p342c1580} fill="#0043CE" />
            <path d={svgPaths.p1195fc00} fill="#0043CE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconWrapper9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon wrapper">
      <CheckmarkOutline />
    </div>
  );
}

function Icon10() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-start mix-blend-multiply relative shrink-0" data-name="Icon">
      <IconWrapper9 />
    </div>
  );
}

function ValueMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[172px]" data-name="Value margin">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px] w-full">Running</p>
    </div>
  );
}

function IconValue2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon +  Value">
      <Icon10 />
      <ValueMargin2 />
    </div>
  );
}

function ServiceStatus1() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0 w-[124px]" data-name="Service status">
      <IconValue2 />
    </div>
  );
}

function AiSlugText2Line5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <ServiceStatus1 />
    </div>
  );
}

function Content10() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line5 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom5() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer19 />
      <Content10 />
    </div>
  );
}

function Start20() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End20() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer20() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start20 />
      <End20 />
    </div>
  );
}

function TextContent4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Mai Chee V.</p>
    </div>
  );
}

function AiSlugText2Line6() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent4 />
    </div>
  );
}

function Content11() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line6 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom6() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer20 />
      <Content11 />
    </div>
  );
}

function Start21() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End21() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer21() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start21 />
      <End21 />
    </div>
  );
}

function TextContent5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Mar 30, 2025</p>
    </div>
  );
}

function AiSlugText2Line7() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent5 />
    </div>
  );
}

function Content12() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line7 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom7() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer21 />
      <Content12 />
    </div>
  );
}

function DataTableRow1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full z-[3]" data-name="Data table row">
      <DataTableRowCellItemCustom4 />
      <DataTableRowCellItemCustom5 />
      <DataTableRowCellItemCustom6 />
      <DataTableRowCellItemCustom7 />
    </div>
  );
}

function DataTableBodyRowItem1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col isolate items-start mix-blend-multiply relative shrink-0 w-full" data-name="Data table body row item">
      <DataTableRow1 />
      <div className="absolute bg-[#c6c6c6] h-px left-0 right-0 top-0 z-[1]" data-name="Divider" />
    </div>
  );
}

function ComponentsDecisionServicesTableRow1() {
  return (
    <div className="content-stretch flex flex-col h-[64.001px] items-start min-w-[624px] relative shrink-0 w-full z-[5]" data-name="components / decision services table row">
      <DataTableBodyRowItem1 />
    </div>
  );
}

function Start22() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End22() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer22() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start22 />
      <End22 />
    </div>
  );
}

function TextContent6() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-nowrap" data-name="Text content">
      <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-full">Service 3</p>
      <p className="[white-space-collapse:collapse] leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-neutral-600 tracking-[0.32px] w-full">Service type • v1.0.0</p>
    </div>
  );
}

function AiSlugText2Line8() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent6 />
    </div>
  );
}

function Content13() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line8 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom8() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative self-stretch shrink-0 w-[156px]" data-name="Data table row cell item (CUSTOM)">
      <Resizer22 />
      <Content13 />
    </div>
  );
}

function Start23() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End23() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer23() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start23 />
      <End23 />
    </div>
  );
}

function CheckmarkOutline1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Checkmark--outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Checkmark--outline">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p342c1580} fill="#0043CE" />
            <path d={svgPaths.p1195fc00} fill="#0043CE" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconWrapper10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon wrapper">
      <CheckmarkOutline1 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-start mix-blend-multiply relative shrink-0" data-name="Icon">
      <IconWrapper10 />
    </div>
  );
}

function ValueMargin3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[172px]" data-name="Value margin">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px] w-full">Running</p>
    </div>
  );
}

function IconValue3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon +  Value">
      <Icon11 />
      <ValueMargin3 />
    </div>
  );
}

function ServiceStatus2() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0 w-[124px]" data-name="Service status">
      <IconValue3 />
    </div>
  );
}

function AiSlugText2Line9() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <ServiceStatus2 />
    </div>
  );
}

function Content14() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line9 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom9() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer23 />
      <Content14 />
    </div>
  );
}

function Start24() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End24() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer24() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start24 />
      <End24 />
    </div>
  );
}

function TextContent7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Dom W.</p>
    </div>
  );
}

function AiSlugText2Line10() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent7 />
    </div>
  );
}

function Content15() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line10 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom10() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer24 />
      <Content15 />
    </div>
  );
}

function Start25() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End25() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer25() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start25 />
      <End25 />
    </div>
  );
}

function TextContent8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Mar 30, 2025</p>
    </div>
  );
}

function AiSlugText2Line11() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent8 />
    </div>
  );
}

function Content16() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line11 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom11() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer25 />
      <Content16 />
    </div>
  );
}

function DataTableRow2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full z-[3]" data-name="Data table row">
      <DataTableRowCellItemCustom8 />
      <DataTableRowCellItemCustom9 />
      <DataTableRowCellItemCustom10 />
      <DataTableRowCellItemCustom11 />
    </div>
  );
}

function DataTableBodyRowItem2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col isolate items-start mix-blend-multiply relative shrink-0 w-full" data-name="Data table body row item">
      <DataTableRow2 />
      <div className="absolute bg-[#c6c6c6] h-px left-0 right-0 top-0 z-[1]" data-name="Divider" />
    </div>
  );
}

function ComponentsDecisionServicesTableRow2() {
  return (
    <div className="content-stretch flex flex-col h-[64.001px] items-start min-w-[624px] relative shrink-0 w-full z-[4]" data-name="components / decision services table row">
      <DataTableBodyRowItem2 />
    </div>
  );
}

function Start26() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End26() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer26() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start26 />
      <End26 />
    </div>
  );
}

function TextContent9() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-nowrap" data-name="Text content">
      <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-full">Service 2</p>
      <p className="[white-space-collapse:collapse] leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-neutral-600 tracking-[0.32px] w-full">Service type • v2.0.0</p>
    </div>
  );
}

function AiSlugText2Line12() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent9 />
    </div>
  );
}

function Content17() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line12 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom12() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative self-stretch shrink-0 w-[156px]" data-name="Data table row cell item (CUSTOM)">
      <Resizer26 />
      <Content17 />
    </div>
  );
}

function Start27() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End27() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer27() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start27 />
      <End27 />
    </div>
  );
}

function WarningAltInvertedFilled() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Warning--alt-inverted--filled">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g id="Vector">
          <path d={svgPaths.p32f22e00} fill="#FF832B" />
          <path d={svgPaths.p192a50b0} fill="#FF832B" />
        </g>
      </g>
    </svg>
  );
}

function Icon12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 size-[16px]" data-name="Icon">
      <div className="absolute bg-black inset-[12.5%_37.5%_37.5%_37.5%]" data-name="Fill" />
      <div className="absolute bg-black inset-[12.5%_37.5%_37.5%_37.5%]" data-name="Fill" />
      {[...Array(2).keys()].map((_, i) => (
        <WarningAltInvertedFilled key={i} />
      ))}
    </div>
  );
}

function IconWrapper11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon wrapper">
      <Icon12 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Icon">
      <IconWrapper11 />
    </div>
  );
}

function ValueMargin4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[172px]" data-name="Value margin">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px] w-full">Service error</p>
    </div>
  );
}

function IconValue4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon +  Value">
      <Icon13 />
      <ValueMargin4 />
    </div>
  );
}

function ServiceStatus3() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0 w-[124px]" data-name="Service status">
      <IconValue4 />
    </div>
  );
}

function AiSlugText2Line13() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <ServiceStatus3 />
    </div>
  );
}

function Content18() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line13 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom13() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer27 />
      <Content18 />
    </div>
  );
}

function Start28() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End28() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer28() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start28 />
      <End28 />
    </div>
  );
}

function TextContent10() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Dom W.</p>
    </div>
  );
}

function AiSlugText2Line14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent10 />
    </div>
  );
}

function Content19() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line14 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom14() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer28 />
      <Content19 />
    </div>
  );
}

function Start29() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End29() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer29() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start29 />
      <End29 />
    </div>
  );
}

function TextContent11() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Mar 23, 2025</p>
    </div>
  );
}

function AiSlugText2Line15() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent11 />
    </div>
  );
}

function Content20() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line15 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom15() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer29 />
      <Content20 />
    </div>
  );
}

function DataTableRow3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full z-[3]" data-name="Data table row">
      <DataTableRowCellItemCustom12 />
      <DataTableRowCellItemCustom13 />
      <DataTableRowCellItemCustom14 />
      <DataTableRowCellItemCustom15 />
    </div>
  );
}

function DataTableBodyRowItem3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col isolate items-start mix-blend-multiply relative shrink-0 w-full" data-name="Data table body row item">
      <DataTableRow3 />
      <div className="absolute bg-[#c6c6c6] h-px left-0 right-0 top-0 z-[1]" data-name="Divider" />
    </div>
  );
}

function ComponentsDecisionServicesTableRow3() {
  return (
    <div className="content-stretch flex flex-col h-[64.001px] items-start min-w-[624px] relative shrink-0 w-full z-[3]" data-name="components / decision services table row">
      <DataTableBodyRowItem3 />
    </div>
  );
}

function Start30() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End30() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer30() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start30 />
      <End30 />
    </div>
  );
}

function TextContent12() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-nowrap" data-name="Text content">
      <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-full">Service 1</p>
      <p className="[white-space-collapse:collapse] leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-neutral-600 tracking-[0.32px] w-full">Service type • v1.0.0</p>
    </div>
  );
}

function AiSlugText2Line16() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent12 />
    </div>
  );
}

function Content21() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line16 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom16() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply relative self-stretch shrink-0 w-[156px]" data-name="Data table row cell item (CUSTOM)">
      <Resizer30 />
      <Content21 />
    </div>
  );
}

function Start31() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End31() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer31() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start31 />
      <End31 />
    </div>
  );
}

function PendingFilled2() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <g id="Pending--filled">
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <path d={svgPaths.p6cba200} fill="var(--fill-0, #6F6F6F)" id="Vector" />
      </g>
    </svg>
  );
}

function Icon14() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[3px] py-[4px] relative shrink-0 w-[16px]" data-name="Icon">
      {[...Array(2).keys()].map((_, i) => (
        <PendingFilled2 key={i} />
      ))}
    </div>
  );
}

function IconWrapper12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon wrapper">
      <Icon14 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-start mix-blend-multiply relative shrink-0" data-name="Icon">
      <IconWrapper12 />
    </div>
  );
}

function ValueMargin5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[172px]" data-name="Value margin">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px] w-full">Not running</p>
    </div>
  );
}

function IconValue5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon +  Value">
      <Icon15 />
      <ValueMargin5 />
    </div>
  );
}

function ServiceStatus4() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0 w-[124px]" data-name="Service status">
      <IconValue5 />
    </div>
  );
}

function AiSlugText2Line17() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <ServiceStatus4 />
    </div>
  );
}

function Content22() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line17 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom17() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer31 />
      <Content22 />
    </div>
  );
}

function Start32() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End32() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer32() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start32 />
      <End32 />
    </div>
  );
}

function TextContent13() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Mai Chee V.</p>
    </div>
  );
}

function AiSlugText2Line18() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent13 />
    </div>
  );
}

function Content23() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line18 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom18() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer32 />
      <Content23 />
    </div>
  );
}

function Start33() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End33() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer33() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[160px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start33 />
      <End33 />
    </div>
  );
}

function TextContent14() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text content">
      <p className="[white-space-collapse:collapse] font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-nowrap tracking-[0.16px] w-full">Apr 1, 2025</p>
    </div>
  );
}

function AiSlugText2Line19() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="AI slug + Text 2 line">
      <TextContent14 />
    </div>
  );
}

function Content24() {
  return (
    <div className="min-h-[64px] relative shrink-0 w-full" data-name="Content">
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-h-inherit pb-[14px] pt-[16px] px-[16px] relative w-full">
          <AiSlugText2Line19 />
        </div>
      </div>
    </div>
  );
}

function DataTableRowCellItemCustom19() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col grow items-start min-h-px min-w-px mix-blend-multiply relative self-stretch shrink-0" data-name="Data table row cell item (CUSTOM)">
      <Resizer33 />
      <Content24 />
    </div>
  );
}

function DataTableRow4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full z-[3]" data-name="Data table row">
      <DataTableRowCellItemCustom16 />
      <DataTableRowCellItemCustom17 />
      <DataTableRowCellItemCustom18 />
      <DataTableRowCellItemCustom19 />
    </div>
  );
}

function DataTableBodyRowItem4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col isolate items-start mix-blend-multiply relative shrink-0 w-full" data-name="Data table body row item">
      <DataTableRow4 />
      <div className="absolute bg-[#c6c6c6] h-px left-0 right-0 top-0 z-[1]" data-name="Divider" />
    </div>
  );
}

function ComponentsDecisionServicesTableRow4() {
  return (
    <div className="content-stretch flex flex-col h-[64.001px] items-start min-w-[624px] relative shrink-0 w-full z-[2]" data-name="components / decision services table row">
      <DataTableBodyRowItem4 />
    </div>
  );
}

function DataTable() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col isolate items-start overflow-x-auto overflow-y-clip relative shrink-0 w-full" data-name="Data table">
      <DataTableHeaderRowItem />
      <ComponentsDecisionServicesTableRow />
      <ComponentsDecisionServicesTableRow1 />
      <ComponentsDecisionServicesTableRow2 />
      <ComponentsDecisionServicesTableRow3 />
      <ComponentsDecisionServicesTableRow4 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f4f4f4] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">View all</p>
        </div>
      </div>
    </div>
  );
}

function ProjectServicesTile() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_7] content-stretch flex flex-col h-[480px] items-start relative shrink-0" data-name="Project services tile">
      <TitleBlock />
      <DataTable />
      <Footer />
    </div>
  );
}

function Frame630414() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center pl-[16px] pr-0 py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-nowrap whitespace-pre">Dashboards</p>
        </div>
      </div>
    </div>
  );
}

function Add2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Add">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p349d7700} fill="var(--fill-0, #161616)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon16() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <Add2 />
    </div>
  );
}

function ButtonContent9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex isolate items-center p-[16px] relative w-full">
          <Icon16 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip relative shrink-0" data-name="Button">
      <ButtonContent9 />
    </div>
  );
}

function Actions2() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0" data-name="Actions">
      <Button3 />
    </div>
  );
}

function TitleBlock1() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Title Block">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame630414 />
      <Actions2 />
    </div>
  );
}

function Row() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Row">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start leading-[20px] not-italic px-[16px] py-[10px] relative text-[14px] tracking-[0.16px] w-full">
          <p className="relative shrink-0 text-[#161616] w-full">Dashboard 1</p>
          <p className="relative shrink-0 text-neutral-600 w-full">secondary line</p>
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Row">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start leading-[20px] not-italic px-[16px] py-[10px] relative text-[14px] tracking-[0.16px] w-full">
          <p className="relative shrink-0 text-[#161616] w-full">Dashboard 2</p>
          <p className="relative shrink-0 text-neutral-600 w-full">secondary line</p>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Row">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start leading-[20px] not-italic px-[16px] py-[10px] relative text-[14px] tracking-[0.16px] w-full">
          <p className="relative shrink-0 text-[#161616] w-full">Fire prediction 2023</p>
          <p className="relative shrink-0 text-neutral-600 w-full">secondary line</p>
        </div>
      </div>
    </div>
  );
}

function TileFooter() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Tile - Footer">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">View all</p>
        </div>
      </div>
    </div>
  );
}

function Dashboards() {
  return (
    <div className="[grid-area:1_/_8_/_auto_/_span_5] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="Dashboards">
      <TitleBlock1 />
      <Row />
      {[...Array(3).keys()].map((_, i) => (
        <Row1 key={i} />
      ))}
      {[...Array(2).keys()].map((_, i) => (
        <Row4 key={i} />
      ))}
      <TileFooter />
    </div>
  );
}

function GridContainer() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[480px] relative shrink-0 w-full" data-name="grid container">
      <ProjectServicesTile />
      <Dashboards />
    </div>
  );
}

function HomePageProjectSectionProjectInfo() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Home page • Project section -> Project info">
      <GridContainer />
    </div>
  );
}

function ProjectRow() {
  return (
    <div className="bg-[#e8e8e8] relative shrink-0 w-full" data-name="Project row">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start pb-[64px] pt-0 px-[32px] relative w-full">
          <ComponentsSectionTitleGroup1 />
          <HomePageProjectSectionProjectInfo />
        </div>
      </div>
    </div>
  );
}

function Frame630850() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[8px] items-start not-italic relative shrink-0 w-full">
      <p className="-webkit-box css-okh5f0 leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-full">Explore</p>
      <p className="-webkit-box css-idt30j leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px] w-full">Explore what’s new and get to know IBM Decision Intelligence</p>
    </div>
  );
}

function ComponentsSectionTitleGroup4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start max-w-[288px] min-w-[224px] overflow-clip relative shrink-0 w-[224px]" data-name="components / Section title group">
      <Frame630850 />
    </div>
  );
}

function Start82() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End82() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer82() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[372px] h-[440.002px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start82 />
      <End82 />
    </div>
  );
}

function Frame630419() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center pl-[16px] pr-0 py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-nowrap whitespace-pre">Resource hub</p>
        </div>
      </div>
    </div>
  );
}

function TileTitleBlock() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Tile - Title block">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame630419 />
    </div>
  );
}

function Model() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Model">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Model">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p25b14380} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630810() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Model />
      <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px]">Explore the Decision assistant</p>
    </div>
  );
}

function Frame630811() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center pl-[24px] pr-0 py-0 relative w-full">
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px]">Learn how the new decision assistant can help you build decision services directly from policies and guidelines.</p>
        </div>
      </div>
    </div>
  );
}

function ArrowRight9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Link">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Learn more</p>
      <ArrowRight9 />
    </div>
  );
}

function Frame630812() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[24px] pr-0 py-0 relative shrink-0 w-[197px]">
      <Link />
    </div>
  );
}

function Frame630814() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame630811 />
      <Frame630812 />
    </div>
  );
}

function Row18() {
  return (
    <div className="basis-0 grow min-h-px min-w-[304px] relative shrink-0" data-name="Row">
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start min-w-inherit pb-[8px] pt-[24px] px-[16px] relative w-full">
          <Frame630810 />
          <Frame630814 />
        </div>
      </div>
    </div>
  );
}

function DataSet() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Data--set">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Data--set">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.pcd98180} fill="var(--fill-0, #525252)" />
            <path d={svgPaths.pb4bd8f1} fill="var(--fill-0, #525252)" />
            <path d={svgPaths.p3441d880} fill="var(--fill-0, #525252)" />
            <path d={svgPaths.p9e6b280} fill="var(--fill-0, #525252)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowRight10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630815() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative w-full">
          <DataSet />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px]">Data</p>
          <ArrowRight10 />
        </div>
      </div>
    </div>
  );
}

function Row19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Row">
      <Frame630815 />
    </div>
  );
}

function Folder() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Folder">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Folder">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p3c31b300} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowRight11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630816() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative w-full">
          <Folder />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px]">Automation projects</p>
          <ArrowRight11 />
        </div>
      </div>
    </div>
  );
}

function Row20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Row">
      <Frame630816 />
    </div>
  );
}

function Microservices2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Microservices--2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Microservices--2">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p109b9980} fill="var(--fill-0, #525252)" />
            <path d={svgPaths.p29517c0} fill="var(--fill-0, #525252)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowRight12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630817() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative w-full">
          <Microservices2 />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px]">Decision services</p>
          <ArrowRight12 />
        </div>
      </div>
    </div>
  );
}

function Row21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Row">
      <Frame630817 />
    </div>
  );
}

function DashboardReference() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Dashboard--reference">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Dashboard--reference">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p14188000} fill="#525252" />
            <path d="M13 10.5H12V13H13V10.5Z" fill="#525252" />
            <path d="M11 8H10V13H11V8Z" fill="#525252" />
            <path d="M9 9H8V13H9V9Z" fill="#525252" />
            <path d={svgPaths.p2607fe00} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowRight13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630818() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative w-full">
          <DashboardReference />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px]">Deploy and monitor</p>
          <ArrowRight13 />
        </div>
      </div>
    </div>
  );
}

function Row22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Row">
      <Frame630818 />
    </div>
  );
}

function Notebook() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Notebook">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Notebook">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d="M13 5H9.5V6H13V5Z" fill="#525252" />
            <path d="M13 7.5H9.5V8.5H13V7.5Z" fill="#525252" />
            <path d="M13 10H9.5V11H13V10Z" fill="#525252" />
            <path d={svgPaths.p3eff100} fill="#525252" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowRight14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630819() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative w-full">
          <Notebook />
          <p className="basis-0 font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-neutral-600 tracking-[0.16px]">Sample prompts</p>
          <ArrowRight14 />
        </div>
      </div>
    </div>
  );
}

function Row23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Row">
      <Frame630819 />
    </div>
  );
}

function Frame630840() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-[304px] pb-[8px] pt-[16px] px-0 relative shrink-0">
      <Row19 />
      <Row20 />
      <Row21 />
      <Row22 />
      <Row23 />
    </div>
  );
}

function Frame630813() {
  return (
    <div className="bg-white content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full">
      <Row18 />
      <Frame630840 />
    </div>
  );
}

function ResourceHub() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_7] bg-white content-stretch flex flex-col items-start relative self-start shrink-0" data-name="Resource Hub">
      <TileTitleBlock />
      <Frame630813 />
    </div>
  );
}

function Frame630420() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center pl-[16px] pr-0 py-[12px] relative w-full">
          <p className="basis-0 font-['IBM_Plex_Sans:SemiBold',_sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#161616] text-[16px]">What’s new</p>
        </div>
      </div>
    </div>
  );
}

function TitleBlock6() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-start min-w-[304px] relative shrink-0 w-full" data-name="Title Block">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame630420 />
    </div>
  );
}

function Frame630934() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[14px] tracking-[0.16px] w-full">
      <p className="relative shrink-0 text-[#161616] w-full">Context aware decision assistant</p>
      <p className="-webkit-box css-cv4fy overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">Work within with the decision assistant directly in your decision automations</p>
    </div>
  );
}

function ArrowRight15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630958() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="-webkit-box basis-0 css-56v5it font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[16px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#6f6f6f] text-[12px] tracking-[0.32px]">June 23, 2025</p>
      <ArrowRight15 />
    </div>
  );
}

function Row24() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[10px] relative w-full">
          <Frame630934 />
          <Frame630958 />
        </div>
      </div>
    </div>
  );
}

function Frame630935() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[14px] tracking-[0.16px] w-full">
      <p className="relative shrink-0 text-[#161616] w-full">AI assisted decision modeling</p>
      <p className="-webkit-box css-cv4fy overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">Generate decision models and assets from your business rules with decision assistant</p>
    </div>
  );
}

function ArrowRight16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630959() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="-webkit-box basis-0 css-56v5it font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[16px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#6f6f6f] text-[12px] tracking-[0.32px]">June 23, 2025</p>
      <ArrowRight16 />
    </div>
  );
}

function Row25() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[10px] relative w-full">
          <Frame630935 />
          <Frame630959 />
        </div>
      </div>
    </div>
  );
}

function Frame630936() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[14px] tracking-[0.16px] w-full">
      <p className="relative shrink-0 text-[#161616] w-full">Introducing Decision Intelligence</p>
      <p className="-webkit-box css-cv4fy overflow-ellipsis overflow-hidden relative shrink-0 text-neutral-600 w-full">Decision intelligence is IBM’s next generation tool for automating decision making.</p>
    </div>
  );
}

function ArrowRight17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Arrow--right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow--right">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.pfec3600} fill="var(--fill-0, #525252)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame630960() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="-webkit-box basis-0 css-56v5it font-['IBM_Plex_Sans:Regular',_sans-serif] grow leading-[16px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#6f6f6f] text-[12px] tracking-[0.32px]">June 23, 2025</p>
      <ArrowRight17 />
    </div>
  );
}

function Row26() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Row">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[10px] relative w-full">
          <Frame630936 />
          <Frame630960 />
        </div>
      </div>
    </div>
  );
}

function WhatsNew() {
  return (
    <div className="[grid-area:1_/_8_/_auto_/_span_5] content-stretch flex flex-col items-start relative self-start shrink-0" data-name="What\'s new">
      <TitleBlock6 />
      <Row24 />
      <Row25 />
      <Row26 />
    </div>
  );
}

function GridContainer3() {
  return (
    <div className="basis-0 gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] grow min-h-px min-w-px overflow-clip relative self-stretch shrink-0" data-name="grid container">
      <ResourceHub />
      <WhatsNew />
    </div>
  );
}

function HomePageRecentProjectsProjectGrid4X2() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="Home page • Recent Projects -> Project grid (4x2)">
      <Resizer82 />
      <GridContainer3 />
    </div>
  );
}

function ExploreRow() {
  return (
    <div className="bg-[#e8e8e8] relative shrink-0 w-full" data-name="Explore row">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start pb-[64px] pt-0 px-[32px] relative w-full">
          <ComponentsSectionTitleGroup4 />
          <HomePageRecentProjectsProjectGrid4X2 />
        </div>
      </div>
    </div>
  );
}

function AppContentSection() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="app content section">
      <DecisionAutomationProjectsRow />
      {[...Array(3).keys()].map((_, i) => (
        <ProjectRow key={i} />
      ))}
      <ExploreRow />
    </div>
  );
}

function AppContent() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[1]" data-name="App Content">
      <HomePageHeader />
      <AppContentSection />
    </div>
  );
}

function UserInterface() {
  return (
    <div className="content-stretch flex flex-col isolate items-start overflow-clip relative shrink-0 w-full" data-name="User Interface">
      <GlobalHeader />
      <AppContent />
    </div>
  );
}

function DiUiTemplateL1Closed() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-[1056px] z-[1]" data-name="DI UI Template • L1 closed">
      <UserInterface />
    </div>
  );
}

export default function DesignAnnotations() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] isolate items-start relative size-full" data-name="Design Annotations">
      <SpecDocumentation />
      <DiUiTemplateL1Closed />
    </div>
  );
}