import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, AsyncStorage, ScrollView} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import appHooks from '../hooks/MainHooks'

const Article = (props) => {
  const {checkUser} = appHooks();
  const {navigation} = props;
  const media = navigation.getParam('file', 'WRONG');
  const mediaDesc = navigation.getParam('filedesc', 'WRONG');
  const title = media.title;

  const [uname, setUname] = useState({});

  useEffect(() => {
    console.log('Articlemedia!!!', media)
    checkUser(props).then((json) => {
        setUname({name: json});
      }).catch((error) => {
        console.log(error);
      });
    }, []);

  return (
<Container>
    <Content>
  <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + media.filename}} />
      {uname.name &&<Text style={styles.desc}>This article is written by {uname.name}</Text>}
      <Text style ={styles.desc}>{mediaDesc}</Text>
      <Text style ={styles.bodytext}>{media.description}</Text>
      </Content>
      </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    borderRadius: 16,
    height: 250,
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 30,
  },
  desc: {
    marginBottom: 30,
    fontWeight: 500,
  },
  bodytext: {
  },
});

export default Article;
