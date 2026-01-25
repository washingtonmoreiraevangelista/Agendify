import {schedulesDay} from './schedules/schedule-load'
import {loginModal} from "./auth/login-modal"
import {handleLogout} from './auth/handle-logout'
import {loadProfessionals} from './schedules/load-professionals'
import {loadServices} from '../js/carrossel'

document.addEventListener("DOMContentLoaded", function () {
schedulesDay()
loginModal()
handleLogout()
loadProfessionals()
loadServices()
})