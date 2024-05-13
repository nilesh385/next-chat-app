"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  return conversation === undefined ? (
    <div className="h-full w-full flex justify-center items-center">
      <Loader2 className="h-10 w-10" />
    </div>
  ) : conversation === null ? (
    <div className="h-full w-full flex justify-center items-center">
      Conversation not found
    </div>
  ) : (
    <ConversationContainer>
      <Header
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember.imageUrl
        }
        name={
          conversation.isGroup
            ? conversation.name || ""
            : conversation.otherMember.username || ""
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
