import React from 'react';
import { getFileType } from '../../../utils/FileLogos';
import { DocPreview } from './PreviewFileTypes/DocPreview';
import { FileDownloadAsset } from '../table/TableDatas';

export default function FilePreviewer(props) {
    const file = props.file;
    const fileType = getFileType(props.file);
    console.log(file.webUrl)
    return (
    <>
        {/* {(fileType == "docx" || fileType == "pdf" || fileType == "xlsx") ?? 
            <DocPreview file={file} type={fileType}/>} */}
        {file?.[FileDownloadAsset] && 
            <img src={file.webUrl} />
        }
        {/* {(fileType == "photo") && 
            <img src={file.}
        } */}
    </>
  );
}