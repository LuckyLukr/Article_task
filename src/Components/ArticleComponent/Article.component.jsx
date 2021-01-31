import React from 'react';

import './Article.component.css';

function Article(props) {

    return(
        <div className='articleContainer'>

            <div className='articleHeader'>
                {props.author}
            </div>

            <article>{props.text}</article>

            <div className='articleFooter'>
                <div className='articleDate'>
                    <span>published at: {props.date} / {props.time}</span>
                </div>
            </div>
            
        </div>
    )
}

export default Article;