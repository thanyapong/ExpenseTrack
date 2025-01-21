import { Paper } from "@mui/material";

type HeaderPaperProps = {
    children: React.ReactNode;
};

const HeaderPaper = ({ children }: HeaderPaperProps) => {
    return (
        <Paper elevation={2} sx={{ p: "1.5rem", lineHeight: "50px", mt: "2rem", mb: "1.5rem" }}>
            {children}
        </Paper>
    );
};

export default HeaderPaper;
