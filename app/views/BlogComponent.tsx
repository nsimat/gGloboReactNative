import React, {useEffect, useState} from 'react';
import { Text, View, FlatList, useWindowDimensions } from 'react-native';
import axios from "axios";
import RenderHtml from "react-native-render-html";
import {useNavigation} from "@react-navigation/native";

export default function BlogComponent() {

    const navigation = useNavigation();
    const [blogElt, setBlogElt] = useState({
        blogLoaded: false,
        blogList: []
    });

    useEffect(() => {
        if (!blogElt.blogLoaded) {
            axios
                .get('https://public-api.wordpress.com/rest/v1.1/sites/mygloboreactnative.wordpress.com/posts')
                .then((response) => {
                    setBlogElt({
                        ...blogElt,
                        blogLoaded: true,
                        blogList: response.data.posts
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [blogElt.blogLoaded, blogElt.blogList]);

    const chooseBlog = (blogID) => {
        navigation.navigate('BlogDetailsRT', { blogId: blogID});
    }

    return (
        <View>
            {/*loaded successfully*/}
            { blogElt.blogLoaded && (
                <View style={{paddingTop: 40}}>
                    <FlatList
                        data={blogElt.blogList}
                        keyExtractor={item => item.ID}
                        renderItem={({item}) =>
                            <BlogItemComponent
                                id={item.ID}
                                title={item.title}
                                imageSrc={item.featured_image}
                                excerpt={item.excerpt}
                                choosePost={chooseBlog}
                            />
                        }
                    />
                </View>
            )}
            {/*loading...*/}
            { !blogElt.blogLoaded && (
                <View style={{paddingTop: 30}}>
                    <Text> LOADING... </Text>
                </View>
            )}
        </View>
    );
}

export function BlogItemComponent( props ) {
    const { width } = useWindowDimensions();
    const blogChoice = () => {
        props.choosePost(props.id);
    }

    const source = {
        html: `<a 
               href=${props.id} style="textDecorationLine: none; color: #000000; textAlign: center">
              <img src=${props.imageSrc} />
              <h1>${props.title}</h1>
              ${props.excerpt}
              </a>`
    };

    const renderersProps = {
        a: {
            onPress: blogChoice
        }
    };

    return (
        <View style={{borderBottomWidth: 3, borderBottomColor: '#000000', borderStyle: 'solid'}}>
            <RenderHtml
                contentWidth={width}
                source={source}
                renderersProps={renderersProps}
            />
        </View>
    );
}
