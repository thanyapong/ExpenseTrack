import { Typography, TypographyProps, styled } from "@mui/material";

const TypographyStyled = styled(Typography)(() => ({
    fontSize: 14,
    marginTop: 2,
}));

type TextRequireProps = Omit<TypographyProps, "children"> & {
    text: string;
};

const TextRequire = ({ text, ...props }: TextRequireProps) => {
    return (
        <TypographyStyled {...props}>
            {text} <span style={{ color: "red" }}>*</span> :
        </TypographyStyled>
    );
};

export default TextRequire;
