import { Input } from "@windmill/react-ui";

const CheckBox = ({ id, name, type, handleClick, isChecked }) => {
    return (
        <>
            <Input
                id={id}
                name={name}
                type={type}
                onChange={handleClick}
                checked={isChecked}
            />
        </>
    );
};

export default CheckBox;
