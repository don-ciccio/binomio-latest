"use client";

import Container from "./Container";
import Navbar from "./Navbar/Navbar";
import TopMenu from "./TopMenu";
import { forwardRef } from "react";
import { ThemeProvider } from "@/app/lib/context/theme";

const Header = forwardRef((props, ref) => {
    return (
        <Container>
            <ThemeProvider>
                <TopMenu />
                <Navbar
                    {...props}
                    id={props.id}
                    ref={ref}
                    style={props.style}
                    className={props.className}
                >
                    {props.children}
                </Navbar>
            </ThemeProvider>
        </Container>
    );
});

export default Header;
