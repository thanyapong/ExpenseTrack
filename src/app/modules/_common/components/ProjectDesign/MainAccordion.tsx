import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { DividerStyled, TypographyStyled } from "../../functionHelper";

type MainAccordionProps = {
    title: string; // ข้อความหัวเรื่อง
    children?: React.ReactNode; // เนื้อหาที่จะแสดงใน AccordionDetails
    defaultExpanded?: boolean; // เปิด Accordion โดยค่าเริ่มต้นหรือไม่
    dividerSx?: object; // ปรับแต่งสไตล์ของ Divider
    accordionSx?: object; // ปรับแต่งสไตล์ของ Accordion
    summarySx?: object; // ปรับแต่งสไตล์ของ AccordionSummary
    detailsSx?: object; // ปรับแต่งสไตล์ของ AccordionDetails
};

const MainAccordion = ({
    title,
    children,
    defaultExpanded = true,
    dividerSx,
    accordionSx,
    summarySx,
    detailsSx,
}: MainAccordionProps) => {
    return (
        <Accordion
            defaultExpanded={defaultExpanded}
            disableGutters
            sx={{
                "&:before": {
                    display: "none",
                },
                ...accordionSx,
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel-content"
                id="panel-header"
                sx={summarySx}
            >
                <TypographyStyled sx={{ fontSize: 16 }}>{title}</TypographyStyled>
            </AccordionSummary>
            <DividerStyled
                sx={{
                    border: "0.1px regular",
                    backgroundColor: "#e0e0e0",
                    ...dividerSx,
                }}
            />
            <AccordionDetails sx={detailsSx}>{children}</AccordionDetails>
        </Accordion>
    );
};

export default MainAccordion;
