import svgPaths from "./svg-2v787o9e6u";
import { imgVector } from "./svg-bg3c6";

function Container() {
  return <div className="absolute bg-white h-[48px] left-0 top-0 w-[1813px]" data-name="Container" />;
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[1717px_48px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1717 48">
          <path clipRule="evenodd" d="M0 0H1717V48H0V0Z" fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[48px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 top-0 w-[1717px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.14%_9.38%_9.38%_6.14%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path clipRule="evenodd" d={svgPaths.p37139bc0} fill="var(--fill-0, #6F6F6F)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[16px] top-[16px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-[48px] overflow-clip top-[15px] w-[1621px]" data-name="Text Input">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#a8a8a8] text-[14px] text-nowrap tracking-[0.16px] whitespace-pre">Search models</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[48px] left-[48px] top-0 w-[1717px]" data-name="Container">
      <Container1 />
      <Container2 />
      <TextInput />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-[#e0e0e0] h-[24px] left-[48px] top-[12px] w-px" data-name="Container" />;
}

function Icon2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path d={svgPaths.p1b875e80} fill="var(--fill-0, #161616)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[48px] top-0" data-name="Button">
      <Container5 />
    </div>
  );
}

function SearchSection() {
  return (
    <div className="absolute h-[48px] left-0 top-[24px] w-[1813px]" data-name="SearchSection">
      <Container />
      <Container3 />
      <Container4 />
      <Button />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center left-0 px-[12px] py-0 rounded-[2px] top-0 w-[99.336px]" data-name="Button2">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] text-nowrap whitespace-pre">Reset filters</p>
    </div>
  );
}

function ResultsHeader() {
  return (
    <div className="absolute h-[21px] left-0 top-[32px] w-[1765px]" data-name="ResultsHeader">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[139px]">Showing 50 resources</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[53px] left-0 top-0 w-[1765px]" data-name="Container">
      <Button2 />
      <ResultsHeader />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">Decision Automations</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">End-to-end automated decision processes for business workflows</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Paragraph />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Invoice Processing Decision Automation</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[266px]">End-to-end automation for invoice processing including validation, approval workflows, and payment scheduling. Integrates with ERP systems and supports exception handling.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container10 />
        <Heading4 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[116.969px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Invoice Processing</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[124.97px] rounded-[12px] top-0 w-[132.852px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Workflow Automation</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[124.953px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Payment Processing</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container14 />
        <Container18 />
      </div>
    </div>
  );
}

function ResourceCard() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container11 />
      <Container19 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container20 />
        <Container21 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Customer Onboarding Decision Automation</p>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[278px]">Automated customer onboarding process including identity verification, risk assessment, and account setup. Supports regulatory compliance and fraud prevention.</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container22 />
        <Heading5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[134.062px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Customer Onboarding</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[142.06px] rounded-[12px] top-0 w-[122.289px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Identity Verification</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[79.648px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Compliance</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container26 />
        <Container30 />
      </div>
    </div>
  );
}

function ResourceCard1() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container23 />
      <Container31 />
    </div>
  );
}

function ResourceGrid() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[320px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard />
          <ResourceCard1 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[391px] items-start left-0 top-[53px] w-[1765px]" data-name="ResourceSections">
      <Container7 />
      <ResourceGrid />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">Decision Services</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">Real-time decision services providing intelligent business decisions</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Paragraph11 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon7 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Credit Scoring Decision Service</p>
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[286px]">Real-time credit scoring service providing risk assessments for loan applications. Includes machine learning models and business rules for comprehensive evaluation.</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container35 />
        <Heading7 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph13 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph15 />
        <Paragraph16 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[91.602px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Credit Scoring</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[99.6px] rounded-[12px] top-0 w-[107.289px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Risk Assessment</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[123.438px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Real-time Decisions</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container41 />
      <Container42 />
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container39 />
        <Container43 />
      </div>
    </div>
  );
}

function ResourceCard2() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container36 />
      <Container44 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon9 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon10 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container45 />
        <Container46 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Pricing Optimization Decision Service</p>
      </div>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[284px]">Dynamic pricing service that adjusts prices based on market conditions, inventory levels, and demand patterns. Supports real-time pricing decisions across channels.</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container47 />
        <Heading8 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph20 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[114.742px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Price Optimization</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[122.74px] rounded-[12px] top-0 w-[101px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Market Analysis</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[135.766px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Revenue Management</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <Container53 />
      <Container54 />
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container51 />
        <Container55 />
      </div>
    </div>
  );
}

function ResourceCard3() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container48 />
      <Container56 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon12 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container57 />
        <Container58 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Invoice Validation Decision Service</p>
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[271px]">Real-time invoice validation service that verifies vendor information, purchase order matching, and approval authority. Includes duplicate detection and compliance checking.</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container59 />
        <Heading9 />
        <Paragraph22 />
      </div>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph23 />
        <Paragraph24 />
      </div>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph25 />
        <Paragraph26 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container61 />
      <Container62 />
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[112.172px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Invoice Validation</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[120.17px] rounded-[12px] top-0 w-[131.852px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Compliance Checking</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[122.297px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Duplicate Detection</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container65 />
      <Container66 />
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container63 />
        <Container67 />
      </div>
    </div>
  );
}

function ResourceCard4() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container60 />
      <Container68 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon13 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon14 />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container69 />
        <Container70 />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Payment Authorization Decision Service</p>
      </div>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[278px]">Automated payment authorization service that evaluates payment requests against budgets, approval limits, and cash flow requirements. Supports multi-level approval workflows.</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container71 />
        <Heading10 />
        <Paragraph27 />
      </div>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph28 />
        <Paragraph29 />
      </div>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph30 />
        <Paragraph31 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[138.797px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Payment Authorization</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[146.8px] rounded-[12px] top-0 w-[111.25px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Budget Validation</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[144.359px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Cash Flow Management</p>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container76 />
      <Container77 />
      <Container78 />
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container75 />
        <Container79 />
      </div>
    </div>
  );
}

function ResourceCard5() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container72 />
      <Container80 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon15 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon16 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container81 />
        <Container82 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Identity Verification Decision Service</p>
      </div>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[271px]">Comprehensive identity verification service using document validation, biometric matching, and fraud detection algorithms. Supports multiple identity document types and global verification standards.</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container83 />
        <Heading11 />
        <Paragraph32 />
      </div>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph33 />
        <Paragraph34 />
      </div>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph35 />
        <Paragraph36 />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container85 />
      <Container86 />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[122.289px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Identity Verification</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[130.29px] rounded-[12px] top-0 w-[128.289px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Document Validation</p>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[102.023px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Fraud Detection</p>
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container88 />
      <Container89 />
      <Container90 />
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container87 />
        <Container91 />
      </div>
    </div>
  );
}

function ResourceCard6() {
  return (
    <div className="[grid-area:2_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container84 />
      <Container92 />
    </div>
  );
}

function ResourceGrid1() {
  return (
    <div className="h-[664px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[664px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard2 />
          <ResourceCard3 />
          <ResourceCard4 />
          <ResourceCard5 />
          <ResourceCard6 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[735px] items-start left-0 top-[476px] w-[1765px]" data-name="ResourceSections">
      <Container32 />
      <ResourceGrid1 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">Data Models</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">Standardized data structures for consistent information management</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading12 />
      <Paragraph37 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon17 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon18 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container94 />
        <Container95 />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Customer 360 Data Model</p>
      </div>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[252px]">Comprehensive customer data model integrating demographics, transactions, interactions, and preferences. Supports analytics and personalization use cases.</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container96 />
        <Heading13 />
        <Paragraph38 />
      </div>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container98() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph39 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph41 />
        <Paragraph42 />
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container98 />
      <Container99 />
    </div>
  );
}

function Container101() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[104.133px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Data Integration</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[112.13px] rounded-[12px] top-0 w-[120.359px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Customer Analytics</p>
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[98.805px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Personalization</p>
    </div>
  );
}

function Container104() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container101 />
      <Container102 />
      <Container103 />
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container100 />
        <Container104 />
      </div>
    </div>
  );
}

function ResourceCard7() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container97 />
      <Container105 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon19 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon20 />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container106 />
        <Container107 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Financial Risk Data Model</p>
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[266px]">Standardized data model for financial risk management including market, credit, and operational risk data. Supports regulatory reporting and analytics.</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container108 />
        <Heading14 />
        <Paragraph43 />
      </div>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph44 />
        <Paragraph45 />
      </div>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph46 />
        <Paragraph47 />
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container110 />
      <Container111 />
    </div>
  );
}

function Container113() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[112px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Risk Management</p>
    </div>
  );
}

function Container114() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[120px] rounded-[12px] top-0 w-[129.68px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Regulatory Reporting</p>
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[65.141px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Analytics</p>
    </div>
  );
}

function Container116() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container113 />
      <Container114 />
      <Container115 />
    </div>
  );
}

function Container117() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container112 />
        <Container116 />
      </div>
    </div>
  );
}

function ResourceCard8() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container109 />
      <Container117 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon21 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon22 />
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container118 />
        <Container119 />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Market Intelligence Data Model</p>
      </div>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[286px]">Comprehensive market data model integrating competitor pricing, market trends, consumer behavior, and economic indicators for pricing optimization.</p>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container120 />
        <Heading15 />
        <Paragraph48 />
      </div>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph49 />
        <Paragraph50 />
      </div>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container123() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph51 />
        <Paragraph52 />
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container122 />
      <Container123 />
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[101px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Market Analysis</p>
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[109px] rounded-[12px] top-0 w-[147.906px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Competitive Intelligence</p>
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[95.375px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Price Modeling</p>
    </div>
  );
}

function Container128() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container125 />
      <Container126 />
      <Container127 />
    </div>
  );
}

function Container129() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container124 />
        <Container128 />
      </div>
    </div>
  );
}

function ResourceCard9() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container121 />
      <Container129 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon23 />
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon24 />
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container130 />
        <Container131 />
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Financial Transaction Data Model</p>
      </div>
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[283px]">Standardized data model for financial transactions including invoice data, purchase orders, vendor information, and approval hierarchies.</p>
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container132 />
        <Heading16 />
        <Paragraph53 />
      </div>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph54 />
        <Paragraph55 />
      </div>
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container135() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph56 />
        <Paragraph57 />
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container134 />
      <Container135 />
    </div>
  );
}

function Container137() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[140.312px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Transaction Processing</p>
    </div>
  );
}

function Container138() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[165.523px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Financial Data Management</p>
    </div>
  );
}

function Container139() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[173.52px] rounded-[12px] top-[34px] w-[111.164px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Audit Compliance</p>
    </div>
  );
}

function Container140() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container137 />
      <Container138 />
      <Container139 />
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container136 />
        <Container140 />
      </div>
    </div>
  );
}

function ResourceCard10() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container133 />
      <Container141 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon25 />
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon26 />
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container142 />
        <Container143 />
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Budget and Cash Flow Data Model</p>
      </div>
    </div>
  );
}

function Paragraph58() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[268px]">Integrated data model for budget tracking, cash flow forecasting, and payment scheduling across multiple business units and cost centers.</p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container144 />
        <Heading17 />
        <Paragraph58 />
      </div>
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph60() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph59 />
        <Paragraph60 />
      </div>
    </div>
  );
}

