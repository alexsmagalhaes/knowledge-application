import { Tab } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TTab } from "./tab-form.type";

function TabForm({ ...props }: TTab) {
  return (
    <Tab
      {...props}
      sx={(theme) => ({
        paddingX: 0.5,
        paddingY: "0.75rem",
        height: "2.75rem",
        textTransform: "none",
        fontWeight: 600,
        marginRight: 2.5,
        color: grey[900],
        fontSize: theme.typography.body1.fontSize,
      })}
    />
  );
}

export default TabForm;
