import {schedulesDay} from './schedules/schedule-load'
import {loginModal} from "./auth/login-modal"
import {handleLogout} from './auth/handle-logout'
import {loadProfessionals} from './schedules/load-professionals'
import {loadServices} from '../js/carrossel'
import { initDateChange } from './form/date-change'
import { initSubmit } from './form/submit'

document.addEventListener("DOMContentLoaded", function () {
schedulesDay()
loginModal()
handleLogout()
loadProfessionals()
loadServices()
initDateChange()
initSubmit()
})