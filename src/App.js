import React, { useCallback, useEffect, useState } from "react";
import { MockProvider, Providers } from "@microsoft/mgt-element";
import { Login, FileList, MgtTemplateProps } from "@microsoft/mgt-react";
import "./App.css";
import { MsalProvider } from "@microsoft/mgt-msal-provider";
import { ProxyProvider } from "@microsoft/mgt-proxy-provider";
import { checkProxy } from "wp-webcomponent";

import FileLayout from "./FileLayout";

/** Set Files */
export const FilesResponse = (props) => {
  props.setFilesData(props.dataContext.files);
  if (props.dataContext.files.length === 0) {
    props.setLoading(true);
  } else {
    props.setLoading(false);
  }
  return <div></div>;
};

function App(props) {
  const [FilesData, setFilesData] = useState([]);
  const [NextLink, setNextLink] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState("015FCMOUQW6TXD7STWXZEJYSNTOHMKPEW7");

  /** Get Next link based on response */
  const serverProxyDomain = "https://walrus-app-v3k99.ondigitalocean.app/proxy/63e4ce5542771d5254e2525c";
  useEffect(() => {
    const MgtFilesData = document.querySelector("mgt-file-list");
    MgtFilesData.addEventListener("templateRendered", (e) => {
      if (e.target.pageIterator._nextLink != undefined) {
        setNextLink(e.target.pageIterator._nextLink);
      }
    });

    if (serverProxyDomain) {
      Providers.globalProvider = new ProxyProvider(serverProxyDomain);
    } else {
      Providers.globalProvider = new MsalProvider({
        clientId: props.clientId,
        scopes: ["Sites.FullControl.All", "Sites.Read.All", "Files.Read.All"],
      });
    }
  }, [serverProxyDomain, props.clientId]);
 

  /** Getting data based on next link url and changing url with proxy domain */
  const GetData = useCallback(() => {
    setLoading(true);
    if (NextLink != undefined && NextLink != "") {
      const newlink = NextLink.replace(
        "https://graph.microsoft.com",
        serverProxyDomain
      );

      const Data = fetch(newlink, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setFilesData([...FilesData, ...data.value]);
          setNextLink(data["@odata.nextLink"]);
        });
    }
  }, [NextLink, FilesData, serverProxyDomain]);
  
  return (
    <div className="main-container">
      <h1>{props.title ?? "Files List"}</h1>
      <Login />
      <FileList
        driveId="b!u437h9hN5kKKuYv4KxMZ9edZk038P2JOh0O-CbQrkFl3rjkpSNnESL7EuydJmf86"
        itemId={itemId}
      >
        <FilesResponse setFilesData={setFilesData} setLoading={setLoading} />
      </FileList>
      {FilesData.length > 0 &&
        <FileLayout
          serverProxyDomain={serverProxyDomain}
          files={FilesData}
          NextLink={NextLink}
          setNextLink={setNextLink}
          GetData={GetData}
          setItemId={setItemId}
          setFilesData={setFilesData}
          loading={loading}
          setLoading={setLoading}
        />
      }
    </div>
  );
}


export const Definition = [
  {
    zone: "appearances",
    component: "HeadingColorAndSize",
    name: ["headingColor", "headingSize"],
    createSeparateSection: true,
    title: "Heading",
  },
  {
    zone: "appearances",
    component: "TextBox",
    name: "title",
    displayName: "Title",
  },
  {
    zone: "appearances",
    component: "TextBox",
    name: "description",
    displayName: "Description",
    createSeparateSection: true,
    title: "Description",
  },
  {
    zone: "appearances",
    component: "BackgroundType",
    name: ["typeSelected", "changeBgColor", "changeBgOverlay", "selectedImage"],
    displayName: "Background Type",
    createSeparateSection: true,
    title: "Background Type",
  },
  {
    zone: "layout",
    component: "ComponentLayout",
    name: ["layout", "layoutSpacing"],
    enum: ["list", "grid", "masonry"],
  },
  {
    component: "TextBox",
    name: "query",
    displayName: "Query",
  },
  {
    component: "TextBox",
    name: "siteid",
    displayName: " Site Id",
  },
  {
    component: "TextBox",
    name: "driveid",
    displayName: " Drive Id",
  },
  {
    component: "TextBox",
    name: "itemid",
    displayName: " Item Id",
  },
  {
    component: "TextBox",
    name: "listid",
    displayName: " List Id",
  },
  {
    component: "TextBox",
    name: "listname",
    displayName: " List Name",
  },
  {
    component: "TextBox",
    name: "maxresults",
    displayName: " Max Results",
  },
  {
    component: "TextBox",
    name: "pagination",
    displayName: " Pagination",
  },
  {
    component: "TextBox",
    name: "sort",
    displayName: "Sort",
  },
  {
    component: "TextBox",
    name: "columns",
    displayName: " Columns",
  },
  {
    component: "TextBox",
    name: "lookups",
    displayName: " Lookups",
  },
  {
    component: "TextBox",
    name: "searchparam",
    displayName: " Search Param",
  },
  {
    component: "TextBox",
    name: "includefile",
    displayName: " Include File",
  },
  {
    component: "TextBox",
    name: "folderurl",
    displayName: " Folder Url",
  },
  {
    component: "TextBox",
    name: "folderid",
    displayName: " Folder Id",
  },
  {
    component: "TextBox",
    name: "autoloadresult",
    displayName: " Auto Load Result",
  },
  {
    component: "TextBox",
    name: "searchform",
    displayName: " Search Form",
  },
  {
    component: "TextBox",
    name: "autocomplete",
    displayName: " Auto Complete",
  }
 
];

export default App;
