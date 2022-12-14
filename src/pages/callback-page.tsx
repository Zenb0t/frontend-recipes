import { Center, Spinner } from "@chakra-ui/react";
import { SidebarWithHeader } from "../components/sidebar";


export default function CallbackPage() {

    

    return (
        <SidebarWithHeader>
            <Center>
                <Spinner size={'xl'} color={'green.500'} />
            </Center>
        </SidebarWithHeader>
    );
};
