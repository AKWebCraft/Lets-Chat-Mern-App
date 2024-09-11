import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../store/featuers/conversationSlice";
import { useSocketContext } from "../../context/SocketContext";
import { FaRocketchat } from "react-icons/fa6";

const Conversation = ({ conversation }) => {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.conversation);

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const conversationHandler = () => {
    dispatch(setConversation(conversation));
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={conversationHandler}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-500 text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">
              <FaRocketchat className="text-white" />
            </span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
