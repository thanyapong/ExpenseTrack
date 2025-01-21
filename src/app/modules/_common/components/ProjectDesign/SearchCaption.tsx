import { Typography } from "@mui/material";

type SearchCaptionProps = {
    text: string;
};

const SearchCaption = ({ text }: SearchCaptionProps) => {
    return (
        <Typography variant="caption" sx={{ color: "#AAAAAA", pl: 1.1, pt: 0.5 }}>
            {text}
        </Typography>
    );
};

export default SearchCaption;
