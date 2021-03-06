import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ArticleListItem from './ArticleListItem';
import {List} from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';

const ArticleList = (props) => {
  const {navigation} = props;

  const {
    useFetch,
  } = ArticleHooks();

  const [articles, loading] = useFetch('http://media.mw.metropolia.fi/wbma/media/');
  return (
    <List
      style={styles.back}
      dataArray={articles}
      renderRow={(item) => (
        <ArticleListItem style={styles.item} navigation={navigation} singleMedia={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#5a5255',
  },
});

ArticleList.propTypes = {
  navigation: PropTypes.object,
};

export default ArticleList;
