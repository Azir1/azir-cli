import { getMenuList } from '../api'
import recursionRoutes from './recursionRoutes'
import { DynamicRoutes } from '../router/DynamicRoutes'
async function get() {
  let res = await getMenuList()
  if (res) {
    console.log(res)
    recursionRoutes(DynamicRoutes,res.data.menuList)
  }
}

export default get()

