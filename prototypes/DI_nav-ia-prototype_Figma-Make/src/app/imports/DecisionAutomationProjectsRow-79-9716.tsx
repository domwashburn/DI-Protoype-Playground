import svgPaths from "./svg-apb31o64o4";

function Frame() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start not-italic relative shrink-0 text-ellipsis w-full">
      <p className="leading-[28px] overflow-hidden relative shrink-0 text-[#161616] text-[20px] w-full">Recent decision automations</p>
      <p className="leading-[18px] overflow-hidden relative shrink-0 text-[#525252] text-[14px] tracking-[0.16px] w-full">Open decision automations that you created, modified, or viewed</p>
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] tracking-[0.16px] whitespace-nowrap z-[3]">{`View all `}</p>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start overflow-clip right-[16px] top-1/2 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Add">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-1/4" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p22ea8600} fill="var(--fill-0, #0F62FE)" id="Vector" />
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
        <div className="content-stretch flex gap-[8px] isolate items-center px-[16px] py-[7px] relative w-full">
          <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] tracking-[0.16px] whitespace-nowrap z-[3]">New decision project</p>
          <div className="shrink-0 size-[16px] z-[2]" data-name="Icon spacer" />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function SectionActions() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Section actions">
      <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip top-0" data-name="View all button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent />
      </div>
      <div className="absolute content-stretch flex flex-col items-start overflow-clip right-0 top-0" data-name="New decision project button">
        <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent1 />
      </div>
    </div>
  );
}

function PrimaryContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-ellipsis w-full z-[3]" data-name="Primary content">
      <p className="overflow-hidden relative shrink-0 text-[#161616] w-full whitespace-nowrap">{`{Decision automation name}`}</p>
      <p className="flex-[1_0_0] min-h-px min-w-px overflow-hidden relative text-[#525252] w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function SecondaryContent() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[32px] relative size-full">
          <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">99+ decision services</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-[calc(50%+0.5px)]" data-name="Arrow--right">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
                <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #525252)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-ellipsis w-full z-[3]" data-name="Primary content">
      <p className="overflow-hidden relative shrink-0 text-[#161616] w-full whitespace-nowrap">{`{Decision automation name}`}</p>
      <p className="flex-[1_0_0] min-h-px min-w-px overflow-hidden relative text-[#525252] w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function SecondaryContent1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[32px] relative size-full">
          <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">99+ decision services</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-[calc(50%+0.5px)]" data-name="Arrow--right">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
                <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #525252)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryContent2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-ellipsis w-full z-[3]" data-name="Primary content">
      <p className="overflow-hidden relative shrink-0 text-[#161616] w-full whitespace-nowrap">{`{Decision automation name}`}</p>
      <p className="flex-[1_0_0] min-h-px min-w-px overflow-hidden relative text-[#525252] w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function SecondaryContent2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[32px] relative size-full">
          <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">99+ decision services</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-[calc(50%+0.5px)]" data-name="Arrow--right">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
                <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #525252)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryContent3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-ellipsis w-full z-[3]" data-name="Primary content">
      <p className="overflow-hidden relative shrink-0 text-[#161616] w-full whitespace-nowrap">{`{Decision automation name}`}</p>
      <p className="flex-[1_0_0] min-h-px min-w-px overflow-hidden relative text-[#525252] w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function SecondaryContent3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[32px] relative size-full">
          <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">99+ decision services</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-[calc(50%+0.5px)]" data-name="Arrow--right">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
                <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #525252)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryContent4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-ellipsis w-full z-[3]" data-name="Primary content">
      <p className="overflow-hidden relative shrink-0 text-[#161616] w-full whitespace-nowrap">{`{Decision automation name}`}</p>
      <p className="flex-[1_0_0] min-h-px min-w-px overflow-hidden relative text-[#525252] w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function SecondaryContent4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[32px] relative size-full">
          <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">99+ decision services</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-[calc(50%+0.5px)]" data-name="Arrow--right">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
                <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #525252)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryContent5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-ellipsis w-full z-[3]" data-name="Primary content">
      <p className="overflow-hidden relative shrink-0 text-[#161616] w-full whitespace-nowrap">{`{Decision automation name}`}</p>
      <p className="flex-[1_0_0] min-h-px min-w-px overflow-hidden relative text-[#525252] w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function SecondaryContent5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[32px] relative size-full">
          <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">99+ decision services</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-[calc(50%+0.5px)]" data-name="Arrow--right">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
                <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #525252)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryContent6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-ellipsis w-full z-[3]" data-name="Primary content">
      <p className="overflow-hidden relative shrink-0 text-[#161616] w-full whitespace-nowrap">{`{Decision automation name}`}</p>
      <p className="flex-[1_0_0] min-h-px min-w-px overflow-hidden relative text-[#525252] w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function SecondaryContent6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[32px] relative size-full">
          <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">99+ decision services</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-[calc(50%+0.5px)]" data-name="Arrow--right">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
                <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #525252)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryContent7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-ellipsis w-full z-[3]" data-name="Primary content">
      <p className="overflow-hidden relative shrink-0 text-[#161616] w-full whitespace-nowrap">{`{Decision automation name}`}</p>
      <p className="flex-[1_0_0] min-h-px min-w-px overflow-hidden relative text-[#525252] w-full">a short description of this decision automation. This tile supports a maximum of three lines of text before it truncates.</p>
    </div>
  );
}

