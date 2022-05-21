import React from 'react';
import {View, StyleSheet} from "react-native";
import HeaderComponent from "../sections/HeaderComponent";
import HeroComponent from "../sections/HeroComponent";
import MenuComponent from "../sections/MenuComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack"


// @ts-ignore
export default function HomeComponent({ navigation }){
    console.log('NAVIGATION -> ', navigation);

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={ navigation.navigate } message = 'Press to Login'/>
            <HeroComponent/>
            <MenuComponent { ...navigation } />
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
   }
});