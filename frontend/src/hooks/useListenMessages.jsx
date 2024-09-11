import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../store/featuers/conversationSlice";
import { useState } from "react";
import notificationSound from "../assets/sounds/notification.mp3";

function useListenMessages() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState({});
  const { socket } = useSocketContext();
  const { selectedConversation } = useSelector((state) => state.conversation);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setMsg(newMessage);
      const id = selectedConversation._id;
      dispatch(getChat(id));
    });

    return () => socket?.off("newMessage");
  }, [socket, msg]);
}

export default useListenMessages;