function Paragraph61() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph62() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container147() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph61 />
        <Paragraph62 />
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container146 />
      <Container147 />
    </div>
  );
}

function Container149() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[127.828px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Budget Management</p>
    </div>
  );
}

function Container150() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[135.83px] rounded-[12px] top-0 w-[120.766px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Cash Flow Planning</p>
    </div>
  );
}

function Container151() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[119.875px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Financial Reporting</p>
    </div>
  );
}

function Container152() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container149 />
      <Container150 />
      <Container151 />
    </div>
  );
}

function Container153() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container148 />
        <Container152 />
      </div>
    </div>
  );
}

function ResourceCard11() {
  return (
    <div className="[grid-area:2_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container145 />
      <Container153 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon27 />
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon28 />
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container154 />
        <Container155 />
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Identity and Verification Data Model</p>
      </div>
    </div>
  );
}

function Paragraph63() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[259px]">Comprehensive identity data model supporting multiple verification methods, document types, and biometric data for secure customer authentication.</p>
      </div>
    </div>
  );
}

function Container157() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container156 />
        <Heading18 />
        <Paragraph63 />
      </div>
    </div>
  );
}

function Paragraph64() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph65() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph64 />
        <Paragraph65 />
      </div>
    </div>
  );
}

function Paragraph66() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph67() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container159() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph66 />
        <Paragraph67 />
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container158 />
      <Container159 />
    </div>
  );
}

function Container161() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[131.672px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Identity Management</p>
    </div>
  );
}

function Container162() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[139.67px] rounded-[12px] top-0 w-[138.305px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Verification Processing</p>
    </div>
  );
}

function Container163() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[126.5px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Security Compliance</p>
    </div>
  );
}

function Container164() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container161 />
      <Container162 />
      <Container163 />
    </div>
  );
}

function Container165() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container160 />
        <Container164 />
      </div>
    </div>
  );
}

function ResourceCard12() {
  return (
    <div className="[grid-area:2_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container157 />
      <Container165 />
    </div>
  );
}

function ResourceGrid2() {
  return (
    <div className="h-[664px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[664px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard7 />
          <ResourceCard8 />
          <ResourceCard9 />
          <ResourceCard10 />
          <ResourceCard11 />
          <ResourceCard12 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[735px] items-start left-0 top-[1243px] w-[1765px]" data-name="ResourceSections">
      <Container93 />
      <ResourceGrid2 />
    </div>
  );
}

function Heading19() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">Decision Models</p>
    </div>
  );
}

function Paragraph68() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">Intelligent decision-making models for automated business processes</p>
    </div>
  );
}

function Container166() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading19 />
      <Paragraph68 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container167() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon29 />
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon30 />
      </div>
    </div>
  );
}

function Container169() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container167 />
        <Container168 />
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Credit Risk Assessment Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph69() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[286px]">Comprehensive decision model for evaluating credit applications with multi-tier risk scoring, automated approval thresholds, and regulatory compliance checks. Includes income verification, credit history analysis, and debt-to-income calculations.</p>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container169 />
        <Heading20 />
        <Paragraph69 />
      </div>
    </div>
  );
}

function Paragraph70() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph71() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container171() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph70 />
        <Paragraph71 />
      </div>
    </div>
  );
}

function Paragraph72() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph73() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container172() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph72 />
        <Paragraph73 />
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container171 />
      <Container172 />
    </div>
  );
}

function Container174() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[121.758px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Credit Risk Analysis</p>
    </div>
  );
}

function Container175() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[129.76px] rounded-[12px] top-0 w-[148.773px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Automated Underwriting</p>
    </div>
  );
}

function Container176() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[140.742px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Regulatory Compliance</p>
    </div>
  );
}

function Container177() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container174 />
      <Container175 />
      <Container176 />
    </div>
  );
}

function Container178() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container173 />
        <Container177 />
      </div>
    </div>
  );
}

function ResourceCard13() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container170 />
      <Container178 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container179() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon31 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container180() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon32 />
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container179 />
        <Container180 />
      </div>
    </div>
  );
}

function Heading21() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Auto Insurance Claims Processing Model</p>
      </div>
    </div>
  );
}

function Paragraph74() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[261px]">Automated decision model for processing auto insurance claims including damage assessment, liability determination, and settlement calculations. Integrates with repair network and supports subrogation workflows.</p>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container181 />
        <Heading21 />
        <Paragraph74 />
      </div>
    </div>
  );
}

function Paragraph75() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph76() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container183() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph75 />
        <Paragraph76 />
      </div>
    </div>
  );
}

function Paragraph77() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph78() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container184() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph77 />
        <Paragraph78 />
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container183 />
      <Container184 />
    </div>
  );
}

function Container186() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[113.812px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Claims Processing</p>
    </div>
  );
}

function Container187() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[121.81px] rounded-[12px] top-0 w-[128.633px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Damage Assessment</p>
    </div>
  );
}

function Container188() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[139.055px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Settlement Calculation</p>
    </div>
  );
}

function Container189() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container186 />
      <Container187 />
      <Container188 />
    </div>
  );
}

function Container190() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container185 />
        <Container189 />
      </div>
    </div>
  );
}

function ResourceCard14() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container182 />
      <Container190 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container191() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon33 />
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon34 />
      </div>
    </div>
  );
}

function Container193() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container191 />
        <Container192 />
      </div>
    </div>
  );
}

function Heading22() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Clinical Decision Support System</p>
      </div>
    </div>
  );
}

function Paragraph79() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[285px]">Evidence-based decision model for clinical treatment recommendations integrating patient history, current symptoms, lab results, and clinical guidelines. Supports drug interaction checking and care pathway optimization.</p>
      </div>
    </div>
  );
}

function Container194() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container193 />
        <Heading22 />
        <Paragraph79 />
      </div>
    </div>
  );
}

function Paragraph80() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph81() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container195() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph80 />
        <Paragraph81 />
      </div>
    </div>
  );
}

function Paragraph82() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph83() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container196() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph82 />
        <Paragraph83 />
      </div>
    </div>
  );
}

function Container197() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container195 />
      <Container196 />
    </div>
  );
}

function Container198() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[150.055px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Clinical Decision Support</p>
    </div>
  );
}

function Container199() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[158.06px] rounded-[12px] top-0 w-[121.531px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Treatment Planning</p>
    </div>
  );
}

function Container200() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[110.562px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Safety Monitoring</p>
    </div>
  );
}

function Container201() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container198 />
      <Container199 />
      <Container200 />
    </div>
  );
}

function Container202() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container197 />
        <Container201 />
      </div>
    </div>
  );
}

function ResourceCard15() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container194 />
      <Container202 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container203() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon35 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container204() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon36 />
      </div>
    </div>
  );
}

function Container205() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container203 />
        <Container204 />
      </div>
    </div>
  );
}

function Heading23() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Dynamic Pricing Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph84() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[285px]">AI-driven pricing model that considers competitor pricing, inventory levels, demand patterns, and customer segments to optimize price points in real-time. Supports promotional pricing and markdown strategies.</p>
      </div>
    </div>
  );
}

function Container206() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container205 />
        <Heading23 />
        <Paragraph84 />
      </div>
    </div>
  );
}

function Paragraph85() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph86() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container207() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph85 />
        <Paragraph86 />
      </div>
    </div>
  );
}

function Paragraph87() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph88() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container208() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph87 />
        <Paragraph88 />
      </div>
    </div>
  );
}

function Container209() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container207 />
      <Container208 />
    </div>
  );
}

function Container210() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[114.742px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Price Optimization</p>
    </div>
  );
}

function Container211() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[122.74px] rounded-[12px] top-0 w-[141.281px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Inventory Management</p>
    </div>
  );
}

function Container212() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[136.883px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Revenue Maximization</p>
    </div>
  );
}

function Container213() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container210 />
      <Container211 />
      <Container212 />
    </div>
  );
}

function Container214() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container209 />
        <Container213 />
      </div>
    </div>
  );
}

function ResourceCard16() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container206 />
      <Container214 />
    </div>
  );
}

function Icon37() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container215() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon37 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container216() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon38 />
      </div>
    </div>
  );
}

function Container217() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container215 />
        <Container216 />
      </div>
    </div>
  );
}

function Heading24() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Quality Control Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph89() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[281px]">Automated quality control system using sensor data, visual inspection, and statistical process control to make accept/reject decisions. Includes root cause analysis and continuous improvement recommendations.</p>
      </div>
    </div>
  );
}

function Container218() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container217 />
        <Heading24 />
        <Paragraph89 />
      </div>
    </div>
  );
}

function Paragraph90() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph91() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container219() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph90 />
        <Paragraph91 />
      </div>
    </div>
  );
}

function Paragraph92() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph93() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container220() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph92 />
        <Paragraph93 />
      </div>
    </div>
  );
}

function Container221() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container219 />
      <Container220 />
    </div>
  );
}

function Container222() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[96.547px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Quality Control</p>
    </div>
  );
}

function Container223() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[104.55px] rounded-[12px] top-0 w-[130.016px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Process Optimization</p>
    </div>
  );
}

function Container224() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[112.102px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Defect Prevention</p>
    </div>
  );
}

function Container225() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container222 />
      <Container223 />
      <Container224 />
    </div>
  );
}

function Container226() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container221 />
        <Container225 />
      </div>
    </div>
  );
}

function ResourceCard17() {
  return (
    <div className="[grid-area:2_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container218 />
      <Container226 />
    </div>
  );
}

function Icon39() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container227() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon39 />
      </div>
    </div>
  );
}

function Icon40() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #F1C21B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container228() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon40 />
      </div>
    </div>
  );
}

function Container229() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container227 />
        <Container228 />
      </div>
    </div>
  );
}

function Heading25() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Supply Chain Risk Assessment Model</p>
      </div>
    </div>
  );
}

function Paragraph94() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[279px]">Decision model for evaluating and mitigating supply chain risks including supplier reliability, geopolitical factors, and demand variability. Includes alternative sourcing recommendations.</p>
      </div>
    </div>
  );
}

function Container230() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container229 />
        <Heading25 />
        <Paragraph94 />
      </div>
    </div>
  );
}

function Paragraph95() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph96() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">SupplyChain Analytics</p>
    </div>
  );
}

function Container231() {
  return (
    <div className="h-[43px] relative shrink-0 w-[139.195px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[139.195px]">
        <Paragraph95 />
        <Paragraph96 />
      </div>
    </div>
  );
}

function Paragraph97() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph98() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Third-party</p>
    </div>
  );
}

function Container232() {
  return (
    <div className="h-[43px] relative shrink-0 w-[70.914px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[70.914px]">
        <Paragraph97 />
        <Paragraph98 />
      </div>
    </div>
  );
}

function Container233() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container231 />
      <Container232 />
    </div>
  );
}

function Container234() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[112px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Risk Management</p>
    </div>
  );
}

function Container235() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[120px] rounded-[12px] top-0 w-[120.234px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Supplier Evaluation</p>
    </div>
  );
}

function Container236() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[157.797px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Supply Chain Optimization</p>
    </div>
  );
}

function Container237() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container234 />
      <Container235 />
      <Container236 />
    </div>
  );
}

function Container238() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container233 />
        <Container237 />
      </div>
    </div>
  );
}

function ResourceCard18() {
  return (
    <div className="[grid-area:2_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container230 />
      <Container238 />
    </div>
  );
}

