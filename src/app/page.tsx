import NightmodeButton from "@/components/ui/NightmodeButton";
import GetData from "@/components/getData";
import TranslatorBoxes from "@/components/TranslatorBoxes";

export default function Home() {
    return (
        <>
            <NightmodeButton />
            <TranslatorBoxes />
            <GetData />
        </>
    );
}
