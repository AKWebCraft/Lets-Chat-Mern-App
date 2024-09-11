import React from "react";
import { useSelector } from "react-redux";
import { Time } from "../../utils/Time";

const Message = ({ message }) => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { profilePic } = useSelector((state) => state.user);
  const { _id } = useSelector((state) => state.user);
  const fromMe = message.senderId === _id;
  const formattedTime = Time(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profile = fromMe ? profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profile} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
