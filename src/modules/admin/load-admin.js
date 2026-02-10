import { adminProfessionals } from "../admin/admin"
import { handleLogout } from "../auth/handle-logout"
import { schedulesDayAdmin} from "../admin/schedules-admin"
import { initAdminEvents } from "../admin/init-admin"


document.addEventListener("DOMContentLoaded", function () {

initAdminEvents()
  adminProfessionals()
  handleLogout()
  schedulesDayAdmin()
})