import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";


function DateRangePickerComp(props) {
    const [value, setValue] = useState([null, null]);

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: "Check-in", end: "Check-out" }}
        >
            <DateRangePicker
                value={props.dateRange}
                onChange={newValue => {
                    props.setDateRange(newValue);
                }}
                renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                )}
            />
        </LocalizationProvider>
    )
}

export default DateRangePickerComp;