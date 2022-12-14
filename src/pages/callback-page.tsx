import { Center, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import { SidebarWithHeader } from "../components/sidebar";


export default function CallbackPage() {

    const recipeStatus = useAppSelector(state => state.recipeBook.status);
    const navigate = useNavigate();

    if (recipeStatus === 'loading') {
        return (
            <SidebarWithHeader>
                <Center>
                    <Spinner size={'xl'} color={'red.500'} />
                </Center>
            </SidebarWithHeader>
        );
    }

    navigate("/dashboard/allrecipes");

    return (
        <SidebarWithHeader>
            <Center>
                <Spinner size={'xl'} color={'green.500'} />
            </Center>
        </SidebarWithHeader>
    );
};
