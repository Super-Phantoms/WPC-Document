// GridLayout: grid view with files previewer
// author: dancing
// created_at: 5/25/2023

import { makeStyles, shorthands, Button, Image } from "@fluentui/react-components";
import { CardFile } from "./CardFile";
import {
    useStaticVirtualizerMeasure,
  } from "@fluentui/react-components/unstable";
import "../../../App.css"
  // custom styles
const useStyles = makeStyles({

  container: {
      ...shorthands.gap("30px"),
      flexDirection: "row",
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      height: "100%",
    },
    child: {
      height: "300px",
      lineHeight: "20px",
      width: "30%",
    },
});
  
export const GridLayout = (props) => {
  const styles = useStyles();
  
  const {fileData, handleItemClick} = props;
  const { virtualizerLength, bufferItems, bufferSize, scrollRef } =
  useStaticVirtualizerMeasure({
    defaultItemSize: 200,
  });
  const directories = fileData.filter(file=> !file?.["@microsoft.graph.downloadUrl"]);
  const files = fileData.filter(file => file?.["@microsoft.graph.downloadUrl"]);

  return (
    <>  
      
      {/* directories view */}

      <div>
        { directories.length > 0 && directories.map(dir => (
            <Button style={{marginBottom:"20px", marginRight:"20px"}} onClick={(e) => handleItemClick(dir, e)} >
              <Image src="/filetypes/folder.png" width="20px" height="20px" />{dir.name}
            </Button>
            ))}
      </div>

      {/* files view */}

      <div
        aria-label="Grid Previewer"
        className={styles.container}
        role={"list"}
        style={{height: "500px"}}
        ref={scrollRef}>
          {files.length > 0 && files.map((file, index) =>{
              return <span
                role={"listitem"}
                aria-posinset={index}
                aria-setsize={10}
                key={`virtualizer-child-${index}`}
                className={styles.child}
              >
                <CardFile file={file}/>
              </span>})}
    </div>
  </>);
};