function Icon41() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container239() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon41 />
      </div>
    </div>
  );
}

function Icon42() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container240() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon42 />
      </div>
    </div>
  );
}

function Container241() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container239 />
        <Container240 />
      </div>
    </div>
  );
}

function Heading26() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Network Optimization Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph99() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[283px]">Intelligent network management system that automatically adjusts bandwidth allocation, routing decisions, and service priorities based on real-time network conditions and SLA requirements.</p>
      </div>
    </div>
  );
}

function Container242() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container241 />
        <Heading26 />
        <Paragraph99 />
      </div>
    </div>
  );
}

function Paragraph100() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph101() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container243() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph100 />
        <Paragraph101 />
      </div>
    </div>
  );
}

function Paragraph102() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph103() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container244() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph102 />
        <Paragraph103 />
      </div>
    </div>
  );
}

function Container245() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container243 />
      <Container244 />
    </div>
  );
}

function Container246() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[135.047px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Network Management</p>
    </div>
  );
}

function Container247() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[143.05px] rounded-[12px] top-0 w-[121.445px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Traffic Optimization</p>
    </div>
  );
}

function Container248() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[110.062px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">SLA Management</p>
    </div>
  );
}

function Container249() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container246 />
      <Container247 />
      <Container248 />
    </div>
  );
}

function Container250() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container245 />
        <Container249 />
      </div>
    </div>
  );
}

function ResourceCard19() {
  return (
    <div className="[grid-area:2_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container242 />
      <Container250 />
    </div>
  );
}

function Icon43() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container251() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon43 />
      </div>
    </div>
  );
}

function Icon44() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container252() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon44 />
      </div>
    </div>
  );
}

function Container253() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container251 />
        <Container252 />
      </div>
    </div>
  );
}

function Heading27() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Benefits Eligibility Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph104() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[284px]">Automated eligibility determination system for government benefits programs including income verification, asset assessment, and program-specific criteria validation. Supports multiple benefit types and appeals processes.</p>
      </div>
    </div>
  );
}

function Container254() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container253 />
        <Heading27 />
        <Paragraph104 />
      </div>
    </div>
  );
}

function Paragraph105() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph106() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container255() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph105 />
        <Paragraph106 />
      </div>
    </div>
  );
}

function Paragraph107() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph108() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container256() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph107 />
        <Paragraph108 />
      </div>
    </div>
  );
}

function Container257() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container255 />
      <Container256 />
    </div>
  );
}

function Container258() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[133.461px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Eligibility Assessment</p>
    </div>
  );
}

function Container259() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[141.46px] rounded-[12px] top-0 w-[142.953px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Benefits Administration</p>
    </div>
  );
}

function Container260() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[107.789px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Fraud Prevention</p>
    </div>
  );
}

function Container261() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container258 />
      <Container259 />
      <Container260 />
    </div>
  );
}

function Container262() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container257 />
        <Container261 />
      </div>
    </div>
  );
}

function ResourceCard20() {
  return (
    <div className="[grid-area:2_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container254 />
      <Container262 />
    </div>
  );
}

function Icon45() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container263() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon45 />
      </div>
    </div>
  );
}

function Icon46() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container264() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon46 />
      </div>
    </div>
  );
}

function Container265() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container263 />
        <Container264 />
      </div>
    </div>
  );
}

function Heading28() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Smart Grid Load Balancing Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph109() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[278px]">Advanced grid management system for real-time load balancing, demand response, and renewable energy integration. Includes predictive analytics for grid stability and outage prevention.</p>
      </div>
    </div>
  );
}

function Container266() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container265 />
        <Heading28 />
        <Paragraph109 />
      </div>
    </div>
  );
}

function Paragraph110() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph111() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container267() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph110 />
        <Paragraph111 />
      </div>
    </div>
  );
}

function Paragraph112() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph113() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container268() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph112 />
        <Paragraph113 />
      </div>
    </div>
  );
}

function Container269() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container267 />
      <Container268 />
    </div>
  );
}

function Container270() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[111.859px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Grid Management</p>
    </div>
  );
}

function Container271() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[119.86px] rounded-[12px] top-0 w-[97.734px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Load Balancing</p>
    </div>
  );
}

function Container272() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[138.812px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Renewable Integration</p>
    </div>
  );
}

function Container273() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container270 />
      <Container271 />
      <Container272 />
    </div>
  );
}

function Container274() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container269 />
        <Container273 />
      </div>
    </div>
  );
}

function ResourceCard21() {
  return (
    <div className="[grid-area:3_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container266 />
      <Container274 />
    </div>
  );
}

function Icon47() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container275() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon47 />
      </div>
    </div>
  );
}

function Icon48() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container276() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon48 />
      </div>
    </div>
  );
}

function Container277() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container275 />
        <Container276 />
      </div>
    </div>
  );
}

function Heading29() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Customer Identity Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph114() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[281px]">Advanced decision model for customer identity verification combining multiple verification methods and risk assessment for secure onboarding.</p>
      </div>
    </div>
  );
}

function Container278() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container277 />
        <Heading29 />
        <Paragraph114 />
      </div>
    </div>
  );
}

function Paragraph115() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph116() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container279() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph115 />
        <Paragraph116 />
      </div>
    </div>
  );
}

function Paragraph117() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph118() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container280() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph117 />
        <Paragraph118 />
      </div>
    </div>
  );
}

function Container281() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container279 />
      <Container280 />
    </div>
  );
}

function Container282() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[122.289px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Identity Verification</p>
    </div>
  );
}

function Container283() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[130.29px] rounded-[12px] top-0 w-[107.289px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Risk Assessment</p>
    </div>
  );
}

function Container284() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[144.703px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Onboarding Automation</p>
    </div>
  );
}

function Container285() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container282 />
      <Container283 />
      <Container284 />
    </div>
  );
}

function Container286() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container281 />
        <Container285 />
      </div>
    </div>
  );
}

function ResourceCard22() {
  return (
    <div className="[grid-area:3_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container278 />
      <Container286 />
    </div>
  );
}

function Icon49() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container287() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon49 />
      </div>
    </div>
  );
}

function Icon50() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container288() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon50 />
      </div>
    </div>
  );
}

function Container289() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container287 />
        <Container288 />
      </div>
    </div>
  );
}

function Heading30() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Invoice Validation Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph119() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[267px]">Intelligent decision model for automated invoice validation using business rules, historical patterns, and exception handling for accurate processing.</p>
      </div>
    </div>
  );
}

function Container290() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container289 />
        <Heading30 />
        <Paragraph119 />
      </div>
    </div>
  );
}

function Paragraph120() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph121() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container291() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph120 />
        <Paragraph121 />
      </div>
    </div>
  );
}

function Paragraph122() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph123() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container292() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph122 />
        <Paragraph123 />
      </div>
    </div>
  );
}

function Container293() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container291 />
      <Container292 />
    </div>
  );
}

function Container294() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[112.172px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Invoice Validation</p>
    </div>
  );
}

function Container295() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[120.17px] rounded-[12px] top-0 w-[120.047px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Exception Handling</p>
    </div>
  );
}

function Container296() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[124.242px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Process Automation</p>
    </div>
  );
}

function Container297() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container294 />
      <Container295 />
      <Container296 />
    </div>
  );
}

function Container298() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container293 />
        <Container297 />
      </div>
    </div>
  );
}

function ResourceCard23() {
  return (
    <div className="[grid-area:3_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container290 />
      <Container298 />
    </div>
  );
}

function Icon51() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container299() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon51 />
      </div>
    </div>
  );
}

function Icon52() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container300() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon52 />
      </div>
    </div>
  );
}

function Container301() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container299 />
        <Container300 />
      </div>
    </div>
  );
}

function Heading31() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Payment Authorization Decision Model</p>
      </div>
    </div>
  );
}

function Paragraph124() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[276px]">Automated decision model for payment authorization incorporating budget controls, approval workflows, and cash flow optimization.</p>
      </div>
    </div>
  );
}

function Container302() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container301 />
        <Heading31 />
        <Paragraph124 />
      </div>
    </div>
  );
}

function Paragraph125() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph126() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container303() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph125 />
        <Paragraph126 />
      </div>
    </div>
  );
}

function Paragraph127() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph128() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container304() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph127 />
        <Paragraph128 />
      </div>
    </div>
  );
}

function Container305() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container303 />
      <Container304 />
    </div>
  );
}

function Container306() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[138.797px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Payment Authorization</p>
    </div>
  );
}

function Container307() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[146.8px] rounded-[12px] top-0 w-[97.039px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Budget Control</p>
    </div>
  );
}

function Container308() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[144.359px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Cash Flow Management</p>
    </div>
  );
}

function Container309() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container306 />
      <Container307 />
      <Container308 />
    </div>
  );
}

function Container310() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container305 />
        <Container309 />
      </div>
    </div>
  );
}

function ResourceCard24() {
  return (
    <div className="[grid-area:3_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container302 />
      <Container310 />
    </div>
  );
}

function ResourceGrid3() {
  return (
    <div className="h-[1008px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[1008px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard13 />
          <ResourceCard14 />
          <ResourceCard15 />
          <ResourceCard16 />
          <ResourceCard17 />
          <ResourceCard18 />
          <ResourceCard19 />
          <ResourceCard20 />
          <ResourceCard21 />
          <ResourceCard22 />
          <ResourceCard23 />
          <ResourceCard24 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[1079px] items-start left-0 top-[2010px] w-[1765px]" data-name="ResourceSections">
      <Container166 />
      <ResourceGrid3 />
    </div>
  );
}

function Heading32() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">Task Models</p>
    </div>
  );
}

function Paragraph129() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">Automated workflow and task execution models</p>
    </div>
  );
}

function Container311() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading32 />
      <Paragraph129 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container312() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon53 />
      </div>
    </div>
  );
}

function Icon54() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container313() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon54 />
      </div>
    </div>
  );
}

function Container314() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container312 />
        <Container313 />
      </div>
    </div>
  );
}

function Heading33() {
  return (
    <div className="h-[42px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[42px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] top-[-1px] w-[248px]">Property Insurance Underwriting Task Model</p>
      </div>
    </div>
  );
}

function Paragraph130() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[275px]">End-to-end task automation for property insurance underwriting including risk assessment, pricing calculations, and policy generation. Supports residential, commercial, and specialty property types.</p>
      </div>
    </div>
  );
}

function Container315() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pl-[16px] pr-0 py-[16px] relative w-[318px]">
        <Container314 />
        <Heading33 />
        <Paragraph130 />
      </div>
    </div>
  );
}

function Paragraph131() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph132() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container316() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph131 />
        <Paragraph132 />
      </div>
    </div>
  );
}

function Paragraph133() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph134() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container317() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph133 />
        <Paragraph134 />
      </div>
    </div>
  );
}

function Container318() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container316 />
      <Container317 />
    </div>
  );
}

function Container319() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[85.953px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Underwriting</p>
    </div>
  );
}

function Container320() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[93.95px] rounded-[12px] top-0 w-[107.289px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Risk Assessment</p>
    </div>
  );
}

function Container321() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[110.719px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Policy Generation</p>
    </div>
  );
}

function Container322() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container319 />
      <Container320 />
      <Container321 />
    </div>
  );
}

