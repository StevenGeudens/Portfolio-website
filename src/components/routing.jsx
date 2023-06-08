import {Route, Routes} from 'react-router-dom';

const Routing = () => {
    return (
        <Routes>
            <Route path={'/home'}/>
            <Route path={'/about'}/>
            <Route path={'/projects'}/>
            <Route path={'/contact'}/>
        </Routes>
    )
}

export default Routing;