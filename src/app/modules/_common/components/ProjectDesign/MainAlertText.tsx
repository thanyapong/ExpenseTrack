import { Grid, Typography, styled } from "@mui/material";

const GridStyled = styled(Grid)(() => ({
    backgroundColor: "#e8e8e8",
    color: "red",
    borderRadius: 8,
    fontSize: 14,
    padding: 10,
    marginBottom: 20,
}));

type MainAlertTextProps = {
    headerText?: string;
    text?: string;
    marginTop?: number
};

const MainAlertText = ({ headerText, text, marginTop }: MainAlertTextProps) => {
    const splitText = text?.split(/(?=\d+\.\s)/);

    return (
        <GridStyled container item xs={12} lg={12} style={{ marginTop: marginTop }}>
            <Grid sm={2} md={1} lg={1}>
                <Typography sx={{ fontSize: 14 }}>{headerText}</Typography>
            </Grid>
            <Grid sm={10} md={10} lg={11}>
                {splitText?.length == 1 ? (
                    <Typography sx={{ fontSize: 14 }}>{splitText[0]}</Typography>
                ) : (
                    <>
                        {splitText?.map((text, index) => (
                            <Typography
                                sx={(theme) => ({
                                    [theme.breakpoints.down("sm")]: {
                                        marginTop: 1
                                    },
                                    fontSize: 14,
                                    marginTop: index > 0 ? 1 : 0
                                })}
                            >
                                {text}
                            </Typography>
                        ))}
                    </>
                )}
            </Grid>
        </GridStyled>
    );
};

export default MainAlertText;
