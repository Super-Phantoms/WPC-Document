const resolveAsset = (asset) => {
    const ASSET_URL =
      "/filetypes/";
    return `${ASSET_URL}${asset}`;
};

export  const excelLogo = resolveAsset("excel.png");
export  const wordLogo = resolveAsset("word.png");
export  const jpgLogo = resolveAsset("jpg.png");
export  const powerpointLogoURL = resolveAsset("powerpoint.svg");
export  const pngLogo = resolveAsset("png.png");
  
export const getThumbnail = (file) => {
if (file?.folder) {
    return "/filetypes/folder.png";
    } else if (file?.file) {
    const imagetype = getFileType(file.file.mimeType);
    console.log("this is filetype...", imagetype);
    return `/filetypes/${imagetype}.png`;
    } else if (file.package.type === "oneNote") {
    return "/filetypes/text.png";
    } else {
        return "/filetypes/general.png"
    }
};

export  const getFileType = (type) => {
    const filetypes = {
    "image/jpeg": "photo",
    "text/plain": "txt",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
    "image/png": "photo",
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "xlsx",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        "xlsx",
    "application/zip": "zip",
    "text/xml": "xml",
    "text/html": "html",
    "application/x-msdownload": "exe",
    "video/mp4": "video",
    "audio/mpeg": "audio",
    };
    const imgtype = filetypes[type] ?? "genericfile";
    return imgtype;
};