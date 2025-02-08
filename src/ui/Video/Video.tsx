// import { FC, useEffect, useRef } from "react";
// import "./Video.css";
// import Button from "../Button/Button";

// type VideoProps = {
//   link?: string;
//   onClose: () => void;
// };

// const Video: FC<VideoProps> = ({ link, onClose }) => {
//   const iframeRef = useRef<HTMLDivElement | null>(null);
//   const videoId = link?.split("v=")[1]?.split("&")[0];

//   useEffect(() => {
//     if (videoId && iframeRef.current) {
//       const script = document.createElement("script");
//       script.src = "https://www.youtube.com/iframe_api";
//       document.body.appendChild(script);

//       script.onload = () => {
//         window.onYouTubeIframeAPIReady = () => {
//           new window.YT.Player(iframeRef.current as HTMLElement, {
//             videoId,
//             height: "540",
//             width: "960",
//             events: {
//               onReady: (event: any) => {
//                 event.target.playVideo();
//               },
//             },
//           });
//         };
//       };
//     }
//   }, [videoId]);

//   return (
//     <div className="video">
//       <div className="video-wrapper">
//         {link ? (
//           <div className="youtubeVideo" ref={iframeRef}></div>
//         ) : (
//           <p>Видео недоступно.</p>
//         )}
//         <Button type="x" onClick={onClose} />
//       </div>
//     </div>
//   );
// };

// export default Video;
