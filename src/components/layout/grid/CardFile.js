import {
    makeStyles,
    shorthands,
    Button,
    Caption1,
    Body1,
    Subtitle1,
    Card,
    CardHeader,
    CardFooter,
    CardPreview,
    CardProps,
    Text,
    mergeClasses,
    Badge,
    Toolbar,
    ToolbarButton,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    ToolbarProps
  } from "@fluentui/react-components";
  import * as React from "react";
  
  import {
    MoreHorizontal20Filled,
    Open16Regular,
    Share16Regular,
    MoreHorizontal24Filled
  } from "@fluentui/react-icons";
  import { getFileType, getThumbnail, jpgLogo } from "../../../utils/FileLogos";
  import { DocPreview } from "./PreviewFileTypes/DocPreview";
import FilePreviewer from "./FilePreviewer";
import { FileDownloadAsset } from "../table/TableDatas";
  
  const useStyles = makeStyles({
    title: {
      ...shorthands.margin(0, 0, "12px"),
    },
  
    description: {
      ...shorthands.margin(0, 0, "12px"),
    },
  
    card: {
      width: "350px",
      height: "300px",
    },
    text: {
      ...shorthands.margin(0),
    },
  });
  

export  const CardFile = (props) => {
    const styles = useStyles();
    let {file} = props;
    const logo = getThumbnail(file);
    return (
        <Card className={styles.card} {...props}>
          <img width="326px" height="300px"
            src={file.webUrl}
            alt={file.name}
          />
        {/* <DocPreview /> */}
        {/* <FilePreviewer file={file} /> */}
        <CardHeader
          image={
            <img
                width={30}
                height={30}
              src={logo}
              alt="Microsoft PowerPoint logo"
            />
          }
          header={
            <Body1>
              <b>{file.name}</b>
            </Body1>
          }
          description={<Caption1>Developer</Caption1>}
          action={
            <Toolbar aria-label="Default" {...props}>
              <Menu>
                <MenuTrigger>
                  <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem>Open</MenuItem>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Upload</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </Toolbar>
          }
        />
  
        <CardFooter>
          <Button appearance="primary" icon={<Open16Regular />}>
            Open
          </Button>
          <Button ><img width={20} height={20} src="/download.png"/> Download</Button>
        </CardFooter>
      </Card>
    );
  };
 