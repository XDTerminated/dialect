"use client";

import NightmodeButton from "@/components/ui/NightmodeButton";
import GetData from "@/components/getData";
import TranslatorBoxes from "@/components/TranslatorBoxes";

export default function Home() {
    return (
        <>
            {/* <Dropdown label={selectedLabel} items={dropdownItems} onSelect={(label: string) => setSelectedLabel(label)} /> */}
            <NightmodeButton />
            <TranslatorBoxes />
            <GetData />
        </>
    );
}
