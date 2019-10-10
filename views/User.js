/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text, Button, Thumbnail, Card, CardItem, Right, Left, Body, Icon} from 'native-base';
import appHooks from '../hooks/MainHooks';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import UpdateEmailForm from '../components/UpdateEmailForm';
import ArticleHooks from '../hooks/ArticleHooks';

const User = (props) => {
  const {
    signOut,
    getUser,
  } = appHooks();
  const {
    getAvatarTag,
  } = ArticleHooks();

  const [uinfo, setUinfo] = useState({});
  const [avatar, setAvatar] = useState({});

  const togglePassword = () => {
    console.log('toggle');
    if (uinfo.form === 0 || !uinfo.form) {
      setUinfo({form: 1});
    } else {
      setUinfo({form: 0});
    }
  };

  const toggleEmail = () => {
    console.log('toggle');
    if (uinfo.form === 0 || !uinfo.form) {
      setUinfo({form: 2});
    } else {
      setUinfo({form: 0});
    }
  };

  useEffect(() => {
    getUser().then((json) => {
      console.log('USER DATA IN USER.JS', json);
      console.log(uinfo.form);
      const parsedJson = JSON.parse(json);
      const date = parsedJson.time_created.split('T');
      setUinfo(
          {
            name: parsedJson.username,
            email: parsedJson.email,
            doc: date[0],
            id: parsedJson.user_id,
            form: uinfo.form,
          }
      );
    }).catch((error) => {
      console.log(error);
    });
  }, [uinfo.form]);
  getAvatarTag(uinfo.id).then((result) => {
    setAvatar(result);
  });

  return (
    <Container style={styles.container}>
      <Content>
        <Card style={styles.profileCard}>
          <CardItem header>
            <Right>
              <Icon name='person' style={styles.Icon}/> 
            </Right>
            <Left>
              <Text style={styles.profileText}>Profile</Text>
            </Left>
          </CardItem>
           <CardItem>
            <Left>
            {avatar &&
            <Thumbnail
              square
              large
              source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/'+avatar}} style ={styles.thumbnail} />
            }
            </Left>
            <Body>
            <Text>Welcome {uinfo.name}</Text>
            <Text>Email {uinfo.email}</Text>                     
            <Text>Member since: {uinfo.doc}</Text>
            </Body>
            </CardItem>
            <CardItem>
              <Right>           
              <Button onPress={() => signOut(props)}>
              <Text>Logout!</Text> 
            </Button>
            </Right>
          </CardItem>
        </Card>
        <Button style={styles.linkButtons} onPress={() => togglePassword()}>
                <Text>Change password</Text>
            </Button>
            {uinfo.form === 1 && <UpdatePasswordForm />}
            <Button style={styles.linkButtons} onPress={() => toggleEmail()}>
              <Text>Change email</Text>
            </Button>
            {uinfo.form === 2 && <UpdateEmailForm />}
      </Content>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c9d4d7',
  },
  Icon: {
    fontSize: 40,
     color: 'black',
  },
  profileCard: {
    marginTop: 30, 
    marginLeft: 20, 
    marginRight: 20,
  },
  profileText: {
    fontSize: 40,
  },
  thumbnail: {
    width: '100%',
     height: 100
  },
  linkButtons: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10, 
    marginTop: 10,
  },
})

export default User;
