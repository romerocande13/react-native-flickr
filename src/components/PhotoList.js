import React, {Component, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

const PhotoList = (props) => {
  const [photos, setPhotos] = useState(null)

  useEffect(()=>{
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${props.route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`)
    .then(({ data })=> 
            setPhotos(data.photoset.photo)
      )
    .catch(function (error) { 	
      console.log(error); 
    });
  }, [])


  const renderItem = ({item}) => (
    <PhotoDetail
      key={item.title}
      title={item.title}
      imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`}
      />
  );

  return (
    !photos
    ?
    (
        <View style={{flex: 1}}>
          <Text>Loading...</Text>
        </View>
    )
    :
    (
      <View >
        <FlatList
          data={photos}
          renderItem={renderItem}
        />
      </View>
    )
  )

}

export default PhotoList;

