"use client";

import useIsClickOut from "@/app/lib/hooks/useIsClickOut";
import { useToggle } from "@/app/lib/store";
import * as React from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
    const [mounted, setMounted] = React.useState(false);
    const open = useToggle((state) => state.open);
    const setOpen = useToggle((state) => state.setOpen);
    const [eleCallBack] = useIsClickOut(setOpen);

    React.useEffect(() => setMounted(true), []);

    return open && mounted
        ? createPortal(<div ref={eleCallBack}>{children}</div>, document.body)
        : createPortal(<>{children}</>, document.body);
}