function Container323() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container318 />
        <Container322 />
      </div>
    </div>
  );
}

function ResourceCard25() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container315 />
      <Container323 />
    </div>
  );
}

function Icon55() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container324() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon55 />
      </div>
    </div>
  );
}

function Icon56() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container325() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon56 />
      </div>
    </div>
  );
}

function Container326() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container324 />
        <Container325 />
      </div>
    </div>
  );
}

function Heading34() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Medication Management Task Automation</p>
      </div>
    </div>
  );
}

function Paragraph135() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[279px]">Automated task model for medication reconciliation, dosing calculations, and interaction checking. Includes pharmacy integration, patient education materials, and adherence monitoring workflows.</p>
      </div>
    </div>
  );
}

function Container327() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container326 />
        <Heading34 />
        <Paragraph135 />
      </div>
    </div>
  );
}

function Paragraph136() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph137() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container328() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph136 />
        <Paragraph137 />
      </div>
    </div>
  );
}

function Paragraph138() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph139() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container329() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph138 />
        <Paragraph139 />
      </div>
    </div>
  );
}

function Container330() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container328 />
      <Container329 />
    </div>
  );
}

function Container331() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[148.641px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Medication Management</p>
    </div>
  );
}

function Container332() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[156.64px] rounded-[12px] top-0 w-[110.562px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Safety Monitoring</p>
    </div>
  );
}

function Container333() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[111.07px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Patient Education</p>
    </div>
  );
}

function Container334() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container331 />
      <Container332 />
      <Container333 />
    </div>
  );
}

function Container335() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container330 />
        <Container334 />
      </div>
    </div>
  );
}

function ResourceCard26() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container327 />
      <Container335 />
    </div>
  );
}

function Icon57() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container336() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon57 />
      </div>
    </div>
  );
}

function Icon58() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #24A148)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container337() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon58 />
      </div>
    </div>
  );
}

function Container338() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container336 />
        <Container337 />
      </div>
    </div>
  );
}

function Heading35() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">E-commerce Order Fulfillment Task Model</p>
      </div>
    </div>
  );
}

function Paragraph140() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[280px]">End-to-end automation for e-commerce order processing including inventory allocation, shipping optimization, and customer communication. Supports multiple fulfillment centers and shipping options.</p>
      </div>
    </div>
  );
}

function Container339() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container338 />
        <Heading35 />
        <Paragraph140 />
      </div>
    </div>
  );
}

function Paragraph141() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph142() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">MegaRetail Corp</p>
    </div>
  );
}

function Container340() {
  return (
    <div className="h-[43px] relative shrink-0 w-[103.117px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[103.117px]">
        <Paragraph141 />
        <Paragraph142 />
      </div>
    </div>
  );
}

function Paragraph143() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph144() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Custom</p>
    </div>
  );
}

function Container341() {
  return (
    <div className="h-[43px] relative shrink-0 w-[48.289px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[48.289px]">
        <Paragraph143 />
        <Paragraph144 />
      </div>
    </div>
  );
}

function Container342() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container340 />
      <Container341 />
    </div>
  );
}

function Container343() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[108.148px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Order Processing</p>
    </div>
  );
}

function Container344() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[116.15px] rounded-[12px] top-0 w-[145.484px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Fulfillment Optimization</p>
    </div>
  );
}

function Container345() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[110.758px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Customer Service</p>
    </div>
  );
}

function Container346() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container343 />
      <Container344 />
      <Container345 />
    </div>
  );
}

function Container347() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container342 />
        <Container346 />
      </div>
    </div>
  );
}

function ResourceCard27() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container339 />
      <Container347 />
    </div>
  );
}

function Icon59() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container348() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon59 />
      </div>
    </div>
  );
}

function Icon60() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #24A148)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container349() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon60 />
      </div>
    </div>
  );
}

function Container350() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container348 />
        <Container349 />
      </div>
    </div>
  );
}

function Heading36() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Service Provisioning Task Automation</p>
      </div>
    </div>
  );
}

function Paragraph145() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[271px]">End-to-end automation for telecom service provisioning including order processing, resource allocation, configuration management, and service activation across multiple network technologies.</p>
      </div>
    </div>
  );
}

function Container351() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container350 />
        <Heading36 />
        <Paragraph145 />
      </div>
    </div>
  );
}

function Paragraph146() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph147() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">TelecomCorp</p>
    </div>
  );
}

function Container352() {
  return (
    <div className="h-[43px] relative shrink-0 w-[83.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[83.094px]">
        <Paragraph146 />
        <Paragraph147 />
      </div>
    </div>
  );
}

function Paragraph148() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph149() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Custom</p>
    </div>
  );
}

function Container353() {
  return (
    <div className="h-[43px] relative shrink-0 w-[48.289px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[48.289px]">
        <Paragraph148 />
        <Paragraph149 />
      </div>
    </div>
  );
}

function Container354() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container352 />
      <Container353 />
    </div>
  );
}

function Container355() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[123.93px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Service Provisioning</p>
    </div>
  );
}

function Container356() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[131.93px] rounded-[12px] top-0 w-[119.938px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Order Management</p>
    </div>
  );
}

function Container357() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[137.133px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Network Configuration</p>
    </div>
  );
}

function Container358() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container355 />
      <Container356 />
      <Container357 />
    </div>
  );
}

function Container359() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container354 />
        <Container358 />
      </div>
    </div>
  );
}

function ResourceCard28() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container351 />
      <Container359 />
    </div>
  );
}

function Icon61() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container360() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon61 />
      </div>
    </div>
  );
}

function Icon62() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #F1C21B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container361() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon62 />
      </div>
    </div>
  );
}

function Container362() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container360 />
        <Container361 />
      </div>
    </div>
  );
}

function Heading37() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Citizen Services Task Automation</p>
      </div>
    </div>
  );
}

function Paragraph150() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[281px]">Comprehensive task automation for citizen services including permit processing, license renewals, and service requests. Includes multi-channel support and automated status updates.</p>
      </div>
    </div>
  );
}

function Container363() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container362 />
        <Heading37 />
        <Paragraph150 />
      </div>
    </div>
  );
}

function Paragraph151() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph152() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">CityGov Solutions</p>
    </div>
  );
}

function Container364() {
  return (
    <div className="h-[43px] relative shrink-0 w-[110.508px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[110.508px]">
        <Paragraph151 />
        <Paragraph152 />
      </div>
    </div>
  );
}

function Paragraph153() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph154() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Third-party</p>
    </div>
  );
}

function Container365() {
  return (
    <div className="h-[43px] relative shrink-0 w-[70.914px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[70.914px]">
        <Paragraph153 />
        <Paragraph154 />
      </div>
    </div>
  );
}

function Container366() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container364 />
      <Container365 />
    </div>
  );
}

function Container367() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[113.086px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Permit Processing</p>
    </div>
  );
}

function Container368() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[121.09px] rounded-[12px] top-0 w-[129.969px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">License Management</p>
    </div>
  );
}

function Container369() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[100.734px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Citizen Services</p>
    </div>
  );
}

function Container370() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container367 />
      <Container368 />
      <Container369 />
    </div>
  );
}

function Container371() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container366 />
        <Container370 />
      </div>
    </div>
  );
}

function ResourceCard29() {
  return (
    <div className="[grid-area:2_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container363 />
      <Container371 />
    </div>
  );
}

function ResourceGrid4() {
  return (
    <div className="h-[674px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[330px_minmax(0px,_1fr)] h-[674px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard25 />
          <ResourceCard26 />
          <ResourceCard27 />
          <ResourceCard28 />
          <ResourceCard29 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[745px] items-start left-0 top-[3121px] w-[1765px]" data-name="ResourceSections">
      <Container311 />
      <ResourceGrid4 />
    </div>
  );
}

function Heading38() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">Rule Models</p>
    </div>
  );
}

function Paragraph155() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">Business rule engines for policy enforcement and compliance</p>
    </div>
  );
}

function Container372() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading38 />
      <Paragraph155 />
    </div>
  );
}

function Icon63() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container373() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon63 />
      </div>
    </div>
  );
}

function Icon64() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container374() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon64 />
      </div>
    </div>
  );
}

function Container375() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container373 />
        <Container374 />
      </div>
    </div>
  );
}

function Heading39() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Mortgage Loan Origination Rules</p>
      </div>
    </div>
  );
}

function Paragraph156() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[260px]">Complete rule set for mortgage loan processing including property valuation, borrower qualification, and loan-to-value ratio calculations. Supports conventional, FHA, and VA loan types with automated document verification.</p>
      </div>
    </div>
  );
}

function Container376() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container375 />
        <Heading39 />
        <Paragraph156 />
      </div>
    </div>
  );
}

function Paragraph157() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph158() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container377() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph157 />
        <Paragraph158 />
      </div>
    </div>
  );
}

function Paragraph159() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph160() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container378() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph159 />
        <Paragraph160 />
      </div>
    </div>
  );
}

function Container379() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container377 />
      <Container378 />
    </div>
  );
}

function Container380() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[127.938px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Mortgage Processing</p>
    </div>
  );
}

function Container381() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[135.94px] rounded-[12px] top-0 w-[135.484px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Document Verification</p>
    </div>
  );
}

function Container382() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[136.219px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Compliance Validation</p>
    </div>
  );
}

function Container383() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container380 />
      <Container381 />
      <Container382 />
    </div>
  );
}

function Container384() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container379 />
        <Container383 />
      </div>
    </div>
  );
}

function ResourceCard30() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container376 />
      <Container384 />
    </div>
  );
}

function Icon65() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container385() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon65 />
      </div>
    </div>
  );
}

function Icon66() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container386() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon66 />
      </div>
    </div>
  );
}

function Container387() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container385 />
        <Container386 />
      </div>
    </div>
  );
}

function Heading40() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Health Insurance Prior Authorization Rules</p>
      </div>
    </div>
  );
}

function Paragraph161() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[256px]">Comprehensive rule set for medical prior authorization decisions based on clinical guidelines, policy coverage, and cost-effectiveness analysis. Includes appeals process automation and provider communication.</p>
      </div>
    </div>
  );
}

function Container388() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container387 />
        <Heading40 />
        <Paragraph161 />
      </div>
    </div>
  );
}

function Paragraph162() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph163() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container389() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph162 />
        <Paragraph163 />
      </div>
    </div>
  );
}

function Paragraph164() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph165() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container390() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph164 />
        <Paragraph165 />
      </div>
    </div>
  );
}

function Container391() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container389 />
      <Container390 />
    </div>
  );
}

function Container392() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[116.898px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Prior Authorization</p>
    </div>
  );
}

function Container393() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[124.9px] rounded-[12px] top-0 w-[99.477px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Medical Review</p>
    </div>
  );
}

function Container394() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[113.297px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Cost Management</p>
    </div>
  );
}

function Container395() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container392 />
      <Container393 />
      <Container394 />
    </div>
  );
}

function Container396() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container391 />
        <Container395 />
      </div>
    </div>
  );
}

function ResourceCard31() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container388 />
      <Container396 />
    </div>
  );
}

function Icon67() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container397() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon67 />
      </div>
    </div>
  );
}

function Icon68() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container398() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon68 />
      </div>
    </div>
  );
}

function Container399() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container397 />
        <Container398 />
      </div>
    </div>
  );
}

function Heading41() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Patient Admission and Discharge Rules</p>
      </div>
    </div>
  );
}

