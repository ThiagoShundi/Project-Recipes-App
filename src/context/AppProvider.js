// import React, { useState, useMemo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import RequestApiData from '../services/RequestApiData';
// import AppContext from './AppContext';

// function AppProvider({ children }) {

//     const values = useMemo(() => ({})

//     return (
//         <AppContext.Provider value={ values }>
//           { children }
//         </AppContext.Provider>
//       );
// }

// AppProvider.propTypes = {
//     children: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.node),
//       PropTypes.node,
//     ]).isRequired,
//   };

// export default AppProvider;