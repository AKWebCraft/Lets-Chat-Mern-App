import React from "react";
import Conversation from "../Conversation/Conversation";
import { getConversations } from "../../store/featuers/conversationSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ConversationList = () => {
  const dispatch = useDispatch();

  const { conversations, loading } = useSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default ConversationList;
