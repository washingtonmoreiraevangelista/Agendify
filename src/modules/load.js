import {schedulesDay} from './schedules/schedule-load'
import {loginModal} from "./auth/login-modal"
import {handleLogout} from './auth/handle-logout'

document.addEventListener("DOMContentLoaded", function () {
schedulesDay()
loginModal()
handleLogout()
})