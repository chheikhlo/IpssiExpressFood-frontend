import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../../pages/home/home'
import AddFood from '../../pages/ManageDish/AddFood'
import ListDish from '../../pages/ManageDish/ListDish'
import Order from '../../pages/order/Order'
import Login from '../../pages/authentification/Login'
import Register from '../../pages/authentification/Register'
import PutDish from '../../pages/ManageDish/PutDish'
import DeleteFood from '../../pages/ManageDish/DeleteFood'
import Dishes from '../../pages/dishes/dishes'
import Delivery from '../../pages/ManageDelivery/Delivery'
import Profil from '../../pages/profil/profil'
import ListUsers from '../../pages/ManageUsers/ListUsers'
import DeleteProfil from '../../pages/profil/deleteUser'

export default function IEFRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Home></Home>} />
            <Route path="/add-dish" element={<AddFood></AddFood>} />
            <Route path="/menu" element={<Dishes />} />
            <Route path="/users" element={<ListUsers/>} />
            <Route path="/profil/:id" element={< Profil />} />
            <Route path="/delete/user/:id" element={<DeleteProfil />} />
            <Route path="/profil" element={< Profil />} />
            <Route path="/dishes" element={<ListDish></ListDish>} />
            <Route path="/putdish/:id" element={<PutDish></PutDish>} />
            <Route path="/deletefood/:id" element={<DeleteFood></DeleteFood>} />
            <Route path="/order/:id" element={<Order></Order>} />
            <Route path="/Signin" element={<Login></Login>} />
            <Route path="/Signup" element={<Register></Register>} />
            <Route path='/delivery/:id' element={<Delivery></Delivery>} />
        </Routes>
    )
}
