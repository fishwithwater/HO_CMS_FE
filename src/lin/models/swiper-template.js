import {
  get, post, put, _delete,
} from '../utils/http'

class SwiperTemplate {
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
    return await get('v1/swiper-template/', {
      count,
      page,
    })
  }

  async nextPage() {
    await this.incresePage()
    return this.getLists({})
  }

  async prePage() {
    await this.decresePage()
    return this.getLists({})
  }


  // 类中的方法可以代表一个用户行为
  async add(info) {
    const res = await post('v1/swiper-template/', info)
    return res
  }

  async get(id) {
    const res = await get(`v1/swiper-template/${id}`)
    return res
  }

  async edit(id, info) {
    const res = await put(`v1/swiper-template/${id}`, info)
    return res
  }

  async delete(id) {
    const res = await _delete(`v1/swiper-template/${id}`)
    return res
  }
}

export default new SwiperTemplate()
