// import * as React from 'react';
// import { Stack, Text } from '@fluentui/react';

// const FilePreviewGridView = () => {
//     const files = [
//         {
//             id: '1',
//             size: 5,
//             type: 'picture',
//             modified: '4332.32354'
//         },
//         {
//             id: '2',
//             size: 5,
//             type: 'picture',
//             modified: '4332.32354'
//         },
//         {
//             id: '3',
//             size: 5,
//             type: 'picture',
//             modified: '4332.32354'
//         },
//         {
//             id: '4',
//             size: 5,
//             type: 'picture',
//             modified: '4332.32354'
//         },
//         {
//             id: '5',
//             size: 5,
//             type: 'picture',
//             modified: '4332.32354'
//         },
//         {
//             id: '6',
//             size: 5,
//             type: 'picture',
//             modified: '4332.32354'
//         },
//         {
//             id: '7',
//             size: 5,
//             type: 'picture',
//             modified: '4332.32354'
//         }
//     ]
//   return (
//     <div>
//       <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
//         {files.map((file) => (
//           <div key={file.id} style={{ width: 200 }}>
//             {/* Render file preview */}
//             <div style={{ height: 150, backgroundColor: '#eaeaea' }}></div>

//             {/* File details */}
//             <Stack tokens={{ childrenGap: 8 }}>
//               <Text variant="medium">{file.name}</Text>
//               <Text variant="small" style={{ color: '#777777' }}>
//                 {file.size} - {file.type}
//               </Text>
//               <Text variant="small" style={{ color: '#777777' }}>
//                 Modified: {file.modified}
//               </Text>
//             </Stack>
//           </div>
//         ))}
//       </Stack>
//     </div>
//   );
// };

// export default FilePreviewGridView;