function Paragraph166() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[281px]">Comprehensive rule set for hospital patient flow management including admission criteria, bed allocation, discharge planning, and readmission risk assessment. Integrates with capacity management systems.</p>
      </div>
    </div>
  );
}

function Container400() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container399 />
        <Heading41 />
        <Paragraph166 />
      </div>
    </div>
  );
}

function Paragraph167() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph168() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container401() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph167 />
        <Paragraph168 />
      </div>
    </div>
  );
}

function Paragraph169() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph170() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container402() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph169 />
        <Paragraph170 />
      </div>
    </div>
  );
}

function Container403() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container401 />
      <Container402 />
    </div>
  );
}

function Container404() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[83.07px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Patient Flow</p>
    </div>
  );
}

function Container405() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[91.07px] rounded-[12px] top-0 w-[135.617px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Capacity Management</p>
    </div>
  );
}

function Container406() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[118.703px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Discharge Planning</p>
    </div>
  );
}

function Container407() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container404 />
      <Container405 />
      <Container406 />
    </div>
  );
}

function Container408() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container403 />
        <Container407 />
      </div>
    </div>
  );
}

function ResourceCard32() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container400 />
      <Container408 />
    </div>
  );
}

function Icon69() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container409() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon69 />
      </div>
    </div>
  );
}

function Icon70() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container410() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon70 />
      </div>
    </div>
  );
}

function Container411() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container409 />
        <Container410 />
      </div>
    </div>
  );
}

function Heading42() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Inventory Replenishment Rules</p>
      </div>
    </div>
  );
}

function Paragraph171() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[277px]">Automated inventory management rules considering seasonal patterns, supplier lead times, storage costs, and demand forecasting. Includes safety stock calculations and supplier performance metrics.</p>
      </div>
    </div>
  );
}

function Container412() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container411 />
        <Heading42 />
        <Paragraph171 />
      </div>
    </div>
  );
}

function Paragraph172() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph173() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container413() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph172 />
        <Paragraph173 />
      </div>
    </div>
  );
}

function Paragraph174() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph175() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container414() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph174 />
        <Paragraph175 />
      </div>
    </div>
  );
}

function Container415() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container413 />
      <Container414 />
    </div>
  );
}

function Container416() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[141.281px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Inventory Management</p>
    </div>
  );
}

function Container417() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[157.797px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Supply Chain Optimization</p>
    </div>
  );
}

function Container418() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[165.8px] rounded-[12px] top-[34px] w-[82.508px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Cost Control</p>
    </div>
  );
}

function Container419() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container416 />
      <Container417 />
      <Container418 />
    </div>
  );
}

function Container420() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container415 />
        <Container419 />
      </div>
    </div>
  );
}

function ResourceCard33() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container412 />
      <Container420 />
    </div>
  );
}

function Icon71() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container421() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon71 />
      </div>
    </div>
  );
}

function Icon72() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #24A148)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container422() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon72 />
      </div>
    </div>
  );
}

function Container423() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container421 />
        <Container422 />
      </div>
    </div>
  );
}

function Heading43() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Production Scheduling Rules</p>
      </div>
    </div>
  );
}

function Paragraph176() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[286px]">Advanced production scheduling rules considering resource constraints, demand priorities, setup times, and delivery commitments. Supports just-in-time and lean manufacturing principles.</p>
      </div>
    </div>
  );
}

function Container424() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container423 />
        <Heading43 />
        <Paragraph176 />
      </div>
    </div>
  );
}

function Paragraph177() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph178() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Global Manufacturing Inc</p>
    </div>
  );
}

function Container425() {
  return (
    <div className="h-[43px] relative shrink-0 w-[158.641px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[158.641px]">
        <Paragraph177 />
        <Paragraph178 />
      </div>
    </div>
  );
}

function Paragraph179() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph180() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Custom</p>
    </div>
  );
}

function Container426() {
  return (
    <div className="h-[43px] relative shrink-0 w-[48.289px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[48.289px]">
        <Paragraph179 />
        <Paragraph180 />
      </div>
    </div>
  );
}

function Container427() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container425 />
      <Container426 />
    </div>
  );
}

function Container428() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[124.336px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Production Planning</p>
    </div>
  );
}

function Container429() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[132.34px] rounded-[12px] top-0 w-[137.992px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Resource Optimization</p>
    </div>
  );
}

function Container430() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[139.195px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Schedule Management</p>
    </div>
  );
}

function Container431() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container428 />
      <Container429 />
      <Container430 />
    </div>
  );
}

function Container432() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container427 />
        <Container431 />
      </div>
    </div>
  );
}

function ResourceCard34() {
  return (
    <div className="[grid-area:2_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container424 />
      <Container432 />
    </div>
  );
}

function Icon73() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container433() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon73 />
      </div>
    </div>
  );
}

function Icon74() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container434() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon74 />
      </div>
    </div>
  );
}

function Container435() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container433 />
        <Container434 />
      </div>
    </div>
  );
}

function Heading44() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Public Safety Resource Allocation Rules</p>
      </div>
    </div>
  );
}

function Paragraph181() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[259px]">Intelligent resource allocation system for emergency services considering incident severity, resource availability, geographic factors, and response time requirements. Supports multi-agency coordination.</p>
      </div>
    </div>
  );
}

function Container436() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container435 />
        <Heading44 />
        <Paragraph181 />
      </div>
    </div>
  );
}

function Paragraph182() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph183() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container437() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph182 />
        <Paragraph183 />
      </div>
    </div>
  );
}

function Paragraph184() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph185() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container438() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph184 />
        <Paragraph185 />
      </div>
    </div>
  );
}

function Container439() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container437 />
      <Container438 />
    </div>
  );
}

function Container440() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[131.578px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Emergency Response</p>
    </div>
  );
}

function Container441() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[139.58px] rounded-[12px] top-0 w-[139.523px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Resource Management</p>
    </div>
  );
}

function Container442() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[86.195px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Public Safety</p>
    </div>
  );
}

function Container443() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container440 />
      <Container441 />
      <Container442 />
    </div>
  );
}

function Container444() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container439 />
        <Container443 />
      </div>
    </div>
  );
}

function ResourceCard35() {
  return (
    <div className="[grid-area:2_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container436 />
      <Container444 />
    </div>
  );
}

function Icon75() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container445() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon75 />
      </div>
    </div>
  );
}

function Icon76() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #24A148)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container446() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon76 />
      </div>
    </div>
  );
}

function Container447() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container445 />
        <Container446 />
      </div>
    </div>
  );
}

function Heading45() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Utility Asset Management Rules</p>
      </div>
    </div>
  );
}

function Paragraph186() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[277px]">Comprehensive asset management rules for utility infrastructure including maintenance scheduling, replacement planning, and performance optimization. Supports transmission, distribution, and generation assets.</p>
      </div>
    </div>
  );
}

function Container448() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container447 />
        <Heading45 />
        <Paragraph186 />
      </div>
    </div>
  );
}

function Paragraph187() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph188() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">PowerGrid Utilities</p>
    </div>
  );
}

function Container449() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.547px]">
        <Paragraph187 />
        <Paragraph188 />
      </div>
    </div>
  );
}

function Paragraph189() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph190() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Custom</p>
    </div>
  );
}

function Container450() {
  return (
    <div className="h-[43px] relative shrink-0 w-[48.289px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[48.289px]">
        <Paragraph189 />
        <Paragraph190 />
      </div>
    </div>
  );
}

function Container451() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container449 />
      <Container450 />
    </div>
  );
}

function Container452() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[119.266px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Asset Management</p>
    </div>
  );
}

function Container453() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[127.27px] rounded-[12px] top-0 w-[134.875px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Maintenance Planning</p>
    </div>
  );
}

function Container454() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[156.922px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Performance Optimization</p>
    </div>
  );
}

function Container455() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container452 />
      <Container453 />
      <Container454 />
    </div>
  );
}

function Container456() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container451 />
        <Container455 />
      </div>
    </div>
  );
}

function ResourceCard36() {
  return (
    <div className="[grid-area:2_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container448 />
      <Container456 />
    </div>
  );
}

function Icon77() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container457() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon77 />
      </div>
    </div>
  );
}

function Icon78() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container458() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon78 />
      </div>
    </div>
  );
}

function Container459() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container457 />
        <Container458 />
      </div>
    </div>
  );
}

function Heading46() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Credit Assessment Rules</p>
      </div>
    </div>
  );
}

function Paragraph191() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[251px]">Comprehensive credit assessment rules incorporating income verification, debt analysis, credit history evaluation, and regulatory compliance requirements.</p>
      </div>
    </div>
  );
}

function Container460() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container459 />
        <Heading46 />
        <Paragraph191 />
      </div>
    </div>
  );
}

function Paragraph192() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph193() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container461() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph192 />
        <Paragraph193 />
      </div>
    </div>
  );
}

function Paragraph194() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph195() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container462() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph194 />
        <Paragraph195 />
      </div>
    </div>
  );
}

function Container463() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container461 />
      <Container462 />
    </div>
  );
}

function Container464() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[116.992px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Credit Assessment</p>
    </div>
  );
}

function Container465() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[124.99px] rounded-[12px] top-0 w-[121.133px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Income Verification</p>
    </div>
  );
}

function Container466() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[98.117px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Risk Evaluation</p>
    </div>
  );
}

function Container467() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container464 />
      <Container465 />
      <Container466 />
    </div>
  );
}

function Container468() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container463 />
        <Container467 />
      </div>
    </div>
  );
}

function ResourceCard37() {
  return (
    <div className="[grid-area:2_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container460 />
      <Container468 />
    </div>
  );
}

function ResourceGrid5() {
  return (
    <div className="h-[664px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[664px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard30 />
          <ResourceCard31 />
          <ResourceCard32 />
          <ResourceCard33 />
          <ResourceCard34 />
          <ResourceCard35 />
          <ResourceCard36 />
          <ResourceCard37 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[735px] items-start left-0 top-[3898px] w-[1765px]" data-name="ResourceSections">
      <Container372 />
      <ResourceGrid5 />
    </div>
  );
}

function Heading47() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">ML Models</p>
    </div>
  );
}

function Paragraph196() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">Machine learning models for predictive analytics and insights</p>
    </div>
  );
}

function Container469() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading47 />
      <Paragraph196 />
    </div>
  );
}

function Icon79() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container470() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon79 />
      </div>
    </div>
  );
}

function Icon80() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container471() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon80 />
      </div>
    </div>
  );
}

function Container472() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container470 />
        <Container471 />
      </div>
    </div>
  );
}

function Heading48() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Real-time Fraud Detection ML Model</p>
      </div>
    </div>
  );
}

function Paragraph197() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[285px]">Integrated machine learning model for detecting fraudulent transactions in real-time using behavioral analysis, transaction patterns, and risk scoring. Provides decision services with fraud probability scores and recommended actions.</p>
      </div>
    </div>
  );
}

function Container473() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container472 />
        <Heading48 />
        <Paragraph197 />
      </div>
    </div>
  );
}

function Paragraph198() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph199() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container474() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph198 />
        <Paragraph199 />
      </div>
    </div>
  );
}

function Paragraph200() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph201() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container475() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph200 />
        <Paragraph201 />
      </div>
    </div>
  );
}

