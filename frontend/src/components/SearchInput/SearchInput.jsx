import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../store/featuers/conversationSlice";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.conversation);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      dispatch(setConversation(conversation));
      setSearch("");
    } else toast.error("No such user found!");
  };
  return (
    <form className="flex items-center gap-2 mt-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
