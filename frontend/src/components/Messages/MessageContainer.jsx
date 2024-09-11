import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../store/featuers/conversationSlice";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { fullName } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setConversation(null));
  }, [setConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected fullName={fullName} />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
