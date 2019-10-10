import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Content, Text, Thumbnail, Button, Form, Item, Input, Label, Textarea } from 'native-base';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import appHooks from '../hooks/MainHooks';
import ArticleHooks from '../hooks/ArticleHooks';
import { AppContext } from '../contexts/AppContext';
import appValidation from '../hooks/ValidationHooks';
import { Col, Row, Grid } from 'react-native-easy-grid';


// const dataUrl = 'http://media.mw.metropolia.fi/wbma/media';
// const idUrl = 'http://media.mw.metropolia.fi/wbma/media/';
// const picLink = 'http://media.mw.metropolia.fi/wbma/uploads/';
// const mediaArray = [];


const UploadArticle = (props) => {
  const { navigation } = props
  const [image, setImage] = useState({});
  const { articles, setArticles, myArticles, setMyArticles, setAllArticles } = useContext(AppContext);
  const {
    getPermissionAsync,
  } = appHooks();
  const { uploadValidate } = appValidation();
  const {
    upload,
    handleTitleChange,
    handleDescChange,
    handleBodyChange,
    handleUpload,
    clearForm,
  } = useUploadForm();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    setImage(
      {
        selected: result.uri,
      });
  };
  useEffect(() => {
    getPermissionAsync();
  }
    , []);

  return (
    <Container>
      <Content padder>
        <Form>
          <Grid>
            <Col>
              <Col>
                <Item>
                  {image.selected && <Thumbnail
                    source={{ uri: image.selected }} style={{ width: '100%', height: 200, alignSelf: 'center' }} />}
                </Item>
                <Item floatingLabel last rounded>
                  <Label>Title </Label>
                  <Input
                    autoCapitalize='none'
                    placeholder='Title'
                    onChangeText={handleTitleChange}
                    value={upload.title} required
                  />
                </Item>
                <Item floatingLabel last rounded>
                  <Label>File Description</Label>
                  <Input
                    autoCapitalize='none'
                    placeholder='Description'
                    onChangeText={handleBodyChange}
                    value={upload.body} required
                  />
                </Item>
                <Label>Article</Label>
                <Textarea rowSpan={10} bordered rounded placeholder='Article body text' onChangeText={handleDescChange}
                  value={upload.desc} required />
              </Col>


              <Row style={{ height: 20 }}>
                <Col>
                  <Button
                    onPress={() => {
                      clearForm();
                      setImage({});
                    }}
                  >
                    <Text>Reset</Text>
                  </Button>
                </Col>
                <Col>
                  <Button onPress={() => {
                    uploadValidate(image.selected, upload, navigation, setAllArticles, setArticles, setMyArticles);
                    setImage({});
                  }}>
                    <Text>Upload</Text>
                  </Button>
                </Col>
                <Col>
                  <Button onPress={() => pickImage()}>
                    <Text>Header Image</Text>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Grid>
        </Form>
      </Content>
    </Container >
  );
};

UploadArticle.propTypes = {
  navigation: PropTypes.object,
};

export default UploadArticle;
