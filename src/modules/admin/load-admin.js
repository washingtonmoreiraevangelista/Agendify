import { adminProfessionals } from "../admin/admin"
import { handleLogout } from "../auth/handle-logout"
import { schedulesDayAdmin } from "../admin/schedules-admin"
import { initAdminEvents } from "../admin/init-admin"
import { listServices } from './list-services'
import { renderContactMessages } from './contact-messages'



document.addEventListener("DOMContentLoaded", function () {

  initAdminEvents()
  adminProfessionals()
  handleLogout()
  schedulesDayAdmin()
  listServices()
  renderContactMessages()
})