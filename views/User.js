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
    if (uinfo.form === 0 || !uinfo.form) {
      setUinfo({form: 1});
    } else {
      setUinfo({form: 0});
    }
  };

  const toggleEmail = () => {
    if (uinfo.form === 0 || !uinfo.form) {
      setUinfo({form: 2});
    } else {
      setUinfo({form: 0});
    }
  };

  useEffect(() => {
    getUser().then((json) => {
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
          <CardItem style={{marginLeft: '22%', backgroundColor: '#fffff2'}} header>
              <Icon name='person' style={styles.Icon}/>
              <Text style={styles.profileText}>Profile</Text>
          </CardItem>
          <CardItem style={{backgroundColor: '#fffff2'}}>
            <Left style={{paddingRight: 12}}>
              {avatar &&
            <Thumbnail
              square
              large
              source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/'+avatar}} style ={styles.thumbnail} />
            }
            </Left>
            <Body>
              <Text>Welcome {uinfo.name}</Text>
              <Text>Email: {uinfo.email}</Text>
              <Text>Member since: {uinfo.doc}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Right>
            </Right>
            <Button onPress={() => signOut(props)}>
                <Text>Logout!</Text>
              </Button>
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
    backgroundColor: '#5a5255',
  },
  Icon: {
    fontSize: 40,
     color: 'black',
  },
  profileCard: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#e1e5b8',
    borderStyle: 'solid',
    borderWidth: 3,
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
