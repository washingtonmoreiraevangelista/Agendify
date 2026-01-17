import { schedulesDay } from './schedules/schedule-load'
import {loginModal} from "./auth/login-modal"

document.addEventListener("DOMContentLoaded", function () {
schedulesDay()
loginModal()
})