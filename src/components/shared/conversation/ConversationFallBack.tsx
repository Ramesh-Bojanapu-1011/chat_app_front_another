import { Card } from "@/components/ui/card";

type Props = {};

const ConversationFallBack = (props: Props) => {
  return (
    <Card className="items-center justify-center hidden w-full h-full p-2 lg:flex ">
      <h1 className="text-2xl font-semibold tracking-tight">
        Select a conversation
      </h1>
    </Card>
  );
};

export default ConversationFallBack;
