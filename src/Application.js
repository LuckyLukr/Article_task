import React, { useState, useEffect} from 'react';
import moment from 'moment';
import './App.css';

import Loader from './Components/LoaderComponent/Loader.component';
import Article from './Components/ArticleComponent/Article.component';
import Comments from './Components/CommentComponent/Comment.component';

function Application() {
  const [article, setArticle] = useState({})
  const [comments, setComments ] = useState([]);
  const [moreComments, setMoreComments ] = useState([]);
  const [showMoreComments, setShowMoreComments] = useState(false);

  useEffect(() => {

    loadArticle();
    loadComments();

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
    setMoreComments(removed);
  }, [comments.length, moreComments.length])

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
    setArticle(article);
  }

  async function loadComments() {
    await loadArticle();
    const comments = await fetchComments();
    setComments(comments);
  }

  async function loadMoreComments() {
    const moreComments = await fetchMoreComments();
    setMoreComments(moreComments);
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

  const commentsList = comments.map( element => 
    <Comments 
      id={element.id}
      key={element.id}
      author={element.author}
      time={moment.utc(element.date).format('HH:mm')}
      date={moment.utc(element.date).format('DD/MM/YYYY')}
      text={element.text}    
    />
  );
  const moreCommentsList = moreComments.map( element => 
    <Comments 
      id={element.id}
      key={element.id}
      author={element.author}
      time={moment.utc(element.date).format('HH:mm')}
      date={moment.utc(element.date).format('DD/MM/YYYY')}
      text={element.text}    
    />
  );

  return (
    <div className="app">

      {article.author === undefined 
      ?
        <Loader />
      :
      <div className='content'>
        <Article 
          author={article.author} 
          text={article.text} 
          date={moment.utc(article.date).format('DD/MM/YYYY')} 
          time={moment.utc(article.date).format('HH:mm')}
        />

        {comments.length === 0 
        ? 
          <Loader />
        :
        <div className='commentsContainer'>

          <ul>
              {commentsList}
              { showMoreComments ? moreCommentsList : null }
          </ul>

          <div className='showMoreBtnContainer'>

              {
              showMoreComments && moreComments.length === 0 
              ?
                <Loader />
              :
              <button
                  type='submit' 
                  className='showMoreBtn' 
                  onClick={() => handleMoreComments()} >
                  { showMoreComments ? <span>Hide comments</span> : <span>More comments</span>}
              </button>
              }
          </div>
        </div>
        }
      </div>
      }
    </div>
  );
}

export default Application;
