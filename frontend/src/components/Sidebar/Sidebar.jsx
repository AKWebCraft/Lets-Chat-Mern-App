import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import { BiLogOut } from "react-icons/bi";
import ConversationList from "../ConversationList/ConversationList";
import { logout } from "../../store/featuers/userSlice";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/featuers/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullName } = useSelector((state) => state.user);

  const handleLogout = async () => {
    const response = await logout();

    if (response.status === 200) {
      dispatch(resetUser());
      navigate("/login");
    }
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <div className="flex mb-3">
        <BsPersonCircle className="w-6 h-6 text-white" />
        <p className="text-white font-serif ms-2">{fullName}</p>
      </div>
      <SearchInput />
      <div className="divider px-3"></div>
      <ConversationList />
      <BiLogOut
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
