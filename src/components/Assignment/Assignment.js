import React, { useState } from 'react';
import GiveAssignment from '../giveAssignment/GiveAssignment';

const Assignment = ({ classCode, type }) => {
    const _options = {
        add: 1,
        previous: 2,
        current: 3,
        scheduled: 4
    }
    const [option, setOption] = useState(_options.previous);
    return (
        <>
            <div className='childPostWrapper' style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '2px 0px',
                padding: '10px 13px'
            }}>
                {type === 1 && <div className='_option' onClick={() => setOption(_options.add)}>Add</div>}
                <div className='_option' onClick={() => setOption(_options.previous)}>Previous</div>
                <div className='_option' onClick={() => setOption(_options.current)}>Current</div>
                <div className='_option' onClick={() => setOption(_options.scheduled)}>Scheduled</div>
            </div>
            {
                option === _options.add && <GiveAssignment classCode={classCode} />
            }
        </>
    );
};

export default Assignment;