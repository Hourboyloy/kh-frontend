import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

export default function DatePickerDob({ setMyProfile, myProfile }) {
  const [selectedDate, setSelectedDate] = useState(
    myProfile?.dob ? dayjs(myProfile?.dob) : null
  );
  const [error, setError] = useState("");

  const handleDateChange = (newDate) => {
    if (newDate && !dayjs(newDate).isValid()) {
      setError("Invalid date format. Please use YYYY-MM-DD.");
      setMyProfile((prev) => ({
        ...prev,
        dob: "",
      }));
    } else {
      setSelectedDate(newDate);
      setError("");
      setMyProfile((prev) => ({
        ...prev,
        dob: newDate ? newDate.format("YYYY-MM-DD") : "",
      }));
    }
  };

  return (
    <div className="">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="">
          <DateField
            value={selectedDate}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                fontSize: "15px",
                padding: "12px 0",
                height: "38px",
                // color: "#6B7280",
              },
              "& .MuiInputLabel-root": {
                color: "#290000",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                "& fieldset": {
                  borderColor: error ? "#f87171" : "#cdd1d7", // Red border for error
                },
                "&:hover fieldset": {
                  borderColor: error ? "#f87171" : "#cdd1d7",
                },
                "&.Mui-focused fieldset": {
                  borderColor: error ? "#f87171" : "#93c5fd", // Blue or red for focused border
                },
                "&.Mui-focused": {
                  boxShadow: error ? "0 0 0 4px #FECACA" : "0 0 0 4px #C9DFFF", // Ring effect for error
                },
              },
            }}
          />
          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm mt-[3px] text-[12px] tracking-wide">
              {error}
            </p>
          )}
        </div>
      </LocalizationProvider>
    </div>
  );
}
