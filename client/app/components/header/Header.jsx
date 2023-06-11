import { forwardRef } from "react";
import Container from "./Container";

const Header = forwardRef((props, ref) => {
    return (
        <Container>
            <p>Header</p>
        </Container>
    );
});

export default Header;
