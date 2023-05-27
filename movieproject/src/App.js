import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Layout_C from "./Layout_C";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Movie_C from "./pages/Movie_C";
import Movie_Create from "./pages/Movie_Create";
import Movie_Update from "./pages/Movie_Update";
import Plan from "./pages/Plan";
import Plan_C from "./pages/Plan_C";
import Plan_Create from "./pages/Plan_Create";
import Plan_Update from "./pages/Plan_Update";
import Seat from "./pages/Seat";
import Seat_C from "./pages/Seat_C";
import Ticket from "./pages/Ticket";
import Ticket_C from "./pages/Ticket_C";
import Customer from "./pages/Customer";
import Pay from "./pages/Pay";
import Pay_C from "./pages/Pay_C";
import Mypage from "./pages/Mypage_C";
import Mypage_ud from "./pages/Mypage_C_ud";
import Orderabout from "./pages/Orderabout_C";
import Order_Update from "./pages/Order_Update";
import Join from "./pages/Join_C";
//import Temp from "./pages/temp";

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route element={<Layout />}>
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie_create" element={<Movie_Create />} />
        <Route path="/movie_update" element={<Movie_Update />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/plan_create" element={<Plan_Create />} />
        <Route path="/plan_update" element={<Plan_Update />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/pay" element={<Pay />} />
      </Route>
      <Route element={<Layout_C />}>
        <Route path="/movie_c" element={<Movie_C />} />
        <Route path="/plan_c" element={<Plan_C />} />
        <Route path="/seat_c" element={<Seat_C />} />
        <Route path="/pay_c" element={<Pay_C />} />
        <Route path="/ticket_c" element={<Ticket_C />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage_ud" element={<Mypage_ud />} />
        <Route path="/order_update" element={<Order_Update />} />
        <Route path="/orderabout" element={<Orderabout />} />
      </Route>
    </Routes>
  );
};

export default App;
