import Image from "next/image";
import LanguageDialogueGenerator from "./components/LanguageDialogueGenerator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* ... (rest of the existing content) ... */}
      </div>

      <LanguageDialogueGenerator />

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* ... (existing grid content) ... */}
      </div>
    </main>
  );
}
