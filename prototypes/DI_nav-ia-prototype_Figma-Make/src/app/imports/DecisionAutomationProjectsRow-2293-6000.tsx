import svgPaths from "./svg-trb2nz0t4v";

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
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start max-w-[288px] min-h-px min-w-[224px] overflow-clip relative shrink-0" data-name="components / Section title group">
      <Frame630846 />
    </div>
  );
}

function ButtonContent() {
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
      <ButtonContent />
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

function Icon() {
  return (
    <div className="absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 translate-y-[-50%] z-[1]" data-name="Icon">
      <Add />
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre z-[3]">New decision automation</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function NewDecisionProjectButton() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start mix-blend-multiply overflow-clip right-0 top-0" data-name="New decision project button">
      <ButtonContent1 />
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

function Start() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[351px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start />
      <End />
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

function ArrowRight() {
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
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}

function HomePageComponentsAssetTile() {
  return (
    <div className="[grid-area:2_/_1_/_auto_/_span_3] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
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

function SecondaryContent1() {
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

function HomePageComponentsAssetTile1() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_3] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
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

function SecondaryContent2() {
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

function HomePageComponentsAssetTile2() {
  return (
    <div className="[grid-area:1_/_10_/_auto_/_span_3] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
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

function SecondaryContent3() {
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

function HomePageComponentsAssetTile3() {
  return (
    <div className="[grid-area:2_/_10_/_auto_/_span_3] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
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

function SecondaryContent4() {
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

function HomePageComponentsAssetTile4() {
  return (
    <div className="[grid-area:1_/_7_/_auto_/_span_3] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
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

function SecondaryContent5() {
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

function HomePageComponentsAssetTile5() {
  return (
    <div className="[grid-area:2_/_7_/_auto_/_span_3] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
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

function SecondaryContent6() {
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

function HomePageComponentsAssetTile6() {
  return (
    <div className="[grid-area:1_/_4_/_auto_/_span_3] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
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

function SecondaryContent7() {
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

function HomePageComponentsAssetTile7() {
  return (
    <div className="[grid-area:2_/_4_/_auto_/_span_3] bg-[#f4f4f4] h-[168.001px] max-h-[168.001px] min-h-[168.001px] relative shrink-0" data-name="Home page components / asset tile">
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
    <div className="basis-0 gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[168px_168px] grow min-h-px min-w-px overflow-clip relative self-stretch shrink-0" data-name="decision projects list">
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
      <Resizer />
      <DecisionProjectsList />
    </div>
  );
}

function HomePageRecentProjectsProjectGrid() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-[752px] relative shrink-0" data-name="Home page • Recent Projects -> Project grid">
      <SectionActions />
      <SectionContentWrapper />
    </div>
  );
}

export default function DecisionAutomationProjectsRow() {
  return (
    <div className="bg-[#e8e8e8] relative size-full" data-name="Decision automation projects row">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start px-[32px] py-[64px] relative size-full">
          <ComponentsSectionTitleGroup />
          <HomePageRecentProjectsProjectGrid />
        </div>
      </div>
    </div>
  );
}