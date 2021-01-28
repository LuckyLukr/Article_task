import React from 'react';
import moment from 'moment';

import './Article.component.css';

function Article() {
    const article = document.__article;

    return(
        <div className='articleContainer'>

            <div className='articleHeader'>
                {article.author}
            </div>

            <article>{article.text}</article>

            <div className='articleFooter'>
                <div className='articleDate'>
                    <span>published at: {moment.utc(article.date).format('YYYY-MM-DD')} / {moment.utc(article.date).format('HH:mm')}</span>
                </div>
            </div>
            
        </div>
    )
}

export default Article;