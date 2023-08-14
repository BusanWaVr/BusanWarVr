import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import GuideScheduledBoard from "./GuideScheduledBoard";
import GuideEndedBoard from "./GuideEndedBoard";
import GuideCanceledBoard from "./GuideCanceledBoard";

function GuideTourNavbar() {
  return (
    <div className="flex w-full flex-col items-center">
      <Tabs variant="underlined" aria-label="Tabs variants" color="primary">
        <Tab key="scheduled" title="예정된 투어">
          <GuideScheduledBoard />
        </Tab>
        <Tab key="ended" title="지난 투어">
          <GuideEndedBoard />
        </Tab>
        <Tab key="canceled" title="취소된 투어">
          <GuideCanceledBoard />
        </Tab>
      </Tabs>
    </div>
  );
}

export default GuideTourNavbar;
