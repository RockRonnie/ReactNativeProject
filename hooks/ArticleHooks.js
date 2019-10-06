import {useEffect, useContext, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {AppContext} from '../contexts/AppContext';
import {MediaContext} from '../contexts/MediaContext';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const fetchGetUrl = async (url) => {
  // PLACEHOLDER token. TEE KUNNOLLA !!!!! !!!    !
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTksInVzZXJuYW1lIjoiYXNkIiwiZW1haWwiOiJlYmluMTIzQGhvdG1haWwuY29tIiwiZnVsbF9uYW1lIjpudWxsLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAxOS0wMS0yNFQxMDoyMzoyOC4wMDBaIiwiaWF0IjoxNTY5NzQ1NzgwLCJleHAiOjE1NzE4MTkzODB9.PN1qLUlFcQGK8Uqf3QMwDNtxFDRZegzVjfRIKsSbEVk';
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  // console.log('fetchUrl json', json);
  return json;
};

const fetchURL = async (url) => {
  const userToken = await AsyncStorage.getItem('userToken');
  // console.log('fetchGetUrl', url);
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  // console.log('fetchUrl json', json);
  return json;
};

const getTagFiles = async (tag) => {
  console.log('TAGISSA ON KÄYTY', tag);
  const tagresult = await fetchGetUrl(apiUrl + 'tags/' +tag);
  console.log('TAGRESULT', tagresult)
  return tagresult;
};

const getAvatarTag = async (uid) =>{
  const avatarResult = await getTagFiles('Avatar'+uid);
  console.log('AVATAR RESULT', avatarResult[0]);
  const avatarID = avatarResult[0].file_id;
  const avatarFile = await fetchGetUrl(apiUrl + 'media/' + avatarID);
  console.log(apiUrl + 'media/' + avatarID);
  console.log('USERAVATAR', avatarFile);
  return avatarFile.thumbnails.w320;
};

const getArticleTags = (url) => {
  const {articles, setArticles} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    // Hakee projektitagilla kaikki tiedostot
    const tagfiles = await getTagFiles('craftersguild');
    // Alustetaan array johon kerätään file_id tageusta
    const tagFileId = [];
    const taggedFilesList = [];
    for (let i=0; i < tagfiles.length; i++) {
      // pusketaan haettujen tagimatchien file_id:t arrayhyn
      tagFileId.push(tagfiles[i].file_id);
    }
    // Haetaan mediafilet äsken kerätyillä file_id:llä
    for (let i=0; i < tagFileId.length; i++) {
      // console.log('rullaa');
      const response = await fetch(url + tagFileId[i]);
      const json = await response.json();
      // Pusketaan taggedFilesList arrayhyn haetut mediat
      taggedFilesList.push(json);
    }
    // console.log('TAGGED FILES LIST', taggedFilesList);
    // Laitetaan artikkeiliksi haetut, karsitut, mediat
    setArticles(taggedFilesList);
    setLoading(false);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return [articles, loading];
};

const ArticleHooks = () => {
  const getArticleDesc = async (fileid) => {
    const descResult = await fetchGetUrl(apiUrl + 'tags/file/' + fileid);
    // console.log(descResult);
    for (let i=0; i < descResult.length; i++) {
      if (descResult[i].tag.length > 30) {
        return descResult[i].tag;
        console.log('JACKPOT', descResult[i].tag);
      }
    }
    return 'Description not found';
  };

  const getAllMedia = () => {
    // console.log('getAllMedia');
    const [articles, setArticles] = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media').then((json) => {
        setArticles(json);
        setLoading(false);
      });
    }, []);
    return [articles, loading];
  };

  const getThumbnail = (url) => {
    const [thumbnails, setThumbnails] = useState({});
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media/' + url).then((json) => {
        setThumbnails(json.thumbnails);
      });
    }, []);
    return thumbnails;
  };

  const useFetch = (url) => {
    return (getArticleTags(url));
  };

  const getAllMyArticles = (userID) => {
    const allArticles = getArticleTags('http://media.mw.metropolia.fi/wbma/media/user');
    console.log('My articles', userID);
    const myArticles = []

    return allArticles;
  };

  const deleteArticle = async (file, setMyArticle, setArticle, navigation) => {
    return fetchDeleteUrl('media/' + file.file_id).then((json) => {
      // console.log('delete', json);
      setArticle([]);
      setMyArticle([]);
      setTimeout(() => {
        // reloadAllMedia(setArticle, setMyArticle);
        navigation.navigate('Profile');
        Alert.alert(
            'File Deleted',
            'Reloading user files',
            [
              {text: 'OK', onPress: () => navigation.navigate('MyFiles')},
            ],
            {cancelable: false},
        );
      }, 2000);
    });
  };

  return {
    getAllMedia,
    getThumbnail,
    getAvatarTag,
    useFetch,
    getArticleDesc,
    getAllMyArticles,
    deleteArticle,
  };
};

export default ArticleHooks;
