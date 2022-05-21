import HomeComponent from './app/views/HomeComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ContactComponent from "./app/views/ContactComponent";
import VideoComponent from "./app/views/VideoComponent";
import VideoDetailsComponent from "./app/views/VideoDetailsComponent";
import RegisterComponent from "./app/views/RegisterComponent";
import LoginComponent from "./app/views/LoginComponent";
import QuizComponent from "./app/views/QuizComponent";
import FinishQuizComponent from "./app/views/FinishQuizComponent";
import BlogComponent from "./app/views/BlogComponent";
import BlogDetailsComponent from "./app/views/BlogDetailsComponent";

const MyRoutes = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <MyRoutes.Navigator initialRouteName="Home">
                <MyRoutes.Screen name="HomeRT" component={HomeComponent} options={{title: "Welcome"}}/>
                <MyRoutes.Screen name="ContactRT" component={ContactComponent} options={{title: "Contact"}}/>
                <MyRoutes.Screen name="LessonsRT" component={VideoComponent} options={{title: "Videos List"}}/>
                <MyRoutes.Screen name="VideoDetailsRT" component={VideoDetailsComponent} options={{title: "Video Details"}}/>
                <MyRoutes.Screen name="RegisterRT" component={RegisterComponent} options={{title: "Register"}}/>
                <MyRoutes.Screen name="LoginRT" component={LoginComponent} options={{title: "Login"}}/>
                <MyRoutes.Screen name="QuizRT" component={QuizComponent} options={{title: "Quiz"}}/>
                <MyRoutes.Screen name="FinishRT" component={FinishQuizComponent} options={{title: "Finish"}}/>
                <MyRoutes.Screen name="BlogRT" component={BlogComponent} options={{title: "Blog"}}/>
                <MyRoutes.Screen name="BlogDetailsRT" component={BlogDetailsComponent} options={{title: "Post Details"}}/>
            </MyRoutes.Navigator>
        </NavigationContainer>
    );
}

