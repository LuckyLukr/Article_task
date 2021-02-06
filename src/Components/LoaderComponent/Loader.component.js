import React from 'react';
import ReactLoading from 'react-loading';
 
const Loader = () => (
    <div className='onLoading'>
        <ReactLoading type={'spin'} color={'#5486b6'} height={250} />
    </div>
);
 
export default Loader;