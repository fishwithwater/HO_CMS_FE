import {
  get, post, put, _delete,
} from '../utils/http'

class WxUser {
  constructor(page = 0, count = 10) {
    this.page = page
    this.count = count
  }

  async incresePage() {
    this.page += 1
  }

  async decresePage() {
    this.page -= 1
    if (this.page < 0) {
      this.page = 0
    }
  }


  async getList({count = this.count, page = this.page}) {
    return await get('v1/wxuser/', {
      count,
      page,
    })
  }

  // async getAll() {
  //   return await get('v1/wxuser/list-all')
  // }

  async nextPage() {
    await this.incresePage()
    return this.getLists({})
  }

  async prePage() {
    await this.decresePage()
    return this.getLists({})
  }


  // 类中的方法可以代表一个用户行为
  // async add(info) {
  //   const res = await post('v1/wxuser/', info)
  //   return res
  // }
  //
  // async get(id) {
  //   const res = await get(`v1/wxuser/${id}`)
  //   return res
  // }
  //
  // async edit(id, info) {
  //   const res = await put(`v1/wxuser/${id}`, info)
  //   return res
  // }

  async delete(id) {
    const res = await _delete(`v1/wxuser/${id}`)
    return res
  }
}

export default new WxUser()
