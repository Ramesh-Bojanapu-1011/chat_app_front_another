import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ModeToggle />
      <a href="/conversations">
        <Button>conversation</Button>
      </a>
    </div>
  );
}
