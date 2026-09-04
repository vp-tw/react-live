import type {ReactLiveProps} from "@vp-tw/react-live/react"; import {ReactLive} from "@vp-tw/react-live/react";
export function CustomLive(props:ReactLiveProps){return <div style={{border:"2px solid #7c3aed",borderRadius:12,padding:16}}><strong>Custom renderer</strong><ReactLive {...props}/></div>}
