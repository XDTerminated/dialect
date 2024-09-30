"use client";

import GetData from "@/components/getData";
import TranslatorBoxes from "@/components/TranslatorBoxes";
import TitleBar from "@/components/TitleBar";

export default function Home() {
    return (
        <>
            {/* <Dropdown label={selectedLabel} items={dropdownItems} onSelect={(label: string) => setSelectedLabel(label)} /> */}
            <TitleBar />
            <TranslatorBoxes />
            <GetData />
        </>
    );
}
