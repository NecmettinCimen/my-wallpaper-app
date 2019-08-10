import React from 'react'
import { ScrollView, Image, Text, View, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Lightbox from 'react-native-lightbox';

const { height, width } = Dimensions.get('window')

const item = {
    "id": "ey6xek",
    "url": "https://wallhaven.cc/w/ey6xek",
    "short_url": "https://whvn.cc/ey6xek",
    "views": 24,
    "favorites": 0,
    "source": "",
    "purity": "sfw",
    "category": "general",
    "dimension_x": 6000,
    "dimension_y": 3750,
    "resolution": "6000x3750",
    "ratio": "1.6",
    "file_size": 12304271,
    "file_type": "image/jpeg",
    "created_at": "2019-08-09 05:48:21",
    "colors": [
        "#000000",
        "#424153",
        "#996633",
        "#663300",
        "#999999"
    ],
    "path": "https://w.wallhaven.cc/full/ey/wallhaven-ey6xek.jpg",
    "thumbs": {
        "large": "https://th.wallhaven.cc/lg/ey/ey6xek.jpg",
        "original": "https://th.wallhaven.cc/orig/ey/ey6xek.jpg",
        "small": "https://th.wallhaven.cc/small/ey/ey6xek.jpg"
    }
};

export default class DetailPage extends React.PureComponent {

    state = {
        isLoading: true,
        uploader: null,
        tags: []
    }
    componentDidMount() {
        const {
            id
        } = this.props.navigation.state.params

        fetch('https://wallhaven.cc/api/v1/w/' + id)
            .then(res => res.json())
            .then(({ data }) => this.setState({ isLoading: false, uploader: data.uploader, tags: data.tags }))

    }


    setWallpaper = (url) => {

        const {
            path
        } = this.props.navigation.state.params

    }

    render() {

        const {
            path,
            resolution,
            favorites,
            views,
            colors,
            purity,
            category,
        } = this.props.navigation.state.params

        const {
            uploader,
            tags,
            isLoading
        } = this.state

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <StatusBar backgroundColor="white" animated={true} barStyle="dark-content" />
                <View style={{ flex: .9 }}>
                    <Lightbox>
                        <Image resizeMode="cover" source={{ uri: path }} style={{
                            width,
                            height
                        }} />
                    </Lightbox>
                </View>
                <View style={{ flex: .1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.setWallpaper()}><Text style={{ textAlign: 'center', fontSize: 20 }}>Set Wallpaper</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const PViewCom = ({ flex, icon, value }) => (<View style={{ flex, flexDirection: 'row', }}>
    <View style={{ justifyContent: 'center' }}><Icon name={icon} size={20} /></View>
    <Text style={{ fontSize: 20 }}>{value}</Text>
</View>)