/* no result component will display when we 
*  not get any result from the API
*/
import React from 'react';

const NoResult = () => (
  <div>
    <div className="no-result">
    	<div className="not-found-info">
			<h2>oops</h2>
			<h3>No Result Found</h3>
			<p>Try some different keywords.</p>
		</div>
    </div>
  </div>
)

export default NoResult;	