function Container476() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container474 />
      <Container475 />
    </div>
  );
}

function Container477() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[102.023px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Fraud Detection</p>
    </div>
  );
}

function Container478() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[110.02px] rounded-[12px] top-0 w-[111.75px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Real-time Scoring</p>
    </div>
  );
}

function Container479() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[120.727px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Behavioral Analysis</p>
    </div>
  );
}

function Container480() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container477 />
      <Container478 />
      <Container479 />
    </div>
  );
}

function Container481() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container476 />
        <Container480 />
      </div>
    </div>
  );
}

function ResourceCard38() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container473 />
      <Container481 />
    </div>
  );
}

function Icon81() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container482() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon81 />
      </div>
    </div>
  );
}

function Icon82() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container483() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon82 />
      </div>
    </div>
  );
}

function Container484() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container482 />
        <Container483 />
      </div>
    </div>
  );
}

function Heading49() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Insurance Fraud Detection ML Model</p>
      </div>
    </div>
  );
}

function Paragraph202() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[274px]">Advanced machine learning model for identifying potentially fraudulent insurance claims using pattern recognition, network analysis, and historical claim data. Includes investigator workflow integration.</p>
      </div>
    </div>
  );
}

function Container485() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container484 />
        <Heading49 />
        <Paragraph202 />
      </div>
    </div>
  );
}

function Paragraph203() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph204() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container486() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph203 />
        <Paragraph204 />
      </div>
    </div>
  );
}

function Paragraph205() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph206() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container487() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph205 />
        <Paragraph206 />
      </div>
    </div>
  );
}

function Container488() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container486 />
      <Container487 />
    </div>
  );
}

function Container489() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[102.023px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Fraud Detection</p>
    </div>
  );
}

function Container490() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[110.02px] rounded-[12px] top-0 w-[103.156px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Pattern Analysis</p>
    </div>
  );
}

function Container491() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[132.273px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Investigation Support</p>
    </div>
  );
}

function Container492() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container489 />
      <Container490 />
      <Container491 />
    </div>
  );
}

function Container493() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container488 />
        <Container492 />
      </div>
    </div>
  );
}

function ResourceCard39() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container485 />
      <Container493 />
    </div>
  );
}

function Icon83() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container494() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon83 />
      </div>
    </div>
  );
}

function Icon84() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #F1C21B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container495() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon84 />
      </div>
    </div>
  );
}

function Container496() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container494 />
        <Container495 />
      </div>
    </div>
  );
}

function Heading50() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Customer Segmentation ML Model</p>
      </div>
    </div>
  );
}

function Paragraph207() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[272px]">Integrated machine learning model for customer segmentation based on purchase behavior, demographics, and engagement patterns. Provides decision services with customer segment classifications and personalization scores.</p>
      </div>
    </div>
  );
}

function Container497() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container496 />
        <Heading50 />
        <Paragraph207 />
      </div>
    </div>
  );
}

function Paragraph208() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph209() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">RetailTech Solutions</p>
    </div>
  );
}

function Container498() {
  return (
    <div className="h-[43px] relative shrink-0 w-[127.695px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[127.695px]">
        <Paragraph208 />
        <Paragraph209 />
      </div>
    </div>
  );
}

function Paragraph210() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph211() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Third-party</p>
    </div>
  );
}

function Container499() {
  return (
    <div className="h-[43px] relative shrink-0 w-[70.914px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[70.914px]">
        <Paragraph210 />
        <Paragraph211 />
      </div>
    </div>
  );
}

function Container500() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container498 />
      <Container499 />
    </div>
  );
}

function Container501() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[120.359px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Customer Analytics</p>
    </div>
  );
}

function Container502() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[128.36px] rounded-[12px] top-0 w-[98.805px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Personalization</p>
    </div>
  );
}

function Container503() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[141.258px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Marketing Optimization</p>
    </div>
  );
}

function Container504() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container501 />
      <Container502 />
      <Container503 />
    </div>
  );
}

function Container505() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container500 />
        <Container504 />
      </div>
    </div>
  );
}

function ResourceCard40() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container497 />
      <Container505 />
    </div>
  );
}

function Icon85() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container506() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon85 />
      </div>
    </div>
  );
}

function Icon86() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container507() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon86 />
      </div>
    </div>
  );
}

function Container508() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container506 />
        <Container507 />
      </div>
    </div>
  );
}

function Heading51() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Predictive Maintenance ML Model</p>
      </div>
    </div>
  );
}

function Paragraph212() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[268px]">Integrated machine learning model for predicting equipment failures using sensor data, maintenance history, and operating conditions. Provides decision services with failure probability scores and maintenance recommendations.</p>
      </div>
    </div>
  );
}

function Container509() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container508 />
        <Heading51 />
        <Paragraph212 />
      </div>
    </div>
  );
}

function Paragraph213() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph214() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container510() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph213 />
        <Paragraph214 />
      </div>
    </div>
  );
}

function Paragraph215() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph216() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container511() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph215 />
        <Paragraph216 />
      </div>
    </div>
  );
}

function Container512() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container510 />
      <Container511 />
    </div>
  );
}

function Container513() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[141.836px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Predictive Maintenance</p>
    </div>
  );
}

function Container514() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[149.84px] rounded-[12px] top-0 w-[119.266px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Asset Management</p>
    </div>
  );
}

function Container515() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[131.805px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Downtime Prevention</p>
    </div>
  );
}

function Container516() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container513 />
      <Container514 />
      <Container515 />
    </div>
  );
}

function Container517() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container512 />
        <Container516 />
      </div>
    </div>
  );
}

function ResourceCard41() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container509 />
      <Container517 />
    </div>
  );
}

function Icon87() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container518() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon87 />
      </div>
    </div>
  );
}

function Icon88() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container519() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon88 />
      </div>
    </div>
  );
}

function Container520() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container518 />
        <Container519 />
      </div>
    </div>
  );
}

function Heading52() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Customer Churn Prediction ML Model</p>
      </div>
    </div>
  );
}

function Paragraph217() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[269px]">Machine learning model for identifying customers at risk of churning using usage patterns, billing history, service issues, and competitive analysis. Includes retention campaign recommendations.</p>
      </div>
    </div>
  );
}

function Container521() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container520 />
        <Heading52 />
        <Paragraph217 />
      </div>
    </div>
  );
}

function Paragraph218() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph219() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container522() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph218 />
        <Paragraph219 />
      </div>
    </div>
  );
}

function Paragraph220() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph221() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container523() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph220 />
        <Paragraph221 />
      </div>
    </div>
  );
}

function Container524() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container522 />
      <Container523 />
    </div>
  );
}

function Container525() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[105.969px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Churn Prediction</p>
    </div>
  );
}

function Container526() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[113.97px] rounded-[12px] top-0 w-[123.617px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Customer Retention</p>
    </div>
  );
}

function Container527() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[121.195px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Revenue Protection</p>
    </div>
  );
}

function Container528() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container525 />
      <Container526 />
      <Container527 />
    </div>
  );
}

function Container529() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container524 />
        <Container528 />
      </div>
    </div>
  );
}

function ResourceCard42() {
  return (
    <div className="[grid-area:2_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container521 />
      <Container529 />
    </div>
  );
}

function Icon89() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container530() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon89 />
      </div>
    </div>
  );
}

function Icon90() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container531() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon90 />
      </div>
    </div>
  );
}

function Container532() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container530 />
        <Container531 />
      </div>
    </div>
  );
}

function Heading53() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Energy Demand Forecasting ML Model</p>
      </div>
    </div>
  );
}

function Paragraph222() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[284px]">Machine learning model for predicting energy demand using weather data, historical consumption patterns, economic indicators, and seasonal factors. Supports both short-term and long-term forecasting.</p>
      </div>
    </div>
  );
}

function Container533() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container532 />
        <Heading53 />
        <Paragraph222 />
      </div>
    </div>
  );
}

function Paragraph223() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph224() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container534() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph223 />
        <Paragraph224 />
      </div>
    </div>
  );
}

function Paragraph225() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph226() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container535() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph225 />
        <Paragraph226 />
      </div>
    </div>
  );
}

function Container536() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container534 />
      <Container535 />
    </div>
  );
}

function Container537() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[126.766px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Demand Forecasting</p>
    </div>
  );
}

function Container538() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[134.77px] rounded-[12px] top-0 w-[112.031px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Capacity Planning</p>
    </div>
  );
}

function Container539() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[137.992px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Resource Optimization</p>
    </div>
  );
}

function Container540() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container537 />
      <Container538 />
      <Container539 />
    </div>
  );
}

function Container541() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container536 />
        <Container540 />
      </div>
    </div>
  );
}

function ResourceCard43() {
  return (
    <div className="[grid-area:2_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container533 />
      <Container541 />
    </div>
  );
}

function ResourceGrid6() {
  return (
    <div className="h-[664px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[664px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard38 />
          <ResourceCard39 />
          <ResourceCard40 />
          <ResourceCard41 />
          <ResourceCard42 />
          <ResourceCard43 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[735px] items-start left-0 top-[4665px] w-[1765px]" data-name="ResourceSections">
      <Container469 />
      <ResourceGrid6 />
    </div>
  );
}

function Heading54() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">Optimization Models</p>
    </div>
  );
}

function Paragraph227() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">Mathematical optimization models for complex planning and resource allocation</p>
    </div>
  );
}

function Container542() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading54 />
      <Paragraph227 />
    </div>
  );
}

function Icon91() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container543() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon91 />
      </div>
    </div>
  );
}

function Icon92() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container544() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon92 />
      </div>
    </div>
  );
}

function Container545() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container543 />
        <Container544 />
      </div>
    </div>
  );
}

function Heading55() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Supply Chain Optimization Model</p>
      </div>
    </div>
  );
}

function Paragraph228() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[277px]">Mathematical optimization model for supply chain planning including inventory optimization, transportation routing, and capacity planning. Supports multi-objective optimization.</p>
      </div>
    </div>
  );
}

function Container546() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container545 />
        <Heading55 />
        <Paragraph228 />
      </div>
    </div>
  );
}

function Paragraph229() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph230() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container547() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph229 />
        <Paragraph230 />
      </div>
    </div>
  );
}

function Paragraph231() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph232() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container548() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph231 />
        <Paragraph232 />
      </div>
    </div>
  );
}

function Container549() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container547 />
      <Container548 />
    </div>
  );
}

function Container550() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[135.727px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Supply Chain Planning</p>
    </div>
  );
}

function Container551() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[143.73px] rounded-[12px] top-0 w-[119.422px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Route Optimization</p>
    </div>
  );
}

function Container552() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[141.281px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Inventory Management</p>
    </div>
  );
}

function Container553() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container550 />
      <Container551 />
      <Container552 />
    </div>
  );
}

function Container554() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container549 />
        <Container553 />
      </div>
    </div>
  );
}

function ResourceCard44() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container546 />
      <Container554 />
    </div>
  );
}

function Icon93() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container555() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon93 />
      </div>
    </div>
  );
}

function Icon94() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container556() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon94 />
      </div>
    </div>
  );
}

function Container557() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container555 />
        <Container556 />
      </div>
    </div>
  );
}

function Heading56() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Resource Allocation Optimization Model</p>
      </div>
    </div>
  );
}

