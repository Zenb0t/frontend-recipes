import { Box } from "@mui/material";

export  const ImagePreview = (props: { image: string | undefined, width: number, height: number }) => {
    return (
        <Box component="div" minWidth={props.width}  minHeight={props.height}  sx={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }} />
    );
}