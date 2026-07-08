import svgPaths from "./svg-5q64gsf1vi";
import ResourceHubImported from "./ResourceHub-2297-7065";
import { WhatsNewTile } from "../components/WhatsNewTile";

function Start() {
  return <div className="shrink-0 size-[0.001px]" data-name="Start" />;
}

function End() {
  return <div className="shrink-0 size-[0.001px]" data-name="End" />;
}

function Resizer() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[380px] items-start mix-blend-multiply relative shrink-0" data-name="Resizer">
      <Start />
      <End />
    </div>
  );
}

function ResourceHub() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_8] relative self-start shrink-0" data-name="Resource Hub">
      <ResourceHubImported />
    </div>
  );
}

function WhatsNew() {
  return (
    <div className="[grid-area:1_/_9_/_auto_/_span_4] relative shrink-0 h-full" data-name="What's new">
      <WhatsNewTile />
    </div>
  );
}

function GridContainer() {
  return (
    <div className="basis-0 gap-[16px] grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] grow min-h-px min-w-px overflow-clip relative self-stretch shrink-0" data-name="grid container">
      <ResourceHub />
      <WhatsNew />
    </div>
  );
}

export default function HomePageRecentProjectsProjectGrid4X2() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="Home page • Recent Projects -> Project grid (4x2)">
      <Resizer />
      <GridContainer />
    </div>
  );
}
