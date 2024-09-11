import React from "react";

const CheckBox = ({ handleCheckBox, gender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            gender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text text-white">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={gender === "male"}
            onChange={() => handleCheckBox("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            gender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-white">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={gender === "female"}
            onChange={() => handleCheckBox("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
