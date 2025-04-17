import { Tab, TabProps } from "@mui/material";
import { grey } from "@mui/material/colors";

type TTab = TabProps & {
  title?: string;
};

function TabForm({ ...props }: TTab) {
  return (
    <Tab
      {...props}
      sx={{
        paddingX: 0.5,
        paddingY: "0.75rem",
        height: "2.75rem",
        textTransform: "none",
        fontWeight: 600,
        marginRight: 2.5,
        color: grey[900],
      }}
    />
  );
}

export default TabForm;
