"use client";

import useIsClickOut from "@/app/lib/hooks/useIsClickOut";
import { useMounted } from "@/app/lib/hooks/useMounted";
import { useToggle } from "@/app/lib/store";

import { createPortal } from "react-dom";

export default function Modal({ children }) {
    const open = useToggle((state) => state.open);
    const setOpen = useToggle((state) => state.setOpen);
    const [eleCallBack] = useIsClickOut(setOpen);
    const mounted = useMounted();

    return open && mounted
        ? createPortal(<div ref={eleCallBack}>{children}</div>, document.body)
        : createPortal(<>{children}</>, document.body);
}
