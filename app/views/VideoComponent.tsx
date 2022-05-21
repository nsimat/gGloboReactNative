import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Image, TouchableWithoutFeedback} from "react-native";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";

export default function VideoComponent() {

    const API_KEY = "AIzaSyBZkabRfW7fgypnD8M6SRNlDWBWgGXSWzc";
    const navigation = useNavigation();
    const [listLoaded, setListLoaded] = useState(false);
    const [videosList, setVideosList] = useState([]);

    useEffect(() => {
        axios
            .get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key=' + API_KEY)
            .then( (response) => {
                setListLoaded(true);
                setVideosList(response.data.items);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    return (
        <View>
            {listLoaded && (
                <View style={{ paddingTop: 30 }}>
                    <FlatList
                        data={videosList}
                        keyExtractor={item => item.etag}
                        renderItem={ ({item}) =>
                        <TubeItem
                            navigation = {navigation.navigate}
                            id = {item.id.videoId}
                            title = {item.snippet.title}
                            imageSrc = {item.snippet.thumbnails.high.url}
                        />
                    }
                    />
                </View>
            )}

            { !listLoaded && (
                <View style={{ paddingTop: 30 }}>
                    <Text> LOADING... </Text>
                </View>
            )}
        </View>
    );
}

// @ts-ignore
function TubeItem( props ) {
    const onPress = () => {
        props.navigation('VideoDetailsRT', { ytubeId: props.id });
    }

    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ paddingTop: 20, alignItems: 'center' }}>
                <Image
                    style={{ width: '100%', height: 200 }}
                    source={{ uri: props.imageSrc}}
                />
                <Text>
                    {props.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}