import { Paper, PaperProps } from "@mui/material";

type MainPaperProps = Omit<PaperProps, "children"> & {
    children: React.ReactNode;
};

const MainPaper = ({ children, ...props }: MainPaperProps) => {
    return (
        <Paper elevation={1} sx={{ p: "1.5rem", lineHeight: "50px", mb: "1.5rem" }} {...props}>
            {children}
        </Paper>
    );
};

export default MainPaper;
