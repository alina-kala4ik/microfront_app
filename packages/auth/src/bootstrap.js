import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        history.listen((location) => {
            onNavigate(location);
        })
    }


    ReactDOM.render(
        <App history={history} />,
        el
    );

    return {
        onParentNavigate({ pathname: nextLocation }) {
            const { pathname } = history.location;

            if(pathname !== nextLocation) {
                history.push(nextLocation)
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const wrapper = document.querySelector('#_id-auth-dev-root');

    if (wrapper) {
        mount(wrapper, { defaultHistory: createBrowserHistory() })
    }
}

export { mount };
