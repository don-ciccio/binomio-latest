import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a function that can be used to run the given callback via `window.requestAnimationFrame()`.
 *
 * Pending callbacks will be cleared in case the component unmounts.
 *
 * @param callback The callback that is invoked in the next animation frame
 */

const useAnimationFrame = (cb) => {
    const frame = useRef();
    const last = useRef(performance.now());
    const init = useRef(performance.now());

    const animate = useCallback(() => {
        const now = performance.now();
        const time = (now - init.current) / 1000;
        const delta = (now - last.current) / 1000;
        // In seconds ~> you can do ms or anything in userland
        cb({ time, delta });
        last.current = now;
        frame.current = requestAnimationFrame(animate);
    }, [cb]);

    useEffect(() => {
        frame.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame.current);
    }, [animate]); // Make sure to change it if the deps change
};

export default useAnimationFrame;
