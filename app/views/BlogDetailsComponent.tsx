import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView, useWindowDimensions} from "react-native";
import RenderHtml from "react-native-render-html";
import axios from "axios";


// @ts-ignore
export default function BlogDetailsComponent({ route, navigation}) {
    const {blogId} = route.params;

    const [postSelected, setPostLoaded] = useState({
        postLoaded: false,
        postTitle: "",
        postImage: "",
        postContent: "",
        postID: ""
    });

    useEffect(() => {
        if (!postSelected.postLoaded) {
            axios
                .get('https://public-api.wordpress.com/rest/v1.1/sites/mygloboreactnative.wordpress.com/posts/' + blogId)
                .then((response) => {
                    setPostLoaded({
                        ...postSelected,
                        postLoaded: true,
                        postTitle: response.data.title,
                        postImage: response.data.featured_image,
                        postContent: response.data.content,
                        postID: response.data.ID,
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    const goBack = () => {
        navigation.navigate('BlogRT');
    }

    const blogTagStyles = {
        img: { display: 'none' },
    }

    const blogClassStyles = {
        blTitle: { marginLeft: 'auto', marginRight: 'auto' },
        blContent: { marginLeft: 10, marginRight: 10 },
        blBack: { marginLeft: 'auto', marginRight: 'auto', paddingBottom: 20 }
    }

    const { width } = useWindowDimensions();

    const source = {
        html: `
        <div class="bTitle">
           <h1>${postSelected.postTitle}</h1>
        </div>
        
        <div class="blContent">
           ${postSelected.postContent}
        </div>
        
        <div class="blBlack">
           <a href=${postSelected.postID} style="textDecoration: none; color: #000000">
              <h3>GO BACK</h3>
           </a>
        </div>`
    };

    const renderersProps = {
        a: {
            onPress: goBack
        }
    }

    return(
        <View style={{ paddingTop: 30 }}>
            {/*Loaded successfully*/}
            { postSelected.postLoaded && (
                <ScrollView>
                    <Image
                      style={{ width: '100%', height: 200}}
                      source={{ uri: postSelected.postImage }}
                    />

                    <RenderHtml
                       contentWidth={width}
                       source={source}
                       tagsStyles={blogTagStyles}
                       classesStyles={blogClassStyles}
                       renderersProps={renderersProps}

                    />
                </ScrollView>
            )}
            {/*Loading...*/}
            { !postSelected && (
                <View style={{ paddingTop: 20, alignItems: 'center'}}>
                    <Text>LOADING...</Text>
                </View>
            )}
        </View>
    );
}