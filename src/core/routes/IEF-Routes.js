import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../../pages/home/home'
import AddDish from '../../pages/ManageDish/AddDish'
import ListDish from '../../pages/ManageDish/ListDish'
import Order from '../../pages/order/Order'
import Login from '../../pages/authentification/Login'
import Register from '../../pages/authentification/Register'
import PutDish from '../../pages/ManageDish/PutDish'
import DeleteDish from '../../pages/ManageDish/DeleteDish'
import Dishes from '../../pages/dishes/dishes'
import Delivery from '../../pages/ManageDelivery/Delivery'

export default function IEFRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Home></Home>} />
            <Route path="/add-dish" element={<AddDish></AddDish>} />
            <Route path="/menu" element={<Dishes />} />
            <Route path="/dishes" element={<ListDish></ListDish>} />
            <Route path="/putdish/:id" element={<PutDish></PutDish>} />
            <Route path="/deletedish/:id" element={<DeleteDish></DeleteDish>} />
            <Route path="/order/:id" element={<Order></Order>} />
            <Route path="/Signin" element={<Login></Login>} />
            <Route path="/Signup" element={<Register></Register>} />
            <Route path='/delivery/:id' element={<Delivery></Delivery>} />
        </Routes>
    )
}
