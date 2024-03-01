"use client";
import { BottomSheet } from "react-spring-bottom-sheet";

import "react-spring-bottom-sheet/dist/style.css";
import { useToggleBooking } from "@/app/lib/store";
import ReservationForm from "./Reservation/ReservationForm";
import ThankYou from "./Reservation/ThankYou";
import { useState } from "react";

const StickyBottom = () => {
    const open = useToggleBooking((state) => state.open);
    const setOpen = useToggleBooking((state) => state.setOpen);
    const [page, setPage] = useState(0);

    function onDismiss() {
        setOpen(false);
        setPage(0);
    }

    return (
        <BottomSheet onDismiss={onDismiss} open={open}>
            {page === 0 ? <ReservationForm setPage={setPage} /> : null}
            {page === 1 ? <ThankYou setPage={setPage} /> : null}
        </BottomSheet>
    );
};

export default StickyBottom;
