import React from 'react';

import './More.comments.component.css';

function MoreComments(props) {

    return(
        <li>

            <div className='listHeader'>
                <div className='listAuthor'>
                    {props.author}
                </div>

                <div className='listDate'>
                    <div>
                        {props.time}
                    </div>
                    <div>
                        {props.date}
                    </div>
                </div>

            </div>
            
            <div className='listText'>
                {props.text}
            </div>

        </li>
    )
}

export default MoreComments;