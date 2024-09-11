import React from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../../store/featuers/conversationSlice";
import { useEffect } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const dispatch = useDispatch();

  const { selectedConversation, messages, loading, chat } = useSelector(
    (state) => state.conversation
  );
  useListenMessages();

  useEffect(() => {
    const getChatApi = () => {
      const id = selectedConversation._id;

      dispatch(getChat(id));
    };

    if (selectedConversation?._id) getChatApi();
  }, [selectedConversation?._id, messages]);

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, selectedConversation?._id]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        chat.length > 0 &&
        chat.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && chat.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
