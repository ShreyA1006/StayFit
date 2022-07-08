import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Logout from "../screens/Logout";
import firebase from "firebase"

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            light_theme: true
        };
    }

    componentDidMount() {
        let theme;
        firebase.database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme;
            });
        this.setState({ light_theme: theme === "light" ? true : false })
    }

    render() {
        let props = this.props;
        return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: 'blue',
                    inactiveTintColor: this.state.light_theme ? "black" : "white",
                    itemStyle: { marginVertical: 5 }
                }}
            //drawerContent={props =>}
            >
                <Drawer.Screen
                    name="Home"
                    component={StackNavigator}
                    options={{ unmountOnBlur: true }}
                />
                <Drawer.Profile
                    name="Profile"
                    component={Profile}
                    options={{ unmountOnBlur: true }}
                />
                <Drawer.Logout
                    name="Logout"
                    component={Logout}
                    options={{ unmountOnBlur: true }}
                />

            </Drawer.Navigator>
        )
    }
}

