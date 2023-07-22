import { layout } from "./layout"
import { auth } from "./auth"
import { department } from "../data/department"
import { helpers } from "./helpers"
import { spec } from "../data/spec"
import { notif } from "../component/notif"
import { room } from "../data/room"
import { doctor } from "../data/doctor"

export const modules = {
  auth,
  layout,
  helpers,
  department,
  spec,
  room,
  notif,
  doctor
}