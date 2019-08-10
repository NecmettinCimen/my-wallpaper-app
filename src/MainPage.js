import React from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from './styles';
import { GridRow } from './components';



const PViewCom = ({ flex, icon, value }) => (<View style={{ flex, flexDirection: 'row', }}>
    <View style={{ justifyContent: 'center' }}><Icon name={icon} size={20} /></View>
    <Text style={{ fontSize: 20 }}>{value}</Text>
</View>)

export default class GalleryScreen extends React.PureComponent {
    _keyExtractor = item =>
        item.id ? `${item.id}` : `${item[0] && item[0].id}`;

    _renderItem = ({ item, index }) => {
        if (this.state.columnCount == 1)
            return (<View>
                <TouchableOpacity
                    onPress={() => this._onNavigateDetail(item[0])}
                    key={item[0].id}
                    style={styles.imageContainer}>
                    <Image source={{ uri: item[0].thumbs.large }}
                        style={{ height: 250, width: null, flex: 1 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                    <PViewCom flex={.6} icon="photo-size-select-actual" value={item[0].resolution} />
                    <PViewCom flex={.2} icon="favorite" value={item[0].favorites} />
                    <PViewCom flex={.2} icon="pageview" value={item[0].views} />
                </View>
            </View>)
        return (
            <View
                key={item.id} style={styles.imagesRow}>
                {item.map(singleItem => (
                    <TouchableOpacity
                        onPress={() => this._onNavigateDetail(singleItem)}
                        key={singleItem.id}
                        style={styles.imageContainer}>
                        <Image source={{ uri: singleItem.thumbs.large }}
                            style={{ height: 200, width: null, flex: 1 }} />

                    </TouchableOpacity>
                ))}
            </View>
        );
    };
    state = {
        images: [],
        isLoading: true,
        page: 1,
        columnCount: 1
    }

    _onNavigateDetail = (item) => {
        this.props.navigation.navigate("Detail", item)
    }

    componentDidMount() {
        this._getList()
    }
    _handleLoadMore = () => {
        this.setState({ page: this.state.page + 1 }, () => this._getList())
    }
    _getList = () => {

        fetch('https://wallhaven.cc/api/v1/search?categories=100&page=' + this.state.page)
            .then(res => res.json())
            .then(({ data }) => {
                this.setState({ images: [...this.state.images, ...data], isLoading: false })
            })

    }

    render() {
        const { images, isLoading, columnCount } = this.state
        const groupedData = GridRow.groupByRows(images, columnCount, () => {

            return 1;
        });

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <StatusBar backgroundColor="white" animated={true} barStyle="dark-content" />
                <View style={{ flex: .9 }}>
                    <FlatList
                        style={styles.container}
                        // onRefresh={this.refreshImages}
                        refreshing={images.length === 0 && isLoading}
                        data={groupedData}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        onEndReached={this._handleLoadMore}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={10}
                    />
                </View>
                <View style={{ flex: .1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.setState({ columnCount: 1 })}><Text style={{ textAlign: 'center', fontSize: 20 }}>1</Text></TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.setState({ columnCount: 2 })}><Text style={{ textAlign: 'center', fontSize: 20 }}>2</Text></TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.setState({ columnCount: 3 })}><Text style={{ textAlign: 'center', fontSize: 20 }}>3</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    topImage: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
    },
    imagesRow: {
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        height: 100,
        borderRadius: 5,
    },
});