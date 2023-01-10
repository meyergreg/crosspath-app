import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated,TouchableOpacity } from 'react-native'
import CarouselItem from './CarouselItem'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'



const { width, heigth } = Dimensions.get('window')
let flatList

function infiniteScroll(dataList){
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0
    
}

const Carousel = ({ data }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)

    useEffect(()=> {
        setDataList(data)
        infiniteScroll(dataList)
    })


    if (data && data.length) {
        return (
            <View>
                {/*--- <View style={styles.dotView}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mes élèves</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mes factures</Text>
                <TouchableOpacity
              onPress={()=> alert('Espace élève - Bientot disponible')}
              style={{ 
                backgroundColor: 'white' ,
                padding: 5, 
                 
                borderRadius: 5,  
                height:25, 
                justifyContent: 'center', 
                alignItems: 'center'
              }}>
                <Text style={{ 
                  textAlign: 'center', 
                  color: '#49319a',
                  fontWeight: 'bold', 
                  fontSize: 15 
                }}>
                  Espace élève
                </Text>
              </TouchableOpacity>
            </View> ---*/}
                <ScrollableTabView
                    style={{ marginTop: 20 }}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <Text tabLabel='Tab #1'>My</Text>
                    <Text tabLabel='Tab #2 word word'>favorite</Text>
                    <Text tabLabel='Tab #3 word word word'>project</Text>
                    <Text tabLabel='Tab #4 word word word word'>favorite</Text>
                    <Text tabLabel='Tab #5'>project</Text>
                
            
                <View tabLabel='Tab #1' style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                            >
                                
                            </Animated.View>
                        )
                    })}

                </View>

                <FlatList data={data}
                ref = {(flatList) => {this.flatList = flatList}}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                    )}

                    tabLabel='Tab #1'
                />
                </ScrollableTabView>
               
            </View>
        )
    }

    console.log('Please provide Images')
    return null
}

const styles = StyleSheet.create({
    dotView: { flexDirection: 'row', justifyContent: 'space-around'}
})

export default Carousel
