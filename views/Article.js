import React, {useEffect, useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Card, CardItem, Container, Content, Body, Text} from 'native-base';
import appHooks from '../hooks/MainHooks';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';


const Article = (props) => {
  const {checkUser} = appHooks();
  const {navigation} = props;
  const media = navigation.getParam('file', 'WRONG');
  const title = media.title;
  const fileID = media.file_id;

  const [uname, setUname] = useState({});

  useEffect(() => {
    // console.log('Articlemedia!!!', media.file_id);
    checkUser(props).then((json) => {
      setUname({name: json});
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <Container style={styles.container}>
      <Content>
        <Card style={styles.card}>
          <CardItem style={styles.cardit}>
            <Body>
              <Text style={styles.title}>{title}</Text>
            </Body>
          </CardItem>
          <CardItem style={styles.cardim}>
            <Body>
              <Image style={styles.image} source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + media.filename}} />
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem>
            <Text>{media.body}</Text>
          </CardItem>
        </Card>
        <Text style ={styles.bodytext}>{media.description}</Text>
        <CommentList fid={fileID} />
        <CommentForm fid={fileID} navigation={navigation} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5a5255',
  },
  image: {
    borderRadius: 16,
    height: 250,
    width: '95%',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#e1e5b8',
    borderStyle: 'solid',
    borderColor: '#d5da9b',
    borderWidth: 3,
  },
  cardit: {
    backgroundColor: '#fffff2',
  },
  cardim: {
    backgroundColor: '#ce9c8d',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 12,
    fontWeight: '400',
    marginLeft: 15,
    marginRight: 15,
  },
  bodytext: {
    marginTop: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    padding: 5,
  },
  cform: {
  },
});

export default Article;
