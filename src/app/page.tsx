import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ModeToggle />
      <Link href="/conversations">
        <Button>conversation</Button>
      </Link>
    </div>
  );
}
