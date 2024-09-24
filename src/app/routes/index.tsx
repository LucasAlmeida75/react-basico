import { BrowserRouter, Routes as Switch, Route, Navigate } from "react-router-dom";
import { Dashboard, Login, List } from "../pages";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/pagina-inicial" element={<List/>}/>
                <Route path="/entrar" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>

                <Route path="*" element={<Navigate to="/pagina-inicial" />} />
            </Switch>
        </BrowserRouter>
    );
}