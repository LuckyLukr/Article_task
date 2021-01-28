import React, { useState, useEffect} from 'react';
import moment from 'moment';
import './App.css';

import Article from './Components/Article-component/Article.component';
import Comments from './Components/Comments-component/Comments.component';
import MoreComments from './Components/Comments-component/More-comments-component/More.comments.component';

function App() {
  const [comments, setComments ] = useState(document.__comments);
  const [moreComments, setMoreComments ] = useState(document.__moreComments);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);


  useEffect(() => {

      //Sorting comments from newest to oldest
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
      //End of sorting comments from newest to oldest

      //Async functions with setTimeout to simulate data loading on page
      const helloArticle = () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(setLoaded(true));
          }, 2000);
        });
      }
      const loadingArticle = async() => {
        const hello = await helloArticle();
        return () => clearTimeout(hello);
      }

      const helloComments = async() => {
        await helloArticle();
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(setArticleLoaded(true));
          }, 2000);
        });
      }
      const loadingComments = async() => {
        const hello = await helloComments();
        return () => clearTimeout(hello);
      }
      
      const helloMoreComments = async() => {
        await helloComments();
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(setCommentsLoaded(true));
          }, 2000);
        });
      }
      const loadingMoreComments = async() => {
        const hello = await helloMoreComments();
        return () => clearTimeout(hello);
      }
       
      loadingArticle();
      loadingComments();
      loadingMoreComments();
      //End of Async functions with setTimeout to simulate data loading on page
      
  }, []);

  const handleShowMoreComments = () => showMoreComments ? setShowMoreComments(false) : setShowMoreComments(true);


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

      <div style={{display:loaded ? 'none' : 'block' }} className='onLoading'>
          <img src='https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif' alt='Loading...' style={{height: '50px'}} />
      </div>

      <div style={{display:loaded ? 'flex' : 'none' }} className='content'>
        <Article />
        <div  style={{display:articleLoaded ? 'grid' : 'none' }} className='commentsContainer'>

          <ul>
              {commentsList}
              { showMoreComments ? moreCommentsList : null }
          </ul>

          <div style={{display:commentsLoaded ? 'grid' : 'none' }} className='showMoreBtnContainer'>
              <button type='submit' className='showMoreBtn' onClick={() => handleShowMoreComments()} >
                  { showMoreComments ? <span>Hide comments</span> : <span>More comments</span>}
              </button>
          </div>
          
          <div style={{display:commentsLoaded ? 'none' : 'block' }} className='onLoading'>
              <img src='https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif' alt='Loading...' style={{height: '50px'}} />
          </div>

      </div>

      <div style={{display:articleLoaded ? 'none' : 'block' }} className='onLoading'>
           <img src='https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif' alt='Loading...' style={{height: '50px'}} />
        </div>

      </div>
    </div>
  );
}

export default App;
