import { Box } from "@mui/material";

export const ImagePreview = (props: { image?: string, width?: number, height?: number, minWidth?: number, minHeight?: number}) => {
    return (
        <Box component="div"
            width={props?.width}
            height={props?.height}
            minWidth={props?.minWidth}
            minHeight={props?.minHeight}
            sx={{
                backgroundImage: `url(${props.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }} />
    );
}