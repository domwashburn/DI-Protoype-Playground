import svgPaths from "./svg-nrmb5cgaab";
type PanelBaseComponentsLinkListProps = {
  className?: string;
  style?: "Standard" | "Contained";
};

function PanelBaseComponentsLinkList({ className, style = "Standard" }: PanelBaseComponentsLinkListProps) {
  const isContained = style === "Contained";
  return (
    <div className={className || `content-stretch flex flex-col gap-px items-start relative w-[288px] ${isContained ? "" : "isolate"}`}>
      <div className={`h-[64px] relative shrink-0 w-full ${isContained ? "" : "z-[11]"}`} data-name="Panel Base Components / Link List Item">
        <div aria-hidden="true" className={`absolute inset-0 mix-blend-multiply pointer-events-none ${isContained ? "bg-[#f4f4f4]" : "bg-[rgba(255,255,255,0)]"}`} />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-h-px min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
            <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full">Link text</p>
            <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-full">Link description</p>
          </div>
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
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
        </div>
      </div>
      <div className={`h-[64px] relative shrink-0 w-full ${isContained ? "" : "z-[10]"}`} data-name="Panel Base Components / Link List Item">
        <div aria-hidden="true" className={`absolute inset-0 mix-blend-multiply pointer-events-none ${isContained ? "bg-[#f4f4f4]" : "bg-[rgba(255,255,255,0)]"}`} />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-h-px min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
            <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full">Link text</p>
            <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-full">Link description</p>
          </div>
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
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
        </div>
      </div>
      <div className={`h-[64px] relative shrink-0 w-full ${isContained ? "" : "z-[9]"}`} data-name="Panel Base Components / Link List Item">
        <div aria-hidden="true" className={`absolute inset-0 mix-blend-multiply pointer-events-none ${isContained ? "bg-[#f4f4f4]" : "bg-[rgba(255,255,255,0)]"}`} />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-h-px min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
            <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full">Link text</p>
            <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-full">Link description</p>
          </div>
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
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
        </div>
      </div>
      <div className={`h-[64px] relative shrink-0 w-full ${isContained ? "" : "z-[8]"}`} data-name="Panel Base Components / Link List Item">
        <div aria-hidden="true" className={`absolute inset-0 mix-blend-multiply pointer-events-none ${isContained ? "bg-[#f4f4f4]" : "bg-[rgba(255,255,255,0)]"}`} />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-h-px min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
            <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full">Link text</p>
            <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-full">Link description</p>
          </div>
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
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
        </div>
      </div>
      <div className={`h-[64px] relative shrink-0 w-full ${isContained ? "" : "z-[7]"}`} data-name="Panel Base Components / Link List Item">
        <div aria-hidden="true" className={`absolute inset-0 mix-blend-multiply pointer-events-none ${isContained ? "bg-[#f4f4f4]" : "bg-[rgba(255,255,255,0)]"}`} />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[14px] relative size-full">
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="left icon wrapper">
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
          <div className="content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] items-start min-h-px min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Content">
            <p className="leading-[20px] overflow-hidden relative shrink-0 text-[#161616] text-[14px] text-ellipsis tracking-[0.16px] w-full">Link text</p>
            <p className="h-[24.594px] leading-[16px] overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] w-full">Link description</p>
          </div>
          <div className="content-stretch flex h-[15px] items-center justify-center py-[2px] relative shrink-0" data-name="right icon wrapper">
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
        </div>
      </div>
    </div>
  );
}

function PanelBaseComponentsSectionTitle({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white content-stretch flex isolate items-center relative w-[222px]"} data-name="Panel Base Components / Section title">
      <div className="flex-[1_0_0] min-h-px min-w-px relative z-[2]" data-name="Left content wrapper">
        <div className="content-stretch flex items-start px-[16px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[5px] items-start min-h-px min-w-px relative" data-name="Section title wrapper">
            <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#525252] text-[12px] text-ellipsis tracking-[0.32px] whitespace-nowrap">Relevant tours</p>
            <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Section title tooltip">
              <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Trigger">
                <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-[6.25%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Vector">
                      <path d={svgPaths.p254be180} fill="#525252" />
                      <path d={svgPaths.pb278600} fill="#525252" />
                      <path d={svgPaths.p178f400} fill="#525252" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start overflow-clip pl-[8px] pr-[16px] relative shrink-0 z-[1]" data-name="Right content wrapper">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Link">
          <div aria-hidden="true" className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0f62fe] text-[12px] tracking-[0.32px] whitespace-nowrap">View all</p>
        </div>
      </div>
    </div>
  );
}

export default function PanelModulesList({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col isolate items-start min-w-[320px] relative w-[320px]"} data-name="Panel Modules / List">
      <PanelBaseComponentsSectionTitle className="bg-white content-stretch flex h-[32px] isolate items-center shrink-0 sticky top-0 w-full z-[2]" />
      <div className="relative shrink-0 w-full z-[1]">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[16px] relative size-full">
            <PanelBaseComponentsLinkList className="content-stretch flex flex-[1_0_0] flex-col gap-px isolate items-start min-h-px min-w-px relative" />
          </div>
        </div>
      </div>
    </div>
  );
}