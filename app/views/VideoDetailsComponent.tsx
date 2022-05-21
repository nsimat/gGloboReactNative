import React from 'react';
import WebView from "react-native-webview";

// @ts-ignore
export default function VideoDetailsComponent({ route, navigation }) {

    const { ytubeId } = route.params;
    let tubeUrl = 'https://www.youtube.com/embed/' + ytubeId;

    return (
        <WebView
            style={{marginTop: 20}}
            javaScriptEnabled={true}
            source={{uri: tubeUrl}}
        />
    );
}