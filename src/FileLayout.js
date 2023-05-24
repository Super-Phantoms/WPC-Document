import React, { useState, useRef } from "react";
import style from "./FileLayout.module.css";
import downloadImage from "./assets/download.png";
import { useComponentVisible } from "./hooks/useClickOutSide";
import "@microsoft/mgt-components";
import {
  Switch,
} from "@fluentui/react-components";
import { GridLayout } from "./components/layout/grid/GridLayout";
import TableLayout from "./components/layout/table/TableLayout";
import { Link } from "@fluentui/react-components";

const FileLayout = (props) => {
  
  const [searchResults, setSearchResults] = useState([]);
  
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: "Home", itemId: "015FCMOUQW6TXD7STWXZEJYSNTOHMKPEW7"},
  ]);

  const [showGridView, setShowGridView] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  
  const textareaRef = useRef(null);
  
  
  // toggle grid view and table view
  function _onChange(e, checked) {
    setShowGridView(checked?.checked);
  }
  const [openBox, setOpenBox] = useState(-1);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false, [textareaRef]);

  const showDownloadLink = (file) => {
    if (file?.["@microsoft.graph.downloadUrl"]) {
      return (
        <Link
          href={file["@microsoft.graph.downloadUrl"]}
          target="_blank"
          className="file__download"
        >
          <img src={downloadImage} alt="download" width={20} />
          {/* Download<i className="fa fa-download"></i> */}
        </Link>
      );
    }
  };

  const openFolder = (file) => {
    if (file?.folder) {
      console.log("file", file);
    }
  };

  const handleLinkShare = (index, e) => {
    setOpenBox(index);
    if (e?.target?.tagName?.toLowerCase() !== "textarea") {
      setIsComponentVisible((prev) => !prev);
    }
  };

  const handleSearchInputChange = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults(props.files); // show original files if search query is empty
      return;
    }
  };
  const handleSubmit = async () => {
    try {
      props.setLoading(true);
      const searchUrl = `${props?.serverProxyDomain}/v1.0/sites/root/drive/root/search(q='${searchQuery}')?$top=10`;
      const response = await fetch(searchUrl, { method: "GET" });
      const result = await response.json();
      props.setLoading(false);
      setSearchResults(result.value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemClick = (file, e) => {
    if (
      e.target.tagName.toLowerCase() === "img" ||
      e.target.id === "linkSharing"
    ) {
      return; // Don't do anything if the clicked element is a textarea
    } else {
      props.setItemId(file.id);
      const newBreadcrumbs = [
        ...breadcrumbs,
        { name: file.name, itemId: file.id },
      ];
      setBreadcrumbs(newBreadcrumbs);
      setSearchResults([]); // Clear search results when a file is clicked
    }
  };

  return (
    <>
      <Switch label="Grid View or Table View" onChange={_onChange}/>

      {/* Search field */}
      <div className={style.searchContainer}>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className={style.searchInput}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className={style.searchBtn} onClick={() => handleSubmit()}>
          Search
        </button>
      </div>

      {/* Breadcrumbs */}
      <div className={style.breadcrumbContainer}>
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            <Link 
              href="#"
              onClick={() => {
                // Remove all breadcrumbs after the current one
                const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
                setBreadcrumbs(newBreadcrumbs);
                props.setItemId(item.itemId);
                setSearchResults([]); // Clear search results when a breadcrumb is clicked
              }}
            >
              {item.name}
            </Link>
            {index < breadcrumbs.length - 1 && <span> &gt; </span>}
          </span>
        ))}
      </div>
      {!showGridView &&
        <TableLayout 
          loading={props.loading} 
          openBox={openBox} 
          isComponentVisible={isComponentVisible} 
          files={props.files} 
          handleItemClick={handleItemClick}
          handleLinkShare={handleLinkShare}
          searchResults={searchResults}
          openFolder={openFolder}
          showDownloadLink={showDownloadLink}
          NextLink={props.NextLink}
          GetData={props.GetData} 
          ref={ref} />}      

      {showGridView && 
      <GridLayout 
        fileData={props.files} 
        loading={props.loading} 
        handleItemClick={handleItemClick}
        searchResults={searchResults}
        NextLink={props.NextLink}
        />}
    </>
  );
};

export default FileLayout;