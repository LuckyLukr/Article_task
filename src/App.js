import React, { useState, useEffect} from 'react';
import moment from 'moment';
import './App.css';

import Article from './Components/ArticleComponent/Article.component';
import Comments from './Components/CommentsComponent/Comment.component';
import MoreComments from './Components/CommentsComponent/MoreComments.component';

function App() {
  const [article, setArticle] = useState({})
  const [comments, setComments ] = useState([]);
  const [moreComments, setMoreComments ] = useState([]);
  const [showMoreComments, setShowMoreComments] = useState(false);

  useEffect(() => {
    sortComments()
  }, [comments.length,moreComments.length])

  function sortComments() {
    comments.push(...moreComments);
    comments.sort((a, b) => {
        let dateA = a.date.toUpperCase();
        let dateB = b.date.toUpperCase();
        if (dateA < dateB) {
          return 1;
        }
        if (dateA > dateB) {
          return -1;
        }
        return 0;
    });
    const removed = comments.splice(2)
    return setMoreComments(removed);
  }

  function fetchArticle() {
    return new Promise(resolve => {
            setTimeout(() => {
              resolve(document.__article);
            }, 2000);
          });
  }

  function fetchComments() {
    return new Promise(resolve => {
            setTimeout(() => {
              resolve(document.__comments);
            }, 2000);
          });
  }

  function fetchMoreComments() {
    return new Promise(resolve => {
            setTimeout(() => {
              resolve(document.__moreComments);
            }, 2000);
          });
  }

  async function loadArticle() {
    const article = await fetchArticle();
    return setArticle(article);
  }

  async function loadComments() {
    await loadArticle();
    const comments = await fetchComments();
    return setComments(comments);
  }

  async function loadMoreComments() {
    const moreComments = await fetchMoreComments();
    return setMoreComments(moreComments);
  }

  function handleMoreComments() {
    if (showMoreComments) {
      setShowMoreComments(false);
    } else if (moreComments.length === 0) {
      setShowMoreComments(true);
      loadMoreComments();
    } else {
      setShowMoreComments(true);
    }
  }

  loadArticle();
  loadComments();

  const commentsList = comments.map( element => 
    <Comments 
      id={element.id}
      author={element.author}
      time={moment.utc(element.date).format('HH:mm')}
      date={moment.utc(element.date).format('DD/MM/YYYY')}
      text={element.text}    
    />
  );
  const moreCommentsList = moreComments.map( element => 
    <MoreComments 
      id={element.id}
      author={element.author}
      time={moment.utc(element.date).format('HH:mm')}
      date={moment.utc(element.date).format('DD/MM/YYYY')}
      text={element.text}    
    />
  );

  return (
    <div className="app">

      <div style={{display: article.author === undefined ? 'block' : 'none'}} className='onLoading'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='loading...' style={{height: '150px'}} />
      </div>
      <div style={{display: article.author === undefined ? 'none' : 'flex'}} className='content'>
        <Article 
          author={article.author} 
          text={article.text} 
          date={moment.utc(article.date).format('DD/MM/YYYY')} 
          time={moment.utc(article.date).format('HH:mm')}
          />

        <div style={{display: comments.length === 0 ? 'none' : 'grid'}} className='commentsContainer'>

          <ul>
              {commentsList}
              { showMoreComments ? moreCommentsList : null }
          </ul>

          <div className='showMoreBtnContainer'>

              <div style={{display: showMoreComments && moreComments.length === 0 ? 'block' : 'none'}} className='onLoading'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='loading...' style={{height: '150px'}} />
              </div>

              <button style={{display: showMoreComments && moreComments.length === 0 ? 'none' : 'block'}} 
                      type='submit' 
                      className='showMoreBtn' 
                      onClick={() => handleMoreComments()} >
                  { showMoreComments ? <span>Hide comments</span> : <span>More comments</span>}
              </button>

          </div>
        </div>

        <div style={{display: comments.length === 0 ? 'block' : 'none'}} className='onLoading'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='loading...' style={{height: '150px'}} />
        </div>

      </div>
    </div>
  );
}

export default App;