function Paragraph233() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[286px]">Linear programming model for optimal resource allocation across projects, departments, or facilities. Includes constraint handling and scenario analysis.</p>
      </div>
    </div>
  );
}

function Container558() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container557 />
        <Heading56 />
        <Paragraph233 />
      </div>
    </div>
  );
}

function Paragraph234() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph235() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container559() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph234 />
        <Paragraph235 />
      </div>
    </div>
  );
}

function Paragraph236() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph237() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container560() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph236 />
        <Paragraph237 />
      </div>
    </div>
  );
}

function Container561() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container559 />
      <Container560 />
    </div>
  );
}

function Container562() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[115.93px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Resource Planning</p>
    </div>
  );
}

function Container563() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[123.93px] rounded-[12px] top-0 w-[135.617px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Capacity Management</p>
    </div>
  );
}

function Container564() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[126.305px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Budget Optimization</p>
    </div>
  );
}

function Container565() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container562 />
      <Container563 />
      <Container564 />
    </div>
  );
}

function Container566() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container561 />
        <Container565 />
      </div>
    </div>
  );
}

function ResourceCard45() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container558 />
      <Container566 />
    </div>
  );
}

function ResourceGrid7() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[320px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard44 />
          <ResourceCard45 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[391px] items-start left-0 top-[5432px] w-[1765px]" data-name="ResourceSections">
      <Container542 />
      <ResourceGrid7 />
    </div>
  );
}

function Heading57() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#161616] text-[20px] text-nowrap top-0 whitespace-pre">Rules</p>
    </div>
  );
}

function Paragraph238() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] whitespace-pre">Business rules for consistent decision-making and compliance</p>
    </div>
  );
}

function Container567() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[55px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading57 />
      <Paragraph238 />
    </div>
  );
}

function Icon95() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container568() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon95 />
      </div>
    </div>
  );
}

function Icon96() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container569() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon96 />
      </div>
    </div>
  );
}

function Container570() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container568 />
        <Container569 />
      </div>
    </div>
  );
}

function Heading58() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Tax Calculation Rules</p>
      </div>
    </div>
  );
}

function Paragraph239() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[272px]">Comprehensive tax calculation rules supporting multiple jurisdictions, tax types, and exemptions. Includes audit trails and regulatory compliance features.</p>
      </div>
    </div>
  );
}

function Container571() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container570 />
        <Heading58 />
        <Paragraph239 />
      </div>
    </div>
  );
}

function Paragraph240() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph241() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container572() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph240 />
        <Paragraph241 />
      </div>
    </div>
  );
}

function Paragraph242() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph243() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container573() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph242 />
        <Paragraph243 />
      </div>
    </div>
  );
}

function Container574() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container572 />
      <Container573 />
    </div>
  );
}

function Container575() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[97.75px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Tax Calculation</p>
    </div>
  );
}

function Container576() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[105.75px] rounded-[12px] top-0 w-[79.648px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Compliance</p>
    </div>
  );
}

function Container577() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[117.836px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Audit Management</p>
    </div>
  );
}

function Container578() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container575 />
      <Container576 />
      <Container577 />
    </div>
  );
}

function Container579() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container574 />
        <Container578 />
      </div>
    </div>
  );
}

function ResourceCard46() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container571 />
      <Container579 />
    </div>
  );
}

function Icon97() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container580() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon97 />
      </div>
    </div>
  );
}

function Icon98() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container581() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon98 />
      </div>
    </div>
  );
}

function Container582() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container580 />
        <Container581 />
      </div>
    </div>
  );
}

function Heading59() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Benefits Eligibility Rules</p>
      </div>
    </div>
  );
}

function Paragraph244() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[273px]">Government benefits eligibility rules engine supporting multiple programs, complex criteria, and appeals processes. Includes fraud detection capabilities.</p>
      </div>
    </div>
  );
}

function Container583() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container582 />
        <Heading59 />
        <Paragraph244 />
      </div>
    </div>
  );
}

function Paragraph245() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph246() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container584() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph245 />
        <Paragraph246 />
      </div>
    </div>
  );
}

function Paragraph247() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph248() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container585() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph247 />
        <Paragraph248 />
      </div>
    </div>
  );
}

function Container586() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container584 />
      <Container585 />
    </div>
  );
}

function Container587() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[133.461px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Eligibility Assessment</p>
    </div>
  );
}

function Container588() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[141.46px] rounded-[12px] top-0 w-[122.062px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Benefits Processing</p>
    </div>
  );
}

function Container589() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[102.023px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Fraud Detection</p>
    </div>
  );
}

function Container590() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container587 />
      <Container588 />
      <Container589 />
    </div>
  );
}

function Container591() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container586 />
        <Container590 />
      </div>
    </div>
  );
}

function ResourceCard47() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container583 />
      <Container591 />
    </div>
  );
}

function Icon99() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container592() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon99 />
      </div>
    </div>
  );
}

function Icon100() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container593() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon100 />
      </div>
    </div>
  );
}

function Container594() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container592 />
        <Container593 />
      </div>
    </div>
  );
}

function Heading60() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Invoice Processing Rules</p>
      </div>
    </div>
  );
}

function Paragraph249() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[260px]">Comprehensive business rules for invoice validation including vendor verification, purchase order matching, tax calculation, and compliance checking.</p>
      </div>
    </div>
  );
}

function Container595() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container594 />
        <Heading60 />
        <Paragraph249 />
      </div>
    </div>
  );
}

function Paragraph250() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph251() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container596() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph250 />
        <Paragraph251 />
      </div>
    </div>
  );
}

function Paragraph252() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph253() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container597() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph252 />
        <Paragraph253 />
      </div>
    </div>
  );
}

function Container598() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container596 />
      <Container597 />
    </div>
  );
}

function Container599() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[112.172px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Invoice Validation</p>
    </div>
  );
}

function Container600() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[120.17px] rounded-[12px] top-0 w-[118.211px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Vendor Verification</p>
    </div>
  );
}

function Container601() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[131.852px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Compliance Checking</p>
    </div>
  );
}

function Container602() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container599 />
      <Container600 />
      <Container601 />
    </div>
  );
}

function Container603() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container598 />
        <Container602 />
      </div>
    </div>
  );
}

function ResourceCard48() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container595 />
      <Container603 />
    </div>
  );
}

function Icon101() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p7dd1a80} fill="var(--fill-0, #6F6F6F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container604() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[32px]">
        <Icon101 />
      </div>
    </div>
  );
}

function Icon102() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25b4a700} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container605() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon102 />
      </div>
    </div>
  );
}

function Container606() {
  return (
    <div className="h-[32px] relative shrink-0 w-[286px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start justify-between relative w-[286px]">
        <Container604 />
        <Container605 />
      </div>
    </div>
  );
}

function Heading61() {
  return (
    <div className="h-[21px] relative shrink-0 w-[286px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:SemiBold',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Payment Authorization Rules</p>
      </div>
    </div>
  );
}

function Paragraph254() {
  return (
    <div className="h-[63px] relative shrink-0 w-[286px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[63px] overflow-clip relative rounded-[inherit] w-[286px]">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] top-[-1px] w-[268px]">Multi-level authorization rules for payment approvals based on amount thresholds, budget availability, and approval authority matrix.</p>
      </div>
    </div>
  );
}

function Container607() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-0 pl-[16px] pr-0 pt-[16px] relative w-[318px]">
        <Container606 />
        <Heading61 />
        <Paragraph254 />
      </div>
    </div>
  );
}

function Paragraph255() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Created by</p>
    </div>
  );
}

function Paragraph256() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">IBM</p>
    </div>
  );
}

function Container608() {
  return (
    <div className="h-[43px] relative shrink-0 w-[58.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[58.227px]">
        <Paragraph255 />
        <Paragraph256 />
      </div>
    </div>
  );
}

function Paragraph257() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-0 not-italic text-[#6f6f6f] text-[12px] text-nowrap top-0 whitespace-pre">Type</p>
    </div>
  );
}

function Paragraph258() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] whitespace-pre">Deploy on demand</p>
    </div>
  );
}

function Container609() {
  return (
    <div className="h-[43px] relative shrink-0 w-[117.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[43px] items-start relative w-[117.742px]">
        <Paragraph257 />
        <Paragraph258 />
      </div>
    </div>
  );
}

function Container610() {
  return (
    <div className="content-stretch flex h-[43px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container608 />
      <Container609 />
    </div>
  );
}

function Container611() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-0 w-[138.797px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Payment Authorization</p>
    </div>
  );
}

function Container612() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-[146.8px] rounded-[12px] top-0 w-[97.039px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Budget Control</p>
    </div>
  );
}

function Container613() {
  return (
    <div className="absolute bg-[rgba(15,98,254,0.1)] h-[26px] left-0 rounded-[12px] top-[34px] w-[137.203px]" data-name="Container">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[18px] left-[8px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">Approval Management</p>
    </div>
  );
}

function Container614() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Container611 />
      <Container612 />
      <Container613 />
    </div>
  );
}

function Container615() {
  return (
    <div className="h-[135px] relative shrink-0 w-[318px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-[135px] items-start px-[16px] py-0 relative w-[318px]">
        <Container610 />
        <Container614 />
      </div>
    </div>
  );
}

function ResourceCard49() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0" data-name="ResourceCard">
      <div aria-hidden="true" className="absolute border border-[#c6c6c6] border-solid inset-0 pointer-events-none" />
      <Container607 />
      <Container615 />
    </div>
  );
}

function ResourceGrid8() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="ResourceGrid">
      <div className="size-full">
        <div className="box-border gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[320px] pl-0 pr-[413px] py-0 relative w-full">
          <ResourceCard46 />
          <ResourceCard47 />
          <ResourceCard48 />
          <ResourceCard49 />
        </div>
      </div>
    </div>
  );
}

function ResourceSections8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[391px] items-start left-0 top-[5855px] w-[1765px]" data-name="ResourceSections">
      <Container567 />
      <ResourceGrid8 />
    </div>
  );
}

function ResourcesContainer() {
  return (
    <div className="absolute h-[6278px] left-[24px] overflow-clip top-[97px] w-[1765px]" data-name="ResourcesContainer">
      <Container6 />
      <ResourceSections />
      <ResourceSections1 />
      <ResourceSections2 />
      <ResourceSections3 />
      <ResourceSections4 />
      <ResourceSections5 />
      <ResourceSections6 />
      <ResourceSections7 />
      <ResourceSections8 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="h-[6375px] overflow-clip relative shrink-0 w-full" data-name="MainContent">
      <SearchSection />
      <ResourcesContainer />
    </div>
  );
}

function ResourceHubPage() {
  return (
    <div className="absolute bg-[#f4f4f4] box-border content-stretch flex flex-col h-[6527px] items-start left-0 pb-0 pt-[152px] px-[24px] top-0 w-[1861px]" data-name="ResourceHubPage">
      <MainContent />
    </div>
  );
}

function Container616() {
  return (
    <div className="absolute h-[104px] left-0 top-0 w-[1861px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container617() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[126.781px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#0f62fe] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph259() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#161616] text-[14px] text-nowrap top-[-1px] tracking-[0.16px] whitespace-pre">Sample Assets</p>
      </div>
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[16px] overflow-clip top-[11px] w-[94.781px]" data-name="TextOverflow">
      <Paragraph259 />
    </div>
  );
}

function TabsItems() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[126.781px]" data-name="TabsItems">
      <Container617 />
      <TextOverflow />
    </div>
  );
}

