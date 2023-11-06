import { useContext } from "react";
import Switch from "react-switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeProductStatus } from "@/store/react-query/queries";

//internal import
import { SidebarContext } from "@/context/SidebarContext";

const ShowHideButton = ({ id, status }) => {
    const { setIsUpdate } = useContext(SidebarContext);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, status }) => {
            return changeProductStatus(id, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"], { type: "all" });
        },
    });
    const handleChangeStatus = async (id) => {
        // return notifyError("CRUD operation is disabled for this option!");

        let newStatus;
        if (status === "Attivo") {
            newStatus = "Bozza";
        } else {
            newStatus = "Attivo";
        }

        mutation.mutate({ id: id, status: newStatus });
        setIsUpdate(true);
    };
    return (
        <Switch
            onChange={() => handleChangeStatus(id)}
            checked={status === "Attivo" ? true : false}
            className='react-switch md:ml-0'
            uncheckedIcon={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        width: 120,
                        fontSize: 14,
                        color: "white",
                        paddingRight: 22,
                        paddingTop: 1,
                    }}
                ></div>
            }
            width={30}
            height={15}
            handleDiameter={13}
            offColor='#E53E3E'
            onColor={"#2F855A"}
            checkedIcon={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 73,
                        height: "100%",
                        fontSize: 14,
                        color: "white",
                        paddingLeft: 20,
                        paddingTop: 1,
                    }}
                ></div>
            }
        />
    );
};

export default ShowHideButton;
