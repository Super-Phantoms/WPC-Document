import React, { useState } from "react";
import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";
import { FileDownloadAsset } from "../../table/TableDatas";

// const file = "/preview/1.avi";
// const type = "avi";
// const file = "/preview/1.jpg";
// const type = "jpg";
// const file = "/preview/1.jpg";
// const type = "jpg";
// const file = "/preview/1.jpg";
// const type = "jpg";
// const file = "/preview/1.pdf";
// const type = "pdf";
// const file = "/preview/1.xlsx";
// const type = "xlsx";
// const file = "/preview/1.docx";
// const type = "docx";
// const file = "/preview/1.csv";
// const type = "csv";

export const DocPreview = (props) => { 

  const {file, type} = props;
  const onError = (e) => {
    console.log(e)
  };
  console.log(props, file);
  console.log("here is the docpreview", type);
  // const Preview = () => {
  //   console.log("this is before download assest");
  //   if(file?.[FileDownloadAsset]) {
  
  //     const filePath = file[FileDownloadAsset];
      
  //     console.log("this is filepath" ,filePath);
  //     if(type == "video") {
  //       return <video src={filePath}/>
  //     }
  //     if(type == "photo") {
  //       return <img src={filePath} alt="" />
  //     }
  //     if(type == "docx" || type == "pdf" || type == "xlsx") {
  //       return <FileViewer
  //       fileType={type}
  //       filePath={file}
  //       errorComponent={CustomErrorComponent}
  //       onError={onError}
  //     />
  //     }
  //   }
  //   return <img src="/filetypes/unknownFile.png" />
  //   ;
  // }
  return (
    <>
      <FileViewer
        fileType={type}
        filePath={file}
        errorComponent={CustomErrorComponent}
        onError={onError}
      />    </>
  );
};