function Container618() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[138.234px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph260() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] tracking-[0.16px] whitespace-pre">Sample Prompts</p>
      </div>
    </div>
  );
}

function TextOverflow1() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[16px] overflow-clip top-[11px] w-[106.234px]" data-name="TextOverflow">
      <Paragraph260 />
    </div>
  );
}

function TabsItems1() {
  return (
    <div className="absolute h-[40px] left-[127.78px] top-0 w-[138.234px]" data-name="TabsItems">
      <Container618 />
      <TextOverflow1 />
    </div>
  );
}

function Container619() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[133.555px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph261() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] tracking-[0.16px] whitespace-pre">Sample Policies</p>
      </div>
    </div>
  );
}

function TextOverflow2() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[16px] overflow-clip top-[11px] w-[101.555px]" data-name="TextOverflow">
      <Paragraph261 />
    </div>
  );
}

function TabsItems2() {
  return (
    <div className="absolute h-[40px] left-[267.02px] top-0 w-[133.555px]" data-name="TabsItems">
      <Container619 />
      <TextOverflow2 />
    </div>
  );
}

function Container620() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[100.945px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph262() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#6f6f6f] text-[14px] text-nowrap top-[-1px] tracking-[0.16px] whitespace-pre">Monitoring</p>
      </div>
    </div>
  );
}

function TextOverflow3() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[16px] overflow-clip top-[11px] w-[68.945px]" data-name="TextOverflow">
      <Paragraph262 />
    </div>
  );
}

function TabsItems3() {
  return (
    <div className="absolute h-[40px] left-[401.57px] top-0 w-[100.945px]" data-name="TabsItems">
      <Container620 />
      <TextOverflow3 />
    </div>
  );
}

function Tabs() {
  return (
    <div className="absolute h-[40px] left-[16px] overflow-clip top-0 w-[1255px]" data-name="Tabs">
      <TabsItems />
      <TabsItems1 />
      <TabsItems2 />
      <TabsItems3 />
    </div>
  );
}

function UtilitiesSpacerComponentHorizontalSpacing0516PxOff() {
  return <div className="absolute h-[40px] left-0 top-0 w-[16px]" data-name="UtilitiesSpacerComponentHorizontalSpacing0516PxOff" />;
}

function PageLevelNav() {
  return (
    <div className="absolute h-[40px] left-0 top-[64px] w-[1861px]" data-name="PageLevelNav">
      <Tabs />
      <UtilitiesSpacerComponentHorizontalSpacing0516PxOff />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[36px] items-start overflow-clip relative shrink-0 w-full" data-name="Heading 2">
      <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[#161616] text-[28px] text-nowrap whitespace-pre">Resource hub</p>
    </div>
  );
}

function HeaderWrapper() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[32px] overflow-clip top-[16px] w-[172.18px]" data-name="HeaderWrapper">
      <Heading2 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-0 mix-blend-multiply" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Vector" style={{ mixBlendMode: "multiply" }}>
            <path d="M16 0H0V16H16V0Z" fill="var(--fill-0, white)" fillOpacity="0.01" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path d={svgPaths.p22ea8600} fill="var(--fill-0, #0F62FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon103() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group1 />
    </div>
  );
}

function Add() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[90.48px] overflow-clip size-[16px] top-[13.5px]" data-name="Add">
      <Icon103 />
    </div>
  );
}

function Paragraph263() {
  return (
    <div className="absolute h-[21px] left-[16px] top-[11px] w-[42.477px]" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[#0f62fe] text-[14px] text-nowrap top-[-1px] tracking-[0.16px] whitespace-pre">button</p>
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="absolute h-[43px] left-0 overflow-clip top-0 w-[122.477px]" data-name="ButtonContent1">
      <Add />
      <Paragraph263 />
    </div>
  );
}

function Container621() {
  return (
    <div className="absolute h-[43px] left-0 overflow-clip top-0 w-[122.477px]" data-name="Container">
      <ButtonContent1 />
    </div>
  );
}

function Container622() {
  return (
    <div className="absolute h-[43px] left-0 top-0 w-[122.477px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#0f62fe] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[43px] left-[1722.52px] top-[16px] w-[122.477px]" data-name="Button">
      <Container621 />
      <Container622 />
    </div>
  );
}

function PageTitleGroup() {
  return (
    <div className="absolute h-[64px] left-0 top-0 w-[1861px]" data-name="PageTitleGroup">
      <HeaderWrapper />
      <Button1 />
    </div>
  );
}

function PageHeaderGroup() {
  return (
    <div className="absolute bg-white h-[104px] left-0 top-[48px] w-[1861px]" data-name="PageHeaderGroup">
      <Container616 />
      <PageLevelNav />
      <PageTitleGroup />
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute contents inset-[18.75%_12.5%]" data-name="Vector">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-[18.75%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 2">
          <path d="M15 0H0V1.25H15V0Z" fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[18.75%] left-[12.5%] right-[12.5%] top-3/4" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 2">
          <path d="M15 0H0V1.25H15V0Z" fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.5%_12.5%_56.25%_12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 2">
          <path d="M15 0H0V1.25H15V0Z" fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[56.25%_12.5%_37.5%_12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 2">
          <path d="M15 0H0V1.25H15V0Z" fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute contents inset-0" data-name="Menu">
      <div className="absolute inset-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d="M20 0H0V20H20V0Z" fill="var(--fill-0, white)" fillOpacity="0.01" id="Vector" />
        </svg>
      </div>
      <Vector />
    </div>
  );
}

function Icon104() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Menu />
    </div>
  );
}

function Menu1() {
  return (
    <div className="absolute bg-[#393939] box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[14px] px-[14px] size-[48px] top-0" data-name="Menu">
      <Icon104 />
    </div>
  );
}

function Container623() {
  return (
    <div className="absolute left-0 size-[48px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function UtilityUtility() {
  return (
    <div className="absolute left-0 size-[48px] top-0" data-name="UtilityUtility">
      <Menu1 />
      <Container623 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[21px] left-[52px] top-[13.5px] w-[32.719px]" data-name="Text">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-[-1px] whitespace-pre">{`IBM  `}</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[21px] left-[88.72px] top-[13.5px] w-[131.773px]" data-name="Text">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-[-1px] whitespace-pre">Decision Intelligence</p>
    </div>
  );
}

function Container624() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[268.492px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ProductNameProductName() {
  return (
    <div className="absolute bg-[#393939] h-[48px] left-0 top-0 w-[268.492px]" data-name="ProductNameProductName">
      <UtilityUtility />
      <Text />
      <Text1 />
      <Container624 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[21px] left-[16px] top-[12px] w-[88.984px]" data-name="Text">
      <p className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] left-[44px] not-italic text-[14px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%] whitespace-pre">Give feedback</p>
    </div>
  );
}

function Container625() {
  return (
    <div className="absolute h-[45px] left-0 top-0 w-[120.984px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function LinkLink() {
  return (
    <div className="absolute bg-[#393939] h-[45px] left-[1596.02px] top-[1.5px] w-[120.984px]" data-name="LinkLink">
      <Text2 />
      <Container625 />
    </div>
  );
}

function Vector1() {
  return (
    <div className="absolute contents inset-[6.25%_12.5%_3.13%_12.5%]" data-name="Vector">
      <div className="absolute inset-[37.5%_43.75%_3.13%_12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 12">
          <path d={svgPaths.p16d45800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[15.63%] left-1/4 right-[31.25%] top-1/4" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 12">
          <path d={svgPaths.p16d45800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[43.75%] left-1/2 right-1/4 top-1/2" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
          <path d="M5 0H0V1.25H5V0Z" fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[6.25%_12.5%_28.13%_37.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
          <path d={svgPaths.p2c969c80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DocumentMultiple02() {
  return (
    <div className="absolute contents inset-0" data-name="Document--multiple-02">
      <div className="absolute inset-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d="M20 0H0V20H20V0Z" fill="var(--fill-0, white)" fillOpacity="0.01" id="Vector" />
        </svg>
      </div>
      <Vector1 />
    </div>
  );
}

function Icon105() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <DocumentMultiple02 />
    </div>
  );
}

function DocumentMultiple3() {
  return (
    <div className="absolute bg-[#393939] box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[14px] px-[14px] size-[48px] top-0" data-name="DocumentMultiple02">
      <Icon105 />
    </div>
  );
}

function Container626() {
  return (
    <div className="absolute left-0 size-[48px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function UtilityUtility1() {
  return (
    <div className="absolute left-[1717px] size-[48px] top-0" data-name="UtilityUtility1">
      <DocumentMultiple3 />
      <Container626 />
    </div>
  );
}

function Vector2() {
  return (
    <div className="absolute contents inset-[6.25%]" data-name="Vector">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.pbfe8e50} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[68.75%_45.31%_21.88%_45.31%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <path d={svgPaths.p11117400} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[39.06%] left-[34.38%] right-[32.81%] top-1/4" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 8">
          <path d={svgPaths.pdeb5900} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Help() {
  return (
    <div className="absolute contents inset-0" data-name="Help">
      <div className="absolute inset-0 mix-blend-multiply" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Vector" style={{ mixBlendMode: "multiply" }}>
            <path d="M20 0H0V20H20V0Z" fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
      <Vector2 />
    </div>
  );
}

function Icon106() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Help />
    </div>
  );
}

function Help1() {
  return (
    <div className="absolute bg-[#393939] box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[14px] px-[14px] size-[48px] top-0" data-name="Help">
      <Icon106 />
    </div>
  );
}

function Container627() {
  return (
    <div className="absolute left-0 size-[48px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function UtilityUtility2() {
  return (
    <div className="absolute left-[1765px] size-[48px] top-0" data-name="UtilityUtility2">
      <Help1 />
      <Container627 />
    </div>
  );
}

function Container628() {
  return <div className="absolute bg-[#393939] left-0 size-[48px] top-0" data-name="Container" />;
}

function Text3() {
  return (
    <div className="h-[18.5px] relative shrink-0 w-[21.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[18.5px] items-start relative w-[21.875px]">
        <p className="font-['IBM_Plex_Sans:Regular',_sans-serif] leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">DW</p>
      </div>
    </div>
  );
}

function Initials() {
  return (
    <div className="absolute bg-[#24a148] content-stretch flex items-center justify-center left-[8px] rounded-[1.67772e+07px] size-[32px] top-[8px]" data-name="Initials">
      <Text3 />
    </div>
  );
}

function Container629() {
  return (
    <div className="absolute left-0 size-[48px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c6c6c6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function UserProfileImage() {
  return (
    <div className="absolute left-[1813px] size-[48px] top-0" data-name="UserProfileImage">
      <Container628 />
      <Initials />
      <Container629 />
    </div>
  );
}

function GlobalHeader() {
  return (
    <div className="absolute bg-[#393939] h-[48px] left-0 top-0 w-[1861px]" data-name="GlobalHeader">
      <ProductNameProductName />
      <LinkLink />
      <UtilityUtility1 />
      <UtilityUtility2 />
      <UserProfileImage />
    </div>
  );
}

export default function DecisionIntelligenceResourceHub() {
  return (
    <div className="bg-white relative size-full" data-name="Decision Intelligence Resource Hub">
      <ResourceHubPage />
      <PageHeaderGroup />
      <GlobalHeader />
    </div>
  );
}