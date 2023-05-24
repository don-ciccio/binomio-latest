import PropTypes from "prop-types";
import { useState } from "react";

const SidebarLinkGroup = ({ children, activeCondition }) => {
    const [open, setOpen] = useState(activeCondition);

    const handleClick = () => {
        setOpen(!open);
    };

    return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;

SidebarLinkGroup.propTypes = {
    activeCondition: PropTypes.bool,
    children: PropTypes.func,
};