function SecondaryContent7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full z-[2]" data-name="Secondary content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[32px] relative size-full">
          <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#525252] text-[14px] text-ellipsis tracking-[0.16px] whitespace-nowrap">99+ decision services</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-[calc(50%+0.5px)]" data-name="Arrow--right">
            <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
                <path d={svgPaths.p2cb8b080} fill="var(--fill-0, #525252)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DecisionProjectsList() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[320px]" data-name="decision projects list">
      <div className="bg-[#f4f4f4] h-[168.001px] max-h-[168.00100708007812px] min-h-[168.00100708007812px] relative shrink-0 w-full" data-name="Project Tile 08">
        <div className="max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-h-[inherit] min-h-[inherit] p-[16px] relative size-full">
            <PrimaryContent />
            <SecondaryContent />
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] h-[168.001px] max-h-[168.00100708007812px] min-h-[168.00100708007812px] relative shrink-0 w-full" data-name="Project Tile 07">
        <div className="max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-h-[inherit] min-h-[inherit] p-[16px] relative size-full">
            <PrimaryContent1 />
            <SecondaryContent1 />
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] h-[168.001px] max-h-[168.00100708007812px] min-h-[168.00100708007812px] relative shrink-0 w-full" data-name="Project Tile 06">
        <div className="max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-h-[inherit] min-h-[inherit] p-[16px] relative size-full">
            <PrimaryContent2 />
            <SecondaryContent2 />
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] h-[168.001px] max-h-[168.00100708007812px] min-h-[168.00100708007812px] relative shrink-0 w-full" data-name="Project Tile 05">
        <div className="max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-h-[inherit] min-h-[inherit] p-[16px] relative size-full">
            <PrimaryContent3 />
            <SecondaryContent3 />
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] h-[168.001px] max-h-[168.00100708007812px] min-h-[168.00100708007812px] relative shrink-0 w-full" data-name="Project Tile 04">
        <div className="max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-h-[inherit] min-h-[inherit] p-[16px] relative size-full">
            <PrimaryContent4 />
            <SecondaryContent4 />
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] h-[168.001px] max-h-[168.00100708007812px] min-h-[168.00100708007812px] relative shrink-0 w-full" data-name="Project Tile 03">
        <div className="max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-h-[inherit] min-h-[inherit] p-[16px] relative size-full">
            <PrimaryContent5 />
            <SecondaryContent5 />
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] h-[168.001px] max-h-[168.00100708007812px] min-h-[168.00100708007812px] relative shrink-0 w-full" data-name="Project Tile 02">
        <div className="max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-h-[inherit] min-h-[inherit] p-[16px] relative size-full">
            <PrimaryContent6 />
            <SecondaryContent6 />
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] h-[168.001px] max-h-[168.00100708007812px] min-h-[168.00100708007812px] relative shrink-0 w-full" data-name="Project Tile 01">
        <div className="max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-h-[inherit] min-h-[inherit] p-[16px] relative size-full">
            <PrimaryContent7 />
            <SecondaryContent7 />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePageRecentProjectsProjectGridSingleColumn() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Home page • Recent Projects -> Project grid (single column)">
      <SectionActions />
      <DecisionProjectsList />
    </div>
  );
}

export default function DecisionAutomationProjectsRow() {
  return (
    <div className="bg-[#e8e8e8] content-stretch flex flex-col gap-[16px] items-start py-[64px] relative size-full" data-name="Decision automation projects row">
      <div className="max-w-[320px] min-w-[224px] relative shrink-0 w-full" data-name="components / Section title group">
        <div className="max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start max-w-[inherit] min-w-[inherit] px-[16px] relative w-full">
            <Frame />
          </div>
        </div>
      </div>
      <HomePageRecentProjectsProjectGridSingleColumn />
    </div>
  